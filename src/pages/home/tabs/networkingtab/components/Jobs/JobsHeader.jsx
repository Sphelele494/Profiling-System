import React from 'react';
import './Jobs.css';

export const JobsHeader = ({ title, count }) => {
  return (
    <div className="jobs-header">
      <h4 className="jobs-title">
        {title}
        <span className="match-badge">{count} matches</span>
      </h4>
      <div className="sort-options">
        <select className="sort-select">
          <option>Sort by: Best Match</option>
          <option>Sort by: Most Recent</option>
          <option>Sort by: Salary (High to Low)</option>
          <option>Sort by: Application Deadline</option>
        </select>
      </div>
    </div>
  );
};