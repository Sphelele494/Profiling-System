import React from 'react';
import { UserCheck, User, Briefcase, CheckCircle } from 'lucide-react';

export const UserTypeToggle = ({ userType, onToggle }) => {
  return (
    <div className="user-type-toggle-section">
      <div className="user-type-toggle-container">
        <div className="user-type-toggle-header">
          <UserCheck size={20} />
          <h3 className="user-type-title">Select Your Account Type</h3>
        </div>
        <p className="user-type-subtitle">Choose how you want to use RE-Link</p>
        
        <div className="user-type-toggle-buttons">
          <button
            type="button"
            className={`user-type-toggle-btn job-seeker ${userType === 'job-seeker' ? 'selected' : ''}`}
            onClick={() => onToggle('job-seeker')}
          >
            <div className="user-type-toggle-icon">
              <User size={24} />
            </div>
            <div className="user-type-toggle-content">
              <h4 className="user-type-toggle-name">Job Seeker</h4>
              <p className="user-type-toggle-description">
                I'm looking for employment opportunities and career support
              </p>
            </div>
            {userType === 'job-seeker' && (
              <div className="user-type-selected-indicator">
                <CheckCircle size={20} />
              </div>
            )}
          </button>
          
          <button
            type="button"
            className={`user-type-toggle-btn recruiter ${userType === 'recruiter' ? 'selected' : ''}`}
            onClick={() => onToggle('recruiter')}
          >
            <div className="user-type-toggle-icon">
              <Briefcase size={24} />
            </div>
            <div className="user-type-toggle-content">
              <h4 className="user-type-toggle-name">Recruiter</h4>
              <p className="user-type-toggle-description">
                I'm hiring and looking for talented candidates
              </p>
            </div>
            {userType === 'recruiter' && (
              <div className="user-type-selected-indicator">
                <CheckCircle size={20} />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};