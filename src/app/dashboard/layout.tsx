'use client';

import React from 'react';
import { useThemeContext } from '@/components/ui/ThemeProvider';
import Sidebar from '@/components/ui/Sidebar';
import Navbar from '@/components/ui/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isSidebarOpen, loading, theme } = useThemeContext();

  // If session is loading, show a premium cybernetic loading screen
  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center space-y-4 transition-all duration-300
        ${theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-500/10 border-t-indigo-600 animate-spin" />
        </div>
        <span className="text-xs uppercase tracking-widest font-black text-indigo-500 animate-pulse">
          Decrypting Session...
        </span>
      </div>
    );
  }

  // If no user is logged in, return null as context auth handles redirection
  if (!user) return null;

  return (
    <div className={`min-h-screen flex flex-col transition-all-300
      ${theme === 'light' 
        ? 'bg-slate-50 text-slate-800' 
        : theme === 'cyberpunk'
          ? 'bg-[#06000d] text-[#39ff14]'
          : 'bg-[#030712] text-slate-100'}`}>
      
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Panel Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen relative transition-[padding] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isSidebarOpen ? 'lg:pl-[280px]' : 'lg:pl-[80px]'} pl-0 w-full`}
      >
        {/* Navbar Header */}
        <Navbar />

        {/* Dynamic Page with animation */}
        <main className="flex-1 p-6 lg:p-8 w-full max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}
