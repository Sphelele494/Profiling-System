import React from 'react';
import { CheckCircle2, Eye, Award, Clock } from 'lucide-react';

const iconMap = {
  'check-circle': CheckCircle2,
  'eye': Eye,
  'award': Award,
  'clock': Clock
};

const colorMap = {
  emerald: 'bg-emerald-50 text-emerald-600',
  blue: 'bg-blue-50 text-blue-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  orange: 'bg-orange-50 text-orange-600'
};

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" data-testid="recent-activity">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Recent Activity</h3>
          <p className="text-sm text-gray-600">Your latest updates and notifications</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium" data-testid="view-all-activity">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.icon];
          const colorClass = colorMap[activity.color];
          
          return (
            <div key={activity.id} className="flex gap-4">
              <div className={`${colorClass} p-3 rounded-full h-fit`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{activity.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
