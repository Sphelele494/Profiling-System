import React, { useState } from 'react';
import { Lightbulb, Zap, ChevronRight } from 'lucide-react';
import { TaskModal } from './TaskModal';
import './SuggestionsCard.css';

export const SuggestionsCard = ({ suggestions, onCompleteTask, showTemporaryMessage }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCompleteTask = (taskId) => {
    onCompleteTask(taskId);
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <div className="dashboard-card full-width glass-effect">
      <div className="card-header">
        <h4 className="card-title">
          <Lightbulb size={20} />
          <span>Recommended Actions</span>
        </h4>
        <span className="card-badge" onClick={() => showTemporaryMessage(`${suggestions.filter(t => !t.completed).length} tasks available`)}>
          {suggestions.filter(t => !t.completed).length} Tasks
        </span>
      </div>

      <div className="suggestions-grid">
        {suggestions
          .filter(task => !task.completed)
          .map(suggestion => (
            <div 
              key={suggestion.id} 
              className="suggestion-card"
              onClick={() => handleTaskClick(suggestion)}
            >
              <div className="suggestion-icon">{suggestion.icon}</div>
              <div className="suggestion-content">
                <h5 className="suggestion-title">{suggestion.title}</h5>
                <p className="suggestion-description">{suggestion.description}</p>
                <div className="suggestion-meta">
                  <span className="suggestion-impact">
                    <Zap size={12} />
                    {suggestion.impact}
                  </span>
                  <span className={`suggestion-difficulty ${suggestion.difficulty.toLowerCase()}`}>
                    {suggestion.difficulty}
                  </span>
                </div>
              </div>
              <button className="suggestion-action">
                <ChevronRight size={16} />
              </button>
            </div>
          ))}
      </div>

      {showModal && selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setShowModal(false);
            setSelectedTask(null);
          }}
          onComplete={handleCompleteTask}
          showTemporaryMessage={showTemporaryMessage}
        />
      )}
    </div>
  );
};