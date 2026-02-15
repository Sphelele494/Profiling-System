import React from 'react';
import { AlertCircle, Sparkles, Zap, CheckCircle, Shield, Users, TrendingUp, HeartHandshake, Clock } from 'lucide-react';
import { useRegistration, stepTitles, titleColors, steps } from './hooks/useRegistration';
import RegistrationLayout from './layout';
import FloatingDots from './components/FloatingDots';
import ProgressSteps from './components/ProgressSteps';
import FormNavigation from './components/FormNavigation';
import PersonalDetails from './steps/PersonalDetails';
import Rehabilitation from './steps/Rehabilitation';
import SkillsEducation from './steps/SkillsEducation';
import ReviewSubmit from './steps/ReviewSubmit';
import '../../../styles/registration/registration.css';

function Register() {
  const {
    // State
    currentStep,
    showPassword,
    formErrors,
    passwordStrength,
    skillSearch,
    loading,
    logoHover,
    titleGlow,
    floatingDots,
    cardGlow,
    validFields,
    fieldFocus,
    stepTransition,
    titlePulse,
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
    setLogoHover,
    setFieldFocus,
    
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
  } = useRegistration();

  return (
    <div className="register-page">
      {/* Background Effects */}
      <div className="background-gradient"></div>
      <FloatingDots dots={floatingDots} />

      <RegistrationLayout logoHover={logoHover} setLogoHover={setLogoHover}>
        {/* Header Section */}
        <div className="main-header">
          <div className="header-badge">
            <Sparkles size={20} />
            <span>Start Your Reintegration Journey</span>
            <Zap size={16} className="badge-spark" />
          </div>
          
          {/* Animated Title */}
          <div className="title-container">
            <div className="title-background">
              {stepTitles.map((title, index) => (
                <div
                  key={index}
                  className={`title-layer ${currentStep === index + 1 ? 'active' : ''}`}
                  style={{ color: titleColors[index] }}
                >
                  {title}
                </div>
              ))}
            </div>
            
            <div className={`title-foreground ${titleGlow ? 'glow' : ''} ${titlePulse ? 'pulse' : ''}`}>
              <div className="title-static">
                Create Your <span className="title-highlight">Professional Profile</span>
              </div>
              <div className="title-animated">
                {stepTitles.map((title, index) => (
                  <div
                    key={index}
                    className={`title-slide ${currentStep === index + 1 ? 'active' : ''}`}
                    style={{ 
                      color: titleColors[index % titleColors.length],
                      textShadow: `0 0 30px ${titleColors[index]}`
                    }}
                  >
                    {title}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <p className="main-subtitle">
            Complete your registration in 4 simple steps. Your information is secure and will only be shared with verified employers.
            <span className="subtitle-highlight"> Empower your future today!</span>
          </p>
          
          <div className="stats-banner">
            <div className="stat-item">
              <div className="stat-icon-container">
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">94%</span>
                <span className="stat-label">Job Match Success</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-container">
                <Shield size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">100%</span>
                <span className="stat-label">Secure & Verified</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-container">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">3,426+</span>
                <span className="stat-label">Members</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-container">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">78%</span>
                <span className="stat-label">Growth Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <ProgressSteps steps={steps} currentStep={currentStep} />

        {/* Form Container */}
        <div className={`form-wrapper ${cardGlow ? 'glowing' : ''} ${stepTransition ? 'transitioning' : ''}`}>
          <form onSubmit={handleSubmit} className="register-form">
            
            {/* Error Message */}
            {formErrors.submit && (
              <div className="error-alert">
                <div className="error-content">
                  <AlertCircle className="error-icon" />
                  <div>
                    <p className="error-title">Registration Error</p>
                    <p className="error-message">{formErrors.submit}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Personal Details */}
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
              />
            )}

            {/* Step 2: Rehabilitation */}
            {currentStep === 2 && (
              <Rehabilitation
                formData={formData}
                formErrors={formErrors}
                saFacilities={saFacilities}
                handleChange={handleChange}
                setFieldFocus={setFieldFocus}
                fieldFocus={fieldFocus}
              />
            )}

            {/* Step 3: Skills & Education */}
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
              />
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <ReviewSubmit
                formData={formData}
                formErrors={formErrors}
                setCurrentStep={setCurrentStep}
              />
            )}

            {/* Navigation Buttons */}
            <FormNavigation
              currentStep={currentStep}
              onPrev={prevStep}
              onNext={nextStep}
              onSubmit={handleSubmit}
              isCurrentStepValid={isCurrentStepValid()}
              loading={loading}
            />
          </form>
        </div>

        {/* Support Section */}
        <div className="support-section">
          <div className="support-content">
            <div className="support-icon">
              <HeartHandshake size={24} />
            </div>
            <div className="support-text">
              <h4>Need help with your registration?</h4>
              <p>Our support team is here to assist you with any questions.</p>
              <a href="/support" className="support-link">
                Contact Support
              </a>
            </div>
          </div>
          
          <div className="timeline-grid">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <h5>DCS Verification</h5>
              <p>24-48 hours</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <h5>Profile Review</h5>
              <p>48-72 hours</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <h5>Job Matching</h5>
              <p>Ongoing</p>
            </div>
          </div>
        </div>
      </RegistrationLayout>
    </div>
  );
}

export default Register;