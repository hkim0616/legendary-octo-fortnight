import { NextRequest, NextResponse } from 'next/server';
import { getCalendar } from '@/lib/storage';
import ical from 'ical-generator';

// Serves both:
//   webcal://host/api/ics/{shareId}         → Apple/Google Calendar live subscription
//   https://host/api/ics/{shareId}          → direct .ics download (via <a download>)
//   https://host/api/ics/{shareId}?download → forces Content-Disposition: attachment

export async function GET(
  req: NextRequest,
  { params }: { params: { shareId: string } },
) {
  const calendar = await getCalendar(params.shareId);
  if (!calendar) {
    return NextResponse.json({ error: '캘린더를 찾을 수 없습니다.' }, { status: 404 });
  }

  const cal = ical({
    name: calendar.name,
    // X-WR-* properties are read by Apple Calendar, Outlook, Google Calendar
    // X-PUBLISHED-TTL tells clients how often to re-fetch (ISO 8601 duration)
    x: [
      { key: 'X-WR-CALNAME', value: calendar.name },
      { key: 'X-WR-CALDESC', value: `${calendar.name} — 커플 공유 캘린더` },
      { key: 'X-WR-TIMEZONE', value: 'Asia/Seoul' },
      { key: 'X-PUBLISHED-TTL', value: 'PT1H' },       // Apple Calendar: refresh every hour
      { key: 'REFRESH-INTERVAL;VALUE=DURATION', value: 'PT1H' }, // RFC 7986 standard
    ],
  });

  for (const event of calendar.events) {
    cal.createEvent({
      id: event.id,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      summary: event.title,
      location: event.location || undefined,
      created: new Date(event.createdAt),
      timezone: 'Asia/Seoul',
    });
  }

  const isDownload = req.nextUrl.searchParams.has('download');
  const filename = encodeURIComponent(`${calendar.name}.ics`);

  return new NextResponse(cal.toString(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      // Omit Content-Disposition for webcal subscriptions so Calendar.app accepts it.
      // Add it only when explicitly requesting a file download.
      ...(isDownload && { 'Content-Disposition': `attachment; filename="${filename}"` }),
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
