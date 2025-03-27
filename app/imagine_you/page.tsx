'use client';

import React, { useState, useEffect } from 'react';
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
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants for content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="min-h-screen bg-dark relative overflow-hidden">
      {/* Black Hole Animation */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <iframe 
          src="../black_hole_diffusion.html"
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          title="Black Hole Background"
          aria-hidden="true"
          style={{ 
            background: '#0D0D0D',
            display: 'block', // Ensures no extra space
            width: '100%',
            height: '100%'
          }}
        />
      </div>
      
      <Navigation />
      
      <div className="pt-24 pb-20 transition-all duration-1000 min-h-screen"
        style={{ 
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'translateY(20px)' : 'translateY(0)'
        }}
      >
        <div className="container mx-auto px-4">
          {/* Header with app name and tagline */}
          <div className="text-center py-10 md:py-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent" 
              style={{ 
                backgroundImage: 'linear-gradient(135deg, #7B2CBF 0%, #C77DFF 100%)',
                textShadow: '0 0 15px rgba(123, 44, 191, 0.6)'
              }}
            >
              Imagine You
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Become anyone, anywhere, in any style with personalized AI image generation
            </p>
          </div>

          {/* Main content */}
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* App Overview Section */}
            <motion.section 
              className="mb-16" 
              variants={itemVariants}
            >
              <div className="bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-opacity-20"
                style={{ borderColor: '#7B2CBF' }}
              >
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-6" style={{ color: '#C77DFF' }}>Transform Your Photos Into Magic</h2>
                  <p className="text-gray-300 text-lg mb-6">
                    Imagine You turns your selfies into stunning, personalized artwork. Upload a few photos, and our AI creates a digital twin that can appear in any scenario you can dream up - from fantasy worlds to professional settings, historical eras, or artistic styles.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-dark-lighter p-6 rounded-xl shadow-lg"
                      style={{ borderLeft: '4px solid #7B2CBF' }}
                    >
                      <h3 className="text-xl font-semibold mb-4" style={{ color: '#C77DFF' }}>Your Creative Journey</h3>
                      <ol className="text-gray-300 space-y-3 list-decimal pl-5">
                        <li>Upload 10-20 photos of yourself from different angles</li>
                        <li>Our AI learns your unique features and expressions</li>
                        <li>Describe any scene or style you can imagine</li>
                        <li>Watch as AI instantly generates images of you</li>
                        <li>Share your creations with friends and on social media</li>
                      </ol>
                    </div>
                    <div className="bg-dark-lighter p-6 rounded-xl shadow-lg"
                      style={{ borderLeft: '4px solid #7B2CBF' }}
                    >
                      <h3 className="text-xl font-semibold mb-4" style={{ color: '#C77DFF' }}>Endless Possibilities</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#C77DFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>See yourself as a character in your favorite movie</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#C77DFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Create professional headshots in various styles</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#C77DFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Visualize yourself in historical periods</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#C77DFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Transform into fantasy, sci-fi, or anime versions of yourself</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#C77DFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Create profile pictures with unique artistic styles</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* App Features */}
            <motion.section
              className="mb-16"
              variants={itemVariants}
            >
              <div className="bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-opacity-20"
                style={{ borderColor: '#7B2CBF' }}
              >
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-6" style={{ color: '#C77DFF' }}>Powerful Features</h2>
                  <p className="text-gray-300 text-lg mb-8">
                    Our app combines cutting-edge AI with an intuitive, user-friendly interface to make image generation simple, fun, and incredibly personalized.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-dark-lighter p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#C77DFF' }}>Easy to Use</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>Simple, guided setup process</li>
                        <li>Intuitive chat-based interface</li>
                        <li>No technical knowledge required</li>
                        <li>Automatic image saving to gallery</li>
                      </ul>
                    </div>
                    <div className="bg-dark-lighter p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#C77DFF' }}>Creative Control</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>Detailed prompt customization</li>
                        <li>Multiple styles and aesthetics</li>
                        <li>Adjustable image settings</li>
                        <li>Create multiple personalized models</li>
                      </ul>
                    </div>
                    <div className="bg-dark-lighter p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#C77DFF' }}>Premium Quality</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>High-resolution outputs</li>
                        <li>Stunning visual details</li>
                        <li>Fast generation (under 30 seconds)</li>
                        <li>Accurate facial representation</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-dark-lighter p-6 rounded-xl shadow-lg"
                    style={{ borderLeft: '4px solid #7B2CBF' }}
                  >
                    <h3 className="text-xl font-semibold mb-4" style={{ color: '#C77DFF' }}>Your Private, Secure Experience</h3>
                    <div className="text-gray-300">
                      <p>Your privacy and data security are our top priorities. All your photos are processed with strict confidentiality, and your personal model is only accessible to you. We use state-of-the-art encryption and follow industry best practices to ensure your data remains secure.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
              variants={itemVariants}
              className="mb-16 text-center"
            >
              <div className="bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-opacity-20 py-16 px-8"
                style={{ 
                  borderColor: '#7B2CBF',
                  background: 'radial-gradient(circle at center, rgba(26, 0, 51, 0.8) 0%, rgba(13, 13, 13, 0.9) 70%)'
                }}
              >
                <h2 className="text-4xl font-bold mb-6" style={{ color: '#C77DFF' }}>Start Your Creative Journey</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  Download Imagine You today and unlock limitless creative possibilities. Transform yourself into anything you can dream of with just a few taps.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="#" className="inline-block py-4 px-8 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      background: 'linear-gradient(135deg, #7B2CBF 0%, #C77DFF 100%)',
                      boxShadow: '0 5px 20px rgba(123, 44, 191, 0.4)'
                    }}
                  >
                    Download for Android
                  </a>
                  <a href="#" className="inline-block py-4 px-8 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      background: 'linear-gradient(135deg, #7B2CBF 0%, #C77DFF 100%)',
                      boxShadow: '0 5px 20px rgba(123, 44, 191, 0.4)'
                    }}
                  >
                    Download for iOS
                  </a>
                </div>
              </div>
            </motion.section>

            {/* User Focused FAQ Section */}
            <motion.section
              variants={itemVariants}
            >
              <div className="bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-opacity-20"
                style={{ borderColor: '#7B2CBF' }}
              >
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-8" style={{ color: '#C77DFF' }}>Common Questions</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#C77DFF' }}>How many photos do I need to upload?</h3>
                      <p className="text-gray-300">We recommend 10-20 high-quality photos with varied expressions, angles, and lighting for best results. This helps our AI learn your unique features more accurately.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#C77DFF' }}>How long does it take to create my model?</h3>
                      <p className="text-gray-300">Your personalized model will be ready in about 20-30 minutes after uploading your photos. We&apos;ll notify you when it&apos;s ready to use!</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#C77DFF' }}>What kind of prompts work best?</h3>
                      <p className="text-gray-300">Detailed prompts with clear scenarios work best. For example, &quot;me as an astronaut on Mars with a red spacesuit&quot; will give better results than simply &quot;astronaut&quot;.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#C77DFF' }}>Can I create multiple different styles?</h3>
                      <p className="text-gray-300">Yes! You can create multiple personalized models for different looks or styles. Each model can have its own unique characteristics.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#C77DFF' }}>Do I need to be online to use the app?</h3>
                      <p className="text-gray-300">Yes, an internet connection is required to generate images, as the AI processing happens on our secure cloud servers for the best quality results.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 