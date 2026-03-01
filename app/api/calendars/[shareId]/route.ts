import { NextRequest, NextResponse } from 'next/server';
import { getCalendar } from '@/lib/storage';

export async function GET(
  _req: NextRequest,
  { params }: { params: { shareId: string } },
) {
  const calendar = await getCalendar(params.shareId);
  if (!calendar) {
    return NextResponse.json({ error: '캘린더를 찾을 수 없습니다.' }, { status: 404 });
  }
  return NextResponse.json(calendar);
}
