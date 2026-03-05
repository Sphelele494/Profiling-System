import React from 'react';
import { Zap } from 'lucide-react';
import './Jobs.css';

export const UrgentBadge = () => {
  return (
    <div className="urgent-badge">
      <Zap size={12} />
      <span>URGENT HIRING</span>
    </div>
  );
};