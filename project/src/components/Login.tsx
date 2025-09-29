import React, { useState } from 'react';
import { GraduationCap, User, Lock, LogIn, BookOpen } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { User as UserType } from '../types';

interface LoginProps {
  onLogin: (user: UserType) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'faculty' | 'student'>('faculty');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => 
      u.username === username && u.role === selectedRole
    );
    
    if (!user) {
      setError('Invalid username or check id');
      setIsLoading(false);
      return;
    }

    // For demo purposes, accept any password
    if (!password) {
      setError('Please enter password');
      setIsLoading(false);
      return;
    }

    onLogin(user);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <GraduationCap className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">College Portal </h1>
          <p className="text-blue-100"> RK NAGAR GOVERNMENT Attendance Management System</p>
        </div>

        {/* Role Selection */}
        <div className="px-8 py-6">
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setSelectedRole('faculty')}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                selectedRole === 'faculty'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Faculty
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('student')}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                selectedRole === 'student'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Student
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>
          {/* Demo Credentials */}
        <div className="bg-gray-50 px-8 py-6 border-t">
          <h3 className="font-medium text-gray-900 mb-3">LOGIN PAGE ID</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="bg-white p-3 rounded border">
              <p><strong>Faclty:</strong> LAVANAYA MAM</p>
              <p><strong>Password:</strong> 123456</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p><strong>Student:</strong> HARISH</p>
              <p><strong>Password:</strong> 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
