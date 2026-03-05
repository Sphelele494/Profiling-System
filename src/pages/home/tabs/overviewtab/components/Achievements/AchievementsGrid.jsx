import React from 'react';
import { Award } from 'lucide-react';
import './AchievementsGrid.css';

export const AchievementsGrid = ({ achievements, showTemporaryMessage }) => {
  return (
    <div className="dashboard-card glass-effect">
      <div className="card-header">
        <h4 className="card-title">
          <Award size={20} />
          <span>Achievements</span>
        </h4>
        <span className="card-badge" onClick={() => showTemporaryMessage('4 achievements in progress')}>
          {achievements.filter(a => !a.completed).length} In Progress
        </span>
      </div>

      <div className="achievements-grid">
        {achievements.map(achievement => (
          <div 
            key={achievement.id} 
            className={`achievement-badge ${achievement.completed ? 'completed' : ''}`}
            onClick={() => showTemporaryMessage(achievement.description)}
          >
            <div className="achievement-icon">{achievement.icon}</div>
            <div className="achievement-info">
              <span className="achievement-title">{achievement.title}</span>
              <div className="achievement-progress">
                <div 
                  className="achievement-progress-bar"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
                <span className="achievement-progress-text">{achievement.progress}%</span>
              </div>
              <span className="achievement-points">+{achievement.points} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};