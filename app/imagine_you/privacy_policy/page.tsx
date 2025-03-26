'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ReactMarkdown, { Components } from 'react-markdown';
import { motion } from 'framer-motion';
import CanvasAnimation from '@/components/CanvasAnimation';
import Head from 'next/head';

// Markdown styles
const markdownStyles = {
  h1: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#80D8FF',
  },
  h2: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#40C4FF',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '1.5rem',
    marginBottom: '0.75rem',
    color: '#00B0FF',
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginTop: '1.25rem',
    marginBottom: '0.5rem',
    color: '#0091EA',
  },
  p: {
    marginBottom: '1rem',
    lineHeight: '1.7',
  },
  ul: {
    marginBottom: '1rem',
    paddingLeft: '1.5rem',
    listStyleType: 'disc',
  },
  ol: {
    marginBottom: '1rem',
    paddingLeft: '1.5rem',
    listStyleType: 'decimal',
  },
  li: {
    marginBottom: '0.5rem',
  },
  strong: {
    fontWeight: 'bold',
    color: '#80D8FF',
  },
  a: {
    color: '#40C4FF',
    textDecoration: 'underline',
    transition: 'color 0.3s',
  },
  blockquote: {
    borderLeft: '4px solid #00B0FF',
    paddingLeft: '1rem',
    fontStyle: 'italic',
    marginBottom: '1rem',
  },
};

// Custom components for ReactMarkdown
const MarkdownComponents: Components = {
  h1: ({ children, ...props }) => <h1 style={markdownStyles.h1} {...props}>{children}</h1>,
  h2: ({ children, ...props }) => <h2 style={markdownStyles.h2} {...props}>{children}</h2>,
  h3: ({ children, ...props }) => <h3 style={markdownStyles.h3} {...props}>{children}</h3>,
  h4: ({ children, ...props }) => <h4 style={markdownStyles.h4} {...props}>{children}</h4>,
  p: ({ children, ...props }) => <p style={markdownStyles.p} {...props}>{children}</p>,
  ul: ({ children, ...props }) => <ul style={markdownStyles.ul} {...props}>{children}</ul>,
  ol: ({ children, ...props }) => <ol style={markdownStyles.ol} {...props}>{children}</ol>,
  li: ({ children, ...props }) => <li style={markdownStyles.li} {...props}>{children}</li>,
  strong: ({ children, ...props }) => <strong style={markdownStyles.strong} {...props}>{children}</strong>,
  a: ({ children, ...props }) => <a style={markdownStyles.a} {...props}>{children}</a>,
  blockquote: ({ children, ...props }) => <blockquote style={markdownStyles.blockquote} {...props}>{children}</blockquote>,
};

// Animation variables - using different IDs from the Terms page
const CANVAS_ID = `pp-canvas-${Math.random().toString(36).substring(2, 9)}`;
const ANIMATION_CONTAINER_ID = `pp-animation-container-${Math.random().toString(36).substring(2, 9)}`;

export default function PrivacyPolicyPage() {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  // Fetch the markdown content
  useEffect(() => {
    fetch('/privacy.txt')
      .then(response => response.text())
      .then(text => {
        setMarkdownContent(text);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading markdown:', error);
        setMarkdownContent('Error loading privacy policy.');
        setIsLoading(false);
      });
  }, []);

  // Set up animation after component mounts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    console.log("Setting up Privacy Policy animation");
    
    // Create and initialize the animation with very bright and visible elements
    const animation = new CanvasAnimation({
      canvasId: CANVAS_ID,
      containerId: ANIMATION_CONTAINER_ID,
      zIndex: -5,
      debugInfo: true,
      baseBackgroundColor: '#0D0D0D',
      borderColor: '#00FFFF', // Bright cyan border
      particles: {
        count: 180, // Even more particles
        minSize: 2.5, // Good minimum size
        maxSize: 9, // Large maximum size
        minSpeed: 0.4,
        maxSpeed: 1.8, // Fast particles
        colorBase: [100, 150, 255], // Blue-ish base
        colorVariation: [100, 50, 55] // Different color variation
      },
      blackHole: {
        sizeRatio: 0.28, // Larger black hole
        glowColor: 'rgba(120, 190, 255, 1)', // Blue glow
        centralColor: 'rgba(20, 0, 80, 0.8)', // Deep blue center
        pulseSpeed: 0.025, // Moderate pulse
        pulseSize: 65 // Large pulse
      }
    });
    
    animation.init();
    setAnimationLoaded(true);
    
    // Cleanup on unmount
    return () => {
      console.log("Cleaning up Privacy Policy animation");
      animation.cleanup();
    };
  }, []);

  // Animation variants for content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <main className="min-h-screen bg-dark relative overflow-hidden">
      <Head>
        <title>Privacy Policy - Imagine You</title>
      </Head>
      
      {/* Diagnostic overlay */}
      <div className="fixed top-0 right-0 z-50 bg-black bg-opacity-70 text-white p-2 text-xs pointer-events-none">
        <div className="font-bold">PRIVACY POLICY ANIMATION</div>
        <div>Canvas ID: {CANVAS_ID}</div>
        <div>Animation Loaded: {animationLoaded ? "YES" : "NO"}</div>
        <div>Content Loading: {isLoading ? "YES" : "NO"}</div>
      </div>
      
      <Navigation />
      
      {/* Content with background container to ensure opacity doesn't affect animation visibility */}
      <div className="relative z-20">
        <div 
          className="pt-24 pb-20 min-h-screen transition-all duration-1000"
          style={{ 
            opacity: isLoading ? 0 : 1,
            transform: isLoading ? 'translateY(20px)' : 'translateY(0)'
          }}
        >
          <div className="container mx-auto px-4">
            {/* Header with page title */}
            <div className="text-center py-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent" 
                style={{ 
                  backgroundImage: 'linear-gradient(135deg, #7B2CBF 0%, #C77DFF 100%)',
                  textShadow: '0 0 15px rgba(123, 44, 191, 0.6)'
                }}
              >
                Privacy Policy
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Learn how we protect your data and privacy when using Imagine You
              </p>
            </div>

            {/* Markdown Content */}
            <motion.div 
              className="max-w-4xl mx-auto bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-purple-700 border-opacity-50 p-8 mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="text-gray-300">
                <ReactMarkdown components={MarkdownComponents}>{markdownContent}</ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 