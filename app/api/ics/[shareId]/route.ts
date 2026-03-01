import { NextRequest, NextResponse } from 'next/server';
import { getCalendar } from '@/lib/storage';
import ical from 'ical-generator';

// This endpoint serves both:
//   webcal://host/api/ics/{shareId}  → Apple/Google Calendar subscription
//   https://host/api/ics/{shareId}   → direct .ics download

export async function GET(
  _req: NextRequest,
  { params }: { params: { shareId: string } },
) {
  const calendar = await getCalendar(params.shareId);
  if (!calendar) {
    return NextResponse.json({ error: '캘린더를 찾을 수 없습니다.' }, { status: 404 });
  }

  const cal = ical({ name: calendar.name });

  for (const event of calendar.events) {
    cal.createEvent({
      id: event.id,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      summary: event.title,
      location: event.location || undefined,
      created: new Date(event.createdAt),
    });
  }

  const filename = encodeURIComponent(`${calendar.name}.ics`);

  return new NextResponse(cal.toString(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
