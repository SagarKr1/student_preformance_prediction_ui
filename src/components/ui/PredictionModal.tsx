'use client';

import React from 'react';
import { useThemeContext } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Brain,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface RecommendationCard {
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface PredictionResult {
  prediction: 'FAIL' | 'PASS' | 'EXCELLENT';
  confidence: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  suggestions: string[];
  recommendationCards: RecommendationCard[];
  analysis?: {
    attendanceScore: number;
    academicScore: number;
    consistencyScore: number;
    gpaScore: number;
  };
}

interface PredictionModalProps {
  result: PredictionResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PredictionModal({ result, isOpen, onClose }: PredictionModalProps) {
  const { theme } = useThemeContext();

  if (!result) return null;

  const getPredictionTitle = (status: string) => {
    switch (status) {
      case 'EXCELLENT': return 'Outstanding Candidate';
      case 'PASS': return 'Regular Passing Track';
      case 'FAIL': return 'Academic Warning / Risk';
      default: return 'Calculation Finished';
    }
  };

  const getPredictionGlow = (status: string) => {
    switch (status) {
      case 'EXCELLENT': return 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 shadow-emerald-500/10 text-emerald-400';
      case 'PASS': return 'from-indigo-500/20 to-purple-500/20 border-indigo-500/40 shadow-indigo-500/10 text-indigo-400';
      case 'FAIL': return 'from-rose-500/20 to-pink-500/20 border-rose-500/40 shadow-rose-500/10 text-rose-400';
      default: return 'from-slate-500/20 to-slate-600/20 border-slate-500/40 text-slate-400';
    }
  };

  const getPriorityBadge = (prio: string) => {
    switch (prio) {
      case 'HIGH': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'MEDIUM': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'LOW': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Glowing background blob */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-600/10 dark:bg-purple-600/10 blur-[120px] pointer-events-none" />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={`w-full max-w-3xl max-h-[85vh] rounded-3xl border overflow-y-auto shadow-2xl p-6 lg:p-8 relative z-10 glass-card
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

            {/* Modal Title */}
            <div className="flex items-center gap-3 pb-6 border-b border-slate-200/10">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md text-white">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">AI Diagnostic Report</h2>
                <p className="text-xs text-slate-400 font-semibold">ECI Predictive Analytics engine results</p>
              </div>
            </div>

            {/* Main Verdict Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              
              {/* Verdict Card */}
              <div className={`rounded-2xl p-5 border bg-gradient-to-br shadow-xl ${getPredictionGlow(result.prediction)} flex flex-col justify-between h-56`}>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Calculated Class Label</span>
                  <h3 className="text-3xl font-black tracking-tight">{result.prediction}</h3>
                  <p className="text-xs font-bold opacity-80">{getPredictionTitle(result.prediction)}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="opacity-70 font-semibold">Risk Exposure:</span>
                    <span className={`px-2 py-0.5 rounded-md font-bold uppercase ${
                      result.riskLevel === 'LOW' ? 'bg-emerald-500/20 text-emerald-300' :
                      result.riskLevel === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-rose-500/20 text-rose-300'
                    }`}>
                      {result.riskLevel} RISK
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        result.riskLevel === 'LOW' ? 'bg-emerald-400' :
                        result.riskLevel === 'MEDIUM' ? 'bg-amber-400' :
                        'bg-rose-400'
                      }`}
                      style={{ width: result.riskLevel === 'LOW' ? '25%' : result.riskLevel === 'MEDIUM' ? '60%' : '95%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Confidence Gauge & Basic Stats */}
              <div className="rounded-2xl p-5 border border-slate-200/10 bg-slate-900/10 dark:bg-slate-950/20 flex flex-col justify-between h-56">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Model Certainty Rating</span>
                  <ShieldCheck className="h-5 w-5 text-indigo-500" />
                </div>

                <div className="flex items-baseline gap-1 self-center py-2">
                  <motion.span 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500"
                  >
                    {result.confidence}%
                  </motion.span>
                  <span className="text-slate-400 text-xs font-bold">confidence</span>
                </div>

                <div className="text-xs text-slate-500 font-semibold text-center border-t border-slate-200/10 pt-3">
                  This simulation evaluates historical trends, study hours, GPA and backlogs to determine risks.
                </div>
              </div>

            </div>

            {/* AI suggestions breakdown details */}
            {result.analysis && (
              <div className="pt-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Academic Parameters Breakdown</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Attendance Weight', value: result.analysis.attendanceScore, color: 'bg-indigo-500' },
                    { label: 'Assignments Check', value: result.analysis.academicScore, color: 'bg-purple-500' },
                    { label: 'Syllabus Consistency', value: result.analysis.consistencyScore, color: 'bg-pink-500' },
                    { label: 'Prior GPA Standing', value: result.analysis.gpaScore, color: 'bg-emerald-500' }
                  ].map((stat, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200/10 bg-slate-900/5 dark:bg-slate-950/10 space-y-2">
                      <span className="text-[10px] text-slate-400 font-bold block truncate">{stat.label}</span>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black">{stat.value}%</span>
                        <TrendingUp className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="w-full h-1 rounded-full bg-slate-200/10 overflow-hidden">
                        <div className={`h-full rounded-full ${stat.color}`} style={{ width: `${stat.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendation Cards */}
            <div className="pt-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-indigo-500" /> Recommended Action Items
              </h4>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {result.recommendationCards && result.recommendationCards.length > 0 ? (
                  result.recommendationCards.map((card, index) => (
                    <motion.div
                      whileHover={{ x: 5 }}
                      key={index}
                      className={`p-4 rounded-xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4
                        ${theme === 'light' 
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-200' 
                          : 'bg-slate-900/50 hover:bg-slate-800/40 border-slate-800/80'}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${getPriorityBadge(card.priority)}`}>
                            {card.priority} Priority
                          </span>
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{card.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-semibold pr-4">
                          {card.description}
                        </p>
                      </div>

                      <ChevronRight className="h-5 w-5 text-slate-500 hidden md:block" />
                    </motion.div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl border border-slate-200/10 text-center text-xs text-slate-500">
                    No urgent remedial interventions recommended at this time.
                  </div>
                )}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200/10 mt-6">
              <button
                onClick={onClose}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors duration-200 cursor-pointer
                  ${theme === 'light'
                    ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'}`}
              >
                Close Report
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
