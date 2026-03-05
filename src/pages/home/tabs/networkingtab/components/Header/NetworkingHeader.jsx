import React from 'react';
import { BriefcaseBusiness } from 'lucide-react';
import './NetworkingHeader.css';

export const NetworkingHeader = () => {
  return (
    <div className="networking-header">
      <h3 className="section-title">
        <BriefcaseBusiness size={28} />
        <span>Find Your Next Opportunity</span>
      </h3>
      <p className="section-subtitle">Jobs tailored to your skills and experience in South Africa</p>
    </div>
  );
};