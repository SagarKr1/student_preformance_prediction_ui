import { NextResponse } from 'next/server';
import { mockStudents, mockEvents, mockNotifications, mockActivities, BRANCHES } from '@/data/mockData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const branchFilter = searchParams.get('branch') || '';
    const sessionFilter = searchParams.get('session') || '';

    // Filter students
    let filteredStudents = [...mockStudents];
    if (branchFilter && branchFilter !== 'All Branches') {
      filteredStudents = filteredStudents.filter(s => s.branch.toLowerCase() === branchFilter.toLowerCase());
    }
    if (sessionFilter) {
      filteredStudents = filteredStudents.filter(s => s.session === sessionFilter);
    }

    // Dynamic stats
    const totalStudents = filteredStudents.length;
    const teachersCount = branchFilter ? 12 : 54; // Mock teachers count: 12 per branch on avg, 54 total
    const branchesCount = BRANCHES.length;
    const coursesCount = branchFilter ? 4 : 16;   // Mock courses count

    // Average GPA
    const averageGpa = parseFloat(
      (filteredStudents.reduce((acc, curr) => acc + curr.previousGpa, 0) / (totalStudents || 1)).toFixed(2)
    );

    // Average Attendance
    const averageAttendance = parseFloat(
      (filteredStudents.reduce((acc, curr) => acc + curr.attendance, 0) / (totalStudents || 1)).toFixed(1)
    );

    // Risk Levels count
    const riskCounts = { LOW: 0, MEDIUM: 0, HIGH: 0 };
    filteredStudents.forEach(s => {
      riskCounts[s.riskLevel]++;
    });

    // Branch performance analysis (for Chart)
    const branchPerformance = BRANCHES.map(branchName => {
      const bStudents = mockStudents.filter(s => s.branch === branchName);
      const avgGpa = parseFloat(
        (bStudents.reduce((acc, curr) => acc + curr.previousGpa, 0) / (bStudents.length || 1)).toFixed(2)
      );
      const avgAtt = parseFloat(
        (bStudents.reduce((acc, curr) => acc + curr.attendance, 0) / (bStudents.length || 1)).toFixed(1)
      );
      return {
        branch: branchName,
        gpa: avgGpa || 7.0,
        attendance: avgAtt || 75.0,
        studentsCount: bStudents.length
      };
    });

    // Semester performance analysis (for Chart)
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
    const semesterPerformance = semesters.map(sem => {
      const semStudents = filteredStudents.filter(s => s.semester === sem);
      const avgGpa = semStudents.reduce((acc, curr) => acc + curr.previousGpa, 0) / (semStudents.length || 1);
      return {
        semester: `Sem ${sem}`,
        gpa: parseFloat((avgGpa || 7.2).toFixed(2)),
        retentionRate: semStudents.length ? Math.min(100, Math.floor(90 + (avgGpa * 1.1))) : 95
      };
    });

    // Session-wise performance analysis (for Chart)
    const sessions = ['2022-26', '2023-27', '2024-28', '2025-29'];
    const sessionPerformance = sessions.map(sess => {
      const sessStudents = mockStudents.filter(s => s.session === sess);
      const avgGpa = sessStudents.reduce((acc, curr) => acc + curr.previousGpa, 0) / (sessStudents.length || 1);
      return {
        session: sess,
        gpa: parseFloat((avgGpa || 7.5).toFixed(2)),
        studentCount: sessStudents.length
      };
    });

    // Student Analytics Graph (General passing rates)
    const studentPerformanceStatuses = [
      { name: 'Excellent', count: filteredStudents.filter(s => s.performanceStatus === 'EXCELLENT').length },
      { name: 'Pass', count: filteredStudents.filter(s => s.performanceStatus === 'PASS').length },
      { name: 'At Risk / Fail', count: filteredStudents.filter(s => s.performanceStatus === 'FAIL').length },
    ];

    return NextResponse.json({
      success: true,
      metrics: {
        totalStudents,
        teachersCount,
        branchesCount,
        coursesCount,
        averageGpa,
        averageAttendance,
        riskLevels: riskCounts
      },
      charts: {
        branchPerformance,
        semesterPerformance,
        sessionPerformance,
        studentPerformanceStatuses
      },
      events: mockEvents.slice(0, 5),
      notifications: mockNotifications.slice(0, 5),
      activities: mockActivities.slice(0, 5)
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
