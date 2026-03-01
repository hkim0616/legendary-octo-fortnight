import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCalendar } from '@/lib/storage';
import CalendarClient from './CalendarClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { shareId: string };
}): Promise<Metadata> {
  const calendar = await getCalendar(params.shareId);
  if (!calendar) {
    return { title: '캘린더를 찾을 수 없습니다.' };
  }

  const title = `${calendar.name} | 커플 캘린더`;
  const eventCount = calendar.events.length;
  const description =
    eventCount > 0
      ? `${calendar.name}에 ${eventCount}개의 일정이 있습니다. 함께 확인하고 Apple 캘린더에 추가해보세요.`
      : `${calendar.name} — 커플 공유 캘린더. 일정을 함께 추가하고 Apple 캘린더에 구독하세요.`;

  return {
    title,
    description,
    // Open Graph — used by KakaoTalk, iMessage, Slack, Twitter, etc.
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: '커플 캘린더',
      locale: 'ko_KR',
    },
    // Twitter / X card
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function CalendarPage({ params }: { params: { shareId: string } }) {
  const calendar = await getCalendar(params.shareId);
  if (!calendar) notFound();

  return <CalendarClient initialCalendar={calendar} shareId={params.shareId} />;
}
