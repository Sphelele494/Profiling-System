import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './Tips.css';

export const TipItem = ({ tip }) => {
  return (
    <div className="tip-item">
      <CheckCircle2 size={16} />
      <span>{tip}</span>
    </div>
  );
};