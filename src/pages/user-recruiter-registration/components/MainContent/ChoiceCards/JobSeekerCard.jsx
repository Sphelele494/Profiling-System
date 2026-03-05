import React from 'react';
import { User, CheckCircle, ChevronRight } from 'lucide-react';

export const JobSeekerCard = ({ 
  isSelected, 
  isHovered, 
  isLoading, 
  onClick, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  return (
    <div 
      className={`choice-card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''} ${isLoading && isSelected ? 'loading' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
      aria-label="Select Job Seeker registration"
    >
      <div className="card-glow" />
      <div className="card-content">
        <div className="card-icon-wrapper user-icon">
          <User size={56} />
        </div>
        <h2 className="card-title">Job Seeker</h2>
        <p className="card-description">
          I'm looking for employment opportunities, skills development, 
          and career support after rehabilitation.
        </p>
        
        <div className="card-features">
          <div className="feature-item">
            <CheckCircle size={16} />
            <span>Access to 1,845+ jobs</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={16} />
            <span>Skills development programs</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={16} />
            <span>Mentorship network</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={16} />
            <span>Career coaching</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={16} />
            <span>DCS verified profile</span>
          </div>
        </div>

        <div className="card-stats">
          <div className="card-stat">
            <span className="stat-number">94%</span>
            <span className="stat-label">Success Rate</span>
          </div>
          <div className="card-stat">
            <span className="stat-number">3.4k+</span>
            <span className="stat-label">Members</span>
          </div>
          <div className="card-stat">
            <span className="stat-number">53</span>
            <span className="stat-label">Communities</span>
          </div>
        </div>

        <div className="card-action">
          <span>Select Job Seeker</span>
          <ChevronRight size={18} />
        </div>

        {isSelected && (
          <div className="selected-indicator">
            <CheckCircle size={24} />
            <span>Selected</span>
          </div>
        )}
      </div>
    </div>
  );
};