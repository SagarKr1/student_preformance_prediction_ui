'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useThemeContext, Theme } from './ThemeProvider';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Zap, 
  ChevronDown, 
  LogOut, 
  Check,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockNotifications } from '@/data/mockData';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme, user, logout, setSidebarOpen } = useThemeContext();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  // Derive breadcrumbs from path
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = paths.map((path, index) => {
    const url = `/${paths.slice(0, index + 1).join('/')}`;
    // Format label nicely
    let label = path.charAt(0).toUpperCase() + path.slice(1);
    if (label === 'Admin') label = 'Admin Panel';
    if (label === 'Teacher') label = 'Teacher Panel';
    if (label === 'Students') label = 'Students Database';
    if (label === 'Predict') label = 'AI Performance Predictor';
    return { label, url };
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className={`sticky top-0 z-20 w-full border-b transition-colors duration-300 backdrop-blur-md h-20 flex items-center justify-between px-4 lg:px-8
      ${theme === 'light' 
        ? 'bg-white/70 border-slate-200' 
        : theme === 'cyberpunk'
          ? 'bg-[#0a0015]/70 border-[#ff007f]/30'
          : 'bg-slate-950/70 border-slate-800'}`}>
      
      {/* Left side - Breadcrumbs & Dynamic Info */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
        <button
          onClick={() => setSidebarOpen(true)}
          className={`shrink-0 lg:hidden p-2 rounded-xl border transition-all duration-200
            ${theme === 'light' 
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700' 
              : theme === 'cyberpunk'
                ? 'bg-[#0d0221] border-[#ff007f]/30 text-[#39ff14]'
                : 'bg-slate-900 border-slate-800 text-slate-300'}`}
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col gap-0.5 min-w-0 overflow-hidden">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 truncate">
            <span className="shrink-0">ECI</span>
            {breadcrumbs.map((bc, i) => (
              <React.Fragment key={bc.url}>
                <span className="shrink-0">/</span>
                <span className={`truncate ${i === breadcrumbs.length - 1 ? "text-indigo-500 dark:text-indigo-400" : "hidden lg:inline-block"}`}>
                  {bc.label}
                </span>
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2 truncate">
            <span className="truncate">{breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard'}</span>
            {user.role === 'admin' && (
              <span className="shrink-0 whitespace-nowrap text-[10px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-indigo-500/20 hidden md:inline-block">
                System Admin
              </span>
            )}
            {user.role === 'teacher' && (
              <span className="shrink-0 whitespace-nowrap text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-amber-500/20 hidden md:inline-block">
                Branch: {user.branch}
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Right side - Controls (Search, Theme, Bell, Profile) */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        
        {/* Futuristic Search bar */}
        <div className={`hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all duration-300 w-64 neon-border-focus
          ${theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900/60 border-slate-800 text-slate-300'}`}>
          <Search className="h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Universal search..." 
            className="bg-transparent border-none outline-none text-xs w-full focus:ring-0 placeholder-slate-400 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Theme Toggle System */}
        <div className="flex items-center gap-1 rounded-full p-1 border border-slate-200/10 bg-slate-900/10 dark:bg-slate-950/40">
          {(['light', 'dark', 'cyberpunk'] as Theme[]).map((t) => {
            const isSelected = theme === t;
            const Icon = t === 'light' ? Sun : t === 'dark' ? Moon : Zap;
            
            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`p-1.5 rounded-full transition-all duration-200 relative group`}
                title={`${t.charAt(0).toUpperCase() + t.slice(1)} Mode`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeTheme"
                    className={`absolute inset-0 rounded-full shadow-sm
                      ${t === 'light' 
                        ? 'bg-amber-500 text-white shadow-amber-500/30' 
                        : t === 'cyberpunk'
                          ? 'bg-gradient-to-tr from-[#ff007f] to-[#00f0ff] text-white shadow-[#ff007f]/40'
                          : 'bg-indigo-600 text-white shadow-indigo-600/30'}`}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <Icon className={`h-4.5 w-4.5 z-10 relative transition-transform duration-200 group-hover:scale-110 ${
                  isSelected 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Notifications System */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className={`p-2 rounded-full border transition-all duration-200 relative group
              ${theme === 'light' 
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800' 
                : theme === 'cyberpunk'
                  ? 'bg-[#0d0221] border-[#ff007f]/30 hover:bg-[#1a0033] text-[#39ff14]'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-100'}`}
          >
            <Bell className="h-4.5 w-4.5 group-hover:rotate-12 transition-transform duration-200" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white font-bold text-[10px] flex items-center justify-center animate-pulse border-2 border-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className={`absolute right-0 mt-3.5 w-80 rounded-2xl border shadow-2xl p-4 space-y-3 z-50 glass-card`}
              >
                <div className="flex items-center justify-between border-b border-slate-200/10 pb-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-indigo-500" /> Notifications
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-xs text-indigo-500 hover:text-indigo-400 font-semibold"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl text-xs space-y-1 transition-colors duration-200 border
                        ${n.unread 
                          ? (theme === 'cyberpunk'
                              ? 'bg-[#ff007f]/5 border-[#ff007f]/20'
                              : 'bg-indigo-500/5 border-indigo-500/10')
                          : 'bg-transparent border-transparent hover:bg-slate-500/5'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${n.type === 'alert' ? 'text-rose-500' : n.type === 'success' ? 'text-emerald-500' : 'text-slate-700 dark:text-slate-300'}`}>
                          {n.title}
                        </span>
                        <span className="text-[9px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-slate-400 dark:text-slate-400 font-medium leading-relaxed">
                        {n.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt="User"
              className="h-10 w-10 rounded-full object-cover border-2 border-indigo-500 group-hover:scale-105 transition-transform duration-200"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-0.5 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
                {user.name} <ChevronDown className="h-3 w-3" />
              </span>
              <span className="text-[10px] text-slate-400 capitalize">{user.role} badge</span>
            </div>
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute right-0 mt-3.5 w-60 rounded-2xl border shadow-2xl p-3 z-50 glass-card space-y-2"
              >
                <div className="p-2 border-b border-slate-200/10 flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="h-9 w-9 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user.name}</span>
                    <span className="text-[10px] text-slate-400 truncate">{user.email}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400">
                    <BookOpen className="h-4 w-4 text-indigo-500" />
                    <span>Branch: {user.branch}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Award className="h-4 w-4 text-indigo-500" />
                    <span>Role: <strong className="uppercase">{user.role}</strong></span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-xs text-rose-500 font-semibold hover:bg-rose-500/10 transition-colors duration-200`}
                >
                  <LogOut className="h-4 w-4" /> Sign Out Account
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </header>
  );
}
