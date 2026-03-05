import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, HeartHandshake, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

// IMPORT THE LOGO IMAGES - FIXED
import relinkLogo1 from '../../../../assets/RelinkLOGO.jpeg';

export const RegistrationFooter = () => {
  return (
    <footer className="registration-footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <div className="footer-logo">
            {/* Use the imported logo - FIXED */}
            <img src={relinkLogo1} alt="RE-Link Logo" className="footer-logo-img" />
            <div className="footer-logo-text">
              <h3>RE-LINK</h3>
              <p>Second Chances, Real Connections</p>
            </div>
          </div>
          <div className="footer-compliance">
            <Shield size={16} />
            <span>POPIA Compliant • All Rights Reserved</span>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Platform</h4>
            <Link to="/about">About Us</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/success-stories">Success Stories</Link>
            <Link to="/pricing">Pricing</Link>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/security">Security</Link>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
            <Link to="/compliance">POPIA Compliance</Link>
          </div>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <div className="contact-item">
              <Phone size={14} />
              <span>0800 123 456</span>
            </div>
            <div className="contact-item">
              <Mail size={14} />
              <span>support@re-link.co.za</span>
            </div>
            <div className="contact-item">
              <MapPin size={14} />
              <span>Johannesburg, South Africa</span>
            </div>
          </div>

          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} RE-LINK. All rights reserved. Second Chances, Real Connections.</p>
      </div>
    </footer>
  );
};