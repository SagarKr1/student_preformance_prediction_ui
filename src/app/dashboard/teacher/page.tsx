'use client';

import React, { useState, useEffect } from 'react';
import { useThemeContext } from '@/components/ui/ThemeProvider';
import MetricCard from '@/components/ui/MetricCard';
import axios from 'axios';
import { 
  Users, 
  BookOpen, 
  Award, 
  Calendar, 
  Activity,
  Sparkles,
  RefreshCw,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function TeacherDashboardPage() {
  const { theme, user } = useThemeContext();
  const [loading, setLoading] = useState(true);

  const [metrics, setMetrics] = useState<any>(null);
  const [charts, setCharts] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  // Locked branch: Computer Science
  const branchName = 'Computer Science';

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Locked query branch to Teacher's branch
      const response = await axios.get(`/api/dashboard?branch=${encodeURIComponent(branchName)}`);
      
      if (response.data.success) {
        setMetrics(response.data.metrics);
        setCharts(response.data.charts);
        setEvents(response.data.events);
        setActivities(response.data.activities);
      }
    } catch (error) {
      console.error('Error loading teacher stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const PIE_COLORS = ['#10b981', '#6366f1', '#f43f5e'];

  return (
    <div className="space-y-6">
      
      {/* Welcome banner locked to branch */}
      <div className="glass-card p-6 rounded-2xl border relative overflow-hidden shadow-md">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-600" />
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              {branchName} Department
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Professor'}
            </h2>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              Monitoring academics and predicting drop-out risks for active Computer Science streams.
            </p>
          </div>
          
          <button
            onClick={fetchStats}
            className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer
              ${theme === 'light' 
                ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700' 
                : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'}`}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <MetricCard
          title="Total CS Students"
          value={loading ? '...' : metrics?.totalStudents || 0}
          subtext="Under active branch"
          icon={Users}
          gradient="from-indigo-600 to-indigo-400"
          trend={{ value: '+2.8%', isPositive: true }}
        />
        <MetricCard
          title="Active CS Courses"
          value={loading ? '...' : metrics?.coursesCount || 0}
          subtext="Theory & Practical"
          icon={BookOpen}
          gradient="from-purple-600 to-purple-400"
        />
        <MetricCard
          title="Average Branch GPA"
          value={loading ? '...' : `${metrics?.averageGpa || 7.0}`}
          subtext={`Avg attendance: ${metrics?.averageAttendance || 0}%`}
          icon={Award}
          gradient="from-emerald-600 to-emerald-400"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Performance Distribution */}
        <div className="glass-card p-5 rounded-2xl border flex flex-col justify-between min-h-[300px] md:h-96">
          <div className="flex items-center justify-between border-b border-slate-200/10 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Branch Academic Rating</span>
            <Sparkles className="h-4.5 w-4.5 text-indigo-500" />
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500 animate-pulse">
              Calculating department stats...
            </div>
          ) : (
            <div className="flex-1 w-full h-full min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts?.studentPerformanceStatuses || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {(charts?.studentPerformanceStatuses || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme === 'light' ? '#fff' : '#0f172a',
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: theme === 'light' ? '#000' : '#fff',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* CS Semester Performance Trend */}
        <div className="glass-card p-5 rounded-2xl border flex flex-col justify-between min-h-[300px] md:h-96 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200/10 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Computer Science GPA Trajectory</span>
            <Activity className="h-4.5 w-4.5 text-indigo-500" />
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500 animate-pulse">
              Plotting trend graph...
            </div>
          ) : (
            <div className="flex-1 w-full h-full min-h-[220px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charts?.semesterPerformance || []}>
                  <defs>
                    <linearGradient id="teacherArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="semester" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme === 'light' ? '#fff' : '#0f172a',
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: theme === 'light' ? '#000' : '#fff',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Area type="monotone" dataKey="gpa" name="CS GPA Average" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#teacherArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

      </div>

      {/* Events & Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Events */}
        <div className="glass-card p-5 rounded-2xl border flex flex-col justify-between min-h-[250px] md:h-80 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200/10 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Calendar className="h-4 w-4 text-indigo-500" /> Department Milestones
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 mt-4 pr-1">
            {events.slice(0, 3).map((evt) => (
              <div
                key={evt.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3
                  ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800/80'}`}
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{evt.title}</p>
                  <p className="text-[10px] text-slate-400 font-semibold">{evt.date} • {evt.time} • {evt.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* stream */}
        <div className="glass-card p-5 rounded-2xl border flex flex-col justify-between min-h-[250px] md:h-80">
          <div className="flex items-center justify-between border-b border-slate-200/10 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Bell className="h-4 w-4 text-indigo-500" /> Activity Stream
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mt-4 pr-1">
            {activities.slice(0, 4).map((act) => (
              <div key={act.id} className="text-xs leading-relaxed flex gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 self-start mt-2 flex-shrink-0" />
                <p className="text-slate-400 truncate">
                  <strong className="text-slate-800 dark:text-slate-200">{act.user}</strong> {act.action} <span className="text-indigo-400">{act.target}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
