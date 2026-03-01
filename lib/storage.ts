import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { CalendarEvent, SharedCalendar } from './types';

// ── helpers ─────────────────────────────────────────────────────────────────

function newId(bytes: number) {
  return crypto.randomBytes(bytes).toString('hex');
}

// ── Upstash Redis (production / Vercel) ─────────────────────────────────────
// Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN via:
//   Vercel Dashboard → Integrations → Upstash Redis → Connect to project
//
// The client is created lazily so local dev without env vars still works.

function redisClient() {
  const { Redis } = require('@upstash/redis') as typeof import('@upstash/redis');
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

const KEY = (shareId: string) => `cal:${shareId}`;

async function kvGet(shareId: string): Promise<SharedCalendar | null> {
  return redisClient().get<SharedCalendar>(KEY(shareId));
}

async function kvSave(calendar: SharedCalendar): Promise<void> {
  await redisClient().set(KEY(calendar.shareId), calendar);
}

// ── File system (local dev only) ─────────────────────────────────────────────
// Used when UPSTASH_REDIS_REST_URL is not set.
// On Vercel the file system is read-only, so this path is never reached there.

const DATA_FILE = path.join(process.cwd(), 'data', 'calendars.json');

async function fsRead(): Promise<Record<string, SharedCalendar>> {
  try {
    return JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

async function fsWrite(store: Record<string, SharedCalendar>): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

async function fsGet(shareId: string): Promise<SharedCalendar | null> {
  return (await fsRead())[shareId] ?? null;
}

async function fsSave(calendar: SharedCalendar): Promise<void> {
  const store = await fsRead();
  store[calendar.shareId] = calendar;
  await fsWrite(store);
}

// ── driver (picks backend at runtime) ────────────────────────────────────────

const useRedis = () => Boolean(process.env.UPSTASH_REDIS_REST_URL);

async function getImpl(shareId: string) {
  return useRedis() ? kvGet(shareId) : fsGet(shareId);
}

async function saveImpl(calendar: SharedCalendar) {
  return useRedis() ? kvSave(calendar) : fsSave(calendar);
}

// ── public API ────────────────────────────────────────────────────────────────

export async function createCalendar(name: string): Promise<SharedCalendar> {
  const calendar: SharedCalendar = {
    shareId: newId(4),
    name: name.trim() || '우리 일정',
    events: [],
    createdAt: new Date().toISOString(),
  };
  await saveImpl(calendar);
  return calendar;
}

export async function getCalendar(shareId: string): Promise<SharedCalendar | null> {
  return getImpl(shareId);
}

export async function addEvent(
  shareId: string,
  event: Omit<CalendarEvent, 'id' | 'createdAt'>,
): Promise<CalendarEvent | null> {
  const calendar = await getImpl(shareId);
  if (!calendar) return null;

  const newEvent: CalendarEvent = {
    ...event,
    id: newId(8),
    createdAt: new Date().toISOString(),
  };
  calendar.events.push(newEvent);
  await saveImpl(calendar);
  return newEvent;
}

export async function deleteEvent(shareId: string, eventId: string): Promise<boolean> {
  const calendar = await getImpl(shareId);
  if (!calendar) return false;

  const before = calendar.events.length;
  calendar.events = calendar.events.filter((e) => e.id !== eventId);
  if (calendar.events.length === before) return false;

  await saveImpl(calendar);
  return true;
}
