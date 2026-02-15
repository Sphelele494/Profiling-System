import React from 'react';
import { Fingerprint, ShieldCheck, BadgeCheck, Award, CheckCircle } from 'lucide-react';

const iconMap = {
  Fingerprint: <Fingerprint size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  BadgeCheck: <BadgeCheck size={20} />,
  Award: <Award size={20} />
};

const ProgressSteps = ({ steps, currentStep }) => {
  return (
    <div className="progress-container">
      <div className="progress-steps">
        <div className="progress-line"></div>
        <div 
          className="progress-fill"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        ></div>
        
        {steps.map(step => (
          <div key={step.number} className="step-item">
            <div 
              className={`step-circle ${currentStep >= step.number ? 'active' : currentStep === step.number ? 'current' : ''}`}
              style={{
                borderColor: step.color,
                boxShadow: currentStep === step.number ? `0 0 25px ${step.color}` : 'none'
              }}
            >
              {currentStep > step.number ? (
                <CheckCircle size={20} />
              ) : (
                <div className="step-icon-wrapper">
                  {iconMap[step.icon] || step.icon}
                </div>
              )}
              {currentStep === step.number && (
                <div className="step-pulse"></div>
              )}
            </div>
            <span className={`step-label ${currentStep >= step.number ? 'active' : ''}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;