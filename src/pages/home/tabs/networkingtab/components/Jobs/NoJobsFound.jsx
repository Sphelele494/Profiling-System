import React from 'react';
import { Briefcase } from 'lucide-react';
import './Jobs.css';

export const NoJobsFound = () => {
  return (
    <div className="no-jobs-found">
      <Briefcase size={48} />
      <h4>No opportunities found</h4>
      <p>Try adjusting your filters or check back later for new opportunities</p>
    </div>
  );
};