import React from 'react';
import Layout from '../shared/Layout';
import { GraduationCap, Mail, Calendar } from 'lucide-react';

const Mentors = () => {
  const mentors = [
    { id: 1, name: 'John Smith', specialty: 'IT & Technology', experience: '15 years', meetings: 8 },
    { id: 2, name: 'Lisa Anderson', specialty: 'Career Development', experience: '10 years', meetings: 5 },
    { id: 3, name: 'Robert Williams', specialty: 'Construction & Trades', experience: '20 years', meetings: 3 },
  ];
  
  return (
    <Layout userType="user" userName="Marcus Johnson" userEmail="marcus.email.com">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentors</h1>
            <p className="text-gray-600">Connect with mentors who can guide your journey</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Find a Mentor
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                  <p className="text-sm text-gray-600">{mentor.specialty}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Experience:</span> {mentor.experience}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Meetings:</span> {mentor.meetings} sessions
                </p>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Mentors;
