import { useState, useEffect, useRef } from 'react';

export const useAnimations = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [frame, setFrame] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [scale, setScale] = useState(1);
  const [titleGlow, setTitleGlow] = useState(false);
  
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation frame loop
  useEffect(() => {
    const animate = (currentTime) => {
      if (lastTimeRef.current) {
        setFrame(prev => (prev + 1) % 360);
        setRotationAngle(prev => prev + 0.01);
        setScale(prev => 1 + Math.sin(currentTime * 0.001) * 0.02);
      }
      lastTimeRef.current = currentTime;
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Title glow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleGlow(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    mousePosition,
    frame,
    rotationAngle,
    scale,
    titleGlow
  };
};