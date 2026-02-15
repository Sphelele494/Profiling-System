import React, { useState, useEffect, useCallback } from "react";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, 
  Shield, ShieldCheck, Users, Sparkles, Zap,
  LogIn, HeartHandshake, CheckCircle, AlertCircle,
  Fingerprint, ArrowLeft, Home, Globe, Key,
  User, Phone, MapPin, ExternalLink, Briefcase,
  UserCheck, Building
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

// Import your logo
import ReLinkLogo from "../assets/RelinkLOGO.jpeg";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [logoHover, setLogoHover] = useState(false);
  const [titleGlow, setTitleGlow] = useState(false);
  const [floatingDots, setFloatingDots] = useState([]);
  const [cardGlow, setCardGlow] = useState(false);
  const [validFields, setValidFields] = useState({});
  const [fieldFocus, setFieldFocus] = useState({});
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [userType, setUserType] = useState("job-seeker");

  // Get any registration success message from navigation state
  const registrationMessage = location.state?.message;
  const registeredEmail = location.state?.email;

  // Initialize with demo credentials if in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setFormData({
        email: "demo@relink.co.za",
        password: "Demo123!"
      });
    }

    // Check for saved credentials
    const savedEmail = localStorage.getItem('relink_email');
    const savedRememberMe = localStorage.getItem('relink_remember') === 'true';
    
    if (savedEmail && savedRememberMe) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }

    // Show registration success message if available
    if (registrationMessage) {
      setSuccessMessage(registrationMessage);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, [registrationMessage]);

  // Generate floating animation dots
  useEffect(() => {
    const dots = [];
    for (let i = 0; i < 15; i++) {
      dots.push({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    setFloatingDots(dots);
  }, []);

  // Title glow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGlow(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Enhanced field validation
  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case 'password':
        return value.length >= 6;
      default:
        return true;
    }
  }, []);

  // Update field validation status
  const updateFieldValidation = useCallback((name, value) => {
    const isValid = validateField(name, value);
    setValidFields(prev => ({
      ...prev,
      [name]: value ? isValid : null
    }));
  }, [validateField]);

  // Handle field change with validation
  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    updateFieldValidation(id, value);
    
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
    if (loginError) setLoginError("");
  }, [errors, loginError, updateFieldValidation]);

  // Calculate password strength for visual feedback
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    const checks = {
      length: formData.password.length >= 6,
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      number: /[0-9]/.test(formData.password),
      special: /[^A-Za-z0-9]/.test(formData.password)
    };
    
    Object.values(checks).forEach(check => {
      if (check) strength += 20;
    });
    
    setPasswordStrength(strength);
  }, [formData.password]);

  // Enhanced validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateField('email', formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  // Enhanced login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setSuccessMessage("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    const submitBtn = e.target.querySelector('.submit-button');
    if (submitBtn) {
      submitBtn.classList.add('clicked');
      setTimeout(() => submitBtn.classList.remove('clicked'), 300);
    }
    
    setTimeout(() => {
      if (rememberMe) {
        localStorage.setItem('relink_email', formData.email);
        localStorage.setItem('relink_remember', 'true');
      } else {
        localStorage.removeItem('relink_email');
        localStorage.removeItem('relink_remember');
      }
      
      localStorage.setItem('relink_token', 'demo-token-12345');
      localStorage.setItem('relink_user', JSON.stringify({
        email: formData.email,
        name: formData.email.split('@')[0],
        type: userType
      }));
      
      setSuccessMessage('Login successful! Redirecting...');
      setCardGlow(true);
      
      setTimeout(() => setCardGlow(false), 1000);
      
      setTimeout(() => {
        setIsLoading(false);
        if (userType === 'job-seeker') {
          navigate('/home');
        } else if (userType === 'recruiter') {
          navigate('/recruiter-dashboard');
        }
      }, 1500);
    }, 1000);
  };

  // Handle user type toggle
  const handleUserTypeToggle = (type) => {
    setUserType(type);
    const buttons = document.querySelectorAll('.user-type-toggle-btn');
    buttons.forEach(btn => {
      if (btn.dataset.type === type) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
  };

  // Forgot password handler
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  // Get icon glow class based on field validation
  const getIconGlowClass = useCallback((fieldName) => {
    if (!fieldFocus[fieldName] && !formData[fieldName]) return "";
    if (validFields[fieldName] === true) return "icon-glow-valid";
    if (validFields[fieldName] === false) return "icon-glow-invalid";
    return "";
  }, [fieldFocus, formData, validFields]);

  return (
    <div className="login-page">
      {/* Animated Background Gradient */}
      <div className="background-gradient"></div>
      
      {/* Floating Dots Background */}
      <div className="floating-dots-container">
        {floatingDots.map(dot => (
          <div
            key={dot.id}
            className="floating-dot"
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced Header with Logo */}
      <header className="login-header">
        <div className="header-container">
          <Link to="/" className="logo-link">
            <div 
              className="logo-container"
              onMouseEnter={() => setLogoHover(true)}
              onMouseLeave={() => setLogoHover(false)}
            >
              <div className={`logo-glow ${logoHover ? 'active' : ''}`}></div>
              <div className="logo-pulse"></div>
              <div className="logo-orbital">
                <div className="orbital-ring"></div>
                <div className="orbital-ring ring-2"></div>
              </div>
              <img 
                src={ReLinkLogo} 
                alt="RE-Link Logo" 
                className={`logo-image ${logoHover ? 'hover' : ''} ${logoLoaded ? 'loaded' : ''}`}
                onLoad={() => setLogoLoaded(true)}
              />
              <div className="logo-text">
                <div className="logo-main">
                  <h1 className="logo-title">RE-LINK</h1>
                  <div className="logo-badge">
                    <Shield size={12} />
                    <span>POPIA Compliant</span>
                  </div>
                </div>
                <p className="logo-slogan">
                  <HeartHandshake size={16} />
                  <span>Second Chances, Real Connections</span>
                </p>
              </div>
            </div>
          </Link>
          
          <div className="header-right">
            <div className="register-prompt">
              <span className="prompt-text">Don't have an account?</span>
              <Link to="/register" className="register-link">
                <ArrowRight size={16} />
                <span>Create Account</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="main-container">
          {/* Left Section - Branding & Info */}
          <div className="brand-section">
            <div className="brand-header">
              <div className="header-badge">
                <Sparkles size={20} />
                <span>Welcome Back to Your Journey</span>
                <Zap size={16} className="badge-spark" />
              </div>
              
              {/* Enhanced Title */}
              <div className={`title-container ${titleGlow ? 'glow' : ''}`}>
                <div className="title-static">
                  Sign In to <span className="title-highlight">RE-Link</span>
                </div>
                <div className="title-animated">
                  <div className="title-slide active">
                    Continue Your Reintegration Journey
                  </div>
                </div>
              </div>
              
              <p className="brand-subtitle">
                Access your professional profile, job matches, and career development resources.
                <span className="subtitle-highlight"> Your future awaits!</span>
              </p>
            </div>
            
            {/* User Type Toggle */}
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
                    data-type="job-seeker"
                    onClick={() => handleUserTypeToggle('job-seeker')}
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
                    data-type="recruiter"
                    onClick={() => handleUserTypeToggle('recruiter')}
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
            
            {/* Stats Banner */}
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
            </div>
            
            {/* Features List */}
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <div className="icon-circle">
                    <ShieldCheck size={18} />
                  </div>
                </div>
                <div className="feature-text">
                  <span className="feature-title">DCS Verified Profiles</span>
                  <span className="feature-desc">Officer-verified rehabilitation progress</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <div className="icon-circle">
                    <Users size={18} />
                  </div>
                </div>
                <div className="feature-text">
                  <span className="feature-title">Professional Network</span>
                  <span className="feature-desc">Connect with verified employers</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <div className="icon-circle">
                    <Key size={18} />
                  </div>
                </div>
                <div className="feature-text">
                  <span className="feature-title">Secure Access</span>
                  <span className="feature-desc">Enterprise-grade encryption</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className={`form-section ${cardGlow ? 'glowing' : ''}`}>
            <div className="form-wrapper">
              <div className="form-header">
                <h2 className="form-title">
                  <div className="form-icon-container">
                    <LogIn size={28} />
                  </div>
                  <span>Welcome Back</span>
                </h2>
                <p className="form-subtitle">Sign in to access your RE-Link dashboard and continue your journey</p>
                
                {registeredEmail && (
                  <div className="registration-notice">
                    <CheckCircle size={16} />
                    <span>Account created successfully for <strong>{registeredEmail}</strong></span>
                  </div>
                )}
              </div>

              {/* Status Messages */}
              {loginError && (
                <div className="error-alert">
                  <div className="error-content">
                    <AlertCircle className="error-icon" />
                    <div>
                      <p className="error-title">Login Error</p>
                      <p className="error-message">{loginError}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {successMessage && (
                <div className="success-alert">
                  <div className="success-content">
                    <CheckCircle className="success-icon" />
                    <div>
                      <p className="success-title">Success!</p>
                      <p className="success-message">{successMessage}</p>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form" noValidate>
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <Mail size={16} className="form-label-icon" />
                    <span>Email Address</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFieldFocus(prev => ({ ...prev, email: true }))}
                      onBlur={() => setFieldFocus(prev => ({ ...prev, email: false }))}
                      placeholder="you@example.com"
                      className={`form-input ${errors.email ? 'error' : ''} ${validFields.email ? 'valid' : ''}`}
                      disabled={isLoading}
                    />
                    {validFields.email && !errors.email && (
                      <CheckCircle size={16} className="input-valid-icon" />
                    )}
                  </div>
                  {errors.email && (
                    <div className="error-message">
                      <AlertCircle size={14} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <div className="password-label-row">
                    <label htmlFor="password" className="form-label">
                      <Lock size={16} className="form-label-icon" />
                      <span>Password</span>
                    </label>
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      <span>{showPassword ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFieldFocus(prev => ({ ...prev, password: true }))}
                      onBlur={() => setFieldFocus(prev => ({ ...prev, password: false }))}
                      placeholder="Enter your password"
                      className={`form-input ${errors.password ? 'error' : ''} ${validFields.password ? 'valid' : ''}`}
                      disabled={isLoading}
                    />
                    {validFields.password && !errors.password && (
                      <CheckCircle size={16} className="input-valid-icon" />
                    )}
                  </div>
                  {errors.password && (
                    <div className="error-message">
                      <AlertCircle size={14} />
                      <span>{errors.password}</span>
                    </div>
                  )}
                  
                  {/* Password Strength Indicator */}
                  {formData.password && !errors.password && (
                    <div className="password-strength">
                      <div className="strength-header">
                        <span>Password strength:</span>
                        <span className={`strength-value ${passwordStrength >= 75 ? 'strong' : passwordStrength >= 50 ? 'medium' : 'weak'}`}>
                          {passwordStrength}%
                        </span>
                      </div>
                      <div className="strength-bar">
                        <div 
                          className={`strength-fill ${passwordStrength >= 75 ? 'strength-strong' : passwordStrength >= 50 ? 'strength-medium' : 'strength-weak'}`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Options */}
                <div className="form-options">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-label">Remember me</span>
                  </label>
                  
                  <button
                    type="button"
                    className="forgot-password-btn"
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                  >
                    <Key size={14} />
                    <span>Forgot password?</span>
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`submit-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="spinner-icon" size={20} />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={20} />
                      <span>Sign In</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                {/* Form Footer */}
                <div className="form-footer">
                  <p className="signup-prompt">
                    New to RE-Link?{' '}
                    <Link to="/register" className="signup-link">
                      Create your professional profile
                      <ArrowRight size={14} />
                    </Link>
                  </p>
                  <p className="privacy-notice">
                    By signing in, you agree to our{' '}
                    <Link to="/terms">Terms</Link> and{' '}
                    <Link to="/privacy">Privacy Policy</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="login-footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src={ReLinkLogo} alt="RE-Link" className="footer-logo-img" />
            <div className="footer-logo-text">
              <h3>RE-LINK</h3>
              <p>Second Chances, Real Connections</p>
            </div>
          </div>
          <div className="footer-info">
            <p className="footer-copyright">
              © {new Date().getFullYear()} RE-Link South Africa. All rights reserved.
            </p>
            <div className="footer-certs">
              <span className="footer-cert">
                <Shield size={14} />
                <span>POPIA Compliant</span>
              </span>
              <span className="footer-cert">
                <ShieldCheck size={14} />
                <span>DCS Verified</span>
              </span>
              <span className="footer-cert">
                <Globe size={14} />
                <span>Secure SA Data</span>
              </span>
            </div>
          </div>
          <div className="footer-links">
            <Link to="/help">Help</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/security">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;