import { useState, useEffect, useCallback } from 'react';
import { targetStats } from '../utils/constants';

export const useStatsAnimation = (statsRef) => {
  const [statsVisible, setStatsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    members: 0,
    jobs: 0,
    companies: 0,
    successRate: 0,
    communities: 0,
    trainingHours: 0,
    mentors: 0,
    partners: 0,
    cities: 0,
    provinces: 0
  });

  const animateStats = useCallback(() => {
    Object.keys(targetStats).forEach((stat) => {
      const end = targetStats[stat];
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const currentTime = Date.now();
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * end);

        setAnimatedStats(prev => ({
          ...prev,
          [stat]: currentValue
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          animateStats();
        }
      },
      { threshold: 0.2 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, [statsRef, animateStats]);

  return {
    statsVisible,
    animatedStats
  };
};