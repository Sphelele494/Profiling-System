import React from 'react';
import { Briefcase, CheckCircle, ChevronRight } from 'lucide-react';

export const RecruiterCard = ({ 
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
      aria-label="Select Recruiter registration"
    >
      <div className="card-glow" />
      <div className="card-content">
        <div className="card-icon-wrapper recruiter-icon">
          <Briefcase size={56} />
        </div>
        <h2 className="card-title">Recruiter / Employer</h2>
        <p className="card-description">
          I'm hiring talent and looking for dedicated employees 
          to join my organization.
        </p>
        
        <div className="card-features">
          <div className="feature-item">
            <CheckCircle size={16} />
            <span>Access to verified candidates</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={16} />
            <span>DCS verified profiles</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={16} />
            <span>B-BBEE compliance</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={16} />
            <span>Skills-based matching</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={16} />
            <span>EE points contribution</span>
          </div>
        </div>

        <div className="card-stats">
          <div className="card-stat">
            <span className="stat-number">247+</span>
            <span className="stat-label">Companies</span>
          </div>
          <div className="card-stat">
            <span className="stat-number">89%</span>
            <span className="stat-label">Retention</span>
          </div>
          <div className="card-stat">
            <span className="stat-number">9</span>
            <span className="stat-label">Provinces</span>
          </div>
        </div>

        <div className="card-action">
          <span>Select Recruiter</span>
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