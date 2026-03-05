import { useState, useEffect } from 'react';

export const useFloatingDots = (count = 40) => {
  const [floatingDots, setFloatingDots] = useState([]);

  useEffect(() => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      dots.push({
        id: i,
        size: Math.random() * 6 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 40 + 20,
        delay: Math.random() * 20,
        opacity: Math.random() * 0.2 + 0.05
      });
    }
    setFloatingDots(dots);
  }, [count]);

  return floatingDots;
};