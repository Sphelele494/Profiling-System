import React from 'react';
import { Star, User } from 'lucide-react';

const RecentApplications = ({ applications }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" data-testid="recent-applications">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Recent Applications</h3>
          <p className="text-sm text-gray-600">Latest candidates who applied to your jobs</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1" data-testid="view-all-applications">
          View all
          <span>→</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-gray-900 mb-1">{app.name}</h4>
              <p className="text-sm text-gray-600 mb-1">Applied for: {app.position}</p>
              <p className="text-xs text-gray-500">{app.timeAgo}</p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-gray-900">{app.credibilityScore}</span>
              </div>
              <span className="text-xs text-gray-600">{app.referrals} referrals</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentApplications;
