import React from 'react';
import { Building, Monitor, Clock, Award } from 'lucide-react';
import './Education.css';

const iconMap = {
  Building, Monitor
};

export const LearningPaths = ({ learningPaths, onFollowPath }) => {
  return (
    <div className="learning-paths">
      <h5>Recommended Learning Paths</h5>
      <div className="paths-grid">
        {learningPaths.map(path => {
          const Icon = iconMap[path.icon] || Building;
          return (
            <div key={path.id} className="path-card">
              <Icon size={24} />
              <h6>{path.title}</h6>
              <p>{path.description}</p>
              <div className="path-steps">
                {path.steps.map((step, idx) => (
                  <div key={idx} className={`step ${step.completed ? 'completed' : ''}`}>
                    <span className="step-number">{idx + 1}</span>
                    <span className="step-name">{step.name}</span>
                    <span className="step-duration">
                      <Clock size={10} />
                      {step.duration}
                    </span>
                  </div>
                ))}
              </div>
              <button onClick={() => onFollowPath(path.id)}>
                <Award size={16} />
                Start Path +{path.points} pts
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};