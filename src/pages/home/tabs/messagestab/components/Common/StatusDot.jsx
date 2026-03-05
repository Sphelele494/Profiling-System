import React from 'react';
import './Common.css';

export const StatusDot = ({ status }) => {
  return <div className={`status-dot ${status}`} />;
};