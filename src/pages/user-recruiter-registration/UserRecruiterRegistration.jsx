import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/UserRecruiterRegistration.css';

import { GradientBackground } from './components/Background/GradientBackground';
import { FloatingDots } from './components/Background/FloatingDots';
import { RegistrationHeader } from './components/Header/RegistrationHeader';
import { ChoiceCardsContainer } from './components/MainContent/ChoiceCards/ChoiceCardsContainer';
import { ActionButtons } from './components/MainContent/ActionButtons';
import { SupportSection } from './components/MainContent/SupportSection';
import { RegistrationFooter } from './components/Footer/RegistrationFooter';

function UserRecruiterRegistration() {
  const navigate = useNavigate();
  
  // Local state management
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Logo animation states
  const [logoHover, setLogoHover] = useState(false);
  const rotationAngle = 0;
  const logoScale = 1;

  // Card click handler
  const handleCardClick = (option) => {
    console.log('Card clicked:', option);
    setSelectedOption(option);
    setShowSuccess(false);
  };

  // Handler for recruiter continue
  const handleRecruiterContinue = () => {
    console.log('Recruiter continue clicked');
    if (selectedOption === 'recruiter') {
      setIsLoading(true);
      navigate('/recruiter-register');
    }
  };

  // Handler for job seeker click
  const handleJobSeekerClick = () => {
    console.log('Job seeker click handler called');
    if (selectedOption === 'user') {
      setIsLoading(true);
      navigate('/jobseeker-loading');
    }
  };

  return (
    <div className="registration-choice-page-professional">
      <GradientBackground />
      <FloatingDots />

      <RegistrationHeader
        logoHover={logoHover}
        setLogoHover={setLogoHover}
        rotationAngle={rotationAngle}
        logoScale={logoScale}
      />

      <main className="registration-main-professional">
        <div className="professional-container">
          {/* Elegant Header */}
          <div className="professional-header">
            <h1 className="professional-title">
              Join the RE-Link Community
            </h1>
            <p className="professional-subtitle">
              Choose the account type that best describes you. Whether you're seeking opportunities 
              or looking to hire, RE-Link provides the platform for meaningful connections. 
              Your journey starts here!
            </p>
            <div className="professional-title-accent"></div>
          </div>

          {/* Main Choice Card */}
          <div className="professional-choice-card">
            <div className="professional-card-glow"></div>
            <div className="professional-card-content">
              <ChoiceCardsContainer
                selectedOption={selectedOption}
                hoveredCard={hoveredCard}
                isLoading={isLoading}
                onCardClick={handleCardClick}
                onCardHover={setHoveredCard}
              />
              
              <div className="professional-action-area">
                <ActionButtons
                  selectedOption={selectedOption}
                  isLoading={isLoading}
                  showSuccess={showSuccess}
                  onContinue={handleRecruiterContinue}    // Pass recruiter handler
                  onJobSeekerClick={handleJobSeekerClick} // Pass job seeker handler
                />
              </div>
            </div>
          </div>

          {/* Why Choose RE-Link Section */}
          <div className="professional-why-choose">
            <SupportSection />
          </div>

          {/* Footer */}
          <RegistrationFooter />
        </div>
      </main>
    </div>
  );
}

export default UserRecruiterRegistration;