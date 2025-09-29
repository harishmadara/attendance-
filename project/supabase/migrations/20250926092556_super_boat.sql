/*
  # College Attendance Management System Database Schema

  1. New Tables
    - `profiles` - Extended user profiles with role information
    - `subjects` - Course/subject management
    - `classes` - Class sessions and schedules
    - `attendance_records` - Individual attendance entries
    - `circulars` - College announcements and notices
    - `monthly_reports` - Cached monthly attendance reports

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Separate access for faculty and students

  3. Features
    - Role-based authentication (faculty/student)
    - Comprehensive attendance tracking
    - Circular management with categories
    - Monthly report generation and caching
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('faculty', 'student');
CREATE TYPE circular_category AS ENUM ('academic', 'administrative', 'events', 'general');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role user_role NOT NULL,
  department text,
  student_id text,
  employee_id text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  department text NOT NULL,
  credits integer DEFAULT 3,
  faculty_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  faculty_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  class_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  room text,
  total_students integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Attendance records table
CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status attendance_status NOT NULL DEFAULT 'absent',
  marked_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  marked_at timestamptz DEFAULT now(),
  notes text
);

-- Circulars table
CREATE TABLE IF NOT EXISTS circulars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category circular_category NOT NULL DEFAULT 'general',
  published_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  published_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  priority integer DEFAULT 1,
  attachment_url text,
  target_audience text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Monthly reports table (for caching)
CREATE TABLE IF NOT EXISTS monthly_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  month integer NOT NULL,
  year integer NOT NULL,
  total_classes integer DEFAULT 0,
  present_count integer DEFAULT 0,
  absent_count integer DEFAULT 0,
  late_count integer DEFAULT 0,
  attendance_percentage decimal(5,2) DEFAULT 0,
  report_data jsonb DEFAULT '{}',
  generated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, month, year)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE circulars ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Faculty can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'faculty'
    )
  );

-- Subjects policies
CREATE POLICY "Everyone can view subjects"
  ON subjects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Faculty can manage subjects"
  ON subjects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'faculty'
    )
  );

-- Classes policies
CREATE POLICY "Everyone can view classes"
  ON classes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Faculty can manage classes"
  ON classes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'faculty'
    )
  );

-- Attendance records policies
CREATE POLICY "Faculty can manage attendance"
  ON attendance_records FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'faculty'
    )
  );

CREATE POLICY "Students can view own attendance"
  ON attendance_records FOR SELECT
  TO authenticated
  USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'faculty'
    )
  );

-- Circulars policies
CREATE POLICY "Everyone can view active circulars"
  ON circulars FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Faculty can manage circulars"
  ON circulars FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'faculty'
    )
  );

-- Monthly reports policies
CREATE POLICY "Students can view own reports"
  ON monthly_reports FOR SELECT
  TO authenticated
  USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'faculty'
    )
  );

CREATE POLICY "Faculty can manage reports"
  ON monthly_reports FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'faculty'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_classes_date ON classes(class_date);
CREATE INDEX IF NOT EXISTS idx_attendance_class_student ON attendance_records(class_id, student_id);
CREATE INDEX IF NOT EXISTS idx_circulars_published_at ON circulars(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_monthly_reports_student_date ON monthly_reports(student_id, year, month);

-- Insert sample data for development
INSERT INTO profiles (id, email, full_name, role, department, employee_id) VALUES
  ('00000000-0000-0000-0000-000000000001', 'faculty@college.edu', 'Dr. John Smith', 'faculty', 'Computer Science', 'FAC001'),
  ('00000000-0000-0000-0000-000000000002', 'student@college.edu', 'Alice Johnson', 'student', 'Computer Science', '2023001')
ON CONFLICT (id) DO NOTHING;

INSERT INTO subjects (name, code, department, faculty_id) VALUES
  ('Data Structures', 'CS101', 'Computer Science', '00000000-0000-0000-0000-000000000001'),
  ('Database Systems', 'CS201', 'Computer Science', '00000000-0000-0000-0000-000000000001'),
  ('Web Development', 'CS301', 'Computer Science', '00000000-0000-0000-0000-000000000001')
ON CONFLICT (code) DO NOTHING;