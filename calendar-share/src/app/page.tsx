"use client";

import { useState, useCallback } from "react";

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

function generateICS({
  title,
  location,
  startDate,
  startTime,
  endDate,
  endTime,
}: {
  title: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}): string {
  const now = toICSDateString(
    new Date().toISOString().slice(0, 10),
    new Date().toISOString().slice(11, 16)
  );
  const uid = `${Date.now()}@calendar-share`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Calendar Share//KO",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${toICSDateString(startDate, startTime)}`,
    `DTEND:${toICSDateString(endDate, endTime)}`,
    `DTSTAMP:${now}`,
    `UID:${uid}`,
    `SUMMARY:${title}`,
    location ? `LOCATION:${location}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
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

export default function Home() {
  const today = new Date().toISOString().slice(0, 10);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [startTime, setStartTime] = useState("09:00");
  const [endDate, setEndDate] = useState(today);
  const [endTime, setEndTime] = useState("10:00");

  const handleStartDateChange = useCallback(
    (newDate: string) => {
      setStartDate(newDate);
      const result = addOneHour(newDate, startTime);
      setEndDate(result.date);
      setEndTime(result.time);
    },
    [startTime]
  );

  const handleStartTimeChange = useCallback(
    (newTime: string) => {
      setStartTime(newTime);
      const result = addOneHour(startDate, newTime);
      setEndDate(result.date);
      setEndTime(result.time);
    },
    [startDate]
  );

  const handleDownload = useCallback(() => {
    if (!title.trim()) return;

    const icsContent = generateICS({
      title: title.trim(),
      location: location.trim(),
      startDate,
      startTime,
      endDate,
      endTime,
    });

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.trim().replace(/\s+/g, "_")}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [title, location, startDate, startTime, endDate, endTime]);

  const isValid = title.trim().length > 0;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-center mb-1">캘린더 공유</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            일정을 입력하고 .ics 파일로 내보내세요
          </p>

          <div className="space-y-4">
            {/* 일정 제목 */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                일정 제목 <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="예: 팀 회의"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 장소 */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                장소
              </label>
              <input
                id="location"
                type="text"
                placeholder="예: 회의실 A"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 시작 날짜/시간 */}
            <div>
              <label className="block text-sm font-medium mb-1">시작</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                  className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 종료 날짜/시간 */}
            <div>
              <label className="block text-sm font-medium mb-1">종료</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 다운로드 버튼 */}
            <button
              onClick={handleDownload}
              disabled={!isValid}
              className="w-full mt-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              캘린더에 추가 (.ics 다운로드)
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          다운로드한 .ics 파일을 Google Calendar, Apple Calendar 등에서 열 수 있습니다.
        </p>
      </div>
    </main>
  );
}
