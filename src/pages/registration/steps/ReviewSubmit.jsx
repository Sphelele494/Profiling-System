import React from 'react';
import { Award, User, Mail, Phone, MapPin, Building, Calendar, Briefcase, GraduationCap, Shield, Check } from 'lucide-react';

const ReviewSubmit = ({
  formData,
  formErrors,
  setCurrentStep
}) => {
  return (
    <div className="form-step fade-in">
      <div className="step-header">
        <h2 className="step-title">
          <div className="step-icon-container">
            <Award size={28} />
          </div>
          <span>Review & Final Submission</span>
        </h2>
        <p className="step-description">
          Please review your information carefully before submitting to DCS for verification
        </p>
      </div>
      
      <div className="review-section">
        {/* Personal Information Card */}
        <div className="review-card">
          <div className="review-header">
            <User size={20} />
            <h3>Personal Information</h3>
            <button 
              className="review-edit"
              onClick={() => setCurrentStep(1)}
            >
              Edit
            </button>
          </div>
          <div className="review-content">
            <div className="review-item">
              <span className="review-label">Full Name</span>
              <span className="review-value">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="review-item">
              <span className="review-label">ID Number</span>
              <span className="review-value">{formData.idNumber}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Email</span>
              <span className="review-value">{formData.email}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Phone</span>
              <span className="review-value">{formData.phone}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Province</span>
              <span className="review-value">{formData.province}</span>
            </div>
            {formData.address && (
              <div className="review-item">
                <span className="review-label">Address</span>
                <span className="review-value">{formData.address}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Rehabilitation Card */}
        <div className="review-card">
          <div className="review-header">
            <Shield size={20} />
            <h3>Rehabilitation Journey</h3>
            <button 
              className="review-edit"
              onClick={() => setCurrentStep(2)}
            >
              Edit
            </button>
          </div>
          <div className="review-content">
            <div className="review-item">
              <span className="review-label">Facility</span>
              <span className="review-value">{formData.facility}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Release Date</span>
              <span className="review-value">{formData.releaseDate}</span>
            </div>
            {formData.sentenceDuration && (
              <div className="review-item">
                <span className="review-label">Sentence Duration</span>
                <span className="review-value">{formData.sentenceDuration}</span>
              </div>
            )}
            <div className="review-item">
              <span className="review-label">Behavior Level</span>
              <span className="review-value">{formData.behaviorLevel}</span>
            </div>
            {formData.caseNumber && (
              <div className="review-item">
                <span className="review-label">Case Number</span>
                <span className="review-value">{formData.caseNumber}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Skills & Education Card */}
        <div className="review-card">
          <div className="review-header">
            <GraduationCap size={20} />
            <h3>Skills & Qualifications</h3>
            <button 
              className="review-edit"
              onClick={() => setCurrentStep(3)}
            >
              Edit
            </button>
          </div>
          <div className="review-content">
            <div className="review-item full-width">
              <span className="review-label">Skills ({formData.skills.length})</span>
              <div className="review-tags">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="review-tag">{skill}</span>
                ))}
              </div>
            </div>
            {formData.certifications && (
              <div className="review-item">
                <span className="review-label">Certifications</span>
                <span className="review-value">{formData.certifications}</span>
              </div>
            )}
            {formData.educationLevel && (
              <div className="review-item">
                <span className="review-label">Education</span>
                <span className="review-value">{formData.educationLevel}</span>
              </div>
            )}
            <div className="review-item">
              <span className="review-label">Languages</span>
              <span className="review-value">{formData.languages.join(', ')}</span>
            </div>
            {formData.workExperience && (
              <div className="review-item full-width">
                <span className="review-label">Work Experience</span>
                <span className="review-value">{formData.workExperience}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Agreements Section */}
      <div className="agreements-section">
        <div className="agreement-item">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={(e) => handleChange(e)}
            className="agreement-checkbox"
            id="agreeToTerms"
          />
          <label htmlFor="agreeToTerms" className="agreement-text">
            I agree to the <span className="agreement-highlight">Terms and Conditions</span> and confirm that all information provided is accurate to the best of my knowledge.
          </label>
        </div>
        
        <div className="agreement-item">
          <input
            type="checkbox"
            name="agreeToVerification"
            checked={formData.agreeToVerification}
            onChange={(e) => handleChange(e)}
            className="agreement-checkbox"
            id="agreeToVerification"
          />
          <label htmlFor="agreeToVerification" className="agreement-text">
            I consent to the <span className="agreement-highlight">Department of Correctional Services (DCS)</span> verifying my rehabilitation information.
          </label>
        </div>
        
        <div className="agreement-item">
          <input
            type="checkbox"
            name="agreeToContact"
            checked={formData.agreeToContact}
            onChange={(e) => handleChange(e)}
            className="agreement-checkbox"
            id="agreeToContact"
          />
          <label htmlFor="agreeToContact" className="agreement-text">
            I agree to be contacted by potential employers through the RE-Link platform.
          </label>
        </div>
        
        <div className="agreement-item">
          <input
            type="checkbox"
            name="agreeToBackgroundCheck"
            checked={formData.agreeToBackgroundCheck}
            onChange={(e) => handleChange(e)}
            className="agreement-checkbox"
            id="agreeToBackgroundCheck"
          />
          <label htmlFor="agreeToBackgroundCheck" className="agreement-text">
            I consent to a background check as part of the employer verification process.
          </label>
        </div>
      </div>
      
      {formErrors.agreements && (
        <div className="error-alert">
          <p className="error-text">{formErrors.agreements}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSubmit;