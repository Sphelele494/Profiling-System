import React from 'react';

const FloatingDots = ({ dots = [] }) => {
  // Add default empty array to prevent undefined error
  return (
    <div className="floating-dots-container">
      {dots && dots.length > 0 ? (
        dots.map(dot => (
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
        ))
      ) : (
        // Optional: render some default dots or nothing
        <div style={{ display: 'none' }}></div>
      )}
    </div>
  );
};

export default FloatingDots;