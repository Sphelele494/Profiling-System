import React from 'react';
import { CheckCircle } from 'lucide-react';

export const SuccessAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="success-alert">
      <div className="success-content">
        <CheckCircle className="success-icon" />
        <div>
          <p className="success-title">Success!</p>
          <p className="success-message">{message}</p>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
    </div>
  );
};

