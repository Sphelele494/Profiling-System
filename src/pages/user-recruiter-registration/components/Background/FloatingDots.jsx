import React from 'react';
import { useFloatingDots } from '../../utils/animations';

export const FloatingDots = () => {
  const floatingDots = useFloatingDots(40);

  return (
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
            opacity: dot.opacity
          }}
        />
      ))}
    </div>
  );
};

