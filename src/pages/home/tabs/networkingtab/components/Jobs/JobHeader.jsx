import React from 'react';
import { Building2 } from 'lucide-react';
import './Jobs.css';

export const JobHeader = ({ job }) => {
  return (
    <div className="job-header">
      <div className="company-logo">
        <img src={job.logo} alt={job.company} className="logo-img" />
        {job.urgent && <div className="logo-glow"></div>}
      </div>
      <div className="job-main-info">
        <div className="job-title-row">
          <h4 className="job-title">{job.title}</h4>
          <span className="job-category">{job.category}</span>
        </div>
        <p className="job-company">
          <Building2 size={14} />
          <span>{job.company}</span>
        </p>
        <div className="job-match">
          <span className="match-score">{job.matches}</span>
          <span className="job-type">{job.type}</span>
        </div>
      </div>
    </div>
  );
};