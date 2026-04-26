"use client";

import { useState, useCallback, useEffect } from "react";

interface EventData {
  id: string;
  title: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

function toICSDateString(date: string, time: string): string {
  const d = new Date(`${date}T${time}`);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    "T" +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

function addOneHour(date: string, time: string): { date: string; time: string } {
  const d = new Date(`${date}T${time}`);
  d.setHours(d.getHours() + 1);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
}

function generateICSMultiple(events: EventData[]): string {
  const now = toICSDateString(
    new Date().toISOString().slice(0, 10),
    new Date().toISOString().slice(11, 16)
  );

  const vevents = events.map((ev, i) => {
    const uid = `${Date.now()}-${i}@calendar-share`;
    return [
      "BEGIN:VEVENT",
      `DTSTART:${toICSDateString(ev.startDate, ev.startTime)}`,
      `DTEND:${toICSDateString(ev.endDate, ev.endTime)}`,
      `DTSTAMP:${now}`,
      `UID:${uid}`,
      `SUMMARY:${ev.title}`,
      ev.location ? `LOCATION:${ev.location}` : "",
      "END:VEVENT",
    ]
      .filter(Boolean)
      .join("\r\n");
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Calendar Share//KO",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...vevents,
    "END:VCALENDAR",
  ].join("\r\n");
}

function encodeEventsToURL(events: EventData[]): string {
  const minimal = events.map((ev) => ({
    t: ev.title,
    l: ev.location,
    sd: ev.startDate,
    st: ev.startTime,
    ed: ev.endDate,
    et: ev.endTime,
  }));
  const json = JSON.stringify(minimal);
  const encoded = btoa(unescape(encodeURIComponent(json)));
  return encoded;
}

function decodeEventsFromURL(data: string): EventData[] | null {
  try {
    const json = decodeURIComponent(escape(atob(data)));
    const parsed = JSON.parse(json);
    return parsed.map(
      (ev: { t: string; l: string; sd: string; st: string; ed: string; et: string }, i: number) => ({
        id: `shared-${i}`,
        title: ev.t,
        location: ev.l,
        startDate: ev.sd,
        startTime: ev.st,
        endDate: ev.ed,
        endTime: ev.et,
      })
    );
  } catch {
    return null;
  }
}

function createEmptyEvent(): EventData {
  const today = new Date().toISOString().slice(0, 10);
  return {
    id: crypto.randomUUID(),
    title: "",
    location: "",
    startDate: today,
    startTime: "09:00",
    endDate: today,
    endTime: "10:00",
  };
}

function downloadICS(events: EventData[]) {
  const icsContent = generateICSMultiple(events);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const filename =
    events.length === 1
      ? `${events[0].title.trim().replace(/\s+/g, "_")}.ics`
      : "calendar-events.ics";

  // iOS Safari blocks programmatic <a> clicks — use window.open fallback
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) {
    window.open(url, "_blank");
  } else {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

function toGoogleCalDateString(date: string, time: string): string {
  return date.replace(/-/g, "") + "T" + time.replace(/:/g, "") + "00";
}

function generateGoogleCalendarURL(event: EventData): string {
  const start = toGoogleCalDateString(event.startDate, event.startTime);
  const end = toGoogleCalDateString(event.endDate, event.endTime);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
  });
  if (event.location) {
    params.set("location", event.location);
  }
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function openInCalendar(event: EventData) {
  window.open(generateGoogleCalendarURL(event), "_blank", "noopener");
}

function formatDateTime(date: string, time: string): string {
  const d = new Date(`${date}T${time}`);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ─── Event Form Card ─── */
function EventCard({
  event,
  index,
  total,
  onChange,
  onRemove,
}: {
  event: EventData;
  index: number;
  total: number;
  onChange: (id: string, field: keyof EventData, value: string) => void;
  onRemove: (id: string) => void;
}) {
  const handleStartDateChange = (val: string) => {
    onChange(event.id, "startDate", val);
    const result = addOneHour(val, event.startTime);
    onChange(event.id, "endDate", result.date);
    onChange(event.id, "endTime", result.time);
  };

  const handleStartTimeChange = (val: string) => {
    onChange(event.id, "startTime", val);
    const result = addOneHour(event.startDate, val);
    onChange(event.id, "endDate", result.date);
    onChange(event.id, "endTime", result.time);
  };

  const inputCls =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700">
          일정 {total > 1 ? index + 1 : ""}
        </h2>
        {total > 1 && (
          <button
            onClick={() => onRemove(event.id)}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
            aria-label="일정 삭제"
          >
            ×
          </button>
        )}
      </div>

      <div className="space-y-3">
        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            일정 제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="예: 팀 회의"
            value={event.title}
            onChange={(e) => onChange(event.id, "title", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 장소 */}
        <div>
          <label className="block text-sm font-medium mb-1">장소</label>
          <input
            type="text"
            placeholder="예: 회의실 A"
            value={event.location}
            onChange={(e) => onChange(event.id, "location", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 시작 */}
        <div>
          <label className="block text-sm font-medium mb-1">시작</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={event.startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className={`flex-1 ${inputCls}`}
            />
            <input
              type="time"
              value={event.startTime}
              onChange={(e) => handleStartTimeChange(e.target.value)}
              className={`w-28 ${inputCls}`}
            />
          </div>
        </div>

        {/* 종료 */}
        <div>
          <label className="block text-sm font-medium mb-1">종료</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={event.endDate}
              onChange={(e) => onChange(event.id, "endDate", e.target.value)}
              className={`flex-1 ${inputCls}`}
            />
            <input
              type="time"
              value={event.endTime}
              onChange={(e) => onChange(event.id, "endTime", e.target.value)}
              className={`w-28 ${inputCls}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared View (read-only) ─── */
function SharedView({ events }: { events: EventData[] }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-4">
          <h1 className="text-2xl font-bold text-center mb-1">공유된 일정</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            {events.length}개의 일정이 공유되었습니다
          </p>

          <div className="space-y-4">
            {events.map((ev, i) => (
              <div
                key={ev.id}
                className="border border-gray-200 rounded-xl p-4 space-y-2"
              >
                <h3 className="font-semibold text-gray-900">
                  {events.length > 1 && (
                    <span className="text-blue-600 mr-1">{i + 1}.</span>
                  )}
                  {ev.title}
                </h3>
                {ev.location && (
                  <p className="text-sm text-gray-500">📍 {ev.location}</p>
                )}
                <p className="text-sm text-gray-500">
                  🕐 {formatDateTime(ev.startDate, ev.startTime)}
                </p>
                <p className="text-sm text-gray-500">
                  → {formatDateTime(ev.endDate, ev.endTime)}
                </p>
                <button
                  onClick={() => openInCalendar(ev)}
                  className="w-full mt-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  캘린더에 추가
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => downloadICS(events)}
            className="w-full mt-6 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            .ics 파일로 모두 받기
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          &quot;캘린더에 추가&quot; 버튼은 Google 캘린더로 연결되며,
          <br />
          .ics 파일은 Apple 캘린더 등에서 열 수 있습니다.
        </p>
      </div>
    </main>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [events, setEvents] = useState<EventData[]>([createEmptyEvent()]);
  const [sharedEvents, setSharedEvents] = useState<EventData[] | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Check URL for shared data on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("d");
    if (data) {
      const decoded = decodeEventsFromURL(data);
      if (decoded && decoded.length > 0) {
        setSharedEvents(decoded);
      }
    }
  }, []);

  const handleEventChange = useCallback(
    (id: string, field: keyof EventData, value: string) => {
      setEvents((prev) =>
        prev.map((ev) => (ev.id === id ? { ...ev, [field]: value } : ev))
      );
    },
    []
  );

  const handleRemoveEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }, []);

  const handleAddEvent = useCallback(() => {
    setEvents((prev) => [...prev, createEmptyEvent()]);
  }, []);

  const validEvents = events.filter((ev) => ev.title.trim().length > 0);
  const hasValidEvents = validEvents.length > 0;

  const handleDownloadAll = useCallback(() => {
    if (!hasValidEvents) return;
    downloadICS(validEvents);
  }, [hasValidEvents, validEvents]);

  const handleAddToCalendar = useCallback(() => {
    if (!hasValidEvents) return;
    if (validEvents.length === 1) {
      openInCalendar(validEvents[0]);
    } else {
      // Multi-event: open each in a separate tab
      validEvents.forEach((ev) => openInCalendar(ev));
    }
  }, [hasValidEvents, validEvents]);

  const handleShare = useCallback(() => {
    if (!hasValidEvents) return;
    const encoded = encodeEventsToURL(validEvents);
    const link = `${window.location.origin}${window.location.pathname}?d=${encoded}`;
    setShareLink(link);
    setCopied(false);
  }, [hasValidEvents, validEvents]);

  const handleCopyLink = useCallback(async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = shareLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareLink]);

  const handleKakaoShare = useCallback(() => {
    if (!shareLink) return;
    const text = `📅 일정이 공유되었습니다!\n\n${validEvents
      .map(
        (ev) =>
          `• ${ev.title}${ev.location ? ` (${ev.location})` : ""}\n  ${ev.startDate} ${ev.startTime} ~ ${ev.endDate} ${ev.endTime}`
      )
      .join("\n")}\n\n👉 아래 링크에서 캘린더에 추가하세요:\n${shareLink}`;

    // Try Kakao sharing via URL scheme, fallback to clipboard
    const kakaoLink = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(text)}`;

    // Use web share API if available (mobile)
    if (navigator.share) {
      navigator
        .share({
          title: "캘린더 일정 공유",
          text: validEvents.map((ev) => ev.title).join(", "),
          url: shareLink,
        })
        .catch(() => {
          window.open(kakaoLink, "_blank", "noopener");
        });
    } else {
      window.open(kakaoLink, "_blank", "noopener");
    }
  }, [shareLink, validEvents]);

  // If viewing shared events
  if (sharedEvents) {
    return <SharedView events={sharedEvents} />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center mb-1">캘린더 공유</h1>
          <p className="text-sm text-gray-500 text-center">
            일정을 입력하고 .ics 파일로 내보내거나 공유하세요
          </p>
        </div>

        {/* Event Cards */}
        <div className="space-y-4">
          {events.map((ev, i) => (
            <EventCard
              key={ev.id}
              event={ev}
              index={i}
              total={events.length}
              onChange={handleEventChange}
              onRemove={handleRemoveEvent}
            />
          ))}
        </div>

        {/* Add Event Button */}
        <button
          onClick={handleAddEvent}
          className="w-full mt-4 rounded-2xl border-2 border-dashed border-gray-300 py-3 text-sm font-medium text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors cursor-pointer"
        >
          + 일정 추가
        </button>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleAddToCalendar}
            disabled={!hasValidEvents}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {validEvents.length > 1
              ? `캘린더에 모두 추가 (${validEvents.length}개)`
              : "캘린더에 추가"}
          </button>

          <button
            onClick={handleDownloadAll}
            disabled={!hasValidEvents}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            .ics 파일로 다운로드
          </button>

          <button
            onClick={handleShare}
            disabled={!hasValidEvents}
            className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            공유 링크 생성
          </button>
        </div>

        {/* Share Link Panel */}
        {shareLink && (
          <div className="mt-4 bg-white rounded-2xl shadow-lg p-5 space-y-3">
            <p className="text-sm font-medium text-gray-700">공유 링크가 생성되었습니다</p>
            <div className="bg-gray-50 rounded-lg p-3 break-all text-xs text-gray-600 max-h-24 overflow-y-auto">
              {shareLink}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {copied ? "복사됨!" : "링크 복사"}
              </button>
              <button
                onClick={handleKakaoShare}
                className="flex-1 rounded-lg bg-[#FEE500] px-3 py-2 text-sm font-semibold text-[#3C1E1E] hover:bg-[#FDD800] transition-colors cursor-pointer"
              >
                카톡으로 공유
              </button>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-6">
          &quot;캘린더에 추가&quot;는 Google 캘린더로 바로 연결됩니다.
          <br />
          .ics 파일은 Apple 캘린더 등에서 열 수 있습니다.
        </p>
      </div>
    </main>
  );
}
