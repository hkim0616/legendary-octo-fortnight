'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface EventData {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function formatDateForICS(dateStr: string): string {
  const d = new Date(dateStr);
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    'Z'
  );
}

function escapeICS(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function generateICSContent(event: EventData): string {
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}@event-scheduler`;
  const dtstamp = formatDateForICS(new Date().toISOString());

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Event Scheduler//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${formatDateForICS(event.startTime)}`,
    `DTEND:${formatDateForICS(event.endTime)}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `LOCATION:${escapeICS(event.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function encodeEventData(data: EventData): string {
  try {
    return btoa(encodeURIComponent(JSON.stringify(data)));
  } catch {
    return '';
  }
}

function decodeEventData(encoded: string): EventData | null {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
}

export default function EventForm() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState<EventData>({
    title: '',
    location: '',
    startTime: '',
    endTime: '',
  });
  const [isShared, setIsShared] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      const decoded = decodeEventData(data);
      if (decoded) {
        setForm(decoded);
        setIsShared(true);
      }
    }
  }, [searchParams]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  }

  function validate(): boolean {
    if (!form.title.trim()) {
      setError('제목을 입력해주세요.');
      return false;
    }
    if (!form.startTime) {
      setError('시작 시간을 입력해주세요.');
      return false;
    }
    if (!form.endTime) {
      setError('종료 시간을 입력해주세요.');
      return false;
    }
    if (new Date(form.endTime) <= new Date(form.startTime)) {
      setError('종료 시간은 시작 시간보다 이후여야 합니다.');
      return false;
    }
    return true;
  }

  function handleDownload() {
    if (!validate()) return;

    const icsContent = generateICSContent(form);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.title.trim() || 'event'}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  }

  async function handleShare() {
    if (!validate()) return;

    const encoded = encodeEventData(form);
    const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
    setShareUrl(url);

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Clipboard API unavailable — URL is still shown below
    }
  }

  async function copyShareUrl() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore
    }
  }

  function formatDisplayTime(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📅</div>
          <h1 className="text-3xl font-bold text-white tracking-tight">일정 내보내기</h1>
          <p className="text-slate-400 mt-2 text-sm">
            일정을 입력하고 .ics 파일로 저장하거나 공유하세요
          </p>
        </div>

        {/* Shared event banner */}
        {isShared && (
          <div className="mb-5 bg-blue-500/20 border border-blue-500/40 rounded-xl p-4 text-center">
            <p className="text-blue-300 text-sm font-medium">
              🔗 공유된 일정입니다. 내용을 확인하고 .ics 파일로 저장하세요.
            </p>
          </div>
        )}

        {/* Form card */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                제목 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="예: 팀 미팅"
                className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                위치 <span className="text-slate-500 font-normal">(선택)</span>
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="예: 서울시 강남구 회의실 3층"
                className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Time inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  시작 시간 <span className="text-red-400">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  종료 시간 <span className="text-red-400">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Preview when shared */}
            {isShared && form.startTime && form.endTime && (
              <div className="bg-slate-700/40 rounded-xl p-4 text-sm text-slate-300 space-y-1.5">
                <div className="flex gap-2">
                  <span className="text-slate-500 w-12 shrink-0">제목</span>
                  <span className="text-white font-medium">{form.title}</span>
                </div>
                {form.location && (
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-12 shrink-0">위치</span>
                    <span>{form.location}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <span className="text-slate-500 w-12 shrink-0">시작</span>
                  <span>{formatDisplayTime(form.startTime)}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 w-12 shrink-0">종료</span>
                  <span>{formatDisplayTime(form.endTime)}</span>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/40 rounded-xl px-4 py-3 text-red-300 text-sm flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-3 px-5 rounded-xl transition-colors shadow-lg shadow-blue-900/30"
              >
                <span>{downloaded ? '✅' : '📥'}</span>
                {downloaded ? '다운로드 완료!' : '.ics 파일 다운로드'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 active:bg-slate-700 text-white font-semibold py-3 px-5 rounded-xl transition-colors"
              >
                <span>{copied ? '✅' : '🔗'}</span>
                {copied ? '링크 복사됨!' : '공유 링크 만들기'}
              </button>
            </div>
          </div>
        </div>

        {/* Share URL display */}
        {shareUrl && (
          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-2 font-medium">공유 링크</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="flex-1 min-w-0 bg-slate-700/60 border border-slate-600 rounded-lg px-3 py-2 text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer truncate"
              />
              <button
                onClick={copyShareUrl}
                className="shrink-0 bg-slate-600 hover:bg-slate-500 text-white text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                {copied ? '✅ 복사됨' : '복사'}
              </button>
            </div>
            <p className="text-slate-600 text-xs mt-2">
              이 링크를 공유하면 상대방도 일정을 확인하고 저장할 수 있습니다.
            </p>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-6">
          생성된 .ics 파일은 Google Calendar, Apple Calendar, Outlook에서 사용 가능합니다
        </p>
      </div>
    </div>
  );
}
