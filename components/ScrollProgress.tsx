'use client';

import React, { useState, useEffect, useCallback } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Throttled scroll update for better performance
  const updateScrollProgress = useCallback(() => {
    const currentProgress = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (scrollHeight > 0) {
      const progress = Math.min(Math.max((currentProgress / scrollHeight) * 100, 0), 100);
      setScrollProgress(progress);
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    updateScrollProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScrollProgress]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-dark-lighter/50 z-50 will-change-transform">
      <div
        className="h-full bg-gradient-to-r from-redAccent to-red-600 transition-all duration-75 ease-out will-change-transform"
        style={{ 
          width: `${scrollProgress}%`,
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
      />
    </div>
  );
};

export default ScrollProgress; 