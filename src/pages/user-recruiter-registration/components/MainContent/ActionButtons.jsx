import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle, Rocket, User, Briefcase } from 'lucide-react';

export const ActionButtons = ({
  selectedOption,
  isLoading,
  showSuccess,
  onContinue,
  onJobSeekerClick
}) => {
  const getButtonText = () => {
    if (isLoading) return 'Processing...';
    if (showSuccess) return 'Success! Redirecting...';
    
    if (selectedOption === 'user') {
      return 'Continue as Job Seeker';
    } else if (selectedOption === 'recruiter') {
      return 'Continue as Recruiter';
    }
    return 'Select an option to continue';
  };

  const getButtonIcon = () => {
    if (selectedOption === 'user') {
      return <User size={20} className="button-icon" />;
    } else if (selectedOption === 'recruiter') {
      return <Briefcase size={20} className="button-icon" />;
    }
    return <Rocket size={20} className="button-icon" />;
  };

  const handleContinueClick = () => {
    console.log('ActionButtons - handleContinueClick called');
    console.log('Selected option:', selectedOption);
    
    if (selectedOption === 'user') {
      console.log('Calling onJobSeekerClick for Job Seeker');
      onJobSeekerClick();
    } else if (selectedOption === 'recruiter') {
      console.log('Calling onContinue for Recruiter');
      onContinue();
    } else {
      console.log('No option selected');
    }
  };

  return (
    <div className="choice-actions">
      <Link to="/" className="back-button">
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <button
        onClick={handleContinueClick}
        disabled={!selectedOption || isLoading}
        className={`continue-button ${selectedOption ? 'active' : ''} ${showSuccess ? 'success' : ''} ${selectedOption === 'user' ? 'jobseeker-mode' : selectedOption === 'recruiter' ? 'recruiter-mode' : ''}`}
        aria-label="Continue with registration"
      >
        {isLoading ? (
          <>
            <Loader2 className="spinner-icon" size={20} />
            <span>{getButtonText()}</span>
          </>
        ) : showSuccess ? (
          <>
            <CheckCircle size={20} />
            <span>{getButtonText()}</span>
          </>
        ) : (
          <>
            <span>{getButtonText()}</span>
            {getButtonIcon()}
          </>
        )}
      </button>

      {/* Helper text for users */}
      {!selectedOption && (
        <p className="choice-helper-text">
          Please select an account type above to continue
        </p>
      )}
    </div>
  );
};

export default ActionButtons;