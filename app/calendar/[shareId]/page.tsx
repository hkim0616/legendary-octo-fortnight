import { notFound } from 'next/navigation';
import { getCalendar } from '@/lib/storage';
import CalendarClient from './CalendarClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { shareId: string } }) {
  const calendar = await getCalendar(params.shareId);
  return {
    title: calendar ? `${calendar.name} | 커플 캘린더` : '캘린더를 찾을 수 없습니다.',
  };
}

export default async function CalendarPage({ params }: { params: { shareId: string } }) {
  const calendar = await getCalendar(params.shareId);
  if (!calendar) notFound();

  return <CalendarClient initialCalendar={calendar} shareId={params.shareId} />;
}
