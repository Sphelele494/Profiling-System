// File: src/pages/login/components/SignInLoadingScreen/SignInLoadingScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../../styles/SignInLoadingScreen.css';

// Import images
import relinkLogo1 from '../../../../assets/RelinkLOGO.jpeg';
import relinkLogo2 from '../../../../assets/ReLinkLogo2.jpeg';

const SignInLoadingScreen = ({ 
  message = "Signing you in securely...",
  userEmail = "",
  userType = "user" // "user" or "recruiter"
}) => {
  const [progress, setProgress] = useState(0);
  const [dice1Rotation, setDice1Rotation] = useState({ x: 0, y: 0 });
  const [dice2Rotation, setDice2Rotation] = useState({ x: 0, y: 0 });
  const [stage, setStage] = useState(1);
  
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Smooth rolling animation for dice
  useEffect(() => {
    const animateDice = () => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // Elegant rolling speeds
      const rot1X = (elapsed * 0.04) % 360;
      const rot1Y = (elapsed * 0.06) % 360;
      
      const rot2X = (elapsed * 0.05) % 360;
      const rot2Y = (elapsed * 0.07) % 360;
      
      setDice1Rotation({ x: rot1X, y: rot1Y });
      setDice2Rotation({ x: rot2X, y: rot2Y });
      
      animationFrameRef.current = requestAnimationFrame(animateDice);
    };

    animationFrameRef.current = requestAnimationFrame(animateDice);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Simulate loading progress - exactly 1.2 seconds
  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200; // 1.2 seconds in milliseconds
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      
      setProgress(calculatedProgress);
      
      // Update stage based on progress
      if (calculatedProgress < 30) setStage(1);
      else if (calculatedProgress < 60) setStage(2);
      else if (calculatedProgress < 90) setStage(3);
      else setStage(4);
      
      if (calculatedProgress >= 100) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Get user title based on type
  const getUserTitle = () => {
    if (userType === 'recruiter') return "Recruiter";
    return "User";
  };

  // Get welcome message based on user type
  const getWelcomeMessage = () => {
    if (!userEmail) return `Welcome back, ${getUserTitle()}`;
    const name = userEmail.split('@')[0];
    return `Welcome back, ${name}`;
  };

  // Stage messages based on user type
  const getStageMessage = () => {
    const messages = {
      1: userType === 'recruiter' ? "Verifying recruiter credentials..." : "Verifying your credentials...",
      2: "Establishing secure connection...",
      3: userType === 'recruiter' ? "Loading recruiter dashboard..." : "Loading your dashboard...",
      4: "Redirecting securely..."
    };
    return messages[stage];
  };

  return (
    <div className="signin-loading-screen">
      {/* Premium Background */}
      <div className="signin-premium-bg">
        <div className="signin-bg-gradient"></div>
        <div className="signin-bg-pattern"></div>
        <div className="signin-bg-ambient"></div>
      </div>

      {/* Main Container */}
      <div className="signin-premium-container">
        {/* Title Section */}
        <div className="signin-title-section">
          <h1 className="signin-main-title">RE-LINK</h1>
          <div className="signin-title-underline"></div>
          <p className="signin-welcome-message">
            {getWelcomeMessage()}
          </p>
          {userType === 'recruiter' && (
            <div className="recruiter-badge">
              <span className="recruiter-badge-icon">👔</span>
              <span className="recruiter-badge-text">Recruiter Access</span>
            </div>
          )}
        </div>

        {/* 3D Dice Showcase */}
        <div className="signin-dice-showcase">
          {/* First Dice - Security */}
          <div className="signin-dice-unit">
            <div className="signin-dice-label">Security</div>
            <div className="signin-dice-3d-wrapper">
              <div 
                className="signin-dice-emerald"
                style={{
                  transform: `rotateX(${dice1Rotation.x}deg) rotateY(${dice1Rotation.y}deg)`
                }}
              >
                <div className="signin-dice-face front">
                  <img src={relinkLogo1} alt="" className="signin-dice-logo" />
                </div>
                <div className="signin-dice-face back">
                  <img src={relinkLogo2} alt="" className="signin-dice-logo" />
                </div>
                <div className="signin-dice-face right">
                  <img src={relinkLogo1} alt="" className="signin-dice-logo" />
                </div>
                <div className="signin-dice-face left">
                  <img src={relinkLogo2} alt="" className="signin-dice-logo" />
                </div>
                <div className="signin-dice-face top">
                  <img src={relinkLogo1} alt="" className="signin-dice-logo" />
                </div>
                <div className="signin-dice-face bottom">
                  <img src={relinkLogo2} alt="" className="signin-dice-logo" />
                </div>
              </div>
              <div className="signin-dice-reflection"></div>
            </div>
            <div className="signin-dice-shadow"></div>
          </div>

          {/* Second Dice - Privacy */}
          <div className="signin-dice-unit">
            <div className="signin-dice-label">Privacy</div>
            <div className="signin-dice-3d-wrapper">
              <div 
                className="signin-dice-emerald"
                style={{
                  transform: `rotateX(${dice2Rotation.x}deg) rotateY(${dice2Rotation.y}deg)`
                }}
              >
                <div className="signin-dice-face front">
                  <img src={relinkLogo2} alt="" className="signin-dice-logo" />
                </div>
                <div className="signin-dice-face back">
                  <img src={relinkLogo1} alt="" className="signin-dice-logo" />
                </div>
                <div className="signin-dice-face right">
                  <img src={relinkLogo2} alt="" className="signin-dice-logo" />
                </div>
                <div className="signin-dice-face left">
                  <img src={relinkLogo1} alt="" className="signin-dice-logo" />
                </div>
                <div className="signin-dice-face top">
                  <img src={relinkLogo2} alt="" className="signin-dice-logo" />
                </div>
                <div className="signin-dice-face bottom">
                  <img src={relinkLogo1} alt="" className="signin-dice-logo" />
                </div>
              </div>
              <div className="signin-dice-reflection"></div>
            </div>
            <div className="signin-dice-shadow"></div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="signin-security-badge">
          <span className="security-icon">🔒</span>
          <span className="security-text">256-bit SSL Encrypted • POPIA Compliant</span>
        </div>

        {/* Loading Section */}
        <div className="signin-loading-section">
          <div className="signin-loading-info">
            <span className="signin-loading-label">{message}</span>
            <span className="signin-loading-percentage">{progress}%</span>
          </div>
          
          <div className="signin-loading-bar-container">
            <div className="signin-loading-bar-track">
              <div 
                className="signin-loading-bar-progress"
                style={{ width: `${progress}%` }}
              >
                <div className="signin-progress-glow"></div>
                <div className="signin-progress-particles">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="signin-loading-message">
            <span className="signin-message-dot"></span>
            <span className="signin-message-text">
              {getStageMessage()}
            </span>
          </div>
        </div>

        {/* Slogan */}
        <div className="signin-slogan">
          <span className="signin-slogan-text">Second Chances, Real Connections</span>
        </div>

        {/* Footer Note */}
        <div className="signin-footer-note">
          <span>⚡ Fast Secure Login • 1.2s</span>
        </div>
      </div>
    </div>
  );
};

export default SignInLoadingScreen;