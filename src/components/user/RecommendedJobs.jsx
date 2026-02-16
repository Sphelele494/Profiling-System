import React from 'react';
import { MapPin, DollarSign } from 'lucide-react';

const RecommendedJobs = ({ jobs }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" data-testid="recommended-jobs">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Recommended Jobs</h3>
          <p className="text-sm text-gray-600">Based on your skills and preferences</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium" data-testid="view-all-jobs">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-base font-bold text-gray-900 mb-1">{job.title}</h4>
                <p className="text-sm text-gray-700 mb-2">{job.company}</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                {job.match} match
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>{job.salary}</span>
              </div>
            </div>
            
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors" data-testid={`apply-job-${job.id}`}>
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;
