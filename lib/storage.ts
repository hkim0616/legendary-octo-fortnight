import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { CalendarEvent, SharedCalendar } from './types';

const DATA_FILE = path.join(process.cwd(), 'data', 'calendars.json');

interface Store {
  calendars: Record<string, SharedCalendar>;
}

async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as Store;
  } catch {
    return { calendars: {} };
  }
}

async function writeStore(store: Store): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

export async function createCalendar(name: string): Promise<SharedCalendar> {
  const store = await readStore();
  const shareId = crypto.randomBytes(4).toString('hex'); // 8-char hex id
  const calendar: SharedCalendar = {
    shareId,
    name: name.trim() || '우리 일정',
    events: [],
    createdAt: new Date().toISOString(),
  };
  store.calendars[shareId] = calendar;
  await writeStore(store);
  return calendar;
}

export async function getCalendar(shareId: string): Promise<SharedCalendar | null> {
  const store = await readStore();
  return store.calendars[shareId] ?? null;
}

export async function addEvent(
  shareId: string,
  event: Omit<CalendarEvent, 'id' | 'createdAt'>,
): Promise<CalendarEvent | null> {
  const store = await readStore();
  const calendar = store.calendars[shareId];
  if (!calendar) return null;

  const newEvent: CalendarEvent = {
    ...event,
    id: crypto.randomBytes(8).toString('hex'),
    createdAt: new Date().toISOString(),
  };
  calendar.events.push(newEvent);
  await writeStore(store);
  return newEvent;
}

export async function deleteEvent(shareId: string, eventId: string): Promise<boolean> {
  const store = await readStore();
  const calendar = store.calendars[shareId];
  if (!calendar) return false;

  const before = calendar.events.length;
  calendar.events = calendar.events.filter((e) => e.id !== eventId);
  if (calendar.events.length === before) return false;

  await writeStore(store);
  return true;
}
