import React from 'react';
import { Eye, Send, Video } from 'lucide-react';
import { WEEKDAYS } from '../../utils/constants';
import './Activity.css';

export const WeeklySummary = ({ weeklyActivity, showTemporaryMessage }) => {
  const totalViews = weeklyActivity.views.reduce((a, b) => a + b, 0);
  const totalApplications = weeklyActivity.applications.reduce((a, b) => a + b, 0);
  const totalInterviews = weeklyActivity.interviews.reduce((a, b) => a + b, 0);

  return (
    <div className="weekly-summary glass-effect">
      <div className="summary-header">
        <h4>Weekly Summary</h4>
        <div className="summary-stats">
          <div className="summary-stat" onClick={() => showTemporaryMessage(`Total views this week: ${totalViews}`)}>
            <Eye size={14} />
            <span>{totalViews} Views</span>
          </div>
          <div className="summary-stat" onClick={() => showTemporaryMessage(`Total applications: ${totalApplications}`)}>
            <Send size={14} />
            <span>{totalApplications} Apps</span>
          </div>
          <div className="summary-stat" onClick={() => showTemporaryMessage(`Interviews scheduled: ${totalInterviews}`)}>
            <Video size={14} />
            <span>{totalInterviews} Interviews</span>
          </div>
        </div>
      </div>
      
      <div className="week-days">
        {WEEKDAYS.map((day, index) => (
          <div 
            key={day} 
            className="day-column"
            onClick={() => showTemporaryMessage(
              `${day}: ${weeklyActivity.views[index]} views, ${weeklyActivity.applications[index]} applications`
            )}
          >
            <span className="day-name">{day}</span>
            <div className="day-activities">
              <div 
                className="day-activity views"
                style={{ height: `${weeklyActivity.views[index] * 3}px` }}
                title={`${weeklyActivity.views[index]} views`}
              ></div>
              <div 
                className="day-activity apps"
                style={{ height: `${weeklyActivity.applications[index] * 10}px` }}
                title={`${weeklyActivity.applications[index]} applications`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};