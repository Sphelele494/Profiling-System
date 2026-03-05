import React from 'react';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export const PasswordField = ({
  id,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  isValid,
  disabled,
  showPassword,
  onTogglePassword,
  passwordStrength
}) => {
  return (
    <div className="form-group">
      <div className="password-label-row">
        <label htmlFor={id} className="form-label">
          <Lock size={16} className="form-label-icon" />
          <span>Password</span>
        </label>
        <button
          type="button"
          className="toggle-password"
          onClick={onTogglePassword}
          disabled={disabled}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          <span>{showPassword ? 'Hide' : 'Show'}</span>
        </button>
      </div>
      <div className="input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Enter your password"
          className={`form-input ${error ? 'error' : ''} ${isValid ? 'valid' : ''}`}
          disabled={disabled}
        />
        {isValid && !error && (
          <CheckCircle size={16} className="input-valid-icon" />
        )}
      </div>
      {error && (
        <div className="error-message">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
      
      {value && !error && (
        <div className="password-strength">
          <div className="strength-header">
            <span>Password strength:</span>
            <span className={`strength-value ${passwordStrength >= 75 ? 'strong' : passwordStrength >= 50 ? 'medium' : 'weak'}`}>
              {passwordStrength}%
            </span>
          </div>
          <div className="strength-bar">
            <div 
              className={`strength-fill ${passwordStrength >= 75 ? 'strength-strong' : passwordStrength >= 50 ? 'strength-medium' : 'strength-weak'}`}
              style={{ width: `${passwordStrength}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};