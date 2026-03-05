// File: src/pages/login/Login.jsx
import React, { useEffect, useState } from 'react';
import './styles/Login.css';
import { useLogin } from './hooks/useLogin';
import { GradientBackground } from './components/Background/GradientBackground';
import { FloatingDots } from './components/Background/FloatingDots';
import { LoginHeader } from './components/Header/LoginHeader';
import { BrandHeader } from './components/BrandSection/BrandHeader';
import { UserTypeToggle } from './components/BrandSection/UserTypeToggle';
import { StatsBanner } from './components/BrandSection/StatsBanner';
import { FeaturesList } from './components/BrandSection/FeaturesList';
import LoginForm from './components/Form/LoginForm';
import { ErrorAlert } from './components/Alerts/ErrorAlert';
import { SuccessAlert } from './components/Alerts/SuccessAlert';
import { LoginFooter } from './components/Footer/LoginFooter';

// Import LoadingHomeScreen component
import LoadingHomeScreen from './components/LoadingHomeScreen/LoadingHomeScreen';

// Import slideshow images
import slide1 from '../../assets/login-slideshow1.jpg';
import slide2 from '../../assets/login-slideshow2.jpg';
import slide3 from '../../assets/login-slideshow3.jpg';

function Login() {
  const {
    formData,
    errors,
    isLoading,
    rememberMe,
    showPassword,
    loginError,
    successMessage,
    validFields,
    fieldFocus,
    passwordStrength,
    userType,
    cardGlow,
    registeredEmail,
    showSignInLoading, // Added this from useLogin
    setRememberMe,
    setShowPassword,
    handleChange,
    handleSubmit,
    handleUserTypeToggle,
    handleForgotPassword,
    handleFieldFocus,
    handleFieldBlur,
  } = useLogin();

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slide1, slide2, slide3];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Prevent body scroll when needed
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // If showSignInLoading is true, show the loading home screen
  if (showSignInLoading) {
    return <LoadingHomeScreen userType={userType} userName="User" />;
  }

  return (
    <div className="login-page">
      {/* Background Elements */}
      <GradientBackground />
      <FloatingDots />
      
      {/* Header */}
      <LoginHeader />

      {/* Main Content */}
      <main className="login-main">
        <div className="main-container">
          {/* Left Section - Branding with Slideshow */}
          <div className="brand-section">
            {/* Slideshow Container */}
            <div className="slideshow-container">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                  style={{
                    backgroundImage: `url(${slide})`,
                  }}
                />
              ))}
              <div className="slideshow-overlay">
                <BrandHeader />
                {/* Welcome message removed from here */}
              </div>
              <div className="slideshow-indicators">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
            
            <UserTypeToggle 
              userType={userType} 
              onToggle={handleUserTypeToggle} 
            />
          </div>

          {/* Right Section - Login Card */}
          <div className="form-section-wrapper">
            <div className={`form-section ${cardGlow ? 'glowing' : ''}`}>
              {/* Welcome message moved to the top of the card */}
              <div className="card-welcome-message">
                <h2 className="welcome-title">Welcome Back to Your Journey</h2>
                <p className="welcome-subtitle">
                  Your future starts here. Sign in to access opportunities, 
                  connect with employers, and grow your career.
                </p>
              </div>
              
              <ErrorAlert message={loginError} />
              <SuccessAlert message={successMessage} />
              
              <LoginForm
                formData={formData}
                errors={errors}
                isLoading={isLoading}
                rememberMe={rememberMe}
                showPassword={showPassword}
                validFields={validFields}
                fieldFocus={fieldFocus}
                passwordStrength={passwordStrength}
                registeredEmail={registeredEmail}
                onSubmit={handleSubmit}
                onChange={handleChange}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onRememberMeChange={setRememberMe}
                onForgotPassword={handleForgotPassword}
                onFieldFocus={handleFieldFocus}
                onFieldBlur={handleFieldBlur}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <LoginFooter />
    </div>
  );
}

export default Login;