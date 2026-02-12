import React from 'react';
import Layout from '../shared/Layout';
import { BookOpen, CheckCircle2, Play, Clock } from 'lucide-react';

const Learning = () => {
  const courses = [
    { id: 1, title: 'IT Fundamentals', progress: 75, modules: 12, completed: 9, duration: '6 hours' },
    { id: 2, title: 'Customer Service Excellence', progress: 100, modules: 8, completed: 8, duration: '4 hours' },
    { id: 3, title: 'Resume Building Workshop', progress: 50, modules: 5, completed: 3, duration: '2 hours' },
  ];
  
  return (
    <Layout userType="user" userName="Marcus Johnson" userEmail="marcus.email.com">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning</h1>
            <p className="text-gray-600">Continue your education and skill development</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Browse Courses
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span>{course.modules} modules</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{course.completed} of {course.modules} completed</span>
                  <span className="text-sm font-semibold text-emerald-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
              
              {course.progress === 100 ? (
                <button className="w-full bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </button>
              ) : (
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Continue Learning
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Learning;
