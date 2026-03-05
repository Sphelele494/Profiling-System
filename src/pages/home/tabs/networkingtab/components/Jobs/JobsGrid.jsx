import React from 'react';
import { JobCard } from './JobCard';
import './Jobs.css';

export const JobsGrid = ({ jobs, onApply }) => {
  return (
    <div className="jobs-grid">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} onApply={onApply} />
      ))}
    </div>
  );
};