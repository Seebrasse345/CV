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
      }, 300); // Start fade out after a delay
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
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 transition-opacity duration-700 ease-out"
      style={{ opacity }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div>
      </div>
      <p className="mt-6 text-white text-xl font-mono animate-pulse">
        Loading Artistry...
      </p>
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

      <div className="z-10 relative"> {/* Container for animated content */}
        {/* Navigation Animation */}
        <div
          className="transition-all duration-700 ease-out relative"
          style={{
            opacity: isLoading ? 0 : 1,
            transform: isLoading ? 'translateY(-30px)' : 'translateY(0)',
            zIndex: 20 // Ensure navigation wrapper is above hero wrapper
          }}
        >
          <Navigation />
        </div>

        {/* Hero Animation */}
        <div
          className="transition-all duration-1000 ease-out relative"
          style={{
            opacity: isLoading ? 0 : 1,
            transform: isLoading ? 'translateY(30px) scale(0.95)' : 'translateY(0) scale(1)',
            transitionDelay: isLoading ? '0ms' : '200ms', // Apply delay only for the entry animation
            zIndex: 10 // Below navigation wrapper
          }}
        >
          <Hero 
            title="MARKATIS DEVELOPMENT" 
            subtitle="Crafting innovative software solutions with cutting-edge technology" 
          />
        </div>
      </div>
    </main>
  );
}