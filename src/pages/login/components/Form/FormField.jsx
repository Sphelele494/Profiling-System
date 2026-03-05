import React from 'react';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';

export const FormField = ({
  id,
  type,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  error,
  isValid,
  disabled,
  icon: Icon
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        <Icon size={16} className="form-label-icon" />
        <span>{label}</span>
      </label>
      <div className="input-wrapper">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
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
    </div>
  );
};