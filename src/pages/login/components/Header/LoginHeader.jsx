import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import { HeartHandshake, Shield, ArrowRight } from 'lucide-react';
import ReLinkLogo from '../../../../assets/RelinkLOGO.jpeg';
import ReLinkLogo2 from '../../../../assets/ReLinkLogo2.jpeg';
import '../../styles/LoginHeader.css';

export const LoginHeader = () => {
  const navigate = useNavigate(); // Add this for navigation
  const [logoHover, setIsHovering] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [cubeRotation, setCubeRotation] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false); // Add scroll state
  
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Continuous subtle spinning animation
  useEffect(() => {
    const animateCube = () => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // Elegant rotation speeds
      const speed = 0.02; // Consistent slow rotation
      
      const rotX = (elapsed * speed) % 360;
      const rotY = (elapsed * speed * 1.5) % 360;
      
      setCubeRotation({ x: rotX, y: rotY });
      
      animationFrameRef.current = requestAnimationFrame(animateCube);
    };

    animationFrameRef.current = requestAnimationFrame(animateCube);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle create account click
  const handleCreateAccount = () => {
    navigate('/register-loading'); // Navigate to your loading screen
  };

  return (
    <header className={`login-header ${scrolled ? 'header-scrolled' : 'header-transparent'}`}>
      <div className="header-container">
        <Link to="/" className="logo-link">
          <div 
            className="logo-container"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* 3D Cube Container */}
            <div className="login-cube-container">
              {/* The 3D Cube */}
              <div 
                className="login-cube"
                style={{
                  transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`
                }}
              >
                {/* Cube Faces - Emerald Green with Logos */}
                <div className="login-cube-face front">
                  <img src={ReLinkLogo} alt="" className="cube-face-logo" />
                </div>
                
                <div className="login-cube-face back">
                  <img src={ReLinkLogo2} alt="" className="cube-face-logo" />
                </div>
                
                <div className="login-cube-face right">
                  <img src={ReLinkLogo} alt="" className="cube-face-logo" />
                </div>
                
                <div className="login-cube-face left">
                  <img src={ReLinkLogo2} alt="" className="cube-face-logo" />
                </div>
                
                <div className="login-cube-face top">
                  <img src={ReLinkLogo} alt="" className="cube-face-logo" />
                </div>
                
                <div className="login-cube-face bottom">
                  <img src={ReLinkLogo2} alt="" className="cube-face-logo" />
                </div>
              </div>

              {/* Glow Effect */}
              <div className={`cube-glow ${logoHover ? 'active' : ''}`} />

              {/* Shine Effect */}
              <div className={`cube-shine ${logoHover ? 'active' : ''}`} />
            </div>
            
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
            <button onClick={handleCreateAccount} className="register-link">
              <ArrowRight size={16} />
              <span>Create Account</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};