import React from 'react';
import { Activity, AlertCircle } from 'lucide-react';
import { GoalsSection } from './GoalsSection';
import './ProgressTracker.css';

export const ProgressTracker = ({
  userProgress,
  goals,
  onUpdateProgress,
  onUpdateGoal,
  showTemporaryMessage
}) => {
  return (
    <div className="dashboard-card glass-effect">
      <div className="card-header">
        <h4 className="card-title">
          <Activity size={20} />
          <span>Progress Tracker</span>
        </h4>
        <span className="card-badge" onClick={() => showTemporaryMessage('Overall progress: 85%')}>
          85% Overall
        </span>
      </div>

      <div className="progress-metrics">
        {Object.entries(userProgress).map(([key, value]) => (
          <div key={key} className="progress-item">
            <div className="progress-label">
              <span className="progress-name" onClick={() => showTemporaryMessage(`Click to update ${key}`)}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
              <span className="progress-value">{value}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar"
                onClick={() => {
                  const newValue = Math.min(100, value + 5);
                  onUpdateProgress(key, newValue);
                }}
              >
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${value}%`,
                    background: `linear-gradient(90deg, #10b981, ${value > 70 ? '#059669' : '#f59e0b'})`
                  }}
                ></div>
              </div>
              {value < 70 && (
                <span className="progress-warning" onClick={() => showTemporaryMessage('Needs improvement')}>
                  <AlertCircle size={12} />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <GoalsSection goals={goals} onUpdateGoal={onUpdateGoal} showTemporaryMessage={showTemporaryMessage} />
    </div>
  );
};