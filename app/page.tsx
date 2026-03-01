import { Suspense } from 'react';
import HomeClient from './components/HomeClient';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-slate-400 text-sm animate-pulse">불러오는 중...</div>
        </div>
      }
    >
      <HomeClient />
    </Suspense>
  );
}
