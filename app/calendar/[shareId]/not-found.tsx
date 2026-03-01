import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-white mb-2">캘린더를 찾을 수 없습니다.</h1>
        <p className="text-slate-400 text-sm mb-6">공유 코드를 다시 확인해주세요.</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
