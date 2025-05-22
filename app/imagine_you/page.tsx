'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';

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
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Dreamy Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/40 to-black"></div>
        
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-violet-600/15 to-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Subtle moving particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Dreamy overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-purple-950/20"></div>
      </div>

      <Navigation />
      
      <div className="relative z-10 pt-32 pb-20 transition-all duration-1000 min-h-screen"
        style={{ 
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'translateY(20px)' : 'translateY(0)'
        }}
      >
        <div className="container mx-auto px-4">          {/* Header with app name and tagline */}          <div className="text-center py-16 md:py-24">            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent leading-normal"              style={{                 filter: 'drop-shadow(0 0 30px rgba(139, 69, 255, 0.5))',                fontFamily: 'system-ui, -apple-system, sans-serif',                paddingBottom: '1.5rem',                lineHeight: '1.2'              }}            >              Imagine You            </h1>            <p className="text-2xl md:text-3xl text-purple-200/90 max-w-4xl mx-auto leading-relaxed">              Become anyone, anywhere, in any style with personalized AI image generation            </p>            <div className="mt-8 w-32 h-1 bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-500 mx-auto rounded-full shadow-lg shadow-purple-500/50"></div>          </div>

          {/* Main content */}
          <motion.div 
            className="max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* App Overview Section */}
            <motion.section 
              className="mb-20" 
              variants={itemVariants}
            >
              <div className="bg-gradient-to-br from-purple-950/30 via-black/60 to-indigo-950/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-purple-500/20 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-violet-600/5 pointer-events-none"></div>
                <div className="relative z-10 p-10 md:p-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                    Transform Your Photos Into Magic
                  </h2>
                  <p className="text-purple-100/80 text-xl md:text-2xl mb-10 leading-relaxed">
                    Imagine You turns your selfies into stunning, personalized artwork. Upload a few photos, and our AI creates a digital twin that can appear in any scenario you can dream up - from fantasy worlds to professional settings, historical eras, or artistic styles.
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-400/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none"></div>
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-6 text-purple-200">Your Creative Journey</h3>
                        <ol className="text-purple-100/80 space-y-4 list-decimal pl-6 text-lg">
                          <li>Upload 10-20 photos of yourself from different angles</li>
                          <li>Our AI learns your unique features and expressions</li>
                          <li>Describe any scene or style you can imagine</li>
                          <li>Watch as AI instantly generates images of you</li>
                          <li>Share your creations with friends and on social media</li>
                        </ol>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-violet-400/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none"></div>
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-6 text-violet-200">Endless Possibilities</h3>
                        <ul className="text-purple-100/80 space-y-3 text-lg">
                          <li className="flex items-start">
                            <span className="inline-block mr-3 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span>See yourself as a character in your favorite movie</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block mr-3 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span>Create professional headshots in various styles</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block mr-3 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span>Visualize yourself in historical periods</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block mr-3 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span>Transform into fantasy, sci-fi, or anime versions of yourself</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block mr-3 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              </div>
            </motion.section>

            {/* App Features */}
            <motion.section
              className="mb-20"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-br from-indigo-950/30 via-black/60 to-purple-950/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/20 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
                <div className="relative z-10 p-10 md:p-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                    Powerful Features
                  </h2>
                  <p className="text-purple-100/80 text-xl md:text-2xl mb-12 leading-relaxed">
                    Our app combines cutting-edge AI with an intuitive, user-friendly interface to make image generation simple, fun, and incredibly personalized.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-gradient-to-br from-purple-900/50 to-black/40 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-400/30 relative overflow-hidden group hover:transform hover:scale-105 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none group-hover:from-purple-500/20 transition-all duration-500"></div>
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4 text-purple-200">Easy to Use</h3>
                        <ul className="text-purple-100/80 space-y-3 text-lg">
                          <li>Simple, guided setup process</li>
                          <li>Intuitive chat-based interface</li>
                          <li>No technical knowledge required</li>
                          <li>Automatic image saving to gallery</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-900/50 to-black/40 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-indigo-400/30 relative overflow-hidden group hover:transform hover:scale-105 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none group-hover:from-indigo-500/20 transition-all duration-500"></div>
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4 text-indigo-200">Creative Control</h3>
                        <ul className="text-purple-100/80 space-y-3 text-lg">
                          <li>Detailed prompt customization</li>
                          <li>Multiple styles and aesthetics</li>
                          <li>Adjustable image settings</li>
                          <li>Create multiple personalized models</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-violet-900/50 to-black/40 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-violet-400/30 relative overflow-hidden group hover:transform hover:scale-105 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none group-hover:from-violet-500/20 transition-all duration-500"></div>
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4 text-violet-200">Premium Quality</h3>
                        <ul className="text-purple-100/80 space-y-3 text-lg">
                          <li>High-resolution outputs</li>
                          <li>Stunning visual details</li>
                          <li>Fast generation (under 30 seconds)</li>
                          <li>Accurate facial representation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-6 text-purple-200">Your Private, Secure Experience</h3>
                      <p className="text-purple-100/80 text-lg leading-relaxed">
                        Your privacy and data security are our top priorities. All your photos are processed with strict confidentiality, and your personal model is only accessible to you. We use state-of-the-art encryption and follow industry best practices to ensure your data remains secure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
              variants={itemVariants}
              className="mb-20 text-center"
            >
              <div className="bg-gradient-to-br from-purple-950/50 via-indigo-950/40 to-violet-950/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-purple-400/30 py-20 px-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-indigo-600/5 to-violet-600/10 pointer-events-none"></div>
                <div className="relative z-10">
                  <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
                    Start Your Creative Journey
                  </h2>
                  <p className="text-2xl text-purple-100/80 max-w-4xl mx-auto mb-12 leading-relaxed">
                    Download Imagine You today and unlock limitless creative possibilities. Transform yourself into anything you can dream of with just a few taps.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <a href="#" className="group relative inline-block py-5 px-10 rounded-2xl text-white font-bold text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40"
                      style={{ 
                        background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C084FC 100%)',
                      }}
                    >
                      <span className="relative z-10">Download for Android</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    </a>
                    <a href="#" className="group relative inline-block py-5 px-10 rounded-2xl text-white font-bold text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-indigo-500/40"
                      style={{ 
                        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)',
                      }}
                    >
                      <span className="relative z-10">Download for iOS</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* User Focused FAQ Section */}
            <motion.section
              variants={itemVariants}
            >
              <div className="bg-gradient-to-br from-violet-950/30 via-black/60 to-purple-950/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-violet-500/20 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
                <div className="relative z-10 p-10 md:p-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                    Common Questions
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-400/20">
                      <h3 className="text-2xl font-bold mb-4 text-purple-200">How many photos do I need to upload?</h3>
                      <p className="text-purple-100/80 text-lg leading-relaxed">We recommend 10-20 high-quality photos with varied expressions, angles, and lighting for best results. This helps our AI learn your unique features more accurately.</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-indigo-400/20">
                      <h3 className="text-2xl font-bold mb-4 text-indigo-200">How long does it take to create my model?</h3>
                      <p className="text-purple-100/80 text-lg leading-relaxed">Your personalized model will be ready in about 20-30 minutes after uploading your photos. We&apos;ll notify you when it&apos;s ready to use!</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-violet-900/30 to-indigo-900/20 backdrop-blur-sm p-6 rounded-xl border border-violet-400/20">
                      <h3 className="text-2xl font-bold mb-4 text-violet-200">What kind of prompts work best?</h3>
                      <p className="text-purple-100/80 text-lg leading-relaxed">Detailed prompts with clear scenarios work best. For example, &quot;me as an astronaut on Mars with a red spacesuit&quot; will give better results than simply &quot;astronaut&quot;.</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-400/20">
                      <h3 className="text-2xl font-bold mb-4 text-purple-200">Can I create multiple different styles?</h3>
                      <p className="text-purple-100/80 text-lg leading-relaxed">Yes! You can create multiple personalized models for different looks or styles. Each model can have its own unique characteristics.</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-indigo-400/20">
                      <h3 className="text-2xl font-bold mb-4 text-indigo-200">Do I need to be online to use the app?</h3>
                      <p className="text-purple-100/80 text-lg leading-relaxed">Yes, an internet connection is required to generate images, as the AI processing happens on our secure cloud servers for the best quality results.</p>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-purple-500/30 text-center text-purple-300/70 text-lg">
                    <div className="flex flex-wrap justify-center gap-6">
                      <a href="/imagine_you/terms" className="hover:text-purple-200 transition-colors duration-300 hover:underline">Terms & Conditions</a>
                      <a href="/imagine_you/privacy_policy" className="hover:text-purple-200 transition-colors duration-300 hover:underline">Privacy Policy</a>
                      <a href="/imagine_you/account_deletion" className="hover:text-purple-200 transition-colors duration-300 hover:underline">Account Deletion</a>
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