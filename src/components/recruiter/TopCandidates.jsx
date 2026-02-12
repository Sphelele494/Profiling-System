import React from 'react';
import { User } from 'lucide-react';

const TopCandidates = ({ candidates }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" data-testid="top-candidates">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Top Candidates</h3>
          <p className="text-sm text-gray-600">Highest credibility scores matching your criteria</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1" data-testid="view-all-candidates">
          View all
          <span>→</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-base font-bold text-blue-700">{candidate.initials}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-gray-900 mb-2">{candidate.name}</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
                {candidate.additionalSkills > 0 && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    +{candidate.additionalSkills}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <span className="bg-emerald-50 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">
                {candidate.score} Score
              </span>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium" data-testid={`view-profile-${candidate.id}`}>
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCandidates;
