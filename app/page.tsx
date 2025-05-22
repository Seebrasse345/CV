'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';

// Optimized dynamic import with sophisticated loading fallback
const CosmicBackground = dynamic(
  () => import('@/components/three/CosmicBackground'),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
        {/* Enhanced gradients that match the new elegant animation */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(147,51,234,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.05)_0%,_transparent_70%)]" />
        
        {/* Subtle moving gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 animate-pulse"></div>
        </div>
        
        {/* Elegant floating particles for loading indication */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: i % 3 === 0 
                  ? 'rgba(147, 197, 253, 0.3)'  // Light blue
                  : i % 3 === 1 
                  ? 'rgba(196, 181, 253, 0.3)'  // Light purple  
                  : 'rgba(255, 255, 255, 0.2)', // White
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>
    )
  }
);

export default function Home() {
  return (
    <main className="relative min-h-screen font-mono">
      <div className="fixed inset-0 -z-10">
        <CosmicBackground />
      </div>

      <div className="z-10 relative">
        <Navigation />
        <Hero 
          title="MARKATIS DEVELOPMENT" 
          subtitle="Crafting innovative software solutions with cutting-edge technology" 
        />
      </div>
    </main>
  );
}