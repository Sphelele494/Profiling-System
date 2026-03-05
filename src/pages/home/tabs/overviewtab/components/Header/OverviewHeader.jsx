import React from 'react';
import { Bell, Download, Search, X } from 'lucide-react';
import './OverviewHeader.css';

export const OverviewHeader = ({
  user,
  selectedTimeRange,
  setSelectedTimeRange,
  searchTerm,
  setSearchTerm,
  showNotifications,
  setShowNotifications,
  notifications,
  markAllNotificationsRead,
  clearNotifications,
  generateMonthlyReport,
  isLoading,
  showTemporaryMessage
}) => {
  return (
    <div className="overview-header">
      <div className="header-left">
        <h3 className="section-title">
          <span>Your Dashboard</span>
          <span className="welcome-badge">Welcome back, {user?.name || 'Thabo'}!</span>
        </h3>
        <p className="section-subtitle">
          Track your progress, manage appointments, and achieve your goals
        </p>
      </div>
      
      <div className="header-actions">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search jobs, appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={20} />
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="notification-count">
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </div>

        <div className="time-range-selector">
          {['week', 'month', 'year'].map(range => (
            <button 
              key={range}
              className={`time-range-btn ${selectedTimeRange === range ? 'active' : ''}`}
              onClick={() => {
                setSelectedTimeRange(range);
                showTemporaryMessage(`Showing ${range}ly data`);
              }}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        <button className="generate-report-btn" onClick={generateMonthlyReport} disabled={isLoading}>
          <Download size={18} />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h4>Notifications</h4>
            <div className="notification-actions">
              <button onClick={markAllNotificationsRead}>Mark all read</button>
              <button onClick={clearNotifications}>Clear all</button>
            </div>
          </div>
          <div className="notifications-list">
            {notifications.length === 0 ? (
              <p className="no-notifications">No notifications</p>
            ) : (
              notifications.map(notif => (
                <div 
                  key={notif.id} 
                  className={`notification-item ${!notif.read ? 'unread' : ''}`}
                >
                  <div className={`notification-icon ${notif.type}`}></div>
                  <div className="notification-content">
                    <p>{notif.message}</p>
                    <span className="notification-time">{notif.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};