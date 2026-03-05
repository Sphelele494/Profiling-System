import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import './styles/LandingPage.css';

// Import components
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import SuccessStories from './components/SuccessStories';
import NewsletterSection from './components/NewsletterSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import ChatBot from './components/ChatBot';

// Import hooks
import { useAnimations } from './hooks/useAnimations';
import { useScrollEffects } from './hooks/useScrollEffects';
import { useStatsAnimation } from './hooks/useStatsAnimation';

// Import utils
import { generateBrochure } from './utils/brochureGenerator';
import { heroTitles, heroSubtitles, slogans, successStories } from './utils/constants';

// Import loading screens
import RegisterLoadingScreen from "../registration/components/RegisterLoadingScreen/RegisterLoadingScreen";
import JobSeekerRegistrationLoading from "../user-recruiter-registration/components/LoadingScreen/JobSeekerRegistrationLoading";

const LandingPage = () => {
  const navigate = useNavigate();
  
  // State Management
  const [showRegisterLoading, setShowRegisterLoading] = useState(false);
  const [userType, setUserType] = useState(null); // 'jobseeker' or 'recruiter'
  
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);
  const [activeStory, setActiveStory] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [botActive, setBotActive] = useState(false);
  const [botMessages, setBotMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  
  // Form States
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Refs
  const statsRef = useRef(null);
  const loadingTimeoutRef = useRef(null);
  const titleIntervalRef = useRef(null);
  const storyIntervalRef = useRef(null);

  // Custom Hooks
  const { mousePosition, scale, rotationAngle } = useAnimations();
  const { isScrolled, showScrollIndicator, activeSection, handleSmoothScroll } = useScrollEffects();
  const { statsVisible, animatedStats } = useStatsAnimation(statsRef);

  // Loading simulation
  useEffect(() => {
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(loadingTimeoutRef.current);
  }, []);

  // Title rotation
  useEffect(() => {
    titleIntervalRef.current = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % heroTitles.length);
      setCurrentSubtitleIndex((prev) => (prev + 1) % heroSubtitles.length);
      setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(titleIntervalRef.current);
  }, []);

  // Story auto-rotation
  useEffect(() => {
    storyIntervalRef.current = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % successStories.length);
    }, 6000);
    return () => clearInterval(storyIntervalRef.current);
  }, []);

  // Handlers
  const handleRegister = useCallback((type) => {
    // type can be 'jobseeker' or 'recruiter'
    setUserType(type);
    setShowRegisterLoading(true);
  }, []);

  const handleSignIn = useCallback(() => {
    // Navigate to the loading screen first, not directly to login
    navigate('/signin-redirect');
  }, [navigate]);

  const handleWatchIntro = useCallback(() => {
    setIsVideoModalOpen(true);
  }, []);

  const handleGalleryPrev = useCallback(() => {
    setActiveGallery((prev) => (prev - 1 + 5) % 5);
  }, []);

  const handleGalleryNext = useCallback(() => {
    setActiveGallery((prev) => (prev + 1) % 5);
  }, []);

  const handleStoryPrev = useCallback(() => {
    setActiveStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  }, []);

  const handleStoryNext = useCallback(() => {
    setActiveStory((prev) => (prev + 1) % successStories.length);
  }, []);

  const handleNewsletterSubmit = useCallback((e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 3000);
    }
  }, [newsletterEmail]);

  const handleContactSubmit = useCallback((e) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setTimeout(() => setContactSubmitted(false), 3000);
    }
  }, [contactName, contactEmail, contactMessage]);

  const handleBotMessage = useCallback((message) => {
    if (!message.trim()) return;

    const newUserMessage = { 
      id: Date.now(), 
      text: message, 
      fromBot: false,
      timestamp: new Date()
    };
    setBotMessages(prev => [...prev, newUserMessage]);

    setTimeout(() => {
      let response = "";
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = "👋 Welcome to RE-Link! I'm your AI assistant. I can help you with registration, jobs, training, and support. What would you like to know?";
      } 
      else if (lowerMessage.includes('register')) {
        response = "📝 To register as a Job Seeker or Recruiter: Click 'Register Now' and select your account type. The process takes about 10-15 minutes.";
      } 
      else if (lowerMessage.includes('job')) {
        response = "💼 We have 1,845+ jobs across all 9 provinces in construction, retail, manufacturing, hospitality, and IT. Which province are you in?";
      } 
      else if (lowerMessage.includes('training')) {
        response = "🎓 We offer 156+ QCTO accredited courses in technical skills, soft skills, business, IT, and trades. Most courses are subsidized starting from R500.";
      } 
      else if (lowerMessage.includes('support')) {
        response = "🤝 24/7 Helpline: 0800 123 456 | Email: support@re-link.co.za | WhatsApp: 060 123 4567 | 9 Provincial offices with 234 active mentors.";
      } 
      else if (lowerMessage.includes('location') || lowerMessage.includes('office')) {
        response = "📍 Head Office: Johannesburg. Provincial offices in Cape Town, Durban, Port Elizabeth, Bloemfontein, Nelspruit, Polokwane, Kimberley, and Mahikeng.";
      } 
      else {
        response = "🤔 I can help with:\n• Registration (Job Seeker/Recruiter)\n• Jobs in SA\n• Training\n• Support\n• Locations\n• Fees\n\nWhat would you like to know?";
      }

      const botResponse = { 
        id: Date.now() + 1, 
        text: response, 
        fromBot: true,
        timestamp: new Date()
      };
      setBotMessages(prev => [...prev, botResponse]);
    }, 800);

    setUserInput('');
  }, []);

  // Show appropriate loading screen based on user type
  if (showRegisterLoading) {
    if (userType === 'jobseeker') {
      return <JobSeekerRegistrationLoading />;
    } else {
      // Default to recruiter loading screen
      return <RegisterLoadingScreen userType="recruiter" />;
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="landing-page" style={{ backgroundColor: '#ffffff', position: 'relative' }}>
      {/* Floating Dots Animation - DECREASED SPEED */}
      <div className="floating-dots" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              backgroundColor: '#10b981',
              borderRadius: '50%',
              opacity: Math.random() * 0.3 + 0.1,
              animation: `floatDot ${Math.random() * 20 + 30}s linear infinite`, // Increased from 25 to 30 (slower)
              transform: `translateY(0)`,
              animationDelay: `${Math.random() * 15}s` // Increased delay range
            }}
          />
        ))}
      </div>

      <Navigation
        isScrolled={isScrolled}
        activeSection={activeSection}
        handleSmoothScroll={handleSmoothScroll}
        handleRegister={handleRegister}
        handleSignIn={handleSignIn}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <HeroSection
        mousePosition={mousePosition}
        scale={scale}
        rotationAngle={rotationAngle}
        currentTitleIndex={currentTitleIndex}
        currentSubtitleIndex={currentSubtitleIndex}
        activeGallery={activeGallery}
        setActiveGallery={setActiveGallery}
        handleGalleryPrev={handleGalleryPrev}
        handleGalleryNext={handleGalleryNext}
        handleRegister={handleRegister}
        handleWatchIntro={handleWatchIntro}
        generateBrochure={generateBrochure}
        showScrollIndicator={showScrollIndicator}
      />

      <StatsSection
        statsRef={statsRef}
        statsVisible={statsVisible}
        animatedStats={animatedStats}
      />

      <FeaturesSection />

      <SuccessStories
        activeStory={activeStory}
        setActiveStory={setActiveStory}
        handleStoryPrev={handleStoryPrev}
        handleStoryNext={handleStoryNext}
      />

      <NewsletterSection
        newsletterEmail={newsletterEmail}
        setNewsletterEmail={setNewsletterEmail}
        newsletterSubmitted={newsletterSubmitted}
        handleNewsletterSubmit={handleNewsletterSubmit}
      />

      <ContactSection
        contactName={contactName}
        setContactName={setContactName}
        contactEmail={contactEmail}
        setContactEmail={setContactEmail}
        contactMessage={contactMessage}
        setContactMessage={setContactMessage}
        contactSubmitted={contactSubmitted}
        handleContactSubmit={handleContactSubmit}
      />

      <Footer
        currentSloganIndex={currentSloganIndex}
        animatedStats={animatedStats}
        handleSmoothScroll={handleSmoothScroll}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <ChatBot
        botActive={botActive}
        setBotActive={setBotActive}
        botMessages={botMessages}
        userInput={userInput}
        setUserInput={setUserInput}
        handleBotMessage={handleBotMessage}
      />

      {/* Scroll to Top */}
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 5px 20px rgba(16,185,129,0.3)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(16,185,129,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(16,185,129,0.3)';
          }}
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default LandingPage;