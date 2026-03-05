// components/Navigation.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import ReLinkLogo from '../../../assets/RelinkLOGO.jpeg';
import ReLinkLogo2 from '../../../assets/ReLinkLogo2.jpeg';
import '../styles/Navigation.css';

const Navigation = ({ 
  isScrolled, 
  activeSection, 
  handleSmoothScroll, 
  handleRegister, 
  handleSignIn,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [cubeRotation, setCubeRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    setScrolled(isScrolled);
  }, [isScrolled]);

  // Continuous subtle spinning animation
  useEffect(() => {
    const animateCube = () => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // Very slow, elegant rotation (takes 20 seconds for full rotation)
      // Slows down even more when hovering
      const speed = isHovering ? 0.01 : 0.02;
      
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
  }, [isHovering]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'stats', label: 'Stats' },
    { id: 'stories', label: 'Success Stories' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`nav-bar ${scrolled ? 'nav-bar-scrolled' : ''}`}>
      <div className="nav-bar-container">
        {/* Logo - Top Left with 3D Spinning Cube */}
        <Link to="/" className="nav-logo">
          <div 
            className="logo-cube-container"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div 
              className="logo-cube"
              style={{
                transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`
              }}
            >
              {/* Cube Faces with Logos */}
              <div className="cube-face front">
                <img src={ReLinkLogo} alt="RE-LINK" className="cube-face-logo" />
              </div>
              <div className="cube-face back">
                <img src={ReLinkLogo2} alt="RE-LINK" className="cube-face-logo" />
              </div>
              <div className="cube-face right">
                <img src={ReLinkLogo} alt="RE-LINK" className="cube-face-logo" />
              </div>
              <div className="cube-face left">
                <img src={ReLinkLogo2} alt="RE-LINK" className="cube-face-logo" />
              </div>
              <div className="cube-face top">
                <img src={ReLinkLogo} alt="RE-LINK" className="cube-face-logo" />
              </div>
              <div className="cube-face bottom">
                <img src={ReLinkLogo2} alt="RE-LINK" className="cube-face-logo" />
              </div>
            </div>
            <div className="cube-glow"></div>
          </div>
          
          <div className="nav-logo-text">
            <span className="nav-logo-title">RE-LINK</span>
            <span className="nav-logo-slogan">Second Chances, Real Connections</span>
          </div>
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleSmoothScroll(e, item.id)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="nav-actions">
          <button 
            onClick={handleSignIn} 
            className="nav-btn nav-btn-signin"
          >
            Sign In
          </button>
          <button 
            onClick={handleRegister} 
            className="nav-btn nav-btn-register"
          >
            Register
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="nav-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="nav-mobile-menu-container">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                handleSmoothScroll(e, item.id);
                setMobileMenuOpen(false);
              }}
              className={`nav-mobile-link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
          <div className="nav-mobile-divider"></div>
          <button 
            onClick={() => {
              handleSignIn();
              setMobileMenuOpen(false);
            }} 
            className="nav-mobile-btn-auth"
          >
            Sign In
          </button>
          <button 
            onClick={() => {
              handleRegister();
              setMobileMenuOpen(false);
            }} 
            className="nav-mobile-btn-auth nav-mobile-btn-register"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;