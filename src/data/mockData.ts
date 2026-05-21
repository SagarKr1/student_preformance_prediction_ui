export interface Student {
  registrationNo: string;
  rollNo: string;
  name: string;
  branch: string;
  phone: string;
  course: string;
  session: string;
  semester: number;
  attendance: number; // percentage
  studyHours: number; // hours per day
  internalMarks: number; // out of 50
  assignmentScore: number; // out of 100
  practicalMarks: number; // out of 50
  backlogCount: number;
  previousGpa: number;
  performanceStatus: 'EXCELLENT' | 'PASS' | 'FAIL';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  email: string;
  gender: string;
  avatar: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'academic' | 'sports' | 'exam' | 'placement' | 'holiday';
  location: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: 'alert' | 'info' | 'success';
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'predict' | 'update' | 'add' | 'system';
}

// Branch definitions
export const BRANCHES = ['Computer Science', 'Electronics & Comm', 'Mechanical', 'Electrical', 'Civil'];
export const SESSIONS = ['2022-26', '2023-27', '2024-28', '2025-29'];
export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

// Mock students
export const mockStudents: Student[] = [
  {
    registrationNo: "ECI2022CS089",
    rollNo: "CS-2022-045",
    name: "Arjun Sharma",
    branch: "Computer Science",
    phone: "+91 98765 43210",
    course: "B.Tech",
    session: "2022-26",
    semester: 6,
    attendance: 88,
    studyHours: 6.5,
    internalMarks: 44,
    assignmentScore: 89,
    practicalMarks: 46,
    backlogCount: 0,
    previousGpa: 8.7,
    performanceStatus: "EXCELLENT",
    riskLevel: "LOW",
    email: "arjun.sharma@eci.edu.in",
    gender: "Male",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120"
  },
  {
    registrationNo: "ECI2022CS012",
    rollNo: "CS-2022-012",
    name: "Priya Patel",
    branch: "Computer Science",
    phone: "+91 97654 32109",
    course: "B.Tech",
    session: "2022-26",
    semester: 6,
    attendance: 92,
    studyHours: 7.0,
    internalMarks: 47,
    assignmentScore: 94,
    practicalMarks: 48,
    backlogCount: 0,
    previousGpa: 9.2,
    performanceStatus: "EXCELLENT",
    riskLevel: "LOW",
    email: "priya.patel@eci.edu.in",
    gender: "Female",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
  },
  {
    registrationNo: "ECI2022CS104",
    rollNo: "CS-2022-089",
    name: "Rohan Verma",
    branch: "Computer Science",
    phone: "+91 96543 21098",
    course: "B.Tech",
    session: "2022-26",
    semester: 6,
    attendance: 72,
    studyHours: 3.5,
    internalMarks: 28,
    assignmentScore: 65,
    practicalMarks: 32,
    backlogCount: 2,
    previousGpa: 6.1,
    performanceStatus: "FAIL",
    riskLevel: "HIGH",
    email: "rohan.verma@eci.edu.in",
    gender: "Male",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    registrationNo: "ECI2022CS056",
    rollNo: "CS-2022-034",
    name: "Ananya Iyer",
    branch: "Computer Science",
    phone: "+91 95432 10987",
    course: "B.Tech",
    session: "2022-26",
    semester: 6,
    attendance: 81,
    studyHours: 5.0,
    internalMarks: 38,
    assignmentScore: 78,
    practicalMarks: 40,
    backlogCount: 0,
    previousGpa: 7.6,
    performanceStatus: "PASS",
    riskLevel: "LOW",
    email: "ananya.iyer@eci.edu.in",
    gender: "Female",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120"
  },
  {
    registrationNo: "ECI2023EC021",
    rollNo: "EC-2023-015",
    name: "Kabir Mehta",
    branch: "Electronics & Comm",
    phone: "+91 94321 09876",
    course: "B.Tech",
    session: "2023-27",
    semester: 4,
    attendance: 65,
    studyHours: 2.0,
    internalMarks: 22,
    assignmentScore: 50,
    practicalMarks: 28,
    backlogCount: 3,
    previousGpa: 5.4,
    performanceStatus: "FAIL",
    riskLevel: "HIGH",
    email: "kabir.mehta@eci.edu.in",
    gender: "Male",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
  },
  {
    registrationNo: "ECI2023EC078",
    rollNo: "EC-2023-049",
    name: "Sneha Reddy",
    branch: "Electronics & Comm",
    phone: "+91 93210 98765",
    course: "B.Tech",
    session: "2023-27",
    semester: 4,
    attendance: 84,
    studyHours: 5.8,
    internalMarks: 41,
    assignmentScore: 82,
    practicalMarks: 42,
    backlogCount: 0,
    previousGpa: 8.1,
    performanceStatus: "EXCELLENT",
    riskLevel: "LOW",
    email: "sneha.reddy@eci.edu.in",
    gender: "Female",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
  },
  {
    registrationNo: "ECI2022ME044",
    rollNo: "ME-2022-031",
    name: "Vikram Singh",
    branch: "Mechanical",
    phone: "+91 92109 87654",
    course: "B.Tech",
    session: "2022-26",
    semester: 6,
    attendance: 79,
    studyHours: 4.2,
    internalMarks: 32,
    assignmentScore: 71,
    practicalMarks: 36,
    backlogCount: 1,
    previousGpa: 6.8,
    performanceStatus: "PASS",
    riskLevel: "MEDIUM",
    email: "vikram.singh@eci.edu.in",
    gender: "Male",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120"
  },
  {
    registrationNo: "ECI2022ME009",
    rollNo: "ME-2022-005",
    name: "Aditya Roy",
    branch: "Mechanical",
    phone: "+91 91098 76543",
    course: "B.Tech",
    session: "2022-26",
    semester: 6,
    attendance: 86,
    studyHours: 6.0,
    internalMarks: 42,
    assignmentScore: 85,
    practicalMarks: 44,
    backlogCount: 0,
    previousGpa: 8.4,
    performanceStatus: "EXCELLENT",
    riskLevel: "LOW",
    email: "aditya.roy@eci.edu.in",
    gender: "Male",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120"
  },
  {
    registrationNo: "ECI2023EE015",
    rollNo: "EE-2023-009",
    name: "Diya Malhotra",
    branch: "Electrical",
    phone: "+91 90987 65432",
    course: "B.Tech",
    session: "2023-27",
    semester: 4,
    attendance: 75,
    studyHours: 4.0,
    internalMarks: 30,
    assignmentScore: 68,
    practicalMarks: 34,
    backlogCount: 1,
    previousGpa: 6.5,
    performanceStatus: "PASS",
    riskLevel: "MEDIUM",
    email: "diya.malhotra@eci.edu.in",
    gender: "Female",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=120"
  },
  {
    registrationNo: "ECI2024CE053",
    rollNo: "CE-2024-041",
    name: "Rishi Das",
    branch: "Civil",
    phone: "+91 89876 54321",
    course: "B.Tech",
    session: "2024-28",
    semester: 2,
    attendance: 58,
    studyHours: 1.5,
    internalMarks: 18,
    assignmentScore: 42,
    practicalMarks: 25,
    backlogCount: 4,
    previousGpa: 4.8,
    performanceStatus: "FAIL",
    riskLevel: "HIGH",
    email: "rishi.das@eci.edu.in",
    gender: "Male",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=120"
  }
];

// Mock Upcoming Events
export const mockEvents: Event[] = [
  {
    id: "evt-1",
    title: "National Smart India Hackathon 2026",
    date: "2026-05-28",
    time: "09:00 AM",
    category: "academic",
    location: "Main Seminar Hall"
  },
  {
    id: "evt-2",
    title: "End Semester Practical Examinations",
    date: "2026-06-05",
    time: "10:00 AM",
    category: "exam",
    location: "Respective Labs"
  },
  {
    id: "evt-3",
    title: "Campus Placement Drive: Google & Microsoft",
    date: "2026-06-12",
    time: "08:30 AM",
    category: "placement",
    location: "Auditorium"
  },
  {
    id: "evt-4",
    title: "Inter-Branch Volleyball Championship",
    date: "2026-06-18",
    time: "04:00 PM",
    category: "sports",
    location: "College Grounds"
  },
  {
    id: "evt-5",
    title: "Summer Vacation Commencement",
    date: "2026-06-30",
    time: "05:00 PM",
    category: "holiday",
    location: "All Campus"
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "Urgent: Remedial Classes Schedule",
    description: "Special remedial coaching classes for students with low attendance or backlogs are scheduled starting Monday.",
    time: "2 hours ago",
    unread: true,
    type: "alert"
  },
  {
    id: "notif-2",
    title: "Practical Examination Portal Open",
    description: "The internal marks entry portal for B.Tech Semester 4 and 6 is now live. Please complete entries by May 25.",
    time: "5 hours ago",
    unread: true,
    type: "info"
  },
  {
    id: "notif-3",
    title: "AI Predictor Algorithm Updated",
    description: "The core machine learning heuristic model for predicting student performance risk has been upgraded to v2.4.",
    time: "1 day ago",
    unread: false,
    type: "success"
  },
  {
    id: "notif-4",
    title: "Branch Wise Performance Reports Released",
    description: "Semester 5 analysis shows the Computer Science department taking the lead in average GPA (8.2).",
    time: "2 days ago",
    unread: false,
    type: "info"
  },
  {
    id: "notif-5",
    title: "Hostel Fee Submission Deadline Extended",
    description: "The last date for submitting the hostel mess fee has been extended to June 2, 2026, without late fine.",
    time: "3 days ago",
    unread: false,
    type: "info"
  }
];

// Recent Activities
export const mockActivities: Activity[] = [
  {
    id: "act-1",
    user: "Dr. Ramesh (HOD CS)",
    action: "ran AI performance prediction for",
    target: "Rohan Verma (CS-2022-089)",
    time: "10 mins ago",
    type: "predict"
  },
  {
    id: "act-2",
    user: "Admin (Academic)",
    action: "updated basic profile of",
    target: "Arjun Sharma",
    time: "45 mins ago",
    type: "update"
  },
  {
    id: "act-3",
    user: "Prof. Priya Sen",
    action: "added internal practical marks of",
    target: "B.Tech Sem 4 (Electronics)",
    time: "2 hours ago",
    type: "add"
  },
  {
    id: "act-4",
    user: "System Daemon",
    action: "synced database metrics for",
    target: "10 branches",
    time: "6 hours ago",
    type: "system"
  },
  {
    id: "act-5",
    user: "Dr. Ramesh (HOD CS)",
    action: "predicted success rating for",
    target: "Ananya Iyer (CS-2022-034)",
    time: "1 day ago",
    type: "predict"
  }
];
