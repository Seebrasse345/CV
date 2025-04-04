import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Custom404() {
  return (
    <main className="min-h-screen relative overflow-hidden"
      style={{ 
        background: 'radial-gradient(circle at center, rgba(26, 0, 51, 0.8) 0%, rgba(13, 13, 13, 0.9) 70%, #0D0D0D 100%)'
      }}
    >
      <Navigation />
      
      <div className="pt-24 pb-20 transition-all duration-1000 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent" 
            style={{ 
              backgroundImage: 'linear-gradient(135deg, #FF4D4D 0%, #FF9B7D 100%)',
              textShadow: '0 0 15px rgba(255, 77, 77, 0.6)'
            }}
          >
            404
          </h1>
          <h2 className="text-3xl md:text-4xl text-white mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link 
            href="/"
            className="inline-block py-4 px-8 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #FF4D4D 0%, #FF9B7D 100%)',
              boxShadow: '0 5px 20px rgba(255, 77, 77, 0.4)'
            }}
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
} 