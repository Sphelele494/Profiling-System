import React, { useState, useEffect } from 'react';
import { Sparkles, Zap } from 'lucide-react';

export const BrandHeader = () => {
  const [titleGlow, setTitleGlow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGlow(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="brand-header">
      <div className="header-badge">
        <Sparkles size={20} />
        <span>Welcome Back to Your Journey</span>
        <Zap size={16} className="badge-spark" />
      </div>
      
      <div className={`title-container ${titleGlow ? 'glow' : ''}`}>
        <div className="title-static">
          Sign In to <span className="title-highlight">RE-Link</span>
        </div>
        <div className="title-animated">
          <div className="title-slide active">
            Continue Your Reintegration Journey
          </div>
        </div>
      </div>
      
      <p className="brand-subtitle">
        Access your professional profile, job matches, and career development resources.
        <span className="subtitle-highlight"> Your future awaits!</span>
      </p>
    </div>
  );
};