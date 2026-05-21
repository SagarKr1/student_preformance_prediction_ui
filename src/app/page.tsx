'use client';

import React, { useState } from 'react';
import { useThemeContext } from '@/components/ui/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Key
} from 'lucide-react';
import axios from 'axios';

export default function LoginPage() {
  const { login, theme } = useThemeContext();
  const [role, setRole] = useState<'admin' | 'teacher'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickFill = () => {
    if (role === 'admin') {
      setEmail('admin@college.in');
      setPassword('admin123');
    } else {
      setEmail('teacher@college.in');
      setPassword('teacher123');
    }
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
        role
      });

      if (response.data.success) {
        // Authenticate inside global state
        login(response.data.user, response.data.token);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials or connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen flex items-center justify-center p-4 overflow-hidden transition-all duration-500
      ${theme === 'light' 
        ? 'bg-slate-50 text-slate-800' 
        : theme === 'cyberpunk'
          ? 'bg-[#0a0015] text-[#39ff14]'
          : 'bg-[#030712] text-slate-100'}`}>
      
      {/* Floating Ambient Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600/20 blur-[120px] glow-orb animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/25 blur-[130px] glow-orb animate-float-medium" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[110px] glow-orb animate-float-fast" />

      {/* Main card panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="w-full max-w-lg z-10 space-y-6"
      >
        {/* Branding header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-xl flex items-center justify-center border border-white/10"
          >
            <GraduationCap className="h-9 w-9 animate-pulse" />
          </motion.div>
          
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-1.5 justify-center">
              Engineering College India
            </h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1 justify-center">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" /> AI-powered Decision SaaS Platform
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-card p-6 lg:p-8 rounded-3xl border shadow-2xl relative overflow-hidden">
          
          {/* Card Border Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Role selection tab */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Select Access Level</span>
              <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-500/5 border border-slate-200/5 relative overflow-hidden">
                <button
                  type="button"
                  onClick={() => { setRole('admin'); setError(''); }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all duration-300 z-10 flex items-center justify-center gap-2 cursor-pointer ${
                    role === 'admin' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" /> Principal Admin
                </button>
                <button
                  type="button"
                  onClick={() => { setRole('teacher'); setError(''); }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all duration-300 z-10 flex items-center justify-center gap-2 cursor-pointer ${
                    role === 'teacher' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <UserCheck className="h-4 w-4" /> Branch Faculty
                </button>

                {/* Role Sliding highlight pill */}
                <motion.div
                  layoutId="activeRoleTab"
                  className="absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md"
                  animate={{
                    left: role === 'admin' ? '6px' : '50%',
                    right: role === 'admin' ? '50%' : '6px',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-200/10 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 bg-slate-500/5 transition-all duration-300 neon-border-focus`}>
                <Mail className="h-4.5 w-4.5 text-slate-500" />
                <input
                  type="email"
                  placeholder={role === 'admin' ? 'admin@college.in' : 'teacher@college.in'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs w-full text-slate-800 dark:text-slate-100 placeholder-slate-500 focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Security Password</label>
                <button
                  type="button"
                  onClick={() => alert('Demo instructions: Use admin123 for Admin or teacher123 for Teacher.')}
                  className="text-[10px] text-indigo-500 hover:text-indigo-400 font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-200/10 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 bg-slate-500/5 transition-all duration-300 neon-border-focus`}>
                <Lock className="h-4.5 w-4.5 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs w-full text-slate-800 dark:text-slate-100 placeholder-slate-500 focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* Remember Me checkbox */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-800 text-indigo-600 focus:ring-indigo-500/20 h-4 w-4 bg-transparent cursor-pointer"
                />
                <span>Remember Credentials</span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer`}
            >
              {loading ? (
                <span>Authorizing Portal Access...</span>
              ) : (
                <>
                  <span>Sign In Securely</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>

            {/* Quick Fill Credentials Widget */}
            <div className="p-3.5 rounded-2xl border border-slate-200/10 bg-slate-500/5 text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
                <Key className="h-3 w-3 text-indigo-500" /> Quick-access Sandbox
              </span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[10px] bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Autofill {role === 'admin' ? 'Admin' : 'Teacher'} Credentials
              </button>
            </div>

          </form>

        </div>

        {/* Footer info */}
        <p className="text-[10px] text-center text-slate-500 font-semibold tracking-wider uppercase">
          Engineering College India © 2026. Secured by AES-256.
        </p>

      </motion.div>

    </div>
  );
}
