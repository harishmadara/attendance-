import { User, Student, AttendanceRecord, Circular, Subject } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'harish',
    email: 'sharma@college.edu',
    role: 'faculty',
    name: 'Dr. harish',
    department: 'Computer Science',
    employeeId: 'FAC001'
  },
  {
    id: '2',
    username: 'admin',
    email: 'admin@college.edu',
    role: 'admin',
    name: 'Admin User',
    department: 'Administration',
    employeeId: 'ADM001'
  },
  {
    id: '3',
    username: 'student001',
    email: 'john@student.college.edu',
    role: 'student',
    name: 'John Doe',
    studentId: 'CS2024001',
    semester: 3,
    course: 'B.Tech Computer Science'
  }
];

export const mockStudents: Student[] = [
  {
    id: '1',
    studentId: 'CS2024001',
    name: 'udhaya',
    email: 'john@student.college.edu',
    course: 'B.Tech Computer Science',
    semester: 3,
    department: 'Computer Science',
    rollNumber: '001',
    phoneNumber: '+91 9876543210',
    dateOfAdmission: '2022-08-15',
    isActive: true
  },
  {
    id: '2',
    studentId: 'CS2024002',
    name: 'Bala',
    email: 'jane@student.college.edu',
    course: 'B.Tech Computer Science',
    semester: 3,
    department: 'Computer Science',
    rollNumber: '002',
    phoneNumber: '+91 9876543211',
    dateOfAdmission: '2022-08-15',
    isActive: true
  },
  {
    id: '3',
    studentId: 'CS2024003',
    name: 'priyan',
    email: 'mike@student.college.edu',
    course: 'B.Tech Computer Science',
    semester: 3,
    department: 'Computer Science',
    rollNumber: '003',
    phoneNumber: '+91 9876543212',
    dateOfAdmission: '2022-08-15',
    isActive: true
  },
  {
    id: '4',
    studentId: 'CS2024004',
    name: 'harish',
    email: 'sarah@student.college.edu',
    course: 'B.Tech Computer Science',
    semester: 3,
    department: 'Computer Science',
    rollNumber: '004',
    phoneNumber: '+91 9876543213',
    dateOfAdmission: '2022-08-15',
    isActive: true
  }
];

export const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'computer science',
    code: 'CS301',
    department: 'Computer Science',
    semester: 3,
    credits: 4,
    facultyId: '1',
    facultyName: 'lavanaya mam'
  },
  {
    id: '2',
    name: 'BA tamil',
    code: 'CS302',
    department: 'Computer Science',
    semester: 3,
    credits: 3,
    facultyId: '1',
    facultyName: 'Dr. Rajesh Sharma'
  },
  {
    id: '3',
    name: 'Computer Networks',
    code: 'CS303',
    department: 'Computer Science',
    semester: 3,
    credits: 3,
    facultyId: '1',
    facultyName: 'Dr. Rajesh Sharma'
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentId: 'CS2024001',
    studentName: 'John Doe',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    subject: 'Data Structures and Algorithms',
    facultyId: '1',
    facultyName: 'Dr. Rajesh Sharma',
    period: 1,
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    studentId: 'CS2024002',
    studentName: 'Jane Smith',
    date: new Date().toISOString().split('T')[0],
    status: 'late',
    subject: 'Data Structures and Algorithms',
    facultyId: '1',
    facultyName: 'Dr. Rajesh Sharma',
    period: 1,
    timestamp: new Date().toISOString()
  },
  {
    id: '3',
    studentId: 'CS2024003',
    studentName: 'Mike Johnson',
    date: new Date().toISOString().split('T')[0],
    status: 'absent',
    subject: 'Data Structures and Algorithms',
    facultyId: '1',
    facultyName: 'Dr. Rajesh Sharma',
    period: 1,
    timestamp: new Date().toISOString()
  }
];

export const mockCirculars: Circular[] = [
  {
    id: '1',
    title: 'Mid-Semester Examination Schedule',
    content: 'The mid-semester examinations for all courses will be conducted from March 15-25, 2024. Students are advised to check the detailed timetable on the college website.',
    category: 'academic',
    priority: 'high',
    createdBy: 'Dr. Rajesh Sharma',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    targetAudience: 'all',
    departments: ['Computer Science', 'Electronics', 'Mechanical']
  },
  {
    id: '2',
    title: 'Library Renovation Notice',
    content: 'The college library will be closed for renovation from March 1-10, 2024. Students can access digital resources through the online portal.',
    category: 'administrative',
    priority: 'medium',
    createdBy: 'Admin User',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    targetAudience: 'all'
  },
  {
    id: '3',
    title: 'Technical Fest 2024 - Call for Participation',
    content: 'The annual technical fest "TechnoVision 2024" will be held on April 15-17, 2024. Students are encouraged to participate in various technical competitions and workshops.',
    category: 'events',
    priority: 'medium',
    createdBy: 'Dr. Rajesh Sharma',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    targetAudience: 'students'
  }
];