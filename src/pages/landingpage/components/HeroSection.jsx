import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  Flag, UserPlus, Play, FileDown, ArrowRight,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { galleryImages, heroTitles, heroSubtitles } from '../utils/constants';
import ReLinkLogo2 from '../../../assets/RelinkLogo2.jpeg';

const HeroSection = ({ 
  mousePosition, 
  scale, 
  rotationAngle,
  currentTitleIndex,
  currentSubtitleIndex,
  activeGallery,
  setActiveGallery,
  handleGalleryPrev,
  handleGalleryNext,
  handleRegister,
  handleWatchIntro,
  generateBrochure,
  showScrollIndicator
}) => {
  const [galleryDirection, setGalleryDirection] = useState('right');

  // Auto-rotate gallery - DECREASED SPEED (changed from 5000ms to 8000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGallery((prev) => {
        if (galleryDirection === 'right') {
          return (prev + 1) % galleryImages.length;
        } else {
          return (prev - 1 + galleryImages.length) % galleryImages.length;
        }
      });
    }, 8000); // Changed from 5000 to 8000 (slower)
    return () => clearInterval(interval);
  }, [galleryDirection, setActiveGallery]);

  return (
    <section id="home" className="hero-section" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', paddingTop: '80px' /* Reduced from 100px to move content up */ }}>
      {/* Background with Light Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          right: '-10%',
          bottom: '-10%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(1.1) contrast(0.9)',
          opacity: 0.4,
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.1s ease'
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)' }} />
      </div>

      {/* Diagonal Split Design */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '70%',
          height: '120%',
          backgroundColor: '#10b981',
          opacity: 0.03,
          transform: 'skewX(-15deg)'
        }} />
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '70%',
          height: '120%',
          backgroundColor: '#10b981',
          opacity: 0.03,
          transform: 'skewX(15deg)'
        }} />
      </div>

      {/* Floating Dots - DECREASED SPEED */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              opacity: 0.1 + Math.random() * 0.2,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `floatDot ${12 + Math.random() * 8}s linear infinite`, // Increased from 8-12s to 12-20s (slower)
              animationDelay: -Math.random() * 10 + 's'
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '1rem 2rem 0', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center', zIndex: 2 }}>
        {/* Left Column - Text Content */}
        <div style={{ marginTop: '-20px' /* Move content up slightly */ }}>
          {/* Logo with Animation */}
          <div style={{ marginBottom: '1.5rem' /* Reduced from 2rem */ }}>
            <img 
              src={ReLinkLogo2} 
              alt="RE-Link" 
              style={{
                width: '90px', // Increased from 80px
                height: '90px', // Increased from 80px
                borderRadius: '18px', // Slightly larger radius
                boxShadow: '0 15px 35px rgba(16,185,129,0.25)', // Enhanced shadow
                transform: `scale(${scale}) rotate(${rotationAngle * 5}deg)`,
                transition: 'transform 0.3s ease',
                marginBottom: '1rem'
              }}
            />
          </div>

          {/* SA Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.2rem', // Slightly larger padding
            backgroundColor: '#f0fdf4',
            borderRadius: '50px',
            marginBottom: '1.5rem' // Reduced from 2rem
          }}>
            <Flag size={20} color="#10b981" /> {/* Slightly larger icon */}
            <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.95rem' }}>Proudly South African</span>
          </div>

          {/* Animated Titles - MOVED UP */}
          <h1 style={{
            fontSize: 'clamp(3rem, 5vw, 4.8rem)', // Slightly larger max size
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            marginTop: '-5px' // Pull title up
          }}>
            <span style={{ color: '#333' }}>Empowering </span>
            <span style={{ color: '#10b981', display: 'block' }}>{heroTitles[currentTitleIndex]}</span>
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: '#666',
            lineHeight: 1.8,
            marginBottom: '2rem',
            maxWidth: '600px'
          }}>
            {heroSubtitles[currentSubtitleIndex]}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleRegister}
              style={{
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '50px',
                backgroundColor: '#10b981',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 20px rgba(16,185,129,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#059669';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(16,185,129,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#10b981';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(16,185,129,0.2)';
              }}
            >
              <UserPlus size={20} />
              <span>Register Now</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={handleWatchIntro}
              style={{
                padding: '1rem 2rem',
                border: '2px solid #10b981',
                borderRadius: '50px',
                backgroundColor: 'transparent',
                color: '#10b981',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#10b981';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#10b981';
              }}
            >
              <Play size={20} />
              <span>Watch Video</span>
            </button>

            <button
              onClick={generateBrochure}
              style={{
                padding: '1rem 2rem',
                border: '2px solid #e5e5e5',
                borderRadius: '50px',
                backgroundColor: 'transparent',
                color: '#666',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.color = '#666';
              }}
            >
              <FileDown size={20} />
              <span>View Brochure</span>
            </button>
          </div>
        </div>

        {/* Right Column - Diagonal Gallery - IMPROVED SIZE AND SHAPE */}
        <div className="diagonal-gallery" style={{ position: 'relative', height: '650px', marginTop: '-20px' /* Move gallery up */ }}>
          {/* Main Gallery Image - ENHANCED */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '550px', // Increased from 500px
            borderRadius: '24px', // Larger radius for softer edges
            overflow: 'hidden',
            boxShadow: '0 40px 70px rgba(0,0,0,0.2)', // Enhanced shadow
            transform: `perspective(1200px) rotateY(-5deg) rotateX(3deg)`, // Slightly adjusted perspective
            transition: 'transform 0.5s ease',
            border: '2px solid rgba(255,255,255,0.2)' // Slightly thicker border
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'perspective(1200px) rotateY(0) rotateX(0)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'perspective(1200px) rotateY(-5deg) rotateX(3deg)';
          }}
          >
            <img 
              src={galleryImages[activeGallery].src} 
              alt={galleryImages[activeGallery].alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                imageRendering: 'high-quality',
                filter: 'brightness(1.02) contrast(1.02)'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2.5rem', // More padding
              background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
              color: '#ffffff'
            }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{galleryImages[activeGallery].caption}</h3>
              <p style={{ fontSize: '1rem', opacity: 0.95, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{galleryImages[activeGallery].category}</p>
            </div>
          </div>

          {/* Gallery Navigation - IMPROVED */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2.5rem', marginTop: '2rem' }}>
            <button
              onClick={handleGalleryPrev}
              style={{
                width: '55px', // Larger buttons
                height: '55px', // Larger buttons
                borderRadius: '50%',
                border: '2px solid #e5e5e5',
                backgroundColor: '#ffffff',
                color: '#333',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.color = '#10b981';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronLeft size={26} />
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveGallery(index)}
                  style={{
                    width: index === activeGallery ? '35px' : '12px', // Larger active indicator
                    height: '12px', // Taller dots
                    borderRadius: '50px',
                    border: 'none',
                    backgroundColor: index === activeGallery ? '#10b981' : '#e5e5e5',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleGalleryNext}
              style={{
                width: '55px', // Larger buttons
                height: '55px', // Larger buttons
                borderRadius: '50%',
                border: '2px solid #e5e5e5',
                backgroundColor: '#ffffff',
                color: '#333',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.color = '#10b981';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronRight size={26} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#999',
          cursor: 'pointer',
          animation: 'bounce 2s infinite',
          zIndex: 2
        }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div style={{ fontSize: '0.875rem' }}>Scroll to explore</div>
          <ChevronDown size={20} />
        </div>
      )}

      {/* Add CSS animation for floating dots */}
      <style jsx>{`
        @keyframes floatDot {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) translateX(100px) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;