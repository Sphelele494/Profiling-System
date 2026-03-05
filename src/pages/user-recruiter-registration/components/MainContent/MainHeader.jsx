import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

export const MainHeader = ({ titleGlow, titlePulse }) => {
  return (
    <div className="main-header">
      <div className="header-badge">
        <Sparkles size={20} />
        <span>Join the RE-Link Community</span>
        <Zap size={16} className="badge-spark" />
      </div>
      
      <div className="title-container">
        <div className="title-background">
          <div className="title-layer">Choose Your Registration Type</div>
          <div className="title-layer layer-2">Choose Your Registration Type</div>
        </div>
        
        <div className={`title-foreground ${titleGlow ? 'glow' : ''} ${titlePulse ? 'pulse' : ''}`}>
          <h1 className="title-static">
            How would you like to <span className="title-highlight">join RE-Link?</span>
          </h1>
          <div className="title-animated">
            <div className="title-slide">
              Select your account type to continue
            </div>
          </div>
        </div>
      </div>
      
      <p className="main-subtitle">
        Choose the account type that best describes you. Whether you're seeking opportunities or looking to hire,
        RE-Link provides the platform for meaningful connections.
        <span className="subtitle-highlight"> Your journey starts here!</span>
      </p>
    </div>
  );
};