'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';

// Optimized dynamic import with lightweight fallback
const CosmicBackground = dynamic(
  () => import('@/components/three/CosmicBackground'),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,0,255,0.1)_0%,_transparent_70%)]" />
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