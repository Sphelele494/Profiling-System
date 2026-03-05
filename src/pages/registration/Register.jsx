import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertCircle, Sparkles, Zap, CheckCircle, Shield, Users, TrendingUp, HeartHandshake, Clock } from 'lucide-react';
import { useRegistration, stepTitles, titleColors, steps } from './hooks/useRegistration';
import RegistrationLayout from './layout';
import FloatingDots from './components/FloatingDots';
import ProgressSteps from './components/ProgressSteps';
import FormNavigation from './components/FormNavigation'; // This is now the top bar
import PersonalDetails from './steps/PersonalDetails';
import Rehabilitation from './steps/Rehabilitation';
import SkillsEducation from './steps/SkillsEducation';
import ReviewSubmit from './steps/ReviewSubmit';
import "./styles/Register.css";

function Register() {
  const location = useLocation();
  
  // Get user type from location state or default to 'jobseeker'
  const userType = location.state?.userType || 'jobseeker';
  
  const {
    // State
    currentStep,
    showPassword,
    formErrors,
    passwordStrength,
    skillSearch,
    loading,
    validFields,
    fieldFocus,
    stepTransition,
    formData,
    
    // Data constants
    saProvinces,
    saSkills,
    saFacilities,
    educationLevels,
    saLanguages,
    
    // Setters
    setShowPassword,
    setSkillSearch,
    setFieldFocus,
    setCurrentStep,
    
    // Handlers
    handleChange,
    handleSkillToggle,
    handleLanguageToggle,
    nextStep,
    prevStep,
    handleSubmit,
    getIconGlowClass,
    isCurrentStepValid,
    filteredSkills
  } = useRegistration(userType);

  // Update document title based on user type
  useEffect(() => {
    document.title = userType === 'jobseeker' 
      ? 'Job Seeker Registration - RE-LINK' 
      : 'Recruiter Registration - RE-LINK';
  }, [userType]);

  return (
    <div className="register-page">
      {/* Background Effects */}
      <div className="register-bg-gradient"></div>
      <FloatingDots />
      
      {/* Top Navigation Bar - Using FormNavigation */}
      <FormNavigation 
        currentStep={currentStep}
        totalSteps={4}
        userType={userType}
      />

      <main className="register-main-content">
        <div className="register-container">
          
          {/* Header Section with User Type Badge */}
          <div className="register-header-section">
            <div className="register-type-badge">
              <span className="register-type-icon">
                {userType === 'jobseeker' ? '👤' : '👔'}
              </span>
              <span className="register-type-text">
                {userType === 'jobseeker' ? 'Job Seeker Registration' : 'Recruiter Registration'}
              </span>
            </div>

            <div className="register-welcome-badge">
              <Sparkles size={18} />
              <span>{userType === 'jobseeker' ? 'Begin Your Journey' : 'Start Building Your Team'}</span>
              <Zap size={14} className="register-badge-spark" />
            </div>
            
            {/* Animated Title */}
            <div className="register-title-wrapper">
              <h1 className="register-title-main">
                Create Your{' '}
                <span className="register-title-highlight">
                  {userType === 'jobseeker' ? 'Professional Profile' : 'Company Profile'}
                </span>
              </h1>
              <div className="register-title-steps">
                {stepTitles.map((title, index) => (
                  <div
                    key={index}
                    className={`register-step-title ${currentStep === index + 1 ? 'active' : ''}`}
                    style={{ color: titleColors[index] }}
                  >
                    {title}
                  </div>
                ))}
              </div>
            </div>
            
            <p className="register-description">
              {userType === 'jobseeker' 
                ? 'Complete your registration in 4 simple steps. Your information is secure and will only be shared with verified employers.'
                : 'Complete your company registration in 4 simple steps. Connect with qualified candidates and build your team.'}
            </p>
            
            {/* Stats Grid */}
            <div className="register-stats-grid">
              <div className="register-stat-card">
                <div className="register-stat-icon">
                  <CheckCircle size={24} />
                </div>
                <div className="register-stat-content">
                  <span className="register-stat-number">94%</span>
                  <span className="register-stat-label">
                    {userType === 'jobseeker' ? 'Job Match Rate' : 'Hire Success'}
                  </span>
                </div>
              </div>
              
              <div className="register-stat-card">
                <div className="register-stat-icon">
                  <Shield size={24} />
                </div>
                <div className="register-stat-content">
                  <span className="register-stat-number">100%</span>
                  <span className="register-stat-label">Secure & Verified</span>
                </div>
              </div>
              
              <div className="register-stat-card">
                <div className="register-stat-icon">
                  <Users size={24} />
                </div>
                <div className="register-stat-content">
                  <span className="register-stat-number">3.4k+</span>
                  <span className="register-stat-label">
                    {userType === 'jobseeker' ? 'Active Seekers' : 'Companies'}
                  </span>
                </div>
              </div>
              
              <div className="register-stat-card">
                <div className="register-stat-icon">
                  <TrendingUp size={24} />
                </div>
                <div className="register-stat-content">
                  <span className="register-stat-number">78%</span>
                  <span className="register-stat-label">
                    {userType === 'jobseeker' ? 'Placement Rate' : 'Match Rate'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <ProgressSteps 
            steps={steps} 
            currentStep={currentStep} 
            userType={userType} 
          />

          {/* Form Card */}
          <div className={`register-form-card ${stepTransition ? 'transitioning' : ''}`}>
            
            {/* Error Alert */}
            {formErrors.submit && (
              <div className="register-error-alert">
                <AlertCircle className="register-error-icon" size={20} />
                <div className="register-error-content">
                  <p className="register-error-title">Registration Error</p>
                  <p className="register-error-message">{formErrors.submit}</p>
                </div>
              </div>
            )}

            {/* Hidden input for user type */}
            <input type="hidden" name="userType" value={userType} />

            {/* Step Components */}
            <div className="register-step-content">
              {currentStep === 1 && (
                <PersonalDetails
                  formData={formData}
                  formErrors={formErrors}
                  validFields={validFields}
                  fieldFocus={fieldFocus}
                  showPassword={showPassword}
                  passwordStrength={passwordStrength}
                  saProvinces={saProvinces}
                  handleChange={handleChange}
                  setShowPassword={setShowPassword}
                  setFieldFocus={setFieldFocus}
                  getIconGlowClass={getIconGlowClass}
                  userType={userType}
                />
              )}

              {currentStep === 2 && (
                <Rehabilitation
                  formData={formData}
                  formErrors={formErrors}
                  saFacilities={saFacilities}
                  handleChange={handleChange}
                  setFieldFocus={setFieldFocus}
                  fieldFocus={fieldFocus}
                  userType={userType}
                />
              )}

              {currentStep === 3 && (
                <SkillsEducation
                  formData={formData}
                  formErrors={formErrors}
                  skillSearch={skillSearch}
                  filteredSkills={filteredSkills}
                  saSkills={saSkills}
                  educationLevels={educationLevels}
                  saLanguages={saLanguages}
                  handleChange={handleChange}
                  setSkillSearch={setSkillSearch}
                  handleSkillToggle={handleSkillToggle}
                  handleLanguageToggle={handleLanguageToggle}
                  userType={userType}
                />
              )}

              {currentStep === 4 && (
                <ReviewSubmit
                  formData={formData}
                  formErrors={formErrors}
                  setCurrentStep={setCurrentStep}
                  userType={userType}
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="register-navigation">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="register-nav-button register-nav-prev"
                  disabled={loading}
                >
                  ← Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="register-nav-button register-nav-next"
                  disabled={!isCurrentStepValid() || loading}
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="register-nav-button register-nav-submit"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Submit Registration'}
                </button>
              )}
            </div>
          </div>

          {/* Support Section */}
          <div className="register-support-section">
            <div className="register-support-content">
              <div className="register-support-icon">
                <HeartHandshake size={32} />
              </div>
              <div className="register-support-text">
                <h4>Need assistance?</h4>
                <p>Our support team is here to help you every step of the way.</p>
                <a href="/support" className="register-support-link">
                  Contact Support →
                </a>
              </div>
            </div>
            
            <div className="register-timeline">
              <div className="register-timeline-item">
                <span className="register-timeline-number">1</span>
                <div className="register-timeline-info">
                  <h5>DCS Verification</h5>
                  <p>24-48 hours</p>
                </div>
              </div>
              <div className="register-timeline-item">
                <span className="register-timeline-number">2</span>
                <div className="register-timeline-info">
                  <h5>Profile Review</h5>
                  <p>48-72 hours</p>
                </div>
              </div>
              <div className="register-timeline-item">
                <span className="register-timeline-number">3</span>
                <div className="register-timeline-info">
                  <h5>{userType === 'jobseeker' ? 'Job Matching' : 'Candidate Matching'}</h5>
                  <p>Ongoing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="register-footer">
        <div className="register-footer-content">
          <div className="register-footer-info">
            <p>© 2026 RE-LINK. All rights reserved.</p>
            <div className="register-footer-links">
              <span>Privacy Policy</span>
              <span className="register-footer-divider">•</span>
              <span>Terms of Service</span>
              <span className="register-footer-divider">•</span>
              <span>POPIA Compliance</span>
            </div>
          </div>
          <div className="register-footer-badge">
            <Shield size={14} />
            <span>POPIA Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Register;