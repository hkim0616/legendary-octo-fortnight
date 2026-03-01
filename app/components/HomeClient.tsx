'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeClient() {
  const router = useRouter();
  const [calendarName, setCalendarName] = useState('');
  const [shareId, setShareId] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      const res = await fetch('/api/calendars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: calendarName.trim() || '우리 일정' }),
      });
      if (!res.ok) throw new Error('캘린더 생성에 실패했습니다.');
      const data = await res.json();
      router.push(`/calendar/${data.shareId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
      setCreating(false);
    }
  }

  function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    const id = shareId.trim();
    if (!id) {
      setError('공유 코드를 입력해주세요.');
      return;
    }
    router.push(`/calendar/${id}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">💑</div>
          <h1 className="text-4xl font-bold text-white tracking-tight">커플 캘린더</h1>
          <p className="text-slate-400 mt-3 text-sm leading-relaxed">
            함께하는 일정을 만들고, 공유하고, Apple 캘린더에 바로 추가하세요
          </p>
        </div>

        {/* Create */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4 shadow-xl">
          <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <span>✨</span> 새 공유 캘린더 만들기
          </h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              type="text"
              value={calendarName}
              onChange={(e) => { setCalendarName(e.target.value); setError(''); }}
              placeholder="캘린더 이름 (예: 우리 일정)"
              className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
            />
            <button
              type="submit"
              disabled={creating}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              {creating ? '만드는 중...' : '캘린더 만들기 →'}
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-slate-500 text-xs">또는</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        {/* Join */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <span>🔗</span> 기존 캘린더 참여
          </h2>
          <form onSubmit={handleJoin} className="space-y-3">
            <input
              type="text"
              value={shareId}
              onChange={(e) => { setShareId(e.target.value); setError(''); }}
              placeholder="공유 코드 입력 (예: a1b2c3d4)"
              className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm font-mono"
            />
            <button
              type="submit"
              className="w-full bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              캘린더 열기 →
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-500/20 border border-red-500/40 rounded-xl px-4 py-3 text-red-300 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Feature chips */}
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          {[
            { icon: '📥', label: '.ics 다운로드' },
            { icon: '📱', label: 'Apple 캘린더 구독' },
            { icon: '🔗', label: '공유 링크' },
          ].map((f) => (
            <div key={f.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="text-slate-400 text-xs leading-snug">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
