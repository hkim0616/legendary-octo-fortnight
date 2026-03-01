import { NextRequest, NextResponse } from 'next/server';
import { addEvent } from '@/lib/storage';

export async function POST(
  req: NextRequest,
  { params }: { params: { shareId: string } },
) {
  try {
    const body = await req.json();
    const { title, location, startTime, endTime } = body;

    if (!title?.trim() || !startTime || !endTime) {
      return NextResponse.json({ error: '필수 필드(제목, 시작/종료 시간)를 입력해주세요.' }, { status: 400 });
    }
    if (new Date(endTime) <= new Date(startTime)) {
      return NextResponse.json({ error: '종료 시간은 시작 시간보다 이후여야 합니다.' }, { status: 400 });
    }

    const event = await addEvent(params.shareId, {
      title: title.trim(),
      location: location?.trim() ?? '',
      startTime,
      endTime,
    });

    if (!event) {
      return NextResponse.json({ error: '캘린더를 찾을 수 없습니다.' }, { status: 404 });
    }
    return NextResponse.json(event, { status: 201 });
  } catch {
    return NextResponse.json({ error: '일정 추가에 실패했습니다.' }, { status: 500 });
  }
}
