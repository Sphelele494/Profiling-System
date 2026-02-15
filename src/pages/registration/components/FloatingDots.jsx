import React from 'react';

const FloatingDots = ({ dots }) => {
  return (
    <div className="floating-dots-container">
      {dots.map(dot => (
        <div
          key={dot.id}
          className="floating-dot"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            animationDuration: `${dot.duration}s`,
            animationDelay: `${dot.delay}s`,
            opacity: dot.opacity
          }}
        ></div>
      ))}
    </div>
  );
};

export default FloatingDots;