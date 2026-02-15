import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon, Briefcase, MessageCircle, Users, User,
  Calendar, Bell, Search, LogOut, ChevronRight, Sparkles,
  ShieldCheck, TrendingUp, BarChart3, Sun, Moon, Menu, X,
  Bot, HelpCircle, Phone, Mail, Linkedin, Facebook,
  Twitter, Instagram, Shield, FileText, Send, Loader2
} from "lucide-react";

// Import your actual logo - FIXED: Using proper import
import ReLinkLogo from "../../assets/ReLinkLogo2.jpeg";

function MainLayout({ children, activeTab, setActiveTab, user, setUser, credibilityScore, setCredibilityScore }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBot, setShowBot] = useState(false);
  const [botMessage, setBotMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [floatingDots, setFloatingDots] = useState([]);
  const [logoHover, setLogoHover] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(true);
  const [titleGlow, setTitleGlow] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [botSpinning, setBotSpinning] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  
  const logoRef = useRef(null);
  const botRef = useRef(null);
  const profilePicRef = useRef(null);

  // Bot responses
  const botResponses = {
    greeting: "Molo! I'm RE-Link Assistant. I can help you navigate the platform, find jobs, connect with employers, submit referrals, or answer questions about your reintegration journey in South Africa.",
    jobs: "Looking for jobs in SA? Go to the Networking tab to see available positions matched to your skills. You can filter by location, salary, industry, and availability. Check out our Job Match feature for personalized recommendations!",
    employers: "To message verified employers, click on the Messages tab. Only verified employers can message here for your security. You'll see a green checkmark next to their names. Remember to check your credibility score before applying!",
    profile: "Update your professional profile in the Profile tab to get better job matches. Add your skills, education, certificates, and work experience. A complete profile increases your credibility score by 25%!",
    community: "Check the Community tab to submit referral documents, track your rehabilitation timeline, and build your credibility score through positive community engagement. Attend events to network with fellow South Africans!",
    referrals: "You can submit referral documents from employers, rehabilitation centers, police officers, or community leaders. Each document adds to your credibility score. Verified documents earn more points!",
    posting: "In the Home tab, you can share your journey, post opportunities, motivational quotes, or positive content. Choose the post type that fits your content. Remember, positivity attracts opportunities!",
    support: "Need help? You can contact our support team at support@relink.co.za or call 0800-RE-LINK (735-465). We're here to help you succeed. Emergency support is available 24/7 across South Africa.",
    overview: "The Overview tab gives you a complete dashboard of your progress. Check your credibility score, upcoming appointments, jobs applied, and quick statistics about your journey.",
    networking: "Networking tab shows available jobs, learnerships, volunteer work, and internships. Use filters to find the perfect opportunity in your province. Don't forget to check networking tips at the bottom!",
    credibility: "Your credibility score is calculated based on referrals, employment history, community engagement, and document verification. Higher scores attract better opportunities with South African employers!",
    documents: "You can upload documents in the Community tab. Each verified document boosts your score. Keep your documents updated for maximum credibility impact.",
    timeline: "Track your rehabilitation journey in the Community tab. Add milestones from pre-arrest to present day. This helps employers understand your growth journey.",
    privacy: "In Profile settings, you can choose what information to share. Sensitive data can be hidden and only shown to verified recruiters when you grant permission.",
    appointments: "Manage your appointments in the Overview tab. Set reminders for rehab sessions, check-ups, community service, and interviews. Stay organized with your schedule!",
    applications: "Track all your job applications in the Overview tab. See which ones are under review, accepted, or need follow-up with South African employers.",
    default: "I'm here to help! You can ask me about jobs, employers, referrals, posting content, your profile, community events, overview dashboard, or general support in South Africa."
  };

  useEffect(() => {
    // Generate floating dots
    const dots = [];
    for (let i = 0; i < 25; i++) {
      dots.push({
        id: i,
        size: Math.random() * 8 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        color: i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#047857" : "#065f46"
      });
    }
    setFloatingDots(dots);

    // Title glow animation
    const interval = setInterval(() => {
      setTitleGlow(prev => !prev);
    }, 1500);
    
    // Bot spinning animation
    const botInterval = setInterval(() => {
      if (botRef.current) {
        setBotSpinning(prev => !prev);
      }
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearInterval(botInterval);
    };
  }, []);

  const handleBotSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const input = userInput.toLowerCase();
    let response = botResponses.default;

    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('molo')) {
      response = botResponses.greeting;
    } else if (input.includes('job') || input.includes('work') || input.includes('hire') || input.includes('career')) {
      response = botResponses.jobs;
    } else if (input.includes('employer') || input.includes('message') || input.includes('chat') || input.includes('contact')) {
      response = botResponses.employers;
    } else if (input.includes('profile') || input.includes('skill') || input.includes('experience') || input.includes('resume')) {
      response = botResponses.profile;
    } else if (input.includes('community') || input.includes('event') || input.includes('timeline') || input.includes('engage')) {
      response = botResponses.community;
    } else if (input.includes('referral') || input.includes('document') || input.includes('credibility') || input.includes('verify')) {
      response = botResponses.referrals;
    } else if (input.includes('post') || input.includes('share') || input.includes('content') || input.includes('social')) {
      response = botResponses.posting;
    } else if (input.includes('help') || input.includes('support') || input.includes('contact') || input.includes('emergency')) {
      response = botResponses.support;
    } else if (input.includes('overview') || input.includes('dashboard') || input.includes('stat') || input.includes('progress')) {
      response = botResponses.overview;
    } else if (input.includes('network') || input.includes('connect') || input.includes('opportunity')) {
      response = botResponses.networking;
    } else if (input.includes('credibility') || input.includes('score') || input.includes('reputation')) {
      response = botResponses.credibility;
    } else if (input.includes('document') || input.includes('upload') || input.includes('certificate')) {
      response = botResponses.documents;
    } else if (input.includes('timeline') || input.includes('journey') || input.includes('history')) {
      response = botResponses.timeline;
    } else if (input.includes('privacy') || input.includes('secure') || input.includes('private') || input.includes('hide')) {
      response = botResponses.privacy;
    } else if (input.includes('appointment') || input.includes('meeting') || input.includes('schedule')) {
      response = botResponses.appointments;
    } else if (input.includes('application') || input.includes('apply') || input.includes('submitted')) {
      response = botResponses.applications;
    }

    setIsLoading(true);
    setTimeout(() => {
      setBotMessage(response);
      setUserInput("");
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('relink_token');
      localStorage.removeItem('relink_user');
      navigate('/login');
    }
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        localStorage.setItem('relink_profile_pic', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const handleBotActivation = () => {
    setBotSpinning(true);
    setShowBot(true);
    setTimeout(() => setBotSpinning(false), 1000);
  };

  const handleLogoAnimation = () => {
    if (logoRef.current) {
      logoRef.current.classList.add('logo-spin');
      setTimeout(() => {
        if (logoRef.current) {
          logoRef.current.classList.remove('logo-spin');
        }
      }, 1000);
    }
  };

  // Default user object if not provided
  const displayUser = user || { name: "Guest", userType: "MEMBER" };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Background Elements */}
      <div className="background-gradient"></div>
      
      <div className="floating-dots-container">
        {floatingDots.map(dot => (
          <div
            key={dot.id}
            className="floating-dot"
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
              backgroundColor: dot.color
            }}
          ></div>
        ))}
      </div>

      {/* Left Side Navigation */}
      <div className="side-navigation">
        <div className="nav-container">
          {/* Logo Section */}
          <div 
            className="logo-section"
            onClick={() => {
              setActiveTab('overview');
              handleLogoAnimation();
            }}
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <div className={`logo-glow ${logoHover ? 'active' : ''}`}></div>
            <div className="logo-pulse"></div>
            <div className="logo-orbital">
              <div className="orbital-ring"></div>
              <div className="orbital-ring ring-2"></div>
            </div>
            <img 
              ref={logoRef}
              src={ReLinkLogo} 
              alt="RE-Link Logo" 
              className={`logo-image ${logoHover ? 'hover' : ''} ${logoLoaded ? 'loaded' : ''}`}
              onLoad={() => setLogoLoaded(true)}
              onError={() => setLogoLoaded(false)}
            />
            <div className="logo-text">
              <h1 className="logo-title">RE-LINK</h1>
              <p className="logo-slogan">Second Chances, Real Connections</p>
              <div className="logo-badge">
                <ShieldCheck size={12} />
                <span>DCS Verified</span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="nav-items">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <div className="nav-icon">
                <BarChart3 size={22} />
              </div>
              <span className="nav-label">Overview</span>
              {activeTab === 'overview' && <div className="nav-indicator"></div>}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <div className="nav-icon">
                <HomeIcon size={22} />
              </div>
              <span className="nav-label">Home</span>
              {activeTab === 'home' && <div className="nav-indicator"></div>}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'networking' ? 'active' : ''}`}
              onClick={() => setActiveTab('networking')}
            >
              <div className="nav-icon">
                <Briefcase size={22} />
              </div>
              <span className="nav-label">Networking</span>
              {activeTab === 'networking' && <div className="nav-indicator"></div>}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'community' ? 'active' : ''}`}
              onClick={() => setActiveTab('community')}
            >
              <div className="nav-icon">
                <Users size={22} />
              </div>
              <span className="nav-label">Community</span>
              {activeTab === 'community' && <div className="nav-indicator"></div>}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <div className="nav-icon">
                <MessageCircle size={22} />
              </div>
              <span className="nav-label">Messages</span>
              {activeTab === 'messages' && <div className="nav-indicator"></div>}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <div className="nav-icon">
                <User size={22} />
              </div>
              <span className="nav-label">Profile</span>
              {activeTab === 'profile' && <div className="nav-indicator"></div>}
            </button>
          </div>

          {/* User Profile Summary */}
          <div className="user-summary">
            <div className="profile-avatar" onClick={() => profilePicRef.current?.click()}>
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="profile-avatar-img" />
              ) : (
                <span className="avatar-initial">{displayUser.name?.charAt(0) || "U"}</span>
              )}
              <input
                type="file"
                ref={profilePicRef}
                accept="image/*"
                onChange={handleProfilePictureUpload}
                style={{ display: 'none' }}
              />
            </div>
            <div className="profile-info">
              <span className="profile-name">{displayUser.name || "User"}</span>
              <span className="profile-type">{displayUser.userType ? displayUser.userType.replace('-', ' ').toUpperCase() : "MEMBER"}</span>
            </div>
            <div className="credibility-score">
              <div className="score-circle">
                <span className="score-value">{credibilityScore || 0}</span>
              </div>
              <span className="score-label">CRED</span>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="theme-toggle">
            <button 
              className={`theme-toggle-btn ${darkMode ? 'dark' : 'light'}`}
              onClick={handleDarkModeToggle}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="search-section">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search jobs, posts, members, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery("")}>
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="header-actions">
            <button className="notification-btn">
              <Bell size={22} />
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </button>

            <button 
              className="mobile-menu-btn" 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="content-area">
          {/* Welcome Banner */}
          <div className={`welcome-banner ${titleGlow ? 'glow' : ''}`}>
            <div className="welcome-content">
              <div className="welcome-text">
                <div className="welcome-badge">
                  <Sparkles size={20} />
                  <span>Welcome back, {displayUser.name || "Champion"}!</span>
                </div>
                <h2 className="welcome-title">
                  Your Journey to Success Continues
                  <span className="title-highlight"> Today</span>
                </h2>
                <p className="welcome-subtitle">
                  Connect with opportunities, build credibility, and thrive with South African professionals who believe in second chances.
                </p>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content-container">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="main-footer">
          <div className="footer-container">
            <div className="footer-left">
              <div className="footer-logo">
                <img src={ReLinkLogo} alt="RE-Link" className="footer-logo-img" />
                <div className="footer-logo-text">
                  <h4>RE-LINK</h4>
                  <p>Second Chances, Real Connections</p>
                </div>
              </div>
              <p className="footer-partnership">Official Partner: Department of Correctional Services South Africa</p>
              <div className="footer-certs">
                <span className="footer-cert">
                  <ShieldCheck size={14} />
                  <span>POPIA Compliant</span>
                </span>
                <span className="footer-cert">
                  <Shield size={14} />
                  <span>Secure Platform</span>
                </span>
              </div>
            </div>
            
            <div className="footer-right">
              <div className="footer-links">
                <a href="#" className="footer-link">
                  <HelpCircle size={14} />
                  <span>Help Center</span>
                </a>
                <a href="#" className="footer-link">
                  <Shield size={14} />
                  <span>Privacy Policy</span>
                </a>
                <a href="#" className="footer-link">
                  <FileText size={14} />
                  <span>Terms of Service</span>
                </a>
                <a href="#" className="footer-link">
                  <Phone size={14} />
                  <span>Contact Support</span>
                </a>
              </div>
              <p className="footer-copyright">
                © {new Date().getFullYear()} RE-Link South Africa. All rights reserved.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link">
                  <Facebook size={16} />
                </a>
                <a href="#" className="social-link">
                  <Twitter size={16} />
                </a>
                <a href="#" className="social-link">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="social-link">
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Spinning Bot Assistant */}
      <div 
        className={`bot-assistant ${botSpinning ? 'spinning' : ''}`} 
        onClick={handleBotActivation}
        ref={botRef}
      >
        <div className="bot-logo-container">
          <div className="bot-logo-glow"></div>
          <div className="bot-spinner-ring"></div>
          <img 
            src={ReLinkLogo} 
            alt="RE-Link Assistant" 
            className="bot-logo-image"
          />
          <div className="bot-indicator">
            <div className="pulse-ring"></div>
            <div className="pulse-ring ring2"></div>
            <div className="pulse-ring ring3"></div>
            <Bot size={20} />
          </div>
        </div>
        <div className="bot-tooltip">
          <Sparkles size={12} />
          <span>Need help? Ask me anything!</span>
        </div>
      </div>

      {/* Bot Assistant Modal */}
      {showBot && (
        <div className="bot-modal">
          <div className="bot-modal-overlay" onClick={() => setShowBot(false)}></div>
          <div className="bot-modal-content">
            <div className="bot-modal-header">
              <div className="bot-modal-title">
                <div className="bot-avatar">
                  <img src={ReLinkLogo} alt="RE-Link Bot" />
                  <div className="bot-status-indicator">
                    <div className="status-dot online"></div>
                  </div>
                </div>
                <div className="bot-info">
                  <h3>RE-Link Assistant</h3>
                  <div className="bot-status">
                    <span>AI Assistant • Ready to help in South Africa</span>
                  </div>
                </div>
              </div>
              <button className="close-bot-btn" onClick={() => setShowBot(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="bot-conversation">
              <div className="bot-message">
                <div className="message-avatar">
                  <Bot size={20} />
                </div>
                <div className="message-bubble">
                  <p className="message-text">
                    {botMessage || botResponses.greeting}
                  </p>
                  <span className="message-time">Just now</span>
                </div>
              </div>
              
              <div className="suggested-questions">
                <p className="suggested-title">Quick questions you can ask:</p>
                <div className="suggested-buttons">
                  <button className="suggested-btn" onClick={() => {
                    setUserInput("How do I find jobs in SA?");
                    setBotMessage(botResponses.jobs);
                  }}>
                    💼 Find jobs
                  </button>
                  <button className="suggested-btn" onClick={() => {
                    setUserInput("How to submit referrals?");
                    setBotMessage(botResponses.referrals);
                  }}>
                    📄 Submit referrals
                  </button>
                  <button className="suggested-btn" onClick={() => {
                    setUserInput("Update my profile");
                    setBotMessage(botResponses.profile);
                  }}>
                    👤 Update profile
                  </button>
                  <button className="suggested-btn" onClick={() => {
                    setUserInput("Need support in South Africa");
                    setBotMessage(botResponses.support);
                  }}>
                    🆘 Get support
                  </button>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleBotSubmit} className="bot-input-form">
              <div className="input-container">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask me anything about RE-Link in South Africa..."
                  className="bot-input"
                  disabled={isLoading}
                />
                <button type="submit" className="send-bot-btn" disabled={isLoading}>
                  {isLoading ? <Loader2 size={20} className="spinner" /> : <Send size={20} />}
                </button>
              </div>
              <p className="bot-hint">Press Enter to send • Type 'help' for more options</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainLayout;