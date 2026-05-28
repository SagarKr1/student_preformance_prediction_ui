'use client';

import React from 'react';

import { useThemeContext } from './ThemeProvider';
import Image from 'next/image';

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

// ==========================================
// TYPES
// ==========================================

interface SemesterHistory {

  semester: number;

  attendance_percentage: number;

  study_hours_per_day: number;

  internal_marks: number;

  assignment_score: number;

  practical_marks: number;

  backlog_count: number;

  semester_gpa: number;

  final_result: string;
}

interface AISuggestion {

  priority: string;

  title: string;

  message: string;

  category: string;
}

interface StudentModalData {

  student_details: {

    student_id: number;

    name: string;

    registrationNo: string;

    enrollmentNo: string;

    course: string;

    branch: string;

    semester: number;

    session: string;

    phone: string;

    email: string;

    avatar: string;
  };

  performance_data: {

    attendance_percentage: number;

    study_hours_per_day: number;

    internal_marks: number;

    assignment_score: number;

    practical_marks: number;

    backlog_count: number;

    semester_gpa: number;

    final_result: string;
  };

  semester_history: SemesterHistory[];

  prediction: {

    final_result: string;

    model_confidence: number;

    confidence_analysis: {
      [key: string]: number;
    };

    performance_score: number;

    risk_level: string;

    academic_health: string;
  };

  ai_suggestions: AISuggestion[];
}

interface StudentModalProps {

  student: StudentModalData | null;

  isOpen: boolean;

  onClose: () => void;
}

// ==========================================
// COMPONENT
// ==========================================

export default function StudentModal({

  student,

  isOpen,

  onClose

}: StudentModalProps) {

  const { theme } = useThemeContext();

  if (!student) return null;

  // ==========================================
  // SHORTCUTS
  // ==========================================

  const details = student.student_details;

  const performance = student.performance_data;

  const prediction = student.prediction;

  // ==========================================
  // GPA HISTORY
  // ==========================================

  const currentGpa =
    performance.semester_gpa;

  const semestersHistory =
    student.semester_history?.map(
      (item) => ({
        name: `Sem ${item.semester}`,
        GPA: item.semester_gpa
      })
    ) || [];

  // ==========================================
  // STATUS COLORS
  // ==========================================

  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case 'EXCELLENT':

        return `
          from-emerald-500/20
          to-teal-500/20
          border-emerald-500/30
          text-emerald-400
        `;

      case 'PASS':

        return `
          from-indigo-500/20
          to-blue-500/20
          border-indigo-500/30
          text-indigo-400
        `;

      case 'FAIL':

        return `
          from-rose-500/20
          to-pink-500/20
          border-rose-500/30
          text-rose-400
        `;

      default:

        return `
          from-slate-500/20
          to-slate-600/20
          border-slate-500/30
          text-slate-400
        `;
    }
  };

  // ==========================================
  // RISK COLORS
  // ==========================================

  const getRiskColor = (
    risk: string
  ) => {

    switch (risk) {

      case 'LOW':

        return `
          bg-emerald-500/10
          text-emerald-500
          border-emerald-500/20
        `;

      case 'MEDIUM':

        return `
          bg-amber-500/10
          text-amber-500
          border-amber-500/20
        `;

      case 'HIGH':

        return `
          bg-rose-500/10
          text-rose-500
          border-rose-500/20
        `;

      default:

        return `
          bg-slate-500/10
          text-slate-500
          border-slate-500/20
        `;
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
            className="
              absolute inset-0
              bg-slate-950/60
              backdrop-blur-md
            "
          />

          {/* Modal */}

          <motion.div

            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20
            }}

            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}

            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20
            }}

            transition={{
              type: 'spring',
              duration: 0.5
            }}

            className={`
              w-full
              max-w-4xl
              max-h-[95vh]
              md:max-h-[90vh]
              rounded-3xl
              border
              overflow-y-auto
              shadow-2xl
              p-4 md:p-6 lg:p-8
              relative z-10
              glass-card
              ${theme === 'light'
                ? 'text-slate-800'
                : 'text-slate-100'}
            `}
          >

            {/* Close Button */}

            <button
              onClick={onClose}
              className={`
                absolute top-4 right-4
                p-2 rounded-full border
                transition-all duration-200
                ${theme === 'light'
                  ? `
                    bg-slate-100
                    border-slate-200
                    hover:bg-slate-200
                    text-slate-700
                  `
                  : `
                    bg-slate-900
                    border-slate-800
                    hover:bg-slate-800
                    text-slate-300
                  `}
              `}
            >

              <X className="h-5 w-5" />

            </button>

            {/* Header */}

            <div className="
              flex flex-col md:flex-row
              items-center gap-6
              border-b border-slate-200/10
              pb-6
            ">

              <Image
                src={details.avatar}
                alt={details.name}
                width={96}
                height={96}
                className="
    h-24 w-24 rounded-full
    object-cover border-4
    border-indigo-500 shadow-lg
  "
              />
              <div className="
                flex-1 text-center
                md:text-left space-y-2
              ">

                <div className="
                  flex flex-col md:flex-row
                  md:items-center gap-2.5
                  justify-center md:justify-start
                ">

                  <h2 className="
                    text-2xl font-extrabold
                    tracking-tight
                  ">
                    {details.name}
                  </h2>

                  <span className={`
                    px-3 py-0.5 rounded-full
                    text-xs font-bold border
                    uppercase bg-gradient-to-r
                    self-center
                    ${getStatusColor(
                    prediction.final_result
                  )}
                  `}>
                    AI Rating:
                    {' '}
                    {prediction.final_result}
                  </span>

                  <span className={`
                    px-2.5 py-0.5
                    rounded-full
                    text-xs font-semibold
                    border uppercase
                    self-center
                    ${getRiskColor(
                    prediction.risk_level
                  )}
                  `}>
                    Risk:
                    {' '}
                    {prediction.risk_level}
                  </span>

                </div>

                {/* Meta */}

                <div className="
                  grid grid-cols-2 md:grid-cols-4
                  gap-2 text-xs font-semibold
                  text-slate-400
                ">

                  <span className="
                    flex items-center gap-1
                    justify-center md:justify-start
                  ">
                    <BookOpen className="
                      h-3.5 w-3.5 text-indigo-500
                    " />
                    {details.branch}
                  </span>

                  <span className="
                    flex items-center gap-1
                    justify-center md:justify-start
                  ">
                    <Activity className="
                      h-3.5 w-3.5 text-indigo-500
                    " />
                    Sem {details.semester}
                  </span>

                  <span className="
                    flex items-center gap-1
                    justify-center md:justify-start
                  ">
                    <Clock className="
                      h-3.5 w-3.5 text-indigo-500
                    " />
                    {details.session}
                  </span>

                  <span className="
                    flex items-center gap-1
                    justify-center md:justify-start
                  ">
                    <Award className="
                      h-3.5 w-3.5 text-indigo-500
                    " />
                    {details.registrationNo}
                  </span>

                </div>

                {/* Contact */}

                <div className="
                  flex flex-col md:flex-row
                  gap-2.5 md:gap-6
                  text-xs text-slate-500
                  font-semibold pt-1
                ">

                  <span className="
                    flex items-center gap-1.5
                    justify-center md:justify-start
                  ">
                    <Mail className="h-3.5 w-3.5" />
                    {details.email}
                  </span>

                  <span className="
                    flex items-center gap-1.5
                    justify-center md:justify-start
                  ">
                    <Phone className="h-3.5 w-3.5" />
                    {details.phone}
                  </span>

                </div>

              </div>

            </div>

            {/* Content */}

            <div className="
              grid grid-cols-1 md:grid-cols-3
              gap-6 pt-6
            ">

              {/* Attendance */}

              <div className="
                p-5 rounded-2xl border
                border-slate-200/10
                bg-slate-900/10
                dark:bg-slate-950/20
                flex flex-col items-center
                justify-between h-72
              ">

                <span className="
                  text-xs font-bold
                  text-slate-400
                  uppercase tracking-widest
                ">
                  Attendance Status
                </span>

                <div className="
                  relative w-36 h-36
                  flex items-center justify-center
                ">

                  <svg
                    className="
                      w-full h-full
                      transform -rotate-90
                    "
                    viewBox="0 0 100 100"
                  >

                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="8"
                      fill="transparent"
                    />

                    <circle

                      cx="50"
                      cy="50"
                      r="40"

                      stroke={
                        performance.attendance_percentage >= 85
                          ? '#10b981'
                          : performance.attendance_percentage >= 75
                            ? '#f59e0b'
                            : '#ef4444'
                      }

                      strokeWidth="8"

                      fill="transparent"

                      strokeDasharray={`
                        ${2 * Math.PI * 40}
                      `}

                      strokeDashoffset={`
                        ${2 * Math.PI * 40 *
                        (
                          1 -
                          performance.attendance_percentage / 100
                        )
                        }
                      `}

                      strokeLinecap="round"

                      className="
                        transition-all duration-1000
                      "
                    />

                  </svg>

                  <div className="
                    absolute flex flex-col
                    items-center justify-center
                  ">

                    <span className="
                      text-2xl font-extrabold
                    ">
                      {performance.attendance_percentage}%
                    </span>

                    <span className="
                      text-[10px]
                      text-slate-400
                      font-semibold
                    ">
                      Attended
                    </span>

                  </div>

                </div>

                <span className={`
                  text-xs font-semibold
                  px-3 py-1 rounded-full
                  ${performance.attendance_percentage >= 85
                    ? `
                        bg-emerald-500/10
                        text-emerald-500
                        border border-emerald-500/20
                      `
                    : performance.attendance_percentage >= 75
                      ? `
                        bg-amber-500/10
                        text-amber-500
                        border border-amber-500/20
                      `
                      : `
                        bg-rose-500/10
                        text-rose-500
                        border border-rose-500/20
                      `
                  }
                `}>

                  {
                    performance.attendance_percentage >= 75
                      ? 'Safe Standing'
                      : 'Below Safe Limit (75%)'
                  }

                </span>

              </div>

              {/* GPA GRAPH */}

              <div className="
                p-5 rounded-2xl border
                border-slate-200/10
                bg-slate-900/10
                dark:bg-slate-950/20
                flex flex-col justify-between
                h-72 col-span-2
              ">

                <span className="
                  text-xs font-bold
                  text-slate-400
                  uppercase tracking-widest
                  mb-3
                ">
                  Academic GPA Progression
                </span>

                <div className="
                  flex-1 w-full h-full
                  min-h-[160px]
                ">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={semestersHistory}
                    >

                      <defs>

                        <linearGradient
                          id="gpaGrad"
                          cx="0"
                          cy="0"
                          r="1"
                        >

                          <stop
                            offset="5%"
                            stopColor="#6366f1"
                            stopOpacity={0.4}
                          />

                          <stop
                            offset="95%"
                            stopColor="#6366f1"
                            stopOpacity={0}
                          />

                        </linearGradient>

                      </defs>

                      <XAxis
                        dataKey="name"
                        stroke="#64748b"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />

                      <YAxis
                        domain={[0, 10]}
                        stroke="#64748b"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />

                      <Tooltip
                        contentStyle={{
                          backgroundColor:
                            theme === 'light'
                              ? '#fff'
                              : '#0f172a',

                          borderColor:
                            'rgba(255,255,255,0.1)',

                          color:
                            theme === 'light'
                              ? '#000'
                              : '#fff',

                          borderRadius: '8px'
                        }}
                      />

                      <Area
                        type="monotone"
                        dataKey="GPA"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#gpaGrad)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

                <div className="
                  flex items-center justify-between
                  text-xs font-bold text-slate-400
                  border-t border-slate-200/10
                  pt-2
                ">

                  <span>
                    Start GPA:
                    {' '}
                    {semestersHistory[0]?.GPA || 0}
                  </span>

                  <span className="text-indigo-500">
                    Current Sem GPA:
                    {' '}
                    {currentGpa}
                  </span>

                </div>

              </div>

            </div>

            {/* Bottom Section */}

            <div className="
              grid grid-cols-1 md:grid-cols-2
              gap-6 pt-6
            ">

              {/* Metrics */}

              <div className="
                p-5 rounded-2xl border
                border-slate-200/10
                bg-slate-900/10
                dark:bg-slate-950/20
                space-y-3
              ">

                <h3 className="
                  text-sm font-bold
                  text-slate-300 uppercase
                  tracking-wider
                  flex items-center gap-1.5
                ">

                  <Activity className="
                    h-4.5 w-4.5 text-indigo-500
                  " />

                  Current Session Metrics

                </h3>

                <div className="
                  grid grid-cols-2
                  gap-3 text-xs
                ">

                  <div className="
                    p-3 rounded-xl
                    bg-slate-500/5
                    border border-slate-200/5
                    space-y-1
                  ">

                    <span className="
                      text-slate-400
                      font-semibold
                    ">
                      Weekly Study Hours
                    </span>

                    <p className="
                      text-lg font-bold
                    ">
                      {performance.study_hours_per_day}h/day
                    </p>

                  </div>

                  <div className="
                    p-3 rounded-xl
                    bg-slate-500/5
                    border border-slate-200/5
                    space-y-1
                  ">

                    <span className="
                      text-slate-400
                      font-semibold
                    ">
                      Active Backlogs
                    </span>

                    <p className={`
                      text-lg font-bold
                      ${performance.backlog_count > 0
                        ? 'text-rose-500'
                        : 'text-emerald-500'
                      }
                    `}>

                      {performance.backlog_count}
                      {' '}
                      Subjects

                    </p>

                  </div>

                  <div className="
                    p-3 rounded-xl
                    bg-slate-500/5
                    border border-slate-200/5
                    space-y-1
                  ">

                    <span className="
                      text-slate-400
                      font-semibold
                    ">
                      Assignment Score
                    </span>

                    <p className="
                      text-lg font-bold
                    ">
                      {performance.assignment_score}/100
                    </p>

                  </div>

                  <div className="
                    p-3 rounded-xl
                    bg-slate-500/5
                    border border-slate-200/5
                    space-y-1
                  ">

                    <span className="
                      text-slate-400
                      font-semibold
                    ">
                      Internal Assessments
                    </span>

                    <p className="
                      text-lg font-bold
                    ">
                      {performance.internal_marks}/100
                    </p>

                  </div>

                </div>

              </div>

              {/* Suggestions */}

              <div className="
                p-5 rounded-2xl border
                border-slate-200/10
                bg-slate-900/10
                dark:bg-slate-950/20
                flex flex-col justify-between
              ">

                <div className="space-y-3">

                  <h3 className="
                    text-sm font-bold
                    text-slate-300 uppercase
                    tracking-wider
                    flex items-center gap-1.5
                  ">

                    <Sparkles className="
                      h-4.5 w-4.5 text-indigo-500
                    " />

                    AI Suggestions & Actions

                  </h3>

                  <div className="
                    space-y-2
                    max-h-40
                    overflow-y-auto
                  ">

                    {student.ai_suggestions?.map(
                      (
                        suggestion,
                        index
                      ) => {

                        const isHigh =
                          suggestion.priority === 'HIGH';

                        const isMedium =
                          suggestion.priority === 'MEDIUM';

                        return (

                          <div

                            key={index}

                            className={`

                              p-2.5 rounded-xl
                              text-xs flex gap-2
                              border

                              ${isHigh
                                ? `
                                    bg-rose-500/5
                                    border-rose-500/10
                                    text-rose-400
                                  `
                                : isMedium
                                  ? `
                                    bg-amber-500/5
                                    border-amber-500/10
                                    text-amber-400
                                  `
                                  : `
                                    bg-indigo-500/5
                                    border-indigo-500/10
                                    text-indigo-400
                                  `
                              }
                            `}
                          >

                            {isHigh ? (

                              <AlertTriangle className="
                                h-4.5 w-4.5
                                flex-shrink-0
                              " />

                            ) : (

                              <Sparkles className="
                                h-4.5 w-4.5
                                flex-shrink-0
                              " />

                            )}

                            <div>

                              <strong>
                                {suggestion.title}
                              </strong>

                              : {' '}

                              {suggestion.message}

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>

                <div className="
                  pt-4 border-t
                  border-slate-200/10
                  flex items-center
                  justify-between text-xs
                ">

                  <span className="
                    text-slate-400
                    font-medium
                  ">
                    Data calculated by ML Model
                  </span>

                  <span className="
                    text-indigo-400
                    font-bold uppercase
                    tracking-wider
                    flex items-center gap-1
                  ">

                    <Sparkles className="
                      h-3 w-3
                    " />

                    ECI AI-Core

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

