import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/RegisterLoadingScreen.css';

// Import images from public folder
const relinkLogo1 = '/assets/RelinkLogo.jpeg';
const relinkLogo2 = '/assets/RelinkLogo2.jpeg';

const RegisterLoadingScreen = ({ userType = 'recruiter' }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [dice1Rotation, setDice1Rotation] = useState({ x: 0, y: 0 });
  const [dice2Rotation, setDice2Rotation] = useState({ x: 0, y: 0 });
  
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Smooth rolling animation
  useEffect(() => {
    const animateDice = () => {
      const elapsed = Date.now() - startTimeRef.current;
      
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

  // Simulate loading progress and navigate after 1.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 12);

    const timer = setTimeout(() => {
      if (userType === 'user-jobseeker-registration') {
        console.log('Redirecting to recruiter registration');
        navigate('/user-jobseeker-registration');
      } else {
        console.log('Redirecting to recruiter registration page');
        navigate('/user-jobseeker-registration');
      }
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [navigate, userType]);

  return (
    <div className="loading-screen">
      {/* Premium Background */}
      <div className="premium-bg">
        <div className="bg-gradient"></div>
        <div className="bg-pattern"></div>
        <div className="bg-ambient"></div>
      </div>

      {/* Main Container */}
      <div className="premium-container">
        {/* Title Section */}
        <div className="title-section">
          <h1 className="main-title">ReLink</h1>
          <div className="title-underline"></div>
        </div>

        {/* 3D Dice Section */}
        <div className="dice-showcase">
          {/* First Dice */}
          <div className="dice-unit">
            <div className="dice-label">
              {userType === 'recruiter' ? 'TALENT' : 'OPPORTUNITY'}
            </div>
            <div className="dice-3d-wrapper">
              <div 
                className="dice-emerald"
                style={{
                  transform: `rotateX(${dice1Rotation.x}deg) rotateY(${dice1Rotation.y}deg)`
                }}
              >
                <div className="dice-face front">
                  <img src={relinkLogo1} alt="ReLink Logo" className="dice-logo" />
                </div>
                <div className="dice-face back">
                  <img src={relinkLogo2} alt="ReLink Logo" className="dice-logo" />
                </div>
                <div className="dice-face right">
                  <img src={relinkLogo1} alt="ReLink Logo" className="dice-logo" />
                </div>
                <div className="dice-face left">
                  <img src={relinkLogo2} alt="ReLink Logo" className="dice-logo" />
                </div>
                <div className="dice-face top">
                  <img src={relinkLogo1} alt="ReLink Logo" className="dice-logo" />
                </div>
                <div className="dice-face bottom">
                  <img src={relinkLogo2} alt="ReLink Logo" className="dice-logo" />
                </div>
              </div>
              <div className="dice-reflection"></div>
            </div>
            <div className="dice-shadow"></div>
          </div>

          {/* Second Dice */}
          <div className="dice-unit">
            <div className="dice-label">
              {userType === 'recruiter' ? 'CONNECTION' : 'SUCCESS'}
            </div>
            <div className="dice-3d-wrapper">
              <div 
                className="dice-emerald"
                style={{
                  transform: `rotateX(${dice2Rotation.x}deg) rotateY(${dice2Rotation.y}deg)`
                }}
              >
                <div className="dice-face front">
                  <img src={relinkLogo2} alt="ReLink Logo" className="dice-logo" />
                </div>
                <div className="dice-face back">
                  <img src={relinkLogo1} alt="ReLink Logo" className="dice-logo" />
                </div>
                <div className="dice-face right">
                  <img src={relinkLogo2} alt="ReLink Logo" className="dice-logo" />
                </div>
                <div className="dice-face left">
                  <img src={relinkLogo1} alt="ReLink Logo" className="dice-logo" />
                </div>
                <div className="dice-face top">
                  <img src={relinkLogo2} alt="ReLink Logo" className="dice-logo" />
                </div>
                <div className="dice-face bottom">
                  <img src={relinkLogo1} alt="ReLink Logo" className="dice-logo" />
                </div>
              </div>
              <div className="dice-reflection"></div>
            </div>
            <div className="dice-shadow"></div>
          </div>
        </div>

        {/* Slogan Section */}
        <div className="slogan-section">
          <div className="slogan-decoration left"></div>
          <p className="slogan-text">
            Second Chances, Real Connections
          </p>
          <div className="slogan-decoration right"></div>
        </div>

        {/* Loading Section */}
        <div className="loading-section">
          <div className="loading-info">
            <span className="loading-label">
              {userType === 'recruiter' ? 'BUILDING OPPORTUNITIES' : 'CREATING CONNECTIONS'}
            </span>
            <span className="loading-percentage">{progress}%</span>
          </div>
          
          <div className="loading-bar-container">
            <div className="loading-bar-track">
              <div 
                className="loading-bar-progress"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-glow"></div>
                <div className="progress-particles">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="loading-message">
            <span className="message-dot"></span>
            <span className="message-text">
              {progress < 30 ? "Preparing opportunities..." : 
               progress < 60 ? "Building connections..." :
               progress < 90 ? "Almost there..." : "Welcome to ReLink"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLoadingScreen;