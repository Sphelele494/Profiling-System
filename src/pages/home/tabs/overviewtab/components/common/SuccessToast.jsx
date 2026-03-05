import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import './Common.css';

export const SuccessToast = ({ message }) => {
  if (!message) return null;

  return (
    <div className={`success-toast ${message.type || 'success'}`}>
      {message.type === 'success' ? (
        <CheckCircle size={20} />
      ) : (
        <AlertCircle size={20} />
      )}
      <span>{message.text}</span>
    </div>
  );
};