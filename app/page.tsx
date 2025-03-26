'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { useScroll } from 'framer-motion';

// Dynamic import for Three.js component to avoid SSR issues
const CosmicBackground = dynamic(
  () => import('@/components/three/CosmicBackground'),
  { ssr: false, loading: () => null }
);

// Loading spinner component
const LoadingSpinner: React.FC<{
  isVisible: boolean;
  onLoadComplete: () => void;
}> = ({ isVisible, onLoadComplete }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        setOpacity(0);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setOpacity(1);
    }
  }, [isVisible]);

  const handleTransitionEnd = () => {
    if (opacity === 0) {
      onLoadComplete();
    }
  };

  if (opacity === 0 && !isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 transition-opacity duration-700"
      style={{ opacity }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-white text-xl font-mono animate-pulse">Loading Cosmic Experience...</p>
    </div>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { scrollYProgress } = useScroll();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollProgress, setScrollProgress] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Simulate loading time - adds to UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen font-mono">
      <LoadingSpinner 
        isVisible={isLoading} 
        onLoadComplete={() => setLoadingComplete(true)} 
      />
      
      <div className="fixed inset-0 -z-10">
        <CosmicBackground />
      </div>

      <div className="z-10 relative">
        <div 
          className="transition-all duration-1000"
          style={{ 
            opacity: isLoading ? 0 : 1,
            transform: isLoading ? 'translateY(20px)' : 'translateY(0)'
          }}
        >
          <Navigation />
          <Hero 
            title="MARKATIS DEVELOPMENT" 
            subtitle="Crafting innovative software solutions with cutting-edge technology" 
          />
        </div>
      </div>
    </main>
  );
} 