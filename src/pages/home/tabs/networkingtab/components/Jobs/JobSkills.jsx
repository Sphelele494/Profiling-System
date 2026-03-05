import React from 'react';
import './Jobs.css';

export const JobSkills = ({ skills }) => {
  return (
    <div className="job-skills">
      {skills.map((skill, index) => (
        <span key={index} className="skill-tag">{skill}</span>
      ))}
    </div>
  );
};