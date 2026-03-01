'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { CalendarEvent, SharedCalendar } from '@/lib/types';

interface Props {
  initialCalendar: SharedCalendar;
  shareId: string;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const EMPTY_FORM = { title: '', location: '', startTime: '', endTime: '' };

export default function CalendarClient({ initialCalendar, shareId }: Props) {
  const [calendar, setCalendar] = useState<SharedCalendar>(initialCalendar);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState('');
  const [webcalUrl, setWebcalUrl] = useState('');
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);

  // Compute URLs client-side (window is not available on server)
  useEffect(() => {
    setShareUrl(`${window.location.origin}/calendar/${shareId}`);
    setWebcalUrl(`webcal://${window.location.host}/api/ics/${shareId}`);
    setCanNativeShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, [shareId]);

  // Poll for updates every 30 s so partner's additions appear automatically
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/calendars/${shareId}`);
        if (res.ok) setCalendar(await res.json());
      } catch {
        // ignore network errors
      }
    }, 30_000);
    return () => clearInterval(interval);
  }, [shareId]);

  const sortedEvents = [...calendar.events].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  async function handleRefresh() {
    try {
      const res = await fetch(`/api/calendars/${shareId}`);
      if (res.ok) setCalendar(await res.json());
    } catch {
      // ignore
    }
  }

  async function handleAddEvent(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) { setError('제목을 입력해주세요.'); return; }
    if (!form.startTime || !form.endTime) { setError('시작 및 종료 시간을 입력해주세요.'); return; }
    if (new Date(form.endTime) <= new Date(form.startTime)) {
      setError('종료 시간은 시작 시간보다 이후여야 합니다.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/calendars/${shareId}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? '일정 추가에 실패했습니다.');
      }
      const newEvent: CalendarEvent = await res.json();
      setCalendar((prev) => ({ ...prev, events: [...prev.events, newEvent] }));
      setForm(EMPTY_FORM);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(eventId: string) {
    setDeletingId(eventId);
    try {
      const res = await fetch(`/api/calendars/${shareId}/events/${eventId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setCalendar((prev) => ({
        ...prev,
        events: prev.events.filter((ev) => ev.id !== eventId),
      }));
    } catch {
      // nothing — keep the item shown
    } finally {
      setDeletingId(null);
    }
  }

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2500);
    } catch {
      // ignore
    }
  }

  // Web Share API — opens the native share sheet on iOS/Android.
  // This lets the user pick KakaoTalk, iMessage, WhatsApp, etc. directly.
  async function handleNativeShare() {
    const shareData = {
      title: `${calendar.name} | 커플 캘린더`,
      text: `📅 ${calendar.name}\n일정을 함께 확인하고 Apple 캘린더에 추가해보세요!`,
      url: shareUrl,
    };
    try {
      await navigator.share(shareData);
    } catch {
      // User cancelled or API unavailable — fall back to copy
      await copy(shareUrl, 'native');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* Sticky header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-900/70 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← 홈
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-xs">코드</span>
            <code className="text-white text-sm font-mono bg-white/10 px-2 py-0.5 rounded-md">
              {shareId}
            </code>
            <button
              onClick={handleRefresh}
              className="text-slate-400 hover:text-white text-sm transition-colors"
              title="새로고침"
            >
              ↻
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">

        {/* Calendar title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">{calendar.name}</h1>
          <p className="text-slate-500 text-sm mt-1">
            {sortedEvents.length}개의 일정
          </p>
        </div>

        {/* Action bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Share — Web Share API on mobile, copy fallback on desktop */}
          <button
            onClick={canNativeShare ? handleNativeShare : () => copy(shareUrl, 'share')}
            className="flex flex-col items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 text-slate-300 hover:text-white transition-all"
          >
            <span className="text-xl">
              {copied === 'share' || copied === 'native' ? '✅' : canNativeShare ? '📤' : '🔗'}
            </span>
            <span className="text-xs leading-tight text-center">
              {copied === 'share' || copied === 'native'
                ? '복사됨!'
                : canNativeShare
                ? '공유하기'
                : '링크 복사'}
            </span>
          </button>

          {/* webcal:// — opens Apple Calendar / Outlook for live subscription */}
          <a
            href={webcalUrl || '#'}
            className="flex flex-col items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 text-slate-300 hover:text-white transition-all"
          >
            <span className="text-xl">📅</span>
            <span className="text-xs leading-tight text-center">캘린더 구독</span>
          </a>

          {/* ?download forces Content-Disposition: attachment */}
          <a
            href={`/api/ics/${shareId}?download`}
            className="flex flex-col items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 text-slate-300 hover:text-white transition-all"
          >
            <span className="text-xl">📥</span>
            <span className="text-xs leading-tight">.ics 저장</span>
          </a>
        </div>

        {/* Add event toggle */}
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full border-2 border-dashed border-slate-600 hover:border-blue-500 text-slate-400 hover:text-blue-400 rounded-2xl py-4 text-sm font-medium transition-all mb-6"
          >
            + 일정 추가
          </button>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-sm">새 일정</h2>
              <button
                onClick={() => { setShowForm(false); setError(''); setForm(EMPTY_FORM); }}
                className="text-slate-500 hover:text-white text-xl leading-none transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="제목 *"
                className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              />
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                placeholder="위치 (선택)"
                className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-xs mb-1">시작 시간 *</label>
                  <input
                    type="datetime-local"
                    value={form.startTime}
                    onChange={(e) => setForm((p) => ({ ...p, startTime: e.target.value }))}
                    className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1">종료 시간 *</label>
                  <input
                    type="datetime-local"
                    value={form.endTime}
                    onChange={(e) => setForm((p) => ({ ...p, endTime: e.target.value }))}
                    className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm [color-scheme:dark]"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg px-3 py-2 text-red-300 text-xs flex gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
              >
                {saving ? '저장 중...' : '일정 추가'}
              </button>
            </form>
          </div>
        )}

        {/* Event list */}
        {sortedEvents.length === 0 ? (
          <div className="text-center text-slate-500 py-20">
            <div className="text-5xl mb-4">🗓</div>
            <p className="font-medium">아직 일정이 없습니다.</p>
            <p className="text-sm mt-1 text-slate-600">위 버튼을 눌러 첫 일정을 추가해보세요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold truncate">{event.title}</h3>
                    {event.location && (
                      <p className="text-slate-400 text-sm mt-0.5 flex items-center gap-1">
                        <span>📍</span>
                        <span className="truncate">{event.location}</span>
                      </p>
                    )}
                    <div className="mt-2 space-y-0.5 text-slate-500 text-xs">
                      <p>시작: {formatDate(event.startTime)}</p>
                      <p>종료: {formatDate(event.endTime)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(event.id)}
                    disabled={deletingId === event.id}
                    className="shrink-0 text-slate-600 hover:text-red-400 disabled:opacity-40 transition-colors p-1.5 rounded-lg hover:bg-red-500/10"
                    title="일정 삭제"
                  >
                    {deletingId === event.id ? '⏳' : '🗑'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Share & Subscribe panel */}
        <div className="mt-8 space-y-3">

          {/* ── Section: KakaoTalk / Messages / Web Share ── */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white text-sm font-semibold mb-3">💬 카카오톡 · 메시지로 보내기</p>

            {/* Native share (iOS/Android) */}
            {canNativeShare && (
              <button
                onClick={handleNativeShare}
                className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold py-3 rounded-xl transition-colors text-sm mb-3"
              >
                <span>📤</span> 공유 앱 열기 (카카오톡 · 메시지 등)
              </button>
            )}

            {/* Share URL — always visible */}
            <p className="text-slate-400 text-xs mb-1.5">링크 직접 복사</p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={shareUrl}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="flex-1 min-w-0 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-300 text-xs cursor-pointer focus:outline-none"
              />
              <button
                onClick={() => copy(shareUrl, 'footer')}
                className="shrink-0 bg-slate-600 hover:bg-slate-500 text-white text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                {copied === 'footer' ? '✅' : '복사'}
              </button>
            </div>
            <p className="text-slate-600 text-xs mt-2">
              공유 코드 <code className="font-mono text-slate-500">{shareId}</code>
            </p>
          </div>

          {/* ── Section: Apple Calendar subscription ── */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white text-sm font-semibold mb-1">📅 Apple 캘린더 구독</p>
            <p className="text-slate-500 text-xs mb-3 leading-relaxed">
              구독하면 새 일정이 추가될 때마다 자동으로 동기화됩니다 (1시간 간격).
            </p>

            {/* Primary webcal:// CTA */}
            <a
              href={webcalUrl || '#'}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm mb-3"
            >
              <span>📅</span> Apple 캘린더에 구독 추가
            </a>

            {/* Manual webcal URL — for copying into calendar apps */}
            <p className="text-slate-400 text-xs mb-1.5">구독 URL 직접 복사</p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={webcalUrl}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="flex-1 min-w-0 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-400 text-xs font-mono cursor-pointer focus:outline-none"
              />
              <button
                onClick={() => copy(webcalUrl, 'webcal')}
                className="shrink-0 bg-slate-600 hover:bg-slate-500 text-white text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                {copied === 'webcal' ? '✅' : '복사'}
              </button>
            </div>

            {/* Step-by-step guide */}
            <div className="mt-4 bg-slate-800/60 rounded-xl p-3 space-y-1.5">
              <p className="text-slate-300 text-xs font-medium mb-2">수동으로 추가하는 방법</p>
              {[
                '위 구독 URL을 복사합니다.',
                'iPhone/Mac에서 캘린더 앱을 엽니다.',
                'iPhone: 하단 캘린더 → 캘린더 추가 → 구독 캘린더 추가',
                'Mac: 파일 → 새 캘린더 구독 → URL 붙여넣기',
                '\'구독\'을 탭하면 완료!',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="shrink-0 w-4 h-4 rounded-full bg-blue-600/40 text-blue-300 text-[10px] flex items-center justify-center font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-slate-400 text-xs leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
