import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Rocket, CheckCircle, Loader2 } from 'lucide-react';

const FormNavigation = ({ 
  currentStep, 
  onPrev, 
  onNext, 
  onSubmit, 
  isCurrentStepValid, 
  loading 
}) => {
  return (
    <div className="form-navigation">
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={onPrev}
          className="nav-button prev"
        >
          <div className="nav-icon">
            <ArrowLeft size={20} />
          </div>
          <span>Previous Step</span>
        </button>
      ) : (
        <Link to="/" className="nav-button prev">
          <div className="nav-icon">
            <ArrowLeft size={20} />
          </div>
          <span>Back to Home</span>
        </Link>
      )}
      
      {currentStep < 4 ? (
        <button
          type="button"
          onClick={onNext}
          className="nav-button next"
          disabled={!isCurrentStepValid}
        >
          <span>Continue to Step {currentStep + 1}</span>
          <div className="nav-icon">
            <ArrowRight size={20} />
          </div>
        </button>
      ) : (
        <button
          type="submit"
          disabled={loading}
          className="submit-button"
          onClick={onSubmit}
        >
          {loading ? (
            <>
              <div className="spinner">
                <Loader2 className="spinner-icon" />
              </div>
              <span>Submitting to DCS...</span>
            </>
          ) : (
            <>
              <Rocket size={20} className="submit-icon" />
              <span>Complete Registration & Submit to DCS</span>
              <CheckCircle size={20} className="submit-check" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default FormNavigation;