'use client';

import React, { useState, useEffect } from 'react';
import { useThemeContext } from '@/components/ui/ThemeProvider';
import PredictionModal from '@/components/ui/PredictionModal';
import axios from 'axios';
import { 
  BrainCircuit, 
  Sparkles, 
  RefreshCw, 
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeacherPredictPage() {
  const { theme } = useThemeContext();
  
  // Locked branch: Computer Science
  const branchName = 'Computer Science';

  // Form Values State
  const [attendance, setAttendance] = useState<number | ''>('');
  const [studyHours, setStudyHours] = useState<number | ''>('');
  const [internalMarks, setInternalMarks] = useState<number | ''>('');
  const [assignmentScore, setAssignmentScore] = useState<number | ''>('');
  const [practicalMarks, setPracticalMarks] = useState<number | ''>('');
  const [backlogCount, setBacklogCount] = useState<number | ''>('');
  const [previousGpa, setPreviousGpa] = useState<number | ''>('');

  // Dropdown CS Autofill helper
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  // Execution states
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load HOD CS students for HOD quick autofills
  useEffect(() => {
    const fetchCSStudents = async () => {
      try {
        const res = await axios.get(`/api/students?branch=${encodeURIComponent(branchName)}&limit=20`);
        if (res.data.success) {
          setStudents(res.data.students);
        }
      } catch (err) {
        console.error('Error HOD CS autofill load:', err);
      }
    };
    fetchCSStudents();
  }, []);

  const handleStudentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedStudentId(id);

    if (!id) return;
    
    const target = students.find(s => s.registrationNo === id);
    if (target) {
      setAttendance(target.attendance);
      setStudyHours(target.studyHours);
      setInternalMarks(target.internalMarks);
      setAssignmentScore(target.assignmentScore);
      setPracticalMarks(target.practicalMarks);
      setBacklogCount(target.backlogCount);
      setPreviousGpa(target.previousGpa);
    }
  };

  const handleClearForm = () => {
    setAttendance('');
    setStudyHours('');
    setInternalMarks('');
    setAssignmentScore('');
    setPracticalMarks('');
    setBacklogCount('');
    setPreviousGpa('');
    setSelectedStudentId('');
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      attendance === '' ||
      studyHours === '' ||
      internalMarks === '' ||
      assignmentScore === '' ||
      practicalMarks === '' ||
      backlogCount === '' ||
      previousGpa === ''
    ) {
      alert('Please fill in all features.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/predict', {
        attendance_percentage: attendance,
        study_hours_per_day: studyHours,
        internal_marks: internalMarks,
        assignment_score: assignmentScore,
        practical_marks: practicalMarks,
        backlog_count: backlogCount,
        previous_sem_gpa: previousGpa
      });

      if (response.data.success) {
        setPredictionResult(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error conducting predict evaluation:', error);
      alert('Prediction query failed. Check logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Description header */}
      <div className="glass-card p-6 rounded-2xl border relative overflow-hidden shadow-md">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-600" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Faculty Predictor
            </span>
            <h2 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
              <BrainCircuit className="h-6 w-6 text-indigo-500" /> Department AI Diagnostics
            </h2>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              Calculate expected passing ratios for Computer Science students and evaluate warning states.
            </p>
          </div>

          {/* Student Autofill drop-down option */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200/10 bg-slate-500/5 w-full md:w-auto md:min-w-[240px]">
            <UserCheck className="h-4 w-4 text-indigo-500" />
            <select
              value={selectedStudentId}
              onChange={handleStudentSelect}
              className="bg-transparent border-none outline-none text-xs w-full focus:ring-0 font-semibold cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <option value="">CS Student Autofill...</option>
              {students.map(s => (
                <option key={s.registrationNo} value={s.registrationNo}>
                  {s.name} ({s.rollNo})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Predictor Form card */}
      <div className="glass-card p-6 lg:p-8 rounded-3xl border shadow-xl relative">
        <form onSubmit={handlePredict} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Attendance input */}
            <motion.div whileTap={{ scale: 0.99 }} className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Class Attendance (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 82"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/10 focus:outline-none focus:border-indigo-500 bg-slate-500/5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-500 neon-border-focus"
                required
              />
            </motion.div>

            {/* Study Hours input */}
            <motion.div whileTap={{ scale: 0.99 }} className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Daily Study Hours</label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.1"
                placeholder="e.g. 5.5"
                value={studyHours}
                onChange={(e) => setStudyHours(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/10 focus:outline-none focus:border-indigo-500 bg-slate-500/5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-500 neon-border-focus"
                required
              />
            </motion.div>

            {/* Internal Marks input */}
            <motion.div whileTap={{ scale: 0.99 }} className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Internal Assessments (0 - 50)</label>
              <input
                type="number"
                min="0"
                max="50"
                placeholder="e.g. 42"
                value={internalMarks}
                onChange={(e) => setInternalMarks(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/10 focus:outline-none focus:border-indigo-500 bg-slate-500/5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-500 neon-border-focus"
                required
              />
            </motion.div>

            {/* Assignment Score input */}
            <motion.div whileTap={{ scale: 0.99 }} className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Assignment Score (0 - 100)</label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 85"
                value={assignmentScore}
                onChange={(e) => setAssignmentScore(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/10 focus:outline-none focus:border-indigo-500 bg-slate-500/5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-500 neon-border-focus"
                required
              />
            </motion.div>

            {/* Practical Marks input */}
            <motion.div whileTap={{ scale: 0.99 }} className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Practical Laboratory Marks (0 - 50)</label>
              <input
                type="number"
                min="0"
                max="50"
                placeholder="e.g. 44"
                value={practicalMarks}
                onChange={(e) => setPracticalMarks(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/10 focus:outline-none focus:border-indigo-500 bg-slate-500/5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-500 neon-border-focus"
                required
              />
            </motion.div>

            {/* Backlog Count input */}
            <motion.div whileTap={{ scale: 0.99 }} className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Backlog Papers</label>
              <input
                type="number"
                min="0"
                max="10"
                placeholder="e.g. 0"
                value={backlogCount}
                onChange={(e) => setBacklogCount(e.target.value === '' ? '' : parseInt(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/10 focus:outline-none focus:border-indigo-500 bg-slate-500/5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-500 neon-border-focus"
                required
              />
            </motion.div>

            {/* Previous Sem GPA input */}
            <motion.div whileTap={{ scale: 0.99 }} className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Previous Sem GPA (0.0 - 10.0)</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.01"
                placeholder="e.g. 8.12"
                value={previousGpa}
                onChange={(e) => setPreviousGpa(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/10 focus:outline-none focus:border-indigo-500 bg-slate-500/5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-500 neon-border-focus"
                required
              />
            </motion.div>

          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between border-t border-slate-200/10 pt-5 mt-4">
            <button
              type="button"
              onClick={handleClearForm}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer
                ${theme === 'light'
                  ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300'}`}
            >
              Clear Values
            </button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-bold text-[10px] sm:text-xs flex items-center gap-1 sm:gap-2 shadow-xl hover:opacity-95 disabled:opacity-50 cursor-pointer`}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Evaluating CS variables...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Diagnose performance</span>
                </>
              )}
            </motion.button>
          </div>

        </form>
      </div>

      {/* AI Diagnostic report popup modal */}
      <PredictionModal
        result={predictionResult}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}
