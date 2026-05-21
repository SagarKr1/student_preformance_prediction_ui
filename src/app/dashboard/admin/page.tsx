'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useThemeContext } from '@/components/ui/ThemeProvider';
import MetricCard from '@/components/ui/MetricCard';
import axios from 'axios';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Calendar, 
  Activity,
  Filter,
  Sparkles,
  RefreshCw,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function AdminDashboardPage() {
  const { theme } = useThemeContext();
  const [loading, setLoading] = useState(true);
  const [branchFilter, setBranchFilter] = useState('All Branches');
  const [sessionFilter, setSessionFilter] = useState('All Sessions');

  const [metrics, setMetrics] = useState<any>(null);
  const [charts, setCharts] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const bParam = branchFilter === 'All Branches' ? '' : branchFilter;
      const sParam = sessionFilter === 'All Sessions' ? '' : sessionFilter;

      const response = await axios.get(`/api/dashboard?branch=${encodeURIComponent(bParam)}&session=${encodeURIComponent(sParam)}`);
      
      if (response.data.success) {
        setMetrics(response.data.metrics);
        setCharts(response.data.charts);
        setEvents(response.data.events);
        setActivities(response.data.activities);
      }
    } catch (error) {
      console.error('Error loading dashboard statistics:', error);
    } finally {
      setLoading(false);
    }
  }, [branchFilter, sessionFilter]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Color mappings for Recharts Pie
  const PIE_COLORS = ['#10b981', '#6366f1', '#f43f5e'];

  const getEventCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'academic': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      case 'sports': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'exam': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'placement': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Banner */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 glass-card p-4 rounded-2xl border">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Filter className="h-4 w-4 text-indigo-500" />
            <span>Filters</span>
          </div>

          {/* Branch Filter dropdown */}
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-indigo-500 bg-transparent
              ${theme === 'light' ? 'border-slate-200 text-slate-800' : 'border-slate-800 text-slate-200'}`}
          >
            <option value="All Branches">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electronics & Comm">Electronics & Comm</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Civil">Civil</option>
          </select>

          {/* Session Filter dropdown */}
          <select
            value={sessionFilter}
            onChange={(e) => setSessionFilter(e.target.value)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-indigo-500 bg-transparent
              ${theme === 'light' ? 'border-slate-200 text-slate-800' : 'border-slate-800 text-slate-200'}`}
          >
            <option value="All Sessions">All Batches</option>
            <option value="2022-26">2022-26</option>
            <option value="2023-27">2023-27</option>
            <option value="2024-28">2024-28</option>
            <option value="2025-29">2025-29</option>
          </select>
        </div>

        {/* Sync Trigger button */}
        <button
          onClick={fetchStats}
          className={`px-4 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer
            ${theme === 'light' 
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700' 
              : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'}`}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Engine</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Total Students"
          value={loading ? '...' : metrics?.totalStudents || 0}
          subtext="Enrolled B.Tech"
          icon={Users}
          gradient="from-indigo-600 to-indigo-400"
          trend={{ value: '+4.2%', isPositive: true }}
        />
        <MetricCard
          title="Active HOD & Teachers"
          value={loading ? '...' : metrics?.teachersCount || 0}
          subtext="Branch faculties"
          icon={GraduationCap}
          gradient="from-purple-600 to-purple-400"
          trend={{ value: 'Stable', isPositive: true }}
        />
        <MetricCard
          title="Specialized Branches"
          value={loading ? '...' : metrics?.branchesCount || 0}
          subtext="Academic streams"
          icon={BookOpen}
          gradient="from-pink-600 to-pink-400"
        />
        <MetricCard
          title="Average GPA Score"
          value={loading ? '...' : `${metrics?.averageGpa || 7.0}`}
          subtext={`Avg attendance: ${metrics?.averageAttendance || 0}%`}
          icon={Award}
          gradient="from-emerald-600 to-emerald-400"
          trend={{ value: '+0.3', isPositive: true }}
        />
      </div>

      {/* Primary Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Student Performance Status (Pie Chart) */}
        <div className="glass-card p-5 rounded-2xl border flex flex-col justify-between h-96">
          <div className="flex items-center justify-between border-b border-slate-200/10 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student Rating Distribution</span>
            <Sparkles className="h-4.5 w-4.5 text-indigo-500" />
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500 animate-pulse">
              Computing rating metrics...
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

        {/* Branch-wise Student GPA (Grouped Bar Chart) */}
        <div className="glass-card p-5 rounded-2xl border flex flex-col justify-between h-96 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200/10 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Branch Wise GPA & Attendance Standing</span>
            <Activity className="h-4.5 w-4.5 text-indigo-500" />
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500 animate-pulse">
              Generating comparative graphs...
            </div>
          ) : (
            <div className="flex-1 w-full h-full min-h-[220px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts?.branchPerformance || []}>
                  <XAxis dataKey="branch" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
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
                  <Bar dataKey="gpa" name="Avg GPA (0-10)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="attendance" name="Avg Attendance (%)" fill="#c084fc" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

      </div>

      {/* Secondary Graphs & Side columns Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Semester-wise Performance Graph (Area Chart) */}
        <div className="glass-card p-5 rounded-2xl border flex flex-col justify-between h-96 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200/10 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Semester Performance Trends</span>
            <Award className="h-4.5 w-4.5 text-indigo-500" />
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500 animate-pulse">
              Plotting trend trajectories...
            </div>
          ) : (
            <div className="flex-1 w-full h-full min-h-[220px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charts?.semesterPerformance || []}>
                  <defs>
                    <linearGradient id="areaGpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
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
                  <Area type="monotone" dataKey="gpa" name="Avg GPA Trend" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#areaGpa)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Upcoming Events Column */}
        <div className="glass-card p-5 rounded-2xl border flex flex-col justify-between h-96">
          <div className="flex items-center justify-between border-b border-slate-200/10 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Calendar className="h-4 w-4 text-indigo-500" /> Upcoming Sem Events
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mt-4 pr-1">
            {events.map((evt) => (
              <div
                key={evt.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors duration-200
                  ${theme === 'light' ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/60'}`}
              >
                <div className="space-y-0.5 min-w-0">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${getEventCategoryBadge(evt.category)}`}>
                    {evt.category}
                  </span>
                  <p className="text-xs font-bold truncate text-slate-800 dark:text-slate-100">{evt.title}</p>
                  <p className="text-[10px] text-slate-400 font-semibold">{evt.date} • {evt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Activities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Session-wise Student Performance Graph (Line Chart) */}
        <div className="glass-card p-5 rounded-2xl border flex flex-col justify-between h-80 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200/10 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Session Wise Student Enrollment</span>
            <Users className="h-4.5 w-4.5 text-indigo-500" />
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500 animate-pulse">
              Plotting session graphs...
            </div>
          ) : (
            <div className="flex-1 w-full h-full min-h-[170px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts?.sessionPerformance || []}>
                  <XAxis dataKey="session" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
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
                  <Line type="monotone" dataKey="studentCount" name="Enrolled Quantity" stroke="#c084fc" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Recent Activities List */}
        <div className="glass-card p-5 rounded-2xl border flex flex-col justify-between h-80">
          <div className="flex items-center justify-between border-b border-slate-200/10 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Bell className="h-4 w-4 text-indigo-500 animate-bounce" /> Live Campus Stream
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mt-4 pr-1">
            {activities.map((act) => (
              <div key={act.id} className="text-xs leading-relaxed flex gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500 self-start mt-1.5 flex-shrink-0" />
                <p className="text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">{act.user}</strong> {act.action} <span className="text-indigo-400 font-bold">{act.target}</span> <span className="text-[10px] text-slate-500 font-semibold block">{act.time}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
