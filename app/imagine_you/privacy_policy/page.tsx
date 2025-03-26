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

  // Set up background animation - completely revamped for guaranteed visibility
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    console.log("Canvas initialized", canvas.width, canvas.height); // Debug logging
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      console.log("Canvas resized", canvas.width, canvas.height); // Debug logging
      
      // Force full redraw immediately when resized
      if (ctx) {
        ctx.fillStyle = '#0D0D0D';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw a bright highlight across the whole canvas for debugging
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // DIRECT PARTICLE SYSTEM (no class, simpler for debugging)
    const particleCount = 50;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 3, // LARGER SIZE for debugging
      color: `rgb(255, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 255)})`, // BRIGHTER COLORS
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }));

    // Super simple animation loop for debugging
    function animate() {
      if (!canvas || !ctx) return;
      
      // NEARLY TRANSPARENT BACKGROUND to see trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // DRAW A FIXED REFERENCE POINT at center for debugging
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw and update particles
      particles.forEach(p => {
        // Draw with high-contrast glow
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
        ctx.fillStyle = p.color;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      
      // Draw timestamp in corner for debugging
      ctx.fillStyle = 'white';
      ctx.font = '16px monospace';
      ctx.fillText(`Timestamp: ${Date.now()}`, 20, 20);
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    console.log("Starting animation"); // Debug logging
    animate();
    
    return () => {
      console.log("Cleaning up animation"); // Debug logging
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
      {/* Background Animation - Moved this to the FRONT of the DOM for testing */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ 
            display: 'block',
            opacity: 0.9 // HIGHER OPACITY for debugging
          }}
        />
      </div>
      
      {/* Temporarily adjust opacity for debugging */}
      <div className="fixed inset-0 z-0 bg-dark opacity-80"></div>
      
      <Navigation />
      
      <div className="pt-24 pb-20 min-h-screen transition-all duration-1000 relative z-10"
        style={{ 
          opacity: isLoading ? 0 : 0.9, // REDUCED OPACITY for debugging
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
            className="max-w-4xl mx-auto bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-purple-700 border-opacity-30 p-8 mb-12"
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