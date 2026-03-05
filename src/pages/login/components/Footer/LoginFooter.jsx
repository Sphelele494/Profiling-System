import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, Globe } from 'lucide-react';
import ReLinkLogo from '../../../../assets/RelinkLOGO.jpeg'; 

export const LoginFooter = () => {
  return (
    <footer className="login-footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={ReLinkLogo} alt="RE-Link" className="footer-logo-img" />
          <div className="footer-logo-text">
            <h3>RE-LINK</h3>
            <p>Second Chances, Real Connections</p>
          </div>
        </div>
        <div className="footer-info">
          <p className="footer-copyright">
            © {new Date().getFullYear()} RE-Link South Africa. All rights reserved.
          </p>
          <div className="footer-certs">
            <span className="footer-cert">
              <Shield size={14} />
              <span>POPIA Compliant</span>
            </span>
            <span className="footer-cert">
              <ShieldCheck size={14} />
              <span>DCS Verified</span>
            </span>
            <span className="footer-cert">
              <Globe size={14} />
              <span>Secure SA Data</span>
            </span>
          </div>
        </div>
        <div className="footer-links">
          <Link to="/help">Help</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/security">Security</Link>
        </div>
      </div>
    </footer>
  );
};

