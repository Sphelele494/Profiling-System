import React from 'react';
import { JobsHeader } from './JobsHeader';
import { JobsGrid } from './JobsGrid';
import { NoJobsFound } from './NoJobsFound';
import './Jobs.css';

export const JobsSection = ({ jobs, activeCategory, onApply }) => {
  const categoryLabel = activeCategory === 'All' ? 'All Opportunities' : 
    activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) + 's';

  return (
    <div className="jobs-section">
      <JobsHeader
        title={categoryLabel}
        count={jobs.length}
      />
      
      {jobs.length === 0 ? (
        <NoJobsFound />
      ) : (
        <JobsGrid jobs={jobs} onApply={onApply} />
      )}
    </div>
  );
};