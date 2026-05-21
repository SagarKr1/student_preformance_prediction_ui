'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeContext } from './ThemeProvider';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  gradient: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function MetricCard({
  title,
  value,
  subtext,
  icon: Icon,
  gradient,
  trend
}: MetricCardProps) {
  const { theme } = useThemeContext();

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`glass-card p-5 rounded-2xl relative overflow-hidden transition-all duration-300 group shadow-md flex flex-col justify-between h-40`}
    >
      {/* Background glowing orb element */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-15 transition-opacity duration-300 group-hover:opacity-25 bg-gradient-to-br ${gradient}`} />

      <div className="flex items-center justify-between w-full">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</span>
        <div className={`p-2.5 rounded-xl text-white bg-gradient-to-tr shadow-md transition-transform duration-300 group-hover:scale-110 ${gradient}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-3">
        <span className={`text-2xl lg:text-3xl font-extrabold tracking-tight ${
          theme === 'cyberpunk' ? 'text-[#39ff14]' : 'text-slate-900 dark:text-slate-100'
        }`}>
          {value}
        </span>
        
        <div className="flex items-center gap-2 text-xs font-semibold mt-1">
          {trend && (
            <span className={`px-1.5 py-0.5 rounded-md flex items-center ${
              trend.isPositive 
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
            }`}>
              {trend.value}
            </span>
          )}
          <span className="text-slate-400 truncate">{subtext}</span>
        </div>
      </div>

    </motion.div>
  );
}
