'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

// Custom styles for markdown content
const customStyles = `
  .markdown-content h1, 
  .markdown-content h2, 
  .markdown-content h3, 
  .markdown-content h4 {
    color: #C77DFF;
    margin-top: 1.5em;
    margin-bottom: 0.75em;
    font-weight: 600;
  }
  
  .markdown-content h1 {
    font-size: 2rem;
    border-bottom: 1px solid rgba(123, 44, 191, 0.3);
    padding-bottom: 0.3em;
  }
  
  .markdown-content h2 {
    font-size: 1.5rem;
  }
  
  .markdown-content h3 {
    font-size: 1.25rem;
  }
  
  .markdown-content p {
    margin-bottom: 1.25em;
    line-height: 1.7;
  }
  
  .markdown-content ul, 
  .markdown-content ol {
    margin-bottom: 1.25em;
    padding-left: 1.5em;
  }
  
  .markdown-content li {
    margin-bottom: 0.5em;
  }
  
  .markdown-content strong {
    color: white;
    font-weight: 600;
  }
  
  .markdown-content a {
    color: #C77DFF;
    text-decoration: underline;
  }
  
  .markdown-content blockquote {
    border-left: 4px solid #7B2CBF;
    padding-left: 1em;
    margin-left: 0;
    color: #aaa;
  }
`;

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
      ctx.fillStyle = 'rgba(13, 13, 13, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw purple gradient glow in the center
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.3
      );
      
      gradient.addColorStop(0, 'rgba(123, 44, 191, 0.2)');
      gradient.addColorStop(0.5, 'rgba(123, 44, 191, 0.1)');
      gradient.addColorStop(1, 'rgba(13, 13, 13, 0)');
      
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
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
      {/* Add custom styles */}
      <style jsx global>{customStyles}</style>
      
      {/* Background Animation */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ 
            background: '#0D0D0D',
            display: 'block'
          }}
        />
      </div>
      
      <Navigation />
      
      <div className="pt-24 pb-20 min-h-screen transition-all duration-1000"
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
            className="max-w-4xl mx-auto bg-dark-card bg-opacity-90 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-purple-700 border-opacity-30 p-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="markdown-content text-gray-300">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 