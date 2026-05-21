'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeContext } from '@/components/ui/ThemeProvider';

export default function DashboardRouterPage() {
  const { user, loading } = useThemeContext();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/');
      return;
    }

    if (user.role === 'admin') {
      router.push('/dashboard/admin');
    } else if (user.role === 'teacher') {
      router.push('/dashboard/teacher');
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-slate-500/10 border-t-indigo-600 animate-spin" />
      </div>
      <span className="text-xs uppercase tracking-widest font-black text-indigo-500 animate-pulse">
        Directing academic space...
      </span>
    </div>
  );
}
