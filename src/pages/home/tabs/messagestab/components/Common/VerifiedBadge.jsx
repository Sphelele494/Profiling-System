import React from 'react';
import { ShieldCheck } from 'lucide-react';
import './Common.css';

export const VerifiedBadge = () => {
  return (
    <div className="verified-badge">
      <ShieldCheck size={10} />
    </div>
  );
};