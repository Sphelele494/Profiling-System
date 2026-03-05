import React from 'react';
import { Bell, AlertCircle, Info, Calendar, ExternalLink } from 'lucide-react';
import './Notices.css';

export const NoticesCard = ({ notices, onClose }) => {
  return (
    <div className="notices-card">
      <div className="card-header">
        <h4>
          <Bell size={20} />
          Community Notices
        </h4>
        <button onClick={onClose}>
          <ExternalLink size={16} />
        </button>
      </div>

      <div className="notices-list">
        {notices.map(notice => (
          <div key={notice.id} className={`notice-item ${notice.important ? 'important' : ''}`}>
            <div className="notice-icon">
              {notice.important ? <AlertCircle size={16} /> : <Info size={16} />}
            </div>
            <div className="notice-content">
              <h5>{notice.title}</h5>
              <p>{notice.content}</p>
              <div className="notice-meta">
                <span className="notice-date">
                  <Calendar size={12} />
                  {notice.date}
                </span>
                <span className="notice-category">{notice.category}</span>
                {notice.expires && (
                  <span className="notice-expiry">Expires: {notice.expires}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};