import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '일정 내보내기 | Event Scheduler',
  description: '일정을 .ics 파일로 저장하거나 공유 링크를 만드세요. Google Calendar, Apple Calendar, Outlook 호환.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
