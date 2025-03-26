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
    color: '#C77DFF',
  },
  h2: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#9D4EDD',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '1.5rem',
    marginBottom: '0.75rem',
    color: '#7B2CBF',
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginTop: '1.25rem',
    marginBottom: '0.5rem',
    color: '#5A189A',
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
    color: '#C77DFF',
  },
  a: {
    color: '#C77DFF',
    textDecoration: 'underline',
    transition: 'color 0.3s',
  },
  blockquote: {
    borderLeft: '4px solid #C77DFF',
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

// Animation variables - using module scope constants instead of component state
const CANVAS_ID = `tc-canvas-${Math.random().toString(36).substring(2, 9)}`;
const ANIMATION_CONTAINER_ID = `tc-animation-container-${Math.random().toString(36).substring(2, 9)}`;

export default function TermsPage() {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  // Fetch the markdown content
  useEffect(() => {
    fetch('/tncs.txt')
      .then(response => response.text())
      .then(text => {
        // Extract the markdown content between the ```markdown tags
        const regex = /```markdown([\s\S]*?)```/;
        const match = text.match(regex);
        if (match && match[1]) {
          setMarkdownContent(match[1]);
        } else {
          setMarkdownContent('Error loading terms and conditions.');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading markdown:', error);
        setMarkdownContent('Error loading terms and conditions.');
        setIsLoading(false);
      });
  }, []);

  // Set up animation after component mounts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Create and initialize the animation with very bright and visible elements
    const animation = new CanvasAnimation({
      canvasId: CANVAS_ID,
      containerId: ANIMATION_CONTAINER_ID,
      zIndex: -5,
      debugInfo: false,
      baseBackgroundColor: '#0D0D0D',
      borderColor: 'transparent',
      particles: {
        count: 150, // More particles
        minSize: 3, // Larger minimum size
        maxSize: 10, // Larger maximum size
        minSpeed: 0.5,
        maxSpeed: 2.0, // Faster particles
        colorBase: [170, 80, 220], // Brighter purple base
        colorVariation: [85, 100, 35] // More color variation
      },
      blackHole: {
        sizeRatio: 0.25, // Larger black hole
        glowColor: 'rgba(200, 100, 255, 1)', // Brighter glow
        centralColor: 'rgba(50, 0, 100, 0.8)', // More visible central color
        pulseSpeed: 0.03, // Faster pulse
        pulseSize: 60 // Larger pulse
      }
    });
    
    animation.init();
    setAnimationLoaded(true);
    
    // Cleanup on unmount
    return () => {
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
        <title>Terms and Conditions - Imagine You</title>
      </Head>
      
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
                Terms and Conditions
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Please review our terms and conditions for using Imagine You
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