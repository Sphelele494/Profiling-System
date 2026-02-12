import React from 'react';
import Layout from '../shared/Layout';
import { Calendar, Clock } from 'lucide-react';

const Timeline = () => {
  const events = [
    { id: 1, date: 'Today', time: '2:30 PM', title: 'Interview Scheduled', description: 'TechStart Inc. - IT Support Role', status: 'upcoming' },
    { id: 2, date: 'Yesterday', time: '10:00 AM', title: 'Application Submitted', description: 'Data Entry Position at DataCore', status: 'completed' },
    { id: 3, date: 'Feb 10', time: '3:00 PM', title: 'Mentor Meeting', description: 'Monthly check-in with John Smith', status: 'completed' },
  ];
  
  return (
    <Layout userType="user" userName="Marcus Johnson" userEmail="marcus.email.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Timeline</h1>
          <p className="text-gray-600">Track your journey and upcoming events</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={event.id} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${event.status === 'upcoming' ? 'bg-emerald-600' : 'bg-blue-600'}`} />
                  {index < events.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm font-medium text-gray-900">{event.date}</span>
                    <span className="text-sm text-gray-500">{event.time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Timeline;
