import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, HeartHandshake, Phone, Mail, LogOut, ArrowUpRight } from 'lucide-react';
import '../../styles/RegistrationHeader.css';

// IMPORT THE LOGO IMAGES
import relinkLogo1 from '../../../../assets/RelinkLOGO.jpeg';
import relinkLogo2 from '../../../../assets/ReLinkLogo2.jpeg';

export const RegistrationHeader = () => {
  // State for cube animation only
  const [cubeRotation, setCubeRotation] = useState({ x: 0, y: 0 });
  
  // Refs for animation
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // 3D Cube rotation animation only
  useEffect(() => {
    const animateCube = () => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // Elegant rotation speeds
      const rotX = (elapsed * 0.02) % 360;
      const rotY = (elapsed * 0.03) % 360;
      
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

  return (
    <header className="registration-header">
      <div className="header-container">
        <Link to="/" className="logo-link" aria-label="Return to homepage">
          <div className="logo-container">
            {/* 3D CUBE ANIMATION ONLY - No glow, pulse, or orbital rings */}
            <div className="cube-container">
              <div 
                className="cube"
                style={{
                  transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`,
                }}
              >
                <div className="cube-face front">
                  <img src={relinkLogo1} alt="" className="cube-logo" />
                </div>
                <div className="cube-face back">
                  <img src={relinkLogo2} alt="" className="cube-logo" />
                </div>
                <div className="cube-face right">
                  <img src={relinkLogo1} alt="" className="cube-logo" />
                </div>
                <div className="cube-face left">
                  <img src={relinkLogo2} alt="" className="cube-logo" />
                </div>
                <div className="cube-face top">
                  <img src={relinkLogo1} alt="" className="cube-logo" />
                </div>
                <div className="cube-face bottom">
                  <img src={relinkLogo2} alt="" className="cube-logo" />
                </div>
              </div>
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
                <span className="slogan-text">Second Chances, Real Connections</span>
              </p>
            </div>
          </div>
        </Link>
        
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
  );
};