// components/LoadingScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/LoadingScreen.css';

// Import images
import relinkLogo1 from '../../../assets/RelinkLOGO.jpeg';
import relinkLogo2 from '../../../assets/ReLinkLogo2.jpeg';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [dice1Rotation, setDice1Rotation] = useState({ x: 0, y: 0 });
  const [dice2Rotation, setDice2Rotation] = useState({ x: 0, y: 0 });
  
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Smooth rolling animation
  useEffect(() => {
    const animateDice = () => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // Elegant rolling speeds
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

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

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

        {/* 3D Dice Section - Center Stage */}
        <div className="dice-showcase">
          {/* First Dice - Emerald Green */}
          <div className="dice-unit">
            <div className="dice-label">Opportunity</div>
            <div className="dice-3d-wrapper">
              <div 
                className="dice-emerald"
                style={{
                  transform: `rotateX(${dice1Rotation.x}deg) rotateY(${dice1Rotation.y}deg)`
                }}
              >
                <div className="dice-face front">
                  <img src={relinkLogo1} alt="" className="dice-logo" />
                </div>
                <div className="dice-face back">
                  <img src={relinkLogo2} alt="" className="dice-logo" />
                </div>
                <div className="dice-face right">
                  <img src={relinkLogo1} alt="" className="dice-logo" />
                </div>
                <div className="dice-face left">
                  <img src={relinkLogo2} alt="" className="dice-logo" />
                </div>
                <div className="dice-face top">
                  <img src={relinkLogo1} alt="" className="dice-logo" />
                </div>
                <div className="dice-face bottom">
                  <img src={relinkLogo2} alt="" className="dice-logo" />
                </div>
              </div>
              <div className="dice-reflection"></div>
            </div>
            <div className="dice-shadow"></div>
          </div>

          {/* Second Dice - Emerald Green */}
          <div className="dice-unit">
            <div className="dice-label">Success</div>
            <div className="dice-3d-wrapper">
              <div 
                className="dice-emerald"
                style={{
                  transform: `rotateX(${dice2Rotation.x}deg) rotateY(${dice2Rotation.y}deg)`
                }}
              >
                <div className="dice-face front">
                  <img src={relinkLogo2} alt="" className="dice-logo" />
                </div>
                <div className="dice-face back">
                  <img src={relinkLogo1} alt="" className="dice-logo" />
                </div>
                <div className="dice-face right">
                  <img src={relinkLogo2} alt="" className="dice-logo" />
                </div>
                <div className="dice-face left">
                  <img src={relinkLogo1} alt="" className="dice-logo" />
                </div>
                <div className="dice-face top">
                  <img src={relinkLogo2} alt="" className="dice-logo" />
                </div>
                <div className="dice-face bottom">
                  <img src={relinkLogo1} alt="" className="dice-logo" />
                </div>
              </div>
              <div className="dice-reflection"></div>
            </div>
            <div className="dice-shadow"></div>
          </div>
        </div>

        {/* Slogan Section - Centered Below Dice */}
        <div className="slogan-section">
          <div className="slogan-decoration left"></div>
          <p className="slogan-text">Second Chances, Real Connections</p>
          <div className="slogan-decoration right"></div>
        </div>

        {/* Loading Bar Section - Bottom */}
        <div className="loading-section">
          <div className="loading-info">
            <span className="loading-label">Loading Experience</span>
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

export default LoadingScreen;