'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ImagineYouPage() {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
    <main className="min-h-screen bg-dark relative">
      {/* Black Hole Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ height: '70vh' }}>
        <iframe 
          ref={iframeRef}
          src="/black_hole_diffusion.html" 
          className="w-full h-full border-0"
          title="Black Hole Diffusion Animation"
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
              Your personalized AI image generation app that lets you become anything you can imagine
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
                  <h2 className="text-3xl font-bold mb-6" style={{ color: '#C77DFF' }}>Create Your Digital Twin</h2>
                  <p className="text-gray-300 text-lg mb-6">
                    Imagine You allows you to create personalized AI image models by uploading photos of yourself, which are then used to train a custom diffusion model. Once trained, you can generate custom images of yourself in any style, situation, or scenario you can imagine through simple text prompts.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-dark-lighter p-6 rounded-xl shadow-lg"
                      style={{ borderLeft: '4px solid #7B2CBF' }}
                    >
                      <h3 className="text-xl font-semibold mb-4" style={{ color: '#C77DFF' }}>How It Works</h3>
                      <ol className="text-gray-300 space-y-3 list-decimal pl-5">
                        <li>Sign up and upload 10-20 photos of yourself</li>
                        <li>Our AI trains a custom model just for you</li>
                        <li>Type any scenario you can imagine</li>
                        <li>Get stunning AI-generated images of yourself</li>
                        <li>Save, share, and explore endless possibilities</li>
                      </ol>
                    </div>
                    <div className="bg-dark-lighter p-6 rounded-xl shadow-lg"
                      style={{ borderLeft: '4px solid #7B2CBF' }}
                    >
                      <h3 className="text-xl font-semibold mb-4" style={{ color: '#C77DFF' }}>Key Features</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#C77DFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Secure photo upload and model training</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#C77DFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Interactive chat-like prompt interface</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#C77DFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>High-quality image generation in seconds</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#C77DFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Customizable generation settings</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#C77DFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Image gallery with sharing capabilities</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Technical Details */}
            <motion.section
              className="mb-16"
              variants={itemVariants}
            >
              <div className="bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-opacity-20"
                style={{ borderColor: '#7B2CBF' }}
              >
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-6" style={{ color: '#C77DFF' }}>Technical Magic</h2>
                  <p className="text-gray-300 text-lg mb-8">
                    Powered by state-of-the-art AI technology, Imagine You uses custom-trained FLUX.1 diffusion models through the Replicate API to create stunning, personalized images with exceptional quality and accuracy.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-dark-lighter p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#C77DFF' }}>Frontend</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>Flutter for cross-platform development</li>
                        <li>Provider pattern for state management</li>
                        <li>Custom animations and transitions</li>
                        <li>Responsive design for all screen sizes</li>
                      </ul>
                    </div>
                    <div className="bg-dark-lighter p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#C77DFF' }}>Backend</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>Firebase Authentication for user management</li>
                        <li>Cloud Firestore for data storage</li>
                        <li>Firebase Storage for image storage</li>
                        <li>Replicate API for AI model training and generation</li>
                      </ul>
                    </div>
                    <div className="bg-dark-lighter p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#C77DFF' }}>AI Technology</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>Custom FLUX.1 diffusion models</li>
                        <li>Training on 10-20 user photos</li>
                        <li>Natural language prompt processing</li>
                        <li>Advanced style transfer capabilities</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-dark-lighter p-6 rounded-xl shadow-lg"
                    style={{ borderLeft: '4px solid #7B2CBF' }}
                  >
                    <h3 className="text-xl font-semibold mb-4" style={{ color: '#C77DFF' }}>Model Training Process</h3>
                    <div className="text-gray-300">
                      <p className="mb-4">Imagine You uses the Replicate API and the following FLUX model for training:</p>
                      <div className="bg-[#1A0033] p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm text-purple-300">
                          ostris/flux-dev-lora-trainer:b6af14222e6bd9be257cbc1ea4afda3cd0503e1133083b9d1de0364d8568e6ef
                        </code>
                      </div>
                      <p className="mt-4">The training process typically takes 20-30 minutes on Nvidia H100 GPU hardware, with the model being optimized specifically for your unique features and characteristics.</p>
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
                <h2 className="text-4xl font-bold mb-6" style={{ color: '#C77DFF' }}>Ready to Reinvent Yourself?</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  Download the Imagine You app today and start creating incredible images of yourself in any scenario you can dream up. Your imagination is the only limit.
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

            {/* FAQ Section */}
            <motion.section
              variants={itemVariants}
            >
              <div className="bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-opacity-20"
                style={{ borderColor: '#7B2CBF' }}
              >
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-8" style={{ color: '#C77DFF' }}>Frequently Asked Questions</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#C77DFF' }}>How long does model training take?</h3>
                      <p className="text-gray-300">Typically 20-30 minutes, depending on the number of photos and current API traffic.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#C77DFF' }}>How much does it cost to train a model?</h3>
                      <p className="text-gray-300">Training runs on Nvidia H100 GPU hardware at approximately $0.001525 per second. A typical 20-minute training with 10-20 images costs around $2.00 USD.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#C77DFF' }}>How many images should I upload for best results?</h3>
                      <p className="text-gray-300">10-20 high-quality photos with varied poses, expressions, and lighting will give the best results.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#C77DFF' }}>Can I create multiple models?</h3>
                      <p className="text-gray-300">Yes, you can create multiple models for different styles or looks.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#C77DFF' }}>Can I use the app offline?</h3>
                      <p className="text-gray-300">No, an internet connection is required for both model training and image generation.</p>
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