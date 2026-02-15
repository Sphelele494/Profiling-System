import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowLeft, Shield, CheckCircle } from 'lucide-react';

function RecruiterRegister() {
  return (
    <div className="recruiter-register-page">
      <div className="register-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
        
        <div className="register-header">
          <div className="icon-wrapper">
            <Briefcase size={48} />
          </div>
          <h1>Recruiter Registration</h1>
          <p>Create your employer account to start hiring</p>
        </div>
        
        {/* Add your registration form here */}
        <form className="register-form">
          <div className="form-group">
            <label>Company Name</label>
            <input type="text" placeholder="Enter company name" />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter work email" />
          </div>
          
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter phone number" />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create password" />
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" />
          </div>
          
          <div className="form-checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>
          </div>
          
          <button type="submit" className="register-btn">
            Register as Recruiter
          </button>
        </form>
        
        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
        
        <div className="trust-badges">
          <span className="badge">
            <Shield size={14} />
            POPIA Compliant
          </span>
          <span className="badge">
            <CheckCircle size={14} />
            Verified Employers
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecruiterRegister;