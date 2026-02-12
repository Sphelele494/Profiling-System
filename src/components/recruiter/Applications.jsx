import React from 'react';
import Layout from '../shared/Layout';
import { Star, User, MapPin, CheckCircle2, X } from 'lucide-react';

const Applications = () => {
  const applications = [
    { id: 1, name: 'Marcus Johnson', position: 'IT Support Specialist', score: 78, referrals: 4, location: 'Newark, NJ', appliedDate: '2 hours ago', status: 'new' },
    { id: 2, name: 'David Williams', position: 'IT Support Specialist', score: 72, referrals: 3, location: 'New York, NY', appliedDate: '5 hours ago', status: 'reviewing' },
    { id: 3, name: 'James Mitchell', position: 'Data Entry Clerk', score: 85, referrals: 5, location: 'Remote', appliedDate: '1 day ago', status: 'reviewed' },
    { id: 4, name: 'Sarah Parker', position: 'Warehouse Associate', score: 79, referrals: 4, location: 'Newark, NJ', appliedDate: '2 days ago', status: 'new' },
  ];
  
  const statusColors = {
    new: 'bg-blue-50 text-blue-700',
    reviewing: 'bg-yellow-50 text-yellow-700',
    reviewed: 'bg-emerald-50 text-emerald-700'
  };
  
  return (
    <Layout userType="recruiter" userName="Sarah Chen" userEmail="sarah.techcoop.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications</h1>
          <p className="text-gray-600">Review and manage candidate applications</p>
        </div>
        
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{app.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">Applied for: {app.position}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{app.location}</span>
                        <span>•</span>
                        <span>{app.appliedDate}</span>
                      </div>
                    </div>
                    
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[app.status]}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-gray-900">{app.score} Score</span>
                    </div>
                    <span className="text-sm text-gray-600">{app.referrals} verified referrals</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Profile
                    </button>
                    <button className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Applications;
