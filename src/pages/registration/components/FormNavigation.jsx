import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, HeartHandshake, Phone, Mail, LogOut, ArrowUpRight } from 'lucide-react';
import '../styles/FormNavigation.css';

// IMPORT THE LOGO IMAGES
import relinkLogo1 from '../../../assets/RelinkLOGO.jpeg';
import relinkLogo2 from '../../../assets/ReLinkLogo2.jpeg';

const FormNavigation = ({ 
  userType = 'jobseeker'
}) => {
  const navigate = useNavigate();
  
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

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <header className="form-navigation-header">
      <div className="form-nav-container">
        {/* Logo Section */}
        <Link to="/" className="form-logo-link" aria-label="Return to homepage">
          <div className="form-logo-container">
            {/* 3D CUBE ANIMATION */}
            <div className="form-cube-container">
              <div 
                className="form-cube"
                style={{
                  transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`,
                }}
              >
                <div className="form-cube-face front">
                  <img src={relinkLogo1} alt="" className="form-cube-logo" />
                </div>
                <div className="form-cube-face back">
                  <img src={relinkLogo2} alt="" className="form-cube-logo" />
                </div>
                <div className="form-cube-face right">
                  <img src={relinkLogo1} alt="" className="form-cube-logo" />
                </div>
                <div className="form-cube-face left">
                  <img src={relinkLogo2} alt="" className="form-cube-logo" />
                </div>
                <div className="form-cube-face top">
                  <img src={relinkLogo1} alt="" className="form-cube-logo" />
                </div>
                <div className="form-cube-face bottom">
                  <img src={relinkLogo2} alt="" className="form-cube-logo" />
                </div>
              </div>
            </div>
            
            <div className="form-logo-text">
              <div className="form-logo-main">
                <h1 className="form-logo-title">RE-LINK</h1>
                <div className="form-logo-badge">
                  <Shield size={14} />
                  <span>POPIA Compliant</span>
                </div>
              </div>
              <p className="form-logo-slogan">
                <HeartHandshake size={18} />
                <span className="form-slogan-text">Second Chances, Real Connections</span>
              </p>
            </div>
          </div>
        </Link>
        
        {/* Right Section */}
        <div className="form-header-right">
          <div className="form-header-contact">
            <div className="form-contact-item">
              <Phone size={16} />
              <span>0800 123 456</span>
            </div>
            <div className="form-contact-item">
              <Mail size={16} />
              <span>support@re-link.co.za</span>
            </div>
          </div>
          <div className="form-login-prompt">
            <span className="form-prompt-text">Already registered?</span>
            <button onClick={handleSignInClick} className="form-login-link">
              <LogOut size={18} />
              <span>Sign In</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FormNavigation;