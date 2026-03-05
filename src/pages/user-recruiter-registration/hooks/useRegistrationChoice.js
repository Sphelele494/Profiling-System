import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRegistrationChoice = () => {
  const navigate = useNavigate();
  
  const [logoHover, setLogoHover] = useState(false);
  const [titleGlow, setTitleGlow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [titlePulse, setTitlePulse] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [logoScale, setLogoScale] = useState(1);

  // Continuous rotation animation for logo
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Logo hover scale effect
  useEffect(() => {
    setLogoScale(logoHover ? 1.1 : 1);
  }, [logoHover]);

  // Title glow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGlow(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Title pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitlePulse(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle option selection
  const handleSelectOption = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  // Handle continue button click
  const handleContinue = useCallback(() => {
    if (!selectedOption) return;
    
    setIsLoading(true);
    setShowSuccess(false);
    
    setTimeout(() => {
      setShowSuccess(true);
      
      setTimeout(() => {
        if (selectedOption === 'user') {
          navigate('/register');
        } else if (selectedOption === 'recruiter') {
          navigate('/recruiter-register');
        }
        setIsLoading(false);
        setShowSuccess(false);
      }, 600);
    }, 800);
  }, [selectedOption, navigate]);

  // Handle direct card click
  const handleCardClick = useCallback((option) => {
    setSelectedOption(option);
    setIsLoading(true);
    
    setTimeout(() => {
      if (option === 'user') {
        navigate('/register');
      } else if (option === 'recruiter') {
        navigate('/recruiter-register');
      }
      setIsLoading(false);
    }, 400);
  }, [navigate]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '1' || e.key === '2') {
        const option = e.key === '1' ? 'user' : 'recruiter';
        handleCardClick(option);
      } else if (e.key === 'Enter' && selectedOption) {
        handleContinue();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedOption, handleCardClick, handleContinue, navigate]);

  return {
    logoHover,
    titleGlow,
    titlePulse,
    selectedOption,
    isLoading,
    hoveredCard,
    showSuccess,
    rotationAngle,
    logoScale,
    setLogoHover,
    setHoveredCard,
    handleSelectOption,
    handleContinue,
    handleCardClick
  };
};