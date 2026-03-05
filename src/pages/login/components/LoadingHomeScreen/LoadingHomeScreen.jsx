import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoadingHomeScreen.css';

// Import images
import relinkLogo1 from '../../../../assets/RelinkLOGO.jpeg';
import relinkLogo2 from '../../../../assets/ReLinkLogo2.jpeg';

const LoadingHomeScreen = ({ 
  userType = 'individual', 
  userName = '',
  userEmail = '' 
}) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [dice1Rotation, setDice1Rotation] = useState({ x: 0, y: 0 });
  const [dice2Rotation, setDice2Rotation] = useState({ x: 0, y: 0 });
  
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Get user display name
  const getDisplayName = () => {
    if (userName) return userName;
    if (userEmail) {
      return userEmail.split('@')[0];
    }
    return '';
  };

  const displayName = getDisplayName();
  const welcomeMessage = displayName ? `Welcome back, ${displayName}` : "Welcome back";

  // Smooth rolling animation - exactly the same as LoadingScreen
  useEffect(() => {
    const animateDice = () => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // Elegant rolling speeds - matching LoadingScreen
      const rot1X = (elapsed * 0.03) % 360;
      const rot1Y = (elapsed * 0.05) % 360;
      
      const rot2X = (elapsed * 0.04) % 360;
      const rot2Y = (elapsed * 0.06) % 360;
      
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

  // Simulate loading progress and navigate after 1.3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 13); // 13ms * 100 = 1.3 seconds

    const timer = setTimeout(() => {
      navigate('/home');
    }, 1300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [navigate]);

  return (
    <div className="home-loading-screen">
      {/* Premium Background - White */}
      <div className="home-premium-bg">
        <div className="home-bg-gradient"></div>
        <div className="home-bg-pattern"></div>
        <div className="home-bg-ambient"></div>
      </div>

      {/* Main Container */}
      <div className="home-premium-container">
        {/* Title Section - with welcome message */}
        <div className="home-title-section">
          <h1 className="home-main-title">RE-LINK</h1>
          <div className="home-title-underline"></div>
          <p className="home-welcome-text">{welcomeMessage}</p>
          {userType === 'recruiter' && (
            <div className="home-recruiter-tag">Recruiter</div>
          )}
        </div>

        {/* 3D Dice Section - Dark Emerald Green */}
        <div className="home-dice-showcase">
          {/* First Dice - Welcome */}
          <div className="home-dice-unit">
            <div className="home-dice-label">Welcome</div>
            <div className="home-dice-3d-wrapper">
              <div 
                className="home-dice-emerald"
                style={{
                  transform: `rotateX(${dice1Rotation.x}deg) rotateY(${dice1Rotation.y}deg)`
                }}
              >
                <div className="home-dice-face front">
                  <img src={relinkLogo1} alt="" className="home-dice-logo" />
                </div>
                <div className="home-dice-face back">
                  <img src={relinkLogo2} alt="" className="home-dice-logo" />
                </div>
                <div className="home-dice-face right">
                  <img src={relinkLogo1} alt="" className="home-dice-logo" />
                </div>
                <div className="home-dice-face left">
                  <img src={relinkLogo2} alt="" className="home-dice-logo" />
                </div>
                <div className="home-dice-face top">
                  <img src={relinkLogo1} alt="" className="home-dice-logo" />
                </div>
                <div className="home-dice-face bottom">
                  <img src={relinkLogo2} alt="" className="home-dice-logo" />
                </div>
              </div>
              <div className="home-dice-reflection"></div>
            </div>
            <div className="home-dice-shadow"></div>
          </div>

          {/* Second Dice - Home */}
          <div className="home-dice-unit">
            <div className="home-dice-label">Home</div>
            <div className="home-dice-3d-wrapper">
              <div 
                className="home-dice-emerald"
                style={{
                  transform: `rotateX(${dice2Rotation.x}deg) rotateY(${dice2Rotation.y}deg)`
                }}
              >
                <div className="home-dice-face front">
                  <img src={relinkLogo2} alt="" className="home-dice-logo" />
                </div>
                <div className="home-dice-face back">
                  <img src={relinkLogo1} alt="" className="home-dice-logo" />
                </div>
                <div className="home-dice-face right">
                  <img src={relinkLogo2} alt="" className="home-dice-logo" />
                </div>
                <div className="home-dice-face left">
                  <img src={relinkLogo1} alt="" className="home-dice-logo" />
                </div>
                <div className="home-dice-face top">
                  <img src={relinkLogo2} alt="" className="home-dice-logo" />
                </div>
                <div className="home-dice-face bottom">
                  <img src={relinkLogo1} alt="" className="home-dice-logo" />
                </div>
              </div>
              <div className="home-dice-reflection"></div>
            </div>
            <div className="home-dice-shadow"></div>
          </div>
        </div>

        {/* Slogan Section */}
        <div className="home-slogan-section">
          <div className="home-slogan-decoration left"></div>
          <p className="home-slogan-text">Second Chances, Real Connections</p>
          <div className="home-slogan-decoration right"></div>
        </div>

        {/* Loading Bar Section */}
        <div className="home-loading-section">
          <div className="home-loading-info">
            <span className="home-loading-label">Preparing Your Dashboard</span>
            <span className="home-loading-percentage">{progress}%</span>
          </div>
          
          <div className="home-loading-bar-container">
            <div className="home-loading-bar-track">
              <div 
                className="home-loading-bar-progress"
                style={{ width: `${progress}%` }}
              >
                <div className="home-progress-glow"></div>
                <div className="home-progress-particles">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="home-loading-message">
            <span className="home-message-dot"></span>
            <span className="home-message-text">
              {progress < 30 ? "Loading your profile..." : 
               progress < 60 ? "Fetching opportunities..." :
               progress < 90 ? "Almost there..." : "Welcome Home!"}
            </span>
          </div>
        </div>

        {/* Quick Redirect Note */}
        <div className="home-footer-note">
          <span>⚡ 1.3s • Taking you home</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingHomeScreen;