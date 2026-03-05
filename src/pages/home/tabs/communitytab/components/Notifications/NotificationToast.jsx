import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import './Notifications.css';

export const NotificationToast = ({ notifications, setNotifications }) => {
  return (
    <div className="notifications-container">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          {notification.type === 'success' && <CheckCircle size={16} />}
          {notification.type === 'error' && <AlertTriangle size={16} />}
          {notification.type === 'warning' && <AlertCircle size={16} />}
          {notification.type === 'info' && <Info size={16} />}
          <span>{notification.message}</span>
          <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};