import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Shield, LogOut, ArrowUpRight, Phone, Mail, MapPin, Award, CheckCircle } from 'lucide-react';
import ReLinkLogo from '../../assets/RelinkLOGO.jpeg';

const RegistrationLayout = ({ children, logoHover, setLogoHover }) => {
  return (
    <div className="registration-layout">
      {/* Header */}
      <header className="layout-header">
        <div className="layout-header-container">
          {/* Logo Section */}
          <Link to="/" className="layout-logo-link">
            <div 
              className="layout-logo-wrapper"
              onMouseEnter={() => setLogoHover(true)}
              onMouseLeave={() => setLogoHover(false)}
            >
              <div className={`layout-logo-glow ${logoHover ? 'active' : ''}`}></div>
              <div className="layout-logo-pulse"></div>
              <div className="layout-logo-orbital">
                <div className="layout-orbital-ring"></div>
                <div className="layout-orbital-ring ring-2"></div>
              </div>
              
              <img 
                src={ReLinkLogo} 
                alt="RE-Link Logo" 
                className={`layout-logo-image ${logoHover ? 'hover' : ''}`}
              />
              
              <div className="layout-logo-text">
                <div className="layout-logo-title-wrapper">
                  <h1 className="layout-logo-title">RE-LINK</h1>
                  <div className="layout-logo-badge">
                    <Shield size={14} />
                    <span>POPIA Compliant</span>
                  </div>
                </div>
                <p className="layout-logo-slogan">
                  <HeartHandshake size={18} />
                  <span>Second Chances, Real Connections</span>
                </p>
              </div>
            </div>
          </Link>
          
          {/* Right Section */}
          <div className="layout-header-right">
            {/* Contact Info - Desktop Only */}
            <div className="layout-contact-info">
              <div className="layout-contact-item">
                <Phone size={16} />
                <span>0800 123 456</span>
              </div>
              <div className="layout-contact-divider"></div>
              <div className="layout-contact-item">
                <Mail size={16} />
                <span>support@re-link.co.za</span>
              </div>
            </div>
            
            {/* Sign In Section */}
            <div className="layout-signin-wrapper">
              <span className="layout-signin-text">Already registered?</span>
              <Link to="/login" className="layout-signin-button">
                <LogOut size={18} />
                <span>Sign In</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="layout-main">
        <div className="layout-main-container">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="layout-footer">
        <div className="layout-footer-gradient"></div>
        <div className="layout-footer-container">
          {/* Footer Top Section */}
          <div className="layout-footer-top">
            {/* Brand Section */}
            <div className="layout-footer-brand">
              <div className="layout-footer-logo-wrapper">
                <img src={ReLinkLogo} alt="RE-Link" className="layout-footer-logo" />
                <div className="layout-footer-logo-glow"></div>
              </div>
              <div className="layout-footer-brand-text">
                <h3>RE-LINK</h3>
                <p>Second Chances, Real Connections</p>
              </div>
            </div>

            {/* Partner Badge */}
            <div className="layout-footer-partner">
              <Award size={20} />
              <span>Official DCS Partner</span>
            </div>
          </div>

          {/* Footer Middle Section */}
          <div className="layout-footer-middle">
            {/* Left Info */}
            <div className="layout-footer-info">
              <div className="layout-footer-info-item">
                <MapPin size={16} />
                <span>Johannesburg, South Africa</span>
              </div>
              <div className="layout-footer-info-item">
                <Phone size={16} />
                <span>0800 123 456 (Toll Free)</span>
              </div>
              <div className="layout-footer-info-item">
                <Mail size={16} />
                <span>support@re-link.co.za</span>
              </div>
            </div>

            {/* Right Certifications */}
            <div className="layout-footer-certifications">
              <div className="layout-footer-cert">
                <CheckCircle size={16} />
                <span>POPIA Compliant</span>
              </div>
              <div className="layout-footer-cert">
                <CheckCircle size={16} />
                <span>B-BBEE Level 1</span>
              </div>
              <div className="layout-footer-cert">
                <CheckCircle size={16} />
                <span>NPO: 123-456</span>
              </div>
              <div className="layout-footer-cert">
                <CheckCircle size={16} />
                <span>DCS Verified</span>
              </div>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="layout-footer-bottom">
            <p className="layout-footer-copyright">
              © {new Date().getFullYear()} RE-LINK South Africa. All rights reserved.
            </p>
            <div className="layout-footer-links">
              <Link to="/privacy" className="layout-footer-link">Privacy Policy</Link>
              <span className="layout-footer-link-divider">•</span>
              <Link to="/terms" className="layout-footer-link">Terms of Service</Link>
              <span className="layout-footer-link-divider">•</span>
              <Link to="/popia" className="layout-footer-link">POPIA Compliance</Link>
              <span className="layout-footer-link-divider">•</span>
              <Link to="/dcs" className="layout-footer-link">DCS Partnership</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegistrationLayout;