'use client';

import React from 'react';
import { Student } from '@/data/mockData';
import { useThemeContext } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  Mail, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Activity, 
  AlertTriangle,
  Award
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentModal({ student, isOpen, onClose }: StudentModalProps) {
  const { theme } = useThemeContext();

  if (!student) return null;

  // Generate some academic history for the student based on current GPA
  const currentGpa = student.previousGpa;
  const semestersHistory = Array.from({ length: student.semester }, (_, i) => {
    const semNum = i + 1;
    // Walk back GPA slightly or fluctuate to look organic
    const offset = (Math.sin(semNum) * 0.4);
    const semGpa = Math.min(10, Math.max(4.5, parseFloat((currentGpa - (student.semester - semNum) * 0.15 + offset).toFixed(2))));
    return {
      name: `Sem ${semNum}`,
      GPA: semNum === student.semester ? currentGpa : semGpa
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EXCELLENT': return 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400';
      case 'PASS': return 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400';
      case 'FAIL': return 'from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400';
      default: return 'from-slate-500/20 to-slate-600/20 border-slate-500/30 text-slate-400';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'MEDIUM': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'HIGH': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={`w-full max-w-4xl max-h-[90vh] rounded-3xl border overflow-y-auto shadow-2xl p-6 lg:p-8 relative z-10 glass-card
              ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full border transition-all duration-200
                ${theme === 'light' 
                  ? 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700' 
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'}`}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 border-b border-slate-200/10 pb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={student.avatar}
                alt={student.name}
                className="h-24 w-24 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
              />
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2.5 justify-center md:justify-start">
                  <h2 className="text-2xl font-extrabold tracking-tight">{student.name}</h2>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold border uppercase bg-gradient-to-r self-center ${getStatusColor(student.performanceStatus)}`}>
                    AI Rating: {student.performanceStatus}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border uppercase self-center ${getRiskColor(student.riskLevel)}`}>
                    Risk: {student.riskLevel}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1 justify-center md:justify-start"><BookOpen className="h-3.5 w-3.5 text-indigo-500" /> {student.branch}</span>
                  <span className="flex items-center gap-1 justify-center md:justify-start"><Activity className="h-3.5 w-3.5 text-indigo-500" /> Sem {student.semester}</span>
                  <span className="flex items-center gap-1 justify-center md:justify-start"><Clock className="h-3.5 w-3.5 text-indigo-500" /> {student.session}</span>
                  <span className="flex items-center gap-1 justify-center md:justify-start"><Award className="h-3.5 w-3.5 text-indigo-500" /> {student.rollNo}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 text-xs text-slate-500 font-semibold pt-1">
                  <span className="flex items-center gap-1.5 justify-center md:justify-start"><Mail className="h-3.5 w-3.5" /> {student.email}</span>
                  <span className="flex items-center gap-1.5 justify-center md:justify-start"><Phone className="h-3.5 w-3.5" /> {student.phone}</span>
                </div>
              </div>
            </div>

            {/* Academic Details Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              
              {/* Circular Attendance Dial */}
              <div className={`p-5 rounded-2xl border border-slate-200/10 bg-slate-900/10 dark:bg-slate-950/20 flex flex-col items-center justify-between h-72`}>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Attendance Status</span>
                
                {/* SVG Radial Meter */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke={student.attendance >= 85 ? '#10b981' : student.attendance >= 75 ? '#f59e0b' : '#ef4444'} 
                      strokeWidth="8" 
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - student.attendance / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold">{student.attendance}%</span>
                    <span className="text-[10px] text-slate-400 font-semibold">Attended</span>
                  </div>
                </div>

                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  student.attendance >= 85 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                    : student.attendance >= 75
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                }`}>
                  {student.attendance >= 75 ? 'Safe Standing' : 'Below Safe Limit (75%)'}
                </span>
              </div>

              {/* GPA Progression Chart */}
              <div className="p-5 rounded-2xl border border-slate-200/10 bg-slate-900/10 dark:bg-slate-950/20 flex flex-col justify-between h-72 col-span-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Academic GPA Progression</span>
                <div className="flex-1 w-full h-full min-h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={semestersHistory}>
                      <defs>
                        <linearGradient id="gpaGrad" cx="0" cy="0" r="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 10]} stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'light' ? '#fff' : '#0f172a',
                          borderColor: 'rgba(255,255,255,0.1)',
                          color: theme === 'light' ? '#000' : '#fff',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area type="monotone" dataKey="GPA" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#gpaGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-t border-slate-200/10 pt-2">
                  <span>Start GPA: {semestersHistory[0]?.GPA || 0}</span>
                  <span className="text-indigo-500">Current Sem GPA: {currentGpa}</span>
                </div>
              </div>

            </div>

            {/* Performance Stats Cards & AI Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              
              {/* Detailed Performance Metrics */}
              <div className="p-5 rounded-2xl border border-slate-200/10 bg-slate-900/10 dark:bg-slate-950/20 space-y-3">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="h-4.5 w-4.5 text-indigo-500" /> Current Session Metrics
                </h3>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-500/5 border border-slate-200/5 space-y-1">
                    <span className="text-slate-400 font-semibold">Weekly Study Hours</span>
                    <p className="text-lg font-bold">{student.studyHours}h/day</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-500/5 border border-slate-200/5 space-y-1">
                    <span className="text-slate-400 font-semibold">Active Backlogs</span>
                    <p className={`text-lg font-bold ${student.backlogCount > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {student.backlogCount} Subjects
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-500/5 border border-slate-200/5 space-y-1">
                    <span className="text-slate-400 font-semibold">Assignment Score</span>
                    <p className="text-lg font-bold">{student.assignmentScore}/100</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-500/5 border border-slate-200/5 space-y-1">
                    <span className="text-slate-400 font-semibold">Internal Assessments</span>
                    <p className="text-lg font-bold">{student.internalMarks}/50</p>
                  </div>
                </div>
              </div>

              {/* AI Prediction & Recommendations */}
              <div className="p-5 rounded-2xl border border-slate-200/10 bg-slate-900/10 dark:bg-slate-950/20 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-4.5 w-4.5 text-indigo-500" /> AI Suggestions & Actions
                  </h3>
                  
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {student.riskLevel === 'HIGH' && (
                      <div className="p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-xs flex gap-2 text-rose-400">
                        <AlertTriangle className="h-4.5 w-4.5 flex-shrink-0" />
                        <div>
                          <strong>Critical Intervention Required:</strong> Arrange immediate teacher remedial coaching and monitor study hours.
                        </div>
                      </div>
                    )}
                    
                    <div className="p-2.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-xs flex gap-2 text-indigo-400">
                      <Sparkles className="h-4.5 w-4.5 flex-shrink-0" />
                      <div>
                        <strong>Study Recommendation:</strong> Encourage raising regular study slot count. Focus on internal assessment files.
                      </div>
                    </div>
                    
                    <div className="p-2.5 rounded-xl bg-slate-500/5 border border-slate-200/5 text-xs flex gap-2 text-slate-400">
                      <Activity className="h-4.5 w-4.5 flex-shrink-0" />
                      <div>
                        <strong>Upcoming Milestone:</strong> Check student attendance standing before final end-sem registration opens.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Data calculated by ML Model</span>
                  <span className="text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> ECI AI-Core
                  </span>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
