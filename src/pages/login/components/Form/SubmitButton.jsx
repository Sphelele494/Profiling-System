import React from 'react';
import { Loader2, LogIn, ArrowRight } from 'lucide-react';

export const SubmitButton = ({ isLoading, disabled }) => {
  return (
    <button
      type="submit"
      className={`submit-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <>
          <Loader2 className="spinner-icon" size={20} />
          <span>Signing In...</span>
        </>
      ) : (
        <>
          <LogIn size={20} />
          <span>Sign In</span>
          <ArrowRight size={20} />
        </>
      )}
    </button>
  );
};