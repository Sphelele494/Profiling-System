import React from 'react';
import { ShieldCheck, Users, Key } from 'lucide-react';

export const FeaturesList = () => {
  return (
    <div className="features-list">
      <div className="feature-item">
        <div className="feature-icon">
          <div className="icon-circle">
            <ShieldCheck size={18} />
          </div>
        </div>
        <div className="feature-text">
          <span className="feature-title">DCS Verified Profiles</span>
          <span className="feature-desc">Officer-verified rehabilitation progress</span>
        </div>
      </div>
      <div className="feature-item">
        <div className="feature-icon">
          <div className="icon-circle">
            <Users size={18} />
          </div>
        </div>
        <div className="feature-text">
          <span className="feature-title">Professional Network</span>
          <span className="feature-desc">Connect with verified employers</span>
        </div>
      </div>
      <div className="feature-item">
        <div className="feature-icon">
          <div className="icon-circle">
            <Key size={18} />
          </div>
        </div>
        <div className="feature-text">
          <span className="feature-title">Secure Access</span>
          <span className="feature-desc">Enterprise-grade encryption</span>
        </div>
      </div>
    </div>
  );
};