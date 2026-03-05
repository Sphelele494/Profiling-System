import React from 'react';
import { X, CheckCircle, Zap } from 'lucide-react';
import './SuggestionsCard.css';

export const TaskModal = ({ task, onClose, onComplete, showTemporaryMessage }) => {
  const handleComplete = () => {
    onComplete(task.id);
    showTemporaryMessage('Task completed! +5 credibility points');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{task.title}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <p className="task-description">{task.description}</p>
          
          <h4>Steps to complete:</h4>
          <ul className="task-steps">
            {task.steps.map((step, index) => (
              <li key={index} onClick={() => showTemporaryMessage(`Step ${index + 1}: ${step}`)}>
                <CheckCircle size={16} color="#10b981" />
                {step}
              </li>
            ))}
          </ul>
          
          <div className="task-meta">
            <span className="task-impact">
              <Zap size={14} />
              {task.impact}
            </span>
            <span className={`task-difficulty ${task.difficulty.toLowerCase()}`}>
              {task.difficulty}
            </span>
          </div>
          
          <button className="complete-task-btn" onClick={handleComplete}>
            <CheckCircle size={16} />
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
};