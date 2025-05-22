'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeroProps {
  title: string
  subtitle: string
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);

  useEffect(() => {
    // Staggered animation for better visual impact
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setTitleAnimated(true), 300);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="hero-container relative max-w-screen overflow-hidden">
      {/* Enhanced title with perfect centering */}
      <div className="relative mb-10 sm:mb-16 z-10 w-full max-w-full">
        <div className="w-full flex justify-center">
          <h1 className={`hero-title transition-all duration-1000 ease-out ${
            titleAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8">
              <span 
                className="text-white text-center"
                style={{
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                  letterSpacing: '0.02em'
                }}
              >
                MARKATIS
              </span>
              <span 
                className="text-cosmicAccent text-center"
                style={{
                  textShadow: '0 0 20px rgba(109, 120, 255, 0.6), 0 0 40px rgba(109, 120, 255, 0.4)',
                  filter: 'drop-shadow(0 4px 8px rgba(109, 120, 255, 0.3))',
                  letterSpacing: '0.02em'
                }}
              >
                DEVELOPMENT
              </span>
            </div>
          </h1>
        </div>
      </div>
      
      {/* Perfectly centered subtitle */}
      <div className="w-full flex justify-center mb-12 sm:mb-16">
        <div className="max-w-4xl w-full flex justify-center px-4">
          <p 
            className={`hero-subtitle text-center z-10 relative transition-all duration-800 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{
              transitionDelay: '700ms',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
              lineHeight: '1.6',
              color: '#e2e8f0',
              letterSpacing: '0.01em'
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Consistent CTA buttons - all with same theme */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 z-10 relative px-4">
        {[
          { text: 'View CV', href: '/cv' },
          { text: 'Projects', href: '/projects' },
          { text: 'Imagine You', href: '/imagine_you' },
          { text: 'Contact', href: '/contact' }
        ].map((item, index) => (
          <Link 
            key={item.text}
            href={item.href} 
            className={`cta-button relative overflow-hidden group transition-all duration-600 ease-out text-center flex-shrink-0 px-6 py-3 font-semibold ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{
              transitionDelay: `${900 + index * 150}ms`
            }}
          >
            {/* Consistent hover effect for all buttons */}
            <span className="absolute inset-0 w-0 bg-cosmicAccent opacity-20 group-hover:w-full transition-all duration-500 ease-out rounded-full" />
            
            <span className="relative z-10 whitespace-nowrap flex items-center justify-center">
              {item.text}
            </span>
          </Link>
        ))}
      </div>

      {/* Floating elements for enhanced aesthetics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-cosmicAccent rounded-full opacity-40 transition-opacity duration-1000 ${
              isVisible ? 'opacity-40' : 'opacity-0'
            }`}
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + Math.sin(i) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animation: 'float-gentle 4s ease-in-out infinite',
              boxShadow: '0 0 6px rgba(109, 120, 255, 0.6)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero; 