import { NextRequest, NextResponse } from 'next/server';
import { deleteEvent } from '@/lib/storage';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { shareId: string; eventId: string } },
) {
  const success = await deleteEvent(params.shareId, params.eventId);
  if (!success) {
    return NextResponse.json({ error: '이벤트를 찾을 수 없습니다.' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
