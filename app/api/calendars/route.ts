import { NextRequest, NextResponse } from 'next/server';
import { createCalendar } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const calendar = await createCalendar(body.name ?? '우리 일정');
    return NextResponse.json(calendar, { status: 201 });
  } catch {
    return NextResponse.json({ error: '캘린더 생성에 실패했습니다.' }, { status: 500 });
  }
}
