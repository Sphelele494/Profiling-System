import React from 'react';
import { Eye, SendHorizontal, Bookmark } from 'lucide-react';
import './Jobs.css';

export const JobFooter = ({ job, onApply }) => {
  return (
    <div className="job-footer">
      <div className="job-requirements">
        <span className="requirements-label">Requirements:</span>
        <span className="requirements-text">{job.requirements}</span>
      </div>
      <div className="job-actions">
        <button className="job-action-btn view">
          <Eye size={16} />
          <span>View Details</span>
        </button>
        <button 
          className="job-action-btn apply"
          onClick={() => onApply(job)}
        >
          <SendHorizontal size={16} />
          <span>Apply Now</span>
        </button>
        <button className="job-action-btn save">
          <Bookmark size={16} />
        </button>
      </div>
    </div>
  );
};