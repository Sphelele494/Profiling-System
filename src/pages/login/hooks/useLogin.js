// File: src/pages/login/hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  
  // CRITICAL: Loading screen state
  const [showSignInLoading, setShowSignInLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validFields, setValidFields] = useState({});
  const [fieldFocus, setFieldFocus] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [userType, setUserType] = useState('individual');
  const [cardGlow, setCardGlow] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Simple test credentials
  const TEST_USER = {
    email: 'test@relink',
    password: '12345678'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setLoginError('');
    
    // Validate form
    if (!formData.email || !formData.password) {
      setLoginError('Please fill in all fields');
      return;
    }
    
    // Check against test credentials
    if (formData.email === TEST_USER.email && formData.password === TEST_USER.password) {
      // SHOW LOADING SCREEN - This triggers the LoadingHomeScreen component
      console.log('🔵 Setting showSignInLoading to TRUE');
      setShowSignInLoading(true);
      
      // NOTE: The LoadingHomeScreen component will handle the 1.3s delay 
      // and redirect to /home automatically. No setTimeout needed here!
      
    } else {
      // Invalid credentials
      setLoginError('Invalid email or password. Try using "test@relink" with password "12345678"');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (loginError) {
      setLoginError('');
    }
    
    setValidFields(prev => ({ ...prev, [name]: value.length > 0 }));
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 6) strength += 1;
    if (password.length > 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleUserTypeToggle = (type) => {
    setUserType(type);
    setCardGlow(true);
    setTimeout(() => setCardGlow(false), 500);
  };

  const handleForgotPassword = () => {
    setRegisteredEmail(formData.email || 'your email');
  };

  const handleFieldFocus = (field) => {
    setFieldFocus(prev => ({ ...prev, [field]: true }));
  };

  const handleFieldBlur = (field) => {
    setFieldFocus(prev => ({ ...prev, [field]: false }));
  };

  return {
    formData,
    errors,
    isLoading,
    rememberMe,
    showPassword,
    loginError,
    successMessage,
    validFields,
    fieldFocus,
    passwordStrength,
    userType,
    cardGlow,
    registeredEmail,
    showSignInLoading, // MUST be returned - this controls the loading screen
    setShowSignInLoading,
    setRememberMe,
    setShowPassword,
    handleChange,
    handleSubmit,
    handleUserTypeToggle,
    handleForgotPassword,
    handleFieldFocus,
    handleFieldBlur,
  };
};