import React from 'react';
import { Key } from 'lucide-react';

export const FormOptions = ({
  rememberMe,
  onRememberMeChange,
  onForgotPassword,
  disabled
}) => {
  return (
    <div className="form-options">
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => onRememberMeChange(e.target.checked)}
          disabled={disabled}
        />
        <span className="checkmark"></span>
        <span className="checkbox-label">Remember me</span>
      </label>
      
      <button
        type="button"
        className="forgot-password-btn"
        onClick={onForgotPassword}
        disabled={disabled}
      >
        <Key size={14} />
        <span>Forgot password?</span>
      </button>
    </div>
  );
};