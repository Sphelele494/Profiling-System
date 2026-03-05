import React from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import './Jobs.css';

export const JobDetails = ({ job }) => {
  return (
    <div className="job-details">
      <div className="detail-row">
        <div className="detail-item">
          <MapPin size={14} />
          <span>{job.location}</span>
        </div>
        <div className="detail-item">
          <span className="salary-icon">R</span>
          <span>{job.salary}</span>
        </div>
      </div>
      <div className="detail-row">
        <div className="detail-item">
          <Clock size={14} />
          <span>{job.type}</span>
        </div>
        <div className="detail-item">
          <Calendar size={14} />
          <span>{job.posted}</span>
        </div>
      </div>
      
      <div className="job-description">
        <p>{job.description}</p>
      </div>
    </div>
  );
};