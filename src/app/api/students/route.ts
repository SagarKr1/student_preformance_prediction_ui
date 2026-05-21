import { NextResponse } from 'next/server';
import { mockStudents, Student } from '@/data/mockData';

// Let's create an in-memory mutable copy of the mock data to simulate real CRUD operations
let studentsList: Student[] = [...mockStudents];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const branch = searchParams.get('branch') || '';
    const session = searchParams.get('session') || '';
    const semester = searchParams.get('semester') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filtered = [...studentsList];

    // Branch filter
    if (branch && branch !== 'All Branches') {
      filtered = filtered.filter(s => s.branch.toLowerCase() === branch.toLowerCase());
    }

    // Session filter
    if (session && session !== 'All Sessions') {
      filtered = filtered.filter(s => s.session === session);
    }

    // Semester filter
    if (semester && semester !== 'All Semesters') {
      filtered = filtered.filter(s => s.semester === parseInt(semester));
    }

    // Search query filter (search by name, registrationNo, rollNo, phone, course)
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.registrationNo.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q) ||
          s.phone.includes(q) ||
          s.course.toLowerCase().includes(q)
      );
    }

    // Pagination
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;
    const paginatedStudents = filtered.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      students: paginatedStudents,
      pagination: {
        totalStudents: totalCount,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newStudent: Student = await request.json();

    if (!newStudent.registrationNo || !newStudent.rollNo || !newStudent.name) {
      return NextResponse.json(
        { error: 'Registration No, Roll No, and Name are required fields.' },
        { status: 400 }
      );
    }

    // Calculate prediction based on academic records
    const attendance = newStudent.attendance || 75;
    const gpa = newStudent.previousGpa || 7.0;
    const backlogs = newStudent.backlogCount || 0;

    let performanceStatus: 'FAIL' | 'PASS' | 'EXCELLENT' = 'PASS';
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';

    if (attendance < 75 || backlogs > 2 || gpa < 5.5) {
      performanceStatus = 'FAIL';
      riskLevel = 'HIGH';
    } else if (attendance >= 85 && gpa >= 8.0 && backlogs === 0) {
      performanceStatus = 'EXCELLENT';
      riskLevel = 'LOW';
    } else {
      performanceStatus = 'PASS';
      riskLevel = 'LOW';
    }

    const studentToInsert: Student = {
      ...newStudent,
      performanceStatus,
      riskLevel,
      avatar: newStudent.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'
    };

    studentsList.unshift(studentToInsert);

    return NextResponse.json({
      success: true,
      message: 'Student added successfully!',
      student: studentToInsert
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
