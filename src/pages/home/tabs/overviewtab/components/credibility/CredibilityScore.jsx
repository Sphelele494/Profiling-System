import React from 'react';
import { Target, RefreshCw, Medal, Zap } from 'lucide-react';
import './CredibilityScore.css';

export const CredibilityScore = ({
  credibilityScore,
  credibilityMetrics,
  refreshCredibilityScore,
  calculatePotentialScore,
  isLoading,
  showTemporaryMessage
}) => {
  return (
    <div className="dashboard-card large glass-effect">
      <div className="card-header">
        <h4 className="card-title">
          <Target size={20} />
          <span>Credibility Score</span>
        </h4>
        <button 
          className="card-action"
          onClick={refreshCredibilityScore}
          disabled={isLoading}
        >
          <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
        </button>
      </div>
      
      <div className="credibility-display">
        <div 
          className="score-circle-large" 
          onClick={() => showTemporaryMessage(`Potential score: ${calculatePotentialScore()}`)}
        >
          <div className="score-ring">
            <svg className="score-ring-svg" viewBox="0 0 120 120">
              <circle 
                className="score-ring-bg" 
                cx="60" cy="60" r="54" 
                fill="none" 
                stroke="#e5e7eb" 
                strokeWidth="8"
              />
              <circle 
                className="score-ring-fill" 
                cx="60" cy="60" r="54" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="8"
                strokeDasharray="339.292"
                strokeDashoffset={339.292 - (339.292 * credibilityScore / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="score-value-large">
              {credibilityScore}
              <span className="score-max">/100</span>
            </div>
          </div>
          <div 
            className="score-badge" 
            onClick={(e) => {
              e.stopPropagation();
              showTemporaryMessage('Gold Level - Top 15% of users');
            }}
          >
            <Medal size={16} color="#f59e0b" />
            <span>Gold Level</span>
          </div>
          <div 
            className="score-potential"
            onClick={(e) => {
              e.stopPropagation();
              showTemporaryMessage(`Complete tasks to reach ${calculatePotentialScore()}`);
            }}
          >
            <Zap size={14} color="#10b981" />
            <span>Potential: {calculatePotentialScore()}</span>
          </div>
        </div>

        <div className="score-breakdown">
          {credibilityMetrics.map((metric, index) => (
            <div 
              key={index} 
              className="score-metric" 
              onClick={() => showTemporaryMessage(metric.improvement)}
            >
              <div className="metric-info">
                <span className="metric-icon">{metric.icon}</span>
                <div className="metric-details">
                  <span className="metric-label">{metric.label}</span>
                  <span className="metric-description">{metric.description}</span>
                </div>
              </div>
              <div className="metric-bar-container">
                <div 
                  className="metric-bar"
                  style={{ width: `${metric.score}%`, backgroundColor: metric.color }}
                ></div>
                <span className="metric-value">{metric.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};