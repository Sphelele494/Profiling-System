// File: src/pages/login/components/SignInRedirect/SignInRedirect.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInLoadingScreen from '../SignInLoadingScreen/SignInLoadingScreen';

const SignInRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('SignInRedirect mounted - showing loading screen');
    
    const timer = setTimeout(() => {
      console.log('Redirecting to login page');
      navigate('/login');
    }, 1200); // 1.2 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return <SignInLoadingScreen message="Preparing your login..." />;
};

export default SignInRedirect;