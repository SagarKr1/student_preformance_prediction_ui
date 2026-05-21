import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Email, password and role are required' },
        { status: 400 }
      );
    }

    // Admin login validation
    if (role === 'admin' && email === 'admin@college.in' && password === 'admin123') {
      return NextResponse.json({
        success: true,
        user: {
          name: 'Principal Administrator',
          email: 'admin@college.in',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120',
          branch: 'All Branches'
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin-token'
      });
    }

    // Teacher login validation
    if (role === 'teacher' && email === 'teacher@college.in' && password === 'teacher123') {
      return NextResponse.json({
        success: true,
        user: {
          name: 'Dr. Ramesh Kumar',
          email: 'teacher@college.in',
          role: 'teacher',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
          branch: 'Computer Science'
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.teacher-token'
      });
    }

    return NextResponse.json(
      { error: 'Invalid credentials or role selection' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
