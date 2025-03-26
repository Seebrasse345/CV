'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';

// Define Particle interface
interface Particle {
  x: number;
  y: number;
  angle: number;
  radius: number;
  speed: number;
  distance: number;
  life: number;
  decay: number;
  color: number[];
  reset: () => void;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  getRandomColor: () => number[];
}

export default function ImagineYouPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Load only on client-side
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Black hole background iframe */}
      <iframe 
        src="/black_hole_diffusion.html"
        className="absolute inset-0 w-full h-full border-0 pointer-events-none z-0"
        title="Black Hole Background"
        aria-hidden="true"
      />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white">
      <Navigation />
      
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="container mx-auto px-4 py-16 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-white">
            Are you <span className="text-purple-400">ready</span> to make a <span className="text-purple-400">choice</span>?
            </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Choose wisely, for your path will determine how long you remain here.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg transition-colors duration-300 min-w-[200px]"
              onClick={() => window.location.href = '/'}
            >
              Return Home
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold text-lg transition-colors duration-300 min-w-[200px]"
              onClick={() => window.location.href = '/imagine_you/terms'}
            >
              Stay Longer
            </motion.button>
                    </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400"
        >
          <p>© {new Date().getFullYear()} Matthaios Markatis</p>
          </motion.div>
        </div>
      </div>
  );
} 