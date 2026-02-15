import React, { useState, useEffect, useCallback } from "react";
import { 
  User, Briefcase, Shield, HeartHandshake,
  Sparkles, Zap, CheckCircle, Users, TrendingUp,
  Rocket, Award, BadgeCheck, Target, Globe,
  ArrowLeft, LogOut, ArrowUpRight, Loader2,
  ChevronRight, MapPin, Building2, Mail,
  Phone, Clock, Star
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./UserRecruiterRegistration.css";

// Import your logo
import ReLinkLogo from "../assets/RelinkLOGO.jpeg";

function UserRecruiterRegistration() {
  const navigate = useNavigate();
  
  // State management
  const [logoHover, setLogoHover] = useState(false);
  const [titleGlow, setTitleGlow] = useState(false);
  const [floatingDots, setFloatingDots] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [titlePulse, setTitlePulse] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [logoScale, setLogoScale] = useState(1);

  // Generate floating animation dots
  useEffect(() => {
    const dots = [];
    for (let i = 0; i < 40; i++) {
      dots.push({
        id: i,
        size: Math.random() * 6 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 40 + 20,
        delay: Math.random() * 20,
        opacity: Math.random() * 0.2 + 0.05
      });
    }
    setFloatingDots(dots);
  }, []);

  // Continuous rotation animation for logo
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Logo hover scale effect
  useEffect(() => {
    if (logoHover) {
      setLogoScale(1.1);
    } else {
      setLogoScale(1);
    }
  }, [logoHover]);

  // Title glow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGlow(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Title pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitlePulse(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle option selection
  const handleSelectOption = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  // Handle continue button click
  const handleContinue = useCallback(() => {
    if (!selectedOption) return;
    
    setIsLoading(true);
    setShowSuccess(false);
    
    // Simulate loading with success feedback
    setTimeout(() => {
      setShowSuccess(true);
      
      // Navigate after showing success
      setTimeout(() => {
        if (selectedOption === 'user') {
          navigate('/register');
        } else if (selectedOption === 'recruiter') {
          navigate('/recruiter-register');
        }
        setIsLoading(false);
        setShowSuccess(false);
      }, 600);
    }, 800);
  }, [selectedOption, navigate]);

  // Handle direct card click
  const handleCardClick = useCallback((option) => {
    setSelectedOption(option);
    
    // Visual feedback before navigation
    setIsLoading(true);
    
    setTimeout(() => {
      if (option === 'user') {
        navigate('/register');
      } else if (option === 'recruiter') {
        navigate('/recruiter-register');
      }
      setIsLoading(false);
    }, 400);
  }, [navigate]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '1' || e.key === '2') {
        const option = e.key === '1' ? 'user' : 'recruiter';
        handleCardClick(option);
      } else if (e.key === 'Enter' && selectedOption) {
        handleContinue();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedOption, handleCardClick, handleContinue, navigate]);

  return (
    <div className="registration-choice-page">
      {/* Animated Background Gradient */}
      <div className="background-gradient">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      {/* Floating Dots Background */}
      <div className="floating-dots-container">
        {floatingDots.map(dot => (
          <div
            key={dot.id}
            className="floating-dot"
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
              opacity: dot.opacity
            }}
          />
        ))}
      </div>

      {/* Header with Enhanced Spinning Logo Animation */}
      <header className="registration-header">
        <div className="header-container">
          {/* Logo with 3D Spin Animation */}
          <Link to="/" className="logo-link" aria-label="Return to homepage">
            <div 
              className={`logo-container ${logoHover ? 'hover' : ''}`}
              onMouseEnter={() => setLogoHover(true)}
              onMouseLeave={() => setLogoHover(false)}
            >
              {/* Outer glow ring */}
              <div className={`logo-glow ${logoHover ? 'active' : ''}`} />
              
              {/* Pulse ring */}
              <div className="logo-pulse" />
              
              {/* Orbital rings with cross animation */}
              <div className="logo-orbital orbital-1">
                <div className="orbital-ring" />
                <div className="orbital-ring ring-2" />
              </div>
              <div className="logo-orbital orbital-2">
                <div className="orbital-ring" />
                <div className="orbital-ring ring-2" />
              </div>
              
              {/* Main logo with spin */}
              <div 
                className="logo-spin-container"
                style={{
                  transform: `rotate(${rotationAngle}deg) scale(${logoScale})`,
                  transition: 'transform 0.3s ease'
                }}
              >
                <div className="logo-inner-spin">
                  <img 
                    src={ReLinkLogo} 
                    alt="RE-Link Logo" 
                    className={`logo-image ${logoHover ? 'hover' : ''}`}
                  />
                </div>
              </div>
              
              {/* Logo text */}
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
                  <span className="slogan-text">Second Chances, Real Connections</span>
                  <Star size={12} className="slogan-star" />
                </p>
              </div>
            </div>
          </Link>
          
          {/* Header Right */}
          <div className="header-right">
            <div className="header-contact">
              <div className="contact-item">
                <Phone size={14} />
                <span>0800 123 456</span>
              </div>
              <div className="contact-item">
                <Mail size={14} />
                <span>support@re-link.co.za</span>
              </div>
            </div>
            <div className="login-prompt">
              <span className="prompt-text">Already registered?</span>
              <Link to="/login" className="login-link">
                <LogOut size={16} />
                <span>Sign In</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="registration-main">
        <div className="main-header">
          <div className="header-badge">
            <Sparkles size={20} />
            <span>Join the RE-Link Community</span>
            <Zap size={16} className="badge-spark" />
          </div>
          
          {/* Enhanced Title with Animation */}
          <div className="title-container">
            <div className="title-background">
              <div className="title-layer">Choose Your Registration Type</div>
              <div className="title-layer layer-2">Choose Your Registration Type</div>
            </div>
            
            <div className={`title-foreground ${titleGlow ? 'glow' : ''} ${titlePulse ? 'pulse' : ''}`}>
              <h1 className="title-static">
                How would you like to <span className="title-highlight">join RE-Link?</span>
              </h1>
              <div className="title-animated">
                <div className="title-slide">
                  Select your account type to continue
                </div>
              </div>
            </div>
          </div>
          
          <p className="main-subtitle">
            Choose the account type that best describes you. Whether you're seeking opportunities or looking to hire,
            RE-Link provides the platform for meaningful connections.
            <span className="subtitle-highlight"> Your journey starts here!</span>
          </p>
          
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
                <Building2 size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">247+</span>
                <span className="stat-label">Employers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Choice Cards Container */}
        <div className="choice-container">
          <div className="choice-grid">
            {/* Job Seeker Card */}
            <div 
              className={`choice-card ${selectedOption === 'user' ? 'selected' : ''} ${hoveredCard === 'user' ? 'hovered' : ''} ${isLoading && selectedOption === 'user' ? 'loading' : ''}`}
              onClick={() => handleCardClick('user')}
              onMouseEnter={() => setHoveredCard('user')}
              onMouseLeave={() => setHoveredCard(null)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleCardClick('user')}
              aria-label="Select Job Seeker registration"
            >
              <div className="card-glow" />
              <div className="card-content">
                <div className="card-icon-wrapper user-icon">
                  <User size={56} />
                </div>
                <h2 className="card-title">Job Seeker</h2>
                <p className="card-description">
                  I'm looking for employment opportunities, skills development, 
                  and career support after rehabilitation.
                </p>
                
                <div className="card-features">
                  <div className="feature-item">
                    <CheckCircle size={16} />
                    <span>Access to 1,845+ jobs</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={16} />
                    <span>Skills development programs</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={16} />
                    <span>Mentorship network</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={16} />
                    <span>Career coaching</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle size={16} />
                    <span>DCS verified profile</span>
                  </div>
                </div>

                <div className="card-stats">
                  <div className="card-stat">
                    <span className="stat-number">94%</span>
                    <span className="stat-label">Success Rate</span>
                  </div>
                  <div className="card-stat">
                    <span className="stat-number">3.4k+</span>
                    <span className="stat-label">Members</span>
                  </div>
                  <div className="card-stat">
                    <span className="stat-number">53</span>
                    <span className="stat-label">Communities</span>
                  </div>
                </div>

                <div className="card-action">
                  <span>Select Job Seeker</span>
                  <ChevronRight size={18} />
                </div>

                {selectedOption === 'user' && (
                  <div className="selected-indicator">
                    <CheckCircle size={24} />
                    <span>Selected</span>
                  </div>
                )}
              </div>
            </div>

            {/* Recruiter Card */}
            <div 
              className={`choice-card ${selectedOption === 'recruiter' ? 'selected' : ''} ${hoveredCard === 'recruiter' ? 'hovered' : ''} ${isLoading && selectedOption === 'recruiter' ? 'loading' : ''}`}
              onClick={() => handleCardClick('recruiter')}
              onMouseEnter={() => setHoveredCard('recruiter')}
              onMouseLeave={() => setHoveredCard(null)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleCardClick('recruiter')}
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

                {selectedOption === 'recruiter' && (
                  <div className="selected-indicator">
                    <CheckCircle size={24} />
                    <span>Selected</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="shortcuts-hint">
            <span className="hint-item">
              <kbd>1</kbd> Job Seeker
            </span>
            <span className="hint-item">
              <kbd>2</kbd> Recruiter
            </span>
            <span className="hint-item">
              <kbd>Enter</kbd> Continue
            </span>
            <span className="hint-item">
              <kbd>Esc</kbd> Home
            </span>
          </div>

          {/* Action Buttons */}
          <div className="choice-actions">
            <Link to="/" className="back-button">
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>

            <button
              onClick={handleContinue}
              disabled={!selectedOption || isLoading}
              className={`continue-button ${selectedOption ? 'active' : ''} ${showSuccess ? 'success' : ''}`}
              aria-label="Continue with registration"
            >
              {isLoading ? (
                <>
                  <Loader2 className="spinner-icon" size={20} />
                  <span>Processing...</span>
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle size={20} />
                  <span>Success! Redirecting...</span>
                </>
              ) : (
                <>
                  <span>Continue with {selectedOption === 'user' ? 'Job Seeker' : selectedOption === 'recruiter' ? 'Recruiter' : ''} Registration</span>
                  <Rocket size={20} className="button-icon" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div className="support-section">
          <h3 className="support-title">Why Choose RE-Link?</h3>
          <div className="support-grid">
            <div className="support-item">
              <div className="support-icon">
                <BadgeCheck size={24} />
              </div>
              <div className="support-content">
                <h4>DCS Verified</h4>
                <p>All profiles verified by Department of Correctional Services</p>
              </div>
            </div>
            <div className="support-item">
              <div className="support-icon">
                <Shield size={24} />
              </div>
              <div className="support-content">
                <h4>Secure & Confidential</h4>
                <p>Your information is protected with enterprise-grade encryption</p>
              </div>
            </div>
            <div className="support-item">
              <div className="support-icon">
                <Target size={24} />
              </div>
              <div className="support-content">
                <h4>Smart Matching</h4>
                <p>AI-powered algorithm for perfect matches</p>
              </div>
            </div>
            <div className="support-item">
              <div className="support-icon">
                <Globe size={24} />
              </div>
              <div className="support-content">
                <h4>Nationwide Coverage</h4>
                <p>Active in all 9 South African provinces</p>
              </div>
            </div>
            <div className="support-item">
              <div className="support-icon">
                <Clock size={24} />
              </div>
              <div className="support-content">
                <h4>24/7 Support</h4>
                <p>Round-the-clock assistance for all users</p>
              </div>
            </div>
            <div className="support-item">
              <div className="support-icon">
                <TrendingUp size={24} />
              </div>
              <div className="support-content">
                <h4>Career Growth</h4>
                <p>Continuous development and advancement opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="trust-indicators">
          <div className="trust-badge">
            <Award size={16} />
            <span>NPO Registration: 123-456</span>
          </div>
          <div className="trust-badge">
            <BadgeCheck size={16} />
            <span>B-BBEE Level 1 Contributor</span>
          </div>
          <div className="trust-badge">
            <Shield size={16} />
            <span>POPIA Compliant</span>
          </div>
          <div className="trust-badge">
            <CheckCircle size={16} />
            <span>DCS Official Partner</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="registration-footer">
        <div className="footer-glow" />
        <div className="footer-container">
          <div className="footer-logo">
            <div className="footer-logo-container">
              <img 
                src={ReLinkLogo} 
                alt="RE-Link" 
                className="footer-logo-img"
                style={{
                  animation: 'subtleFloat 3s ease-in-out infinite'
                }}
              />
              <div className="footer-logo-glow" />
            </div>
            <div className="footer-logo-text">
              <h3>RE-LINK</h3>
              <p className="footer-slogan">Second Chances, Real Connections</p>
              <p className="footer-partnership">Official Partner: Department of Correctional Services South Africa</p>
            </div>
          </div>
          <div className="footer-info">
            <p className="footer-copyright">
              © {new Date().getFullYear()} RE-Link South Africa. All rights reserved.
            </p>
            <p className="footer-certs">
              <span className="footer-cert">
                <Shield size={14} />
                <span>POPIA Compliant</span>
              </span>
              <span className="divider">•</span>
              <span className="footer-cert">
                <BadgeCheck size={14} />
                <span>B-BBEE Contributor</span>
              </span>
              <span className="divider">•</span>
              <span className="footer-cert">
                <Award size={14} />
                <span>NPO: 123-456</span>
              </span>
              <span className="divider">•</span>
              <span className="footer-cert">
                <CheckCircle size={14} />
                <span>DCS Partner</span>
              </span>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-disclaimer">
            This platform is proudly South African and complies with all relevant legislation including POPIA and EE Act.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default UserRecruiterRegistration;