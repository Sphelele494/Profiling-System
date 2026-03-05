import React from 'react';
import { Target } from 'lucide-react';
import './ProgressTracker.css';

export const GoalsSection = ({ goals, onUpdateGoal, showTemporaryMessage }) => {
  return (
    <div className="goals-section">
      <h5 onClick={() => showTemporaryMessage('Your monthly goals')}>
        <Target size={14} />
        Monthly Goals
      </h5>
      {goals.map(goal => (
        <div 
          key={goal.id} 
          className="goal-progress" 
          onClick={() => showTemporaryMessage(`Goal: ${goal.title}`)}
        >
          <div className="goal-info">
            <span className="goal-title">{goal.title}</span>
            <span className="goal-deadline">Due: {goal.deadline}</span>
          </div>
          <div className="goal-bar-container">
            <div 
              className="goal-bar"
              style={{ width: `${(goal.progress / goal.target) * 100}%` }}
            ></div>
            <span className="goal-value">{goal.progress}/{goal.target}</span>
          </div>
          <button 
            className="goal-update-btn"
            onClick={(e) => {
              e.stopPropagation();
              const newProgress = Math.min(goal.target, goal.progress + 1);
              onUpdateGoal(goal.id, newProgress);
            }}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
};