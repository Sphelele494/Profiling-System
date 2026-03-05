import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-alert">
      <div className="error-content">
        <AlertCircle className="error-icon" />
        <div>
          <p className="error-title">Login Error</p>
          <p className="error-message">{message}</p>
        </div>
      </div>
    </div>
  );
};

