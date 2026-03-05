import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';

export const StatsBanner = () => {
  return (
    <div className="stats-banner">
      <div className="stat-item">
        <div className="stat-icon-container">
          <CheckCircle size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-number">94%</span>
          <span className="stat-label">Job Match Success</span>
        </div>
      </div>
      <div className="stat-item">
        <div className="stat-icon-container">
          <Shield size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-number">100%</span>
          <span className="stat-label">Secure & Verified</span>
        </div>
      </div>
    </div>
  );
};

