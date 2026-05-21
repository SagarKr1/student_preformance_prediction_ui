import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const {
      attendance_percentage,
      study_hours_per_day,
      internal_marks,
      assignment_score,
      practical_marks,
      backlog_count,
      previous_sem_gpa
    } = await request.json();

    // Validations
    if (
      attendance_percentage === undefined ||
      study_hours_per_day === undefined ||
      internal_marks === undefined ||
      assignment_score === undefined ||
      practical_marks === undefined ||
      backlog_count === undefined ||
      previous_sem_gpa === undefined
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const att = parseFloat(attendance_percentage);
    const hrs = parseFloat(study_hours_per_day);
    const internal = parseFloat(internal_marks);
    const assignment = parseFloat(assignment_score);
    const practical = parseFloat(practical_marks);
    const backlogs = parseInt(backlog_count);
    const gpa = parseFloat(previous_sem_gpa);

    // AI Prediction Model Simulation
    let prediction: 'FAIL' | 'PASS' | 'EXCELLENT' = 'PASS';
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';
    let confidence = 85.0; // Base confidence
    const suggestions: string[] = [];
    const recommendations: any[] = [];

    // Detailed scoring metrics
    const attendanceScore = att >= 85 ? 100 : att >= 75 ? 80 : att >= 60 ? 50 : 20;
    const academicScore = ((internal / 50) * 0.3 + (assignment / 100) * 0.4 + (practical / 50) * 0.3) * 100;
    const consistencyScore = Math.max(0, 100 - backlogs * 25);
    
    // GPA contribution
    const gpaScore = (gpa / 10) * 100;

    // AI logic engine
    if (att < 70 || backlogs >= 3 || gpa < 5.0 || internal < 20) {
      prediction = 'FAIL';
      riskLevel = 'HIGH';
      confidence = 88.0 + Math.random() * 8.5; // High certainty for fail
    } else if (att >= 85 && gpa >= 8.2 && backlogs === 0 && internal >= 40 && assignment >= 80) {
      prediction = 'EXCELLENT';
      riskLevel = 'LOW';
      confidence = 92.0 + Math.random() * 6.5; // High certainty for excellent
    } else {
      prediction = 'PASS';
      riskLevel = att >= 78 && backlogs <= 1 && gpa >= 6.5 ? 'LOW' : 'MEDIUM';
      confidence = 85.0 + Math.random() * 9.0;
    }

    // Dynamic suggestions based on variables
    if (att < 75) {
      suggestions.push('Critically low attendance! Attend all remaining lectures.');
      recommendations.push({
        title: 'Attendance Recovery Plan',
        description: 'Prioritize attending 100% of upcoming lectures. Reach out to course HOD to sign up for attendance remediation forms.',
        priority: 'HIGH'
      });
    } else if (att < 85) {
      suggestions.push('Increase class attendance above 85% to secure grace marks.');
      recommendations.push({
        title: 'Buffer Classes',
        description: 'Attend extra special lecture cycles over weekends to improve overall buffer levels.',
        priority: 'MEDIUM'
      });
    }

    if (hrs < 4.0) {
      suggestions.push('Increase study hours to at least 4.5 hours daily.');
      recommendations.push({
        title: 'Study Schedule Optimization',
        description: 'Set up focused study blocks in the early morning or evening. Aim for 25-minute Pomodoro sessions to avoid fatigue.',
        priority: 'HIGH'
      });
    }

    if (backlogs > 0) {
      suggestions.push(`Focus on clearing the ${backlogs} active backlog papers immediately.`);
      recommendations.push({
        title: 'Backlog Resolution Taskforce',
        description: 'Meet subject experts for tutoring in backlog subjects and review previous 5-year question papers.',
        priority: 'HIGH'
      });
    }

    if (internal < 30) {
      suggestions.push('Improve internal assessment marks through active classroom participation and quizzes.');
      recommendations.push({
        title: 'Internal Remedial Tests',
        description: 'Submit application for make-up quizzes and chapter assignments to improve internal ratings.',
        priority: 'MEDIUM'
      });
    }

    if (assignment < 70) {
      suggestions.push('Submit assignments strictly on time and adhere to formatting guidelines.');
      recommendations.push({
        title: 'Assignment Quality Check',
        description: 'Collaborate with teaching assistants to clarify doubts before final weekly uploads.',
        priority: 'MEDIUM'
      });
    }

    if (prediction === 'EXCELLENT') {
      suggestions.push('Maintain current work ethic and explore technical research projects.');
      recommendations.push({
        title: 'Research & Innovation Track',
        description: 'Join the campus AI/Robotics laboratory for specialized credit projects and internship placements.',
        priority: 'LOW'
      });
      recommendations.push({
        title: 'Peer Tutoring Mentorship',
        description: 'Volunteer as an academic mentor for junior B.Tech groups to solidify core logic.',
        priority: 'LOW'
      });
    } else if (prediction === 'PASS' && recommendations.length === 0) {
      suggestions.push('Consistency is key. Continue following the current schedule.');
      recommendations.push({
        title: 'GPA Boost Track',
        description: 'Target scoring over 45 marks in practical assessments to push overall average to EXCELLENT.',
        priority: 'MEDIUM'
      });
    }

    return NextResponse.json({
      success: true,
      prediction,
      confidence: parseFloat(confidence.toFixed(1)),
      riskLevel,
      suggestions,
      recommendationCards: recommendations,
      analysis: {
        attendanceScore,
        academicScore: parseFloat(academicScore.toFixed(1)),
        consistencyScore,
        gpaScore: parseFloat(gpaScore.toFixed(1))
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
