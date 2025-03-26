'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

// Custom styles for markdown content - replace style jsx global with a proper CSS in JS approach
const markdownStyles = {
  h1: {
    color: '#C77DFF',
    marginTop: '1.5em',
    marginBottom: '0.75em',
    fontWeight: 600,
    fontSize: '2rem',
    borderBottom: '1px solid rgba(123, 44, 191, 0.3)',
    paddingBottom: '0.3em',
  },
  h2: {
    color: '#C77DFF',
    marginTop: '1.5em',
    marginBottom: '0.75em',
    fontWeight: 600,
    fontSize: '1.5rem',
  },
  h3: {
    color: '#C77DFF',
    marginTop: '1.5em',
    marginBottom: '0.75em',
    fontWeight: 600,
    fontSize: '1.25rem',
  },
  h4: {
    color: '#C77DFF',
    marginTop: '1.5em',
    marginBottom: '0.75em',
    fontWeight: 600,
  },
  p: {
    marginBottom: '1.25em',
    lineHeight: 1.7,
  },
  ul: {
    marginBottom: '1.25em',
    paddingLeft: '1.5em',
  },
  ol: {
    marginBottom: '1.25em',
    paddingLeft: '1.5em',
  },
  li: {
    marginBottom: '0.5em',
  },
  strong: {
    color: 'white',
    fontWeight: 600,
  },
  a: {
    color: '#C77DFF',
    textDecoration: 'underline',
  },
  blockquote: {
    borderLeft: '4px solid #7B2CBF',
    paddingLeft: '1em',
    marginLeft: 0,
    color: '#aaa',
  },
};

// Custom components for ReactMarkdown
const MarkdownComponents = {
  h1: ({ node, ...props }: any) => <h1 style={markdownStyles.h1} {...props} />,
  h2: ({ node, ...props }: any) => <h2 style={markdownStyles.h2} {...props} />,
  h3: ({ node, ...props }: any) => <h3 style={markdownStyles.h3} {...props} />,
  h4: ({ node, ...props }: any) => <h4 style={markdownStyles.h4} {...props} />,
  p: ({ node, ...props }: any) => <p style={markdownStyles.p} {...props} />,
  ul: ({ node, ...props }: any) => <ul style={markdownStyles.ul} {...props} />,
  ol: ({ node, ...props }: any) => <ol style={markdownStyles.ol} {...props} />,
  li: ({ node, ...props }: any) => <li style={markdownStyles.li} {...props} />,
  strong: ({ node, ...props }: any) => <strong style={markdownStyles.strong} {...props} />,
  a: ({ node, ...props }: any) => <a style={markdownStyles.a} {...props} />,
  blockquote: ({ node, ...props }: any) => <blockquote style={markdownStyles.blockquote} {...props} />,
};

export default function PrivacyPolicyPage() {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

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

  // Set up background animation - simplified version of the main page animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Clear and redraw when resizing
      if (ctx) {
        ctx.fillStyle = '#0D0D0D';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Simplified starry background animation
    const drawBackground = () => {
      // Slightly transparent background to create trails
      ctx.fillStyle = 'rgba(13, 13, 13, 0.15)'; // Make more transparent
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw purple gradient glow in the center
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.4 // Increase size
      );
      
      gradient.addColorStop(0, 'rgba(123, 44, 191, 0.3)'); // More visible purple
      gradient.addColorStop(0.5, 'rgba(123, 44, 191, 0.15)'); // More visible purple
      gradient.addColorStop(1, 'rgba(13, 13, 13, 0)');
      
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add some random particles
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2 + 0.5;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199, 125, 255, ${Math.random() * 0.5 + 0.2})`;
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(drawBackground);
    };
    
    drawBackground();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
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
      {/* Background Animation */}
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ 
            background: '#0D0D0D',
            display: 'block',
            zIndex: -5 // Ensure it's behind content but visible
          }}
        />
      </div>
      
      <Navigation />
      
      <div className="pt-24 pb-20 min-h-screen transition-all duration-1000 z-10 relative"
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
            className="max-w-4xl mx-auto bg-dark-card bg-opacity-85 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-purple-700 border-opacity-30 p-8 mb-12"
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
    </main>
  );
} 