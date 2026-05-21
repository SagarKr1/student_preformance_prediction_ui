'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useThemeContext } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  BrainCircuit, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  GraduationCap, 
  Award,
  Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const { user, isSidebarOpen, setSidebarOpen, logout, theme } = useThemeContext();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  const role = user.role;

  // Define sidebar menu options based on role
  const menuItems = role === 'admin' 
    ? [
        {
          name: 'Overview',
          path: '/dashboard/admin',
          icon: LayoutDashboard,
          desc: 'Analytics & summaries'
        },
        {
          name: 'Student Records',
          path: '/dashboard/admin/students',
          icon: Users,
          desc: 'Management & table'
        },
        {
          name: 'AI Performance Predictor',
          path: '/dashboard/admin/predict',
          icon: BrainCircuit,
          desc: 'ML performance assessment'
        }
      ]
    : [
        {
          name: 'Overview',
          path: '/dashboard/teacher',
          icon: LayoutDashboard,
          desc: 'Branch summary'
        },
        {
          name: 'Branch Students',
          path: '/dashboard/teacher/students',
          icon: Users,
          desc: 'Branch class list'
        },
        {
          name: 'AI Predictor',
          path: '/dashboard/teacher/predict',
          icon: BrainCircuit,
          desc: 'Evaluate student marks'
        }
      ];

  const handleNavigation = (path: string) => {
    router.push(path);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 h-screen z-40 flex flex-col border-r transition-all duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${theme === 'light' 
            ? 'bg-white/95 border-slate-200' 
            : theme === 'cyberpunk'
              ? 'bg-[#0a0015]/95 border-[#ff007f]/30'
              : 'bg-slate-950/95 border-slate-800'} 
          backdrop-blur-xl shadow-xl`}
      >
      {/* Sidebar Header */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-slate-200/10 relative">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-lg text-white flex-shrink-0">
            <GraduationCap className="h-6 w-6" />
          </div>
          
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col whitespace-nowrap"
              >
                <span className={`font-bold tracking-tight text-base ${theme === 'cyberpunk' ? 'text-[#00f0ff]' : 'text-slate-900 dark:text-slate-100'}`}>
                  ECI Platform
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-indigo-500 flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" /> AI Engine v2.4
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className={`absolute -right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full border transition-all duration-300 shadow-md
            ${theme === 'light' 
              ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700' 
              : theme === 'cyberpunk'
                ? 'bg-[#0d0221] border-[#ff007f] hover:bg-[#1a0033] text-[#39ff14]'
                : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'}`}
        >
          {isSidebarOpen ? <ChevronLeft className="h-4.5 w-4.5" /> : <ChevronRight className="h-4.5 w-4.5" />}
        </button>
      </div>

      {/* Main Sidebar Navigation */}
      <div className="flex-1 py-6 px-3 overflow-y-auto space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="w-full text-left flex items-center justify-between rounded-xl p-3 relative group transition-all duration-200"
            >
              {/* Animated active background pill */}
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className={`absolute inset-0 rounded-xl shadow-md ${
                    theme === 'cyberpunk'
                      ? 'bg-gradient-to-r from-[#ff007f]/20 to-[#00f0ff]/10 border-l-2 border-[#ff007f]'
                      : 'bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-transparent border-l-2 border-indigo-600'
                  }`}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <div className="flex items-center gap-3.5 z-10">
                <Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0 ${
                  isActive 
                    ? (theme === 'cyberpunk' ? 'text-[#ff007f]' : 'text-indigo-500 dark:text-indigo-400')
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                }`} />
                
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col whitespace-nowrap"
                    >
                      <span className={`text-sm font-medium ${
                        isActive 
                          ? (theme === 'cyberpunk' ? 'text-[#39ff14]' : 'text-slate-900 dark:text-slate-100')
                          : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                      }`}>
                        {item.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer with User Profile and Logout */}
      <div className={`p-3 border-t border-slate-200/10 relative transition-all duration-300
        ${isSidebarOpen ? 'items-stretch' : 'items-center'}`}>
        <AnimatePresence>
          {isSidebarOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`rounded-2xl p-3.5 mb-3 flex items-center gap-3
                ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-900/60 border border-slate-800/50'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatar}
                alt="user avatar"
                className="h-10 w-10 rounded-full object-cover border-2 border-indigo-500"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold truncate capitalize flex items-center gap-1">
                  <Award className="h-3 w-3 text-indigo-500" /> {user.role} badge
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="flex justify-center mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatar}
                alt="user avatar"
                className="h-10 w-10 rounded-full object-cover border-2 border-indigo-500 shadow-md cursor-pointer"
                onClick={() => setSidebarOpen(true)}
              />
            </div>
          )}
        </AnimatePresence>

        <button
          onClick={logout}
          className={`w-full flex items-center gap-3.5 p-3 rounded-xl transition-all duration-200 font-medium z-10 group
            ${theme === 'cyberpunk'
              ? 'text-red-400 hover:bg-red-950/20 hover:text-red-300 border border-transparent hover:border-red-900/40'
              : 'text-rose-500 hover:bg-rose-500/10 hover:text-rose-600'}`}
        >
          <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 flex-shrink-0" />
          {isSidebarOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm whitespace-nowrap"
            >
              Sign Out
            </motion.span>
          )}
        </button>
      </div>
    </motion.aside>
    </>
  );
}
