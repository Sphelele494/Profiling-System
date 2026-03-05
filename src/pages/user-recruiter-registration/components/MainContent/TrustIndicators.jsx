import React from 'react';
import { Award, BadgeCheck, Shield, CheckCircle } from 'lucide-react';

export const TrustIndicators = () => {
  return (
    <div className="trust-indicators">
      <div className="trust-badge">
        <Award size={16} />
        <span>NPO Registration: 123-456</span>
      </div>
      <div className="trust-badge">
        <BadgeCheck size={16} />
        <span>B-BBEE Level 1 Contributor</span>
      </div>
      <div className="trust-badge">
        <Shield size={16} />
        <span>POPIA Compliant</span>
      </div>
      <div className="trust-badge">
        <CheckCircle size={16} />
        <span>DCS Official Partner</span>
      </div>
    </div>
  );
};