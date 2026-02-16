import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const ProfileCompletion = ({ data }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" data-testid="profile-completion">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Completion</h3>
        <p className="text-sm text-gray-600">Complete your profile to increase visibility</p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-4xl font-bold text-gray-900">{data.percentage}%</span>
          <span className="text-sm text-gray-600">Almost there!</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-emerald-600 h-2 rounded-full transition-all" style={{ width: `${data.percentage}%` }} />
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {data.completedSteps.map((step) => (
          <div key={step.id} className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-700">{step.text}</span>
          </div>
        ))}
        {data.pendingSteps.map((step) => (
          <div key={step.id} className="flex items-center gap-3">
            <Circle className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-700">{step.text}</span>
          </div>
        ))}
      </div>
      
      <button 
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition-colors"
        data-testid="complete-profile-button"
      >
        Complete Profile
      </button>
    </div>
  );
};

export default ProfileCompletion;
