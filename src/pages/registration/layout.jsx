import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Shield, LogOut, ArrowUpRight } from 'lucide-react';
import ReLinkLogo from '../../assets/RelinkLOGO.jpeg';

const RegistrationLayout = ({ children, logoHover, setLogoHover }) => {
  return (
    <>
      {/* Header */}
      <header className="register-header">
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
                className={`logo-image ${logoHover ? 'hover' : ''}`}
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
            <div className="login-prompt">
              <span className="prompt-text">Already have an account?</span>
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
      <main className="register-main">
        {children}
      </main>

      {/* Footer */}
      <footer className="register-footer">
        <div className="footer-glow"></div>
        <div className="footer-container">
          <div className="footer-logo">
            <div className="footer-logo-container">
              <img src={ReLinkLogo} alt="RE-Link" className="footer-logo-img" />
              <div className="footer-logo-glow"></div>
            </div>
            <div className="footer-logo-text">
              <h3>RE-LINK</h3>
              <p className="footer-slogan">Second Chances, Real Connections</p>
              <p className="footer-partnership">Official Partner: Department of Correctional Services South Africa</p>
            </div>
          </div>
          <div className="footer-info">
            <p className="footer-copyright">
              © {new Date().getFullYear()} RE-Link South Africa. Partnered with Department of Correctional Services.
            </p>
            <p className="footer-certs">
              <span className="footer-cert">
                <Shield size={14} />
                <span>POPIA Compliant</span>
              </span>
              <span className="divider">•</span>
              <span className="footer-cert">
                <span>B-BBEE Contributor</span>
              </span>
              <span className="divider">•</span>
              <span className="footer-cert">
                <span>NPO Registration: 123-456</span>
              </span>
              <span className="divider">•</span>
              <span className="footer-cert">
                <span>DCS Verified Partner</span>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default RegistrationLayout;