'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeroProps {
  title: string
  subtitle: string
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Immediate animation trigger for faster loading
    setIsVisible(true);
  }, []);

  return (
    <div className="hero-container">
      {/* Optimized background panel */}
      <div 
        className={`absolute inset-x-0 mx-auto w-full max-w-4xl py-8 px-4 rounded-lg bg-black bg-opacity-50 backdrop-blur-sm border border-red-900/30 shadow-xl transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />

      {/* Optimized title animation */}
      <div className="relative mb-12 z-10">
        <h1 className={`hero-title text-center max-w-4xl mx-auto transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="text-white shadow-white-glow">MARKATIS </span>
          <span className="text-red-600 shadow-red-glow">DEVELOPMENT</span>
        </h1>
        
        {/* Optimized red line animation */}
        <div 
          className={`absolute bottom-0 left-1/2 bg-redAccent h-0.5 rounded-full transition-all duration-1000 ease-out ${
            isVisible ? 'w-32 opacity-80' : 'w-0 opacity-0'
          }`}
          style={{
            transform: 'translateX(-50%)',
            transitionDelay: '300ms',
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.7)'
          }}
        />
      </div>
      
      {/* Optimized subtitle */}
      <p 
        className={`hero-subtitle text-center max-w-2xl mx-auto z-10 relative transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{
          transitionDelay: '500ms',
          textShadow: '0 0 10px rgba(0, 0, 0, 0.8)'
        }}
      >
        {subtitle}
      </p>
      
      {/* Optimized CTA buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-16 z-10 relative">
        {[
          { text: 'View CV', href: '/cv' },
          { text: 'Projects', href: '/projects' },
          { text: 'Contact', href: '/contact' }
        ].map((item, index) => (
          <Link 
            key={item.text}
            href={item.href} 
            className={`cta-button relative overflow-hidden group transition-all duration-500 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: `${700 + index * 100}ms`
            }}
          >
            <span className="absolute inset-0 w-0 bg-redAccent opacity-30 group-hover:w-full transition-all duration-500 ease-out" />
            <span className="relative z-10">{item.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hero; 