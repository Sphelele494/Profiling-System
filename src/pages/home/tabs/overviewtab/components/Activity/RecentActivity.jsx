import React from 'react';
import { CheckCircle, FileText, Calendar, Eye, ChevronRight } from 'lucide-react';
import './Activity.css';

export const RecentActivity = ({ showTemporaryMessage }) => {
  const activities = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      text: 'Applied for Construction Supervisor at BuildRight',
      time: '2 hours ago',
      status: 'Success',
      statusType: 'success'
    },
    {
      id: 2,
      type: 'info',
      icon: FileText,
      text: 'Uploaded Police Clearance Certificate',
      time: '1 day ago',
      status: 'Pending',
      statusType: 'pending'
    },
    {
      id: 3,
      type: 'warning',
      icon: Calendar,
      text: 'Scheduled Rehabilitation Session',
      time: '2 days ago',
      status: 'Upcoming',
      statusType: 'info'
    },
    {
      id: 4,
      type: 'success',
      icon: Eye,
      text: 'Your profile was viewed by 3 employers',
      time: '3 days ago',
      status: 'Viewed',
      statusType: 'success'
    }
  ];

  return (
    <div className="recent-activity glass-effect">
      <div className="activity-header">
        <h4 className="activity-title">Recent Activity</h4>
        <div className="activity-filters">
          <button className="activity-filter active">All</button>
          <button className="activity-filter">Applications</button>
          <button className="activity-filter">Messages</button>
          <button className="activity-filter">Documents</button>
        </div>
        <button className="view-all-btn" onClick={() => showTemporaryMessage('View all activity')}>
          View All
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="activity-list">
        {activities.map(activity => {
          const Icon = activity.icon;
          return (
            <div 
              key={activity.id} 
              className="activity-item" 
              onClick={() => showTemporaryMessage(activity.text)}
            >
              <div className={`activity-icon ${activity.type}`}>
                <Icon size={16} />
              </div>
              <div className="activity-content">
                <span className="activity-text">{activity.text}</span>
                <div className="activity-meta">
                  <span className="activity-time">{activity.time}</span>
                  <span className={`activity-status ${activity.statusType}`}>{activity.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};