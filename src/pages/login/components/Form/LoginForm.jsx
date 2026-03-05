// File: src/pages/login/components/Form/LoginForm.jsx
import React from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

const LoginForm = ({
  formData,
  errors,
  isLoading,
  rememberMe,
  showPassword,
  validFields,
  fieldFocus,
  passwordStrength,
  registeredEmail,
  onSubmit,
  onChange,
  onTogglePassword,
  onRememberMeChange,
  onForgotPassword,
  onFieldFocus,
  onFieldBlur,
}) => {
  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return { text: 'Weak', class: 'weak' };
    if (passwordStrength <= 4) return { text: 'Medium', class: 'medium' };
    return { text: 'Strong', class: 'strong' };
  };

  return (
    <form onSubmit={onSubmit} className="login-form">
      <div className="form-group">
        <label className="form-label">
          <Mail size={16} className="form-label-icon" />
          Email Address
        </label>
        <div className="input-wrapper">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            onFocus={() => onFieldFocus('email')}
            onBlur={() => onFieldBlur('email')}
            className={`form-input ${errors.email ? 'error' : ''} ${validFields.email ? 'valid' : ''}`}
            placeholder="you@example.com"
            disabled={isLoading}
          />
          {validFields.email && <CheckCircle size={18} className="input-valid-icon" />}
        </div>
      </div>

      <div className="form-group">
        <div className="password-label-row">
          <label className="form-label">
            <Lock size={16} className="form-label-icon" />
            Password
          </label>
          <button
            type="button"
            onClick={onTogglePassword}
            className="toggle-password"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{showPassword ? 'Hide' : 'Show'}</span>
          </button>
        </div>
        <div className="input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={onChange}
            onFocus={() => onFieldFocus('password')}
            onBlur={() => onFieldBlur('password')}
            className={`form-input ${errors.password ? 'error' : ''} ${validFields.password ? 'valid' : ''}`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          {validFields.password && <CheckCircle size={18} className="input-valid-icon" />}
        </div>
        
        {fieldFocus.password && formData.password && (
          <div className="password-strength">
            <div className="strength-header">
              <span>Password strength</span>
              <span className={`strength-value ${getPasswordStrengthText().class}`}>
                {getPasswordStrengthText().text}
              </span>
            </div>
            <div className="strength-bar">
              <div 
                className={`strength-fill strength-${getPasswordStrengthText().class}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="form-options">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => onRememberMeChange(e.target.checked)}
            disabled={isLoading}
          />
          <span className="checkbox-label">Remember me</span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="forgot-password-btn"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className={`submit-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      <div className="form-footer">
        <p className="signup-prompt">
          New to RE-Link?{' '}
          <a href="/register" className="signup-link">
            Create your professional profile →
          </a>
        </p>
        <p className="privacy-notice">
          By signing in, you agree to our{' '}
          <a href="/terms">Terms</a> and{' '}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;