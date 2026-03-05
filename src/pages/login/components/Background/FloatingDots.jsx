import React, { useState, useEffect } from 'react';

export const FloatingDots = () => {
  const [floatingDots, setFloatingDots] = useState([]);

  useEffect(() => {
    const dots = [];
    for (let i = 0; i < 15; i++) {
      dots.push({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    setFloatingDots(dots);
  }, []);

  return (
    <div className="floating-dots-container">
      {floatingDots.map(dot => (
        <div
          key={dot.id}
          className="floating-dot"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            animationDuration: `${dot.duration}s`,
            animationDelay: `${dot.delay}s`
          }}
        ></div>
      ))}
    </div>
  );
};

