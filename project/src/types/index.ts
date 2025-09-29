export interface User {
  id: string;
  username: string;
  email: string;
  role: 'faculty' | 'student' | 'admin';
  name: string;
  department?: string;
  employeeId?: string;
  studentId?: string;
  semester?: number;
  course?: string;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  course: string;
  semester: number;
  department: string;
  rollNumber: string;
  phoneNumber: string;
  dateOfAdmission: string;
  isActive: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
  facultyId: string;
  facultyName: string;
  period: number;
  remarks?: string;
  timestamp: string;
}

export interface AttendanceStats {
  studentId: string;
  studentName: string;
  totalClasses: number;
  presentClasses: number;
  absentClasses: number;
  lateClasses: number;
  percentage: number;
  subject: string;
  month: string;
  year: number;
}

export interface Circular {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'administrative' | 'events' | 'urgent' | 'general';
  priority: 'high' | 'medium' | 'low';
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
  attachments?: string[];
  targetAudience: 'all' | 'faculty' | 'students' | 'specific';
  departments?: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  department: string;
  semester: number;
  credits: number;
  facultyId: string;
  facultyName: string;
}

export interface AttendanceSession {
  id: string;
  date: string;
  subject: string;
  facultyId: string;
  period: number;
  students: {
    studentId: string;
    status: 'present' | 'absent' | 'late';
  }[];
  isCompleted: boolean;
  createdAt: string;
}