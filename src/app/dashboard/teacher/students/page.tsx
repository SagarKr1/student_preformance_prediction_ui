'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useThemeContext } from '@/components/ui/ThemeProvider';
import StudentModal from '@/components/ui/StudentModal';
import axios from 'axios';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Users,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { allSession } from '@/services/session.api';
import { studentTeacher } from '@/services/studentTeacher.api';
import { studentPerformance } from '@/services/studentPerformanceTeacher.api';

export default function TeacherStudentsPage() {
  const { theme, user } = useThemeContext();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);

  // Filtering & Pagination State (Locked to teacher branch)
  const branchName = 'Computer Science';
  const [search, setSearch] = useState('');
  const [sessionData, setSessionData] = useState([]);
  const [session, setSession] = useState('All Sessions');
  const [semester, setSemester] = useState('All Semesters');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);

  // Detail Modal State
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSession = useCallback(async () => {
    setLoading(true);
    try {
      const response = await allSession();
      // console.log(response);
      if (response.success) {
        setSessionData(response.data)
      }
    } catch (error) {
      console.error('Error fetching session list:', error);
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const sParam = session === 'All Sessions' ? '' : session;
      const semParam = semester === 'All Semesters' ? '' : semester;

      // Dynamic payload
      const payload: Record<string, any> = {
        page,
        limit: 10,
      };

      if (sParam) {
        payload.session = sParam;
      }

      if (semParam) {
        payload.semester = semParam;
      }

      if (search?.trim()) {
        payload.search = search.trim();
      }

      console.log(payload);

      const response = await studentTeacher(payload)

      // console.log(response);


      if (response.success) {
        setStudents(response.data);
        setTotalPages(response.pagination.total_pages);
        setTotalStudents(response.pagination.total_students);
      }
    } catch (error) {
      console.error('Error HOD CS student loading:', error);
    } finally {
      setLoading(false);
    }
  }, [search, session, semester, page]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, session, semester]);

  const handleOpenModal = async (student: any) => {
    try {
      const payload = {
        "student_id": student.rollNo
      }

      const response = await studentPerformance(payload)

      console.log(response.data);

      if (response.success) {
        setSelectedStudent(response.data);
        setIsModalOpen(true);
      } else {
        alert("Plzz try again");
      }
    } catch (e) {
      console.log(e);
      alert("SomeThing Went Wrong");
      setIsModalOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'EXCELLENT':
        return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
      case 'PASS':
        return 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20';
      case 'FAIL':
        return 'bg-rose-500/10 text-rose-500 border border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-500 border border-slate-500/20';
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setSession('All Sessions');
    setSemester('All Semesters');
  };

  return (
    <div className="space-y-6">

      {/* Search & Filters */}
      <div className="glass-card p-5 rounded-2xl border space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-200/10 pb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Users className="h-4.5 w-4.5 text-indigo-500" /> {branchName} class Registry
          </span>
          <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full font-bold">
            Branch Records: {totalStudents}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Universal Search */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200/10 bg-slate-500/5 md:col-span-2 neon-border-focus`}>
            <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Name, Reg No..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-slate-800 dark:text-slate-100 placeholder-slate-500 focus:ring-0"
            />
          </div>

          {/* Session Select */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200/10 bg-slate-500/5">
            <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <select
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full focus:ring-0 font-semibold cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <option value="All Sessions">All Batches</option>
              {
                sessionData?.map((item, index) => (
                  <option
                    key={index}
                    value={item}
                  >
                    {item}
                  </option>
                ))
              }
            </select>
          </div>

          {/* Semester Select */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200/10 bg-slate-500/5">
            <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full focus:ring-0 font-semibold cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <option value="All Semesters">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>
        </div>

        {/* Clear Filters helper */}
        {(search || session !== 'All Sessions' || semester !== 'All Semesters') && (
          <div className="flex justify-end pt-2 border-t border-slate-200/10">
            <button
              onClick={handleClearFilters}
              className="text-xs text-rose-500 hover:text-rose-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              <XCircle className="h-4 w-4" /> Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Main Table view */}
      <div className="glass-card rounded-2xl border overflow-hidden shadow-lg relative">
        <div className="overflow-x-auto w-full max-w-full">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            {/* Sticky Table Header */}
            <thead className={`text-slate-400 uppercase tracking-widest text-[9px] font-bold border-b border-slate-200/10 sticky top-0 z-10 backdrop-blur-md
              ${theme === 'light' ? 'bg-slate-100/70' : 'bg-slate-900/60'}`}>
              <tr>
                <th className="py-4.5 px-6">Registration No</th>
                <th className="py-4.5 px-6">Roll No</th>
                <th className="py-4.5 px-6">Student Name</th>
                <th className="py-4.5 px-6">Branch</th>
                <th className="py-4.5 px-6">Phone No</th>
                <th className="py-4.5 px-6">Course</th>
                <th className="py-4.5 px-6">Session</th>
                <th className="py-4.5 px-6 text-center">Semester</th>
                <th className="py-4.5 px-6 text-center">AI Rating</th>
                <th className="py-4.5 px-6 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200/10 text-xs">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <RefreshCw className="h-6 w-6 text-indigo-500 animate-spin" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                          Syncing HOD Class Registry...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : students.length > 0 ? (
                  students.map((student, idx) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      key={student.registrationNo}
                      className="hover:bg-slate-500/5 transition-colors duration-200 group"
                    >
                      <td className="py-4.5 px-6 font-bold text-slate-400">{student.registrationNo}</td>
                      <td className="py-4.5 px-6 font-bold text-indigo-400">{student.rollNo}</td>
                      <td className="py-4.5 px-6">
                        <div className="flex items-center gap-2.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={student.avatar}
                            alt="avatar"
                            className="h-7 w-7 rounded-full object-cover border border-indigo-500/30"
                          />
                          <span className="font-extrabold text-slate-800 dark:text-slate-200">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-4.5 px-6 font-semibold">{student.branch}</td>
                      <td className="py-4.5 px-6 font-semibold text-slate-400">{student.phone}</td>
                      <td className="py-4.5 px-6 font-bold uppercase tracking-wider">{student.course}</td>
                      <td className="py-4.5 px-6 font-semibold text-slate-400">{student.session}</td>
                      <td className="py-4.5 px-6 text-center font-bold">{student.semester}</td>
                      <td className="py-4.5 px-6 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider inline-block ${getStatusBadge(student.ai_rating)}`}>
                          {student.ai_rating}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 text-center">
                        <button
                          onClick={() => handleOpenModal(student)}
                          className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer
                            ${theme === 'light'
                              ? 'bg-white border-slate-200 hover:bg-indigo-50 hover:text-indigo-600'
                              : 'bg-slate-900 border-slate-800 hover:bg-indigo-950/40 hover:text-indigo-400'}`}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="py-20 text-center space-y-2">
                      <div className="flex justify-center text-slate-400">
                        <XCircle className="h-10 w-10 text-slate-500" />
                      </div>
                      <p className="text-sm font-bold text-slate-400">No student records found in your department.</p>
                      <button
                        onClick={handleClearFilters}
                        className="text-xs text-indigo-500 hover:text-indigo-400 font-bold underline cursor-pointer"
                      >
                        Reset filters
                      </button>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination Panel */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              Showing page {page} of {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
                className={`p-1.5 rounded-lg border transition-all duration-200 disabled:opacity-40 cursor-pointer
                  ${theme === 'light' ? 'bg-white border-slate-200 hover:bg-slate-50' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className={`p-1.5 rounded-lg border transition-all duration-200 disabled:opacity-40 cursor-pointer
                  ${theme === 'light' ? 'bg-white border-slate-200 hover:bg-slate-50' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details drawer modal popup */}
      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}
