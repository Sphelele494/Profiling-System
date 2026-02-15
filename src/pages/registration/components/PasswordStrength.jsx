import React from 'react';

const PasswordStrength = ({ password, strength }) => {
  if (!password) return null;

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  return (
    <div className="password-strength">
      <div className="strength-header">
        <span>Password strength:</span>
        <span className={`strength-value ${strength >= 75 ? 'strong' : strength >= 50 ? 'medium' : 'weak'}`}>
          {strength}%
        </span>
      </div>
      <div className="strength-bar">
        <div 
          className={`strength-fill ${strength >= 75 ? 'strength-strong' : strength >= 50 ? 'strength-medium' : 'strength-weak'}`}
          style={{ width: `${strength}%` }}
        ></div>
      </div>
      <div className="strength-rules">
        <span className={`rule ${checks.length ? 'met' : ''}`}>
          • 8+ characters
        </span>
        <span className={`rule ${checks.uppercase ? 'met' : ''}`}>
          • Uppercase letter
        </span>
        <span className={`rule ${checks.lowercase ? 'met' : ''}`}>
          • Lowercase letter
        </span>
        <span className={`rule ${checks.number ? 'met' : ''}`}>
          • Number
        </span>
        <span className={`rule ${checks.special ? 'met' : ''}`}>
          • Special character
        </span>
      </div>
    </div>
  );
};

export default PasswordStrength;