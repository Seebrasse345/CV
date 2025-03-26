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
  const [canvasHtmlId] = useState(`canvas-${Math.random().toString(36).substring(2, 9)}`);
  const [scriptExecuted, setScriptExecuted] = useState(false);

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

  // Raw HTML and JavaScript for pure canvas control - direct DOM manipulation
  // This bypasses React's virtual DOM to ensure canvas is properly rendered
  const rawHtml = `
    <div 
      id="animation-container" 
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 5;
        overflow: hidden;
        pointer-events: none;
      "
    >
      <canvas 
        id="${canvasHtmlId}" 
        style="
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 1;
          display: block;
          background-color: #FF00FF;
          border: 5px solid yellow;
        "
      ></canvas>
    </div>
  `;

  // Direct JavaScript animation - execute once after component mounts
  useEffect(() => {
    if (scriptExecuted) return;

    try {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function() {
          console.log("DIRECT SCRIPT: Starting animation script");
          
          // Get canvas directly from DOM
          const canvas = document.getElementById('${canvasHtmlId}');
          console.log("DIRECT SCRIPT: Canvas element found:", !!canvas);
          
          if (!canvas) {
            console.error("DIRECT SCRIPT: Canvas element not found!");
            return;
          }
          
          // Force dimensions
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          
          // Get context
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            console.error("DIRECT SCRIPT: Cannot get canvas context!");
            return;
          }
          
          console.log("DIRECT SCRIPT: Context created");
          
          // Fill with something EXTREMELY visible
          ctx.fillStyle = 'red';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.fillStyle = 'lime';  
          ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
          
          ctx.fillStyle = 'white';
          ctx.font = '30px Arial';
          ctx.fillText('DIRECT ANIMATION IS WORKING', 50, 100);
          ctx.fillText('TIME: ' + new Date().toISOString(), 50, 150);
          
          let frameCount = 0;
          
          // Simple animation loop
          function animate() {
            frameCount++;
            
            // Semi-transparent overlay to create trails
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Moving ball
            const x = canvas.width/2 + Math.sin(frameCount * 0.05) * 100;
            const y = canvas.height/2 + Math.cos(frameCount * 0.05) * 100;
            
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.fill();
            
            // Display frame count
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText('Frame: ' + frameCount, 50, 50);
            ctx.fillText('Time: ' + new Date().toISOString(), 50, 80);
            
            // Request next frame
            requestAnimationFrame(animate);
          }
          
          // Start animation
          animate();
          
          // Handle resize
          window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          });
        })();
      `;
      
      // Append script to body
      document.body.appendChild(script);
      setScriptExecuted(true);
      console.log("Main component: Script injected");
    } catch (error) {
      console.error("Script injection error:", error);
    }
  }, [canvasHtmlId, scriptExecuted]);

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
      {/* Inject raw HTML/JS for animation - completely bypassing React's handling */}
      <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
      
      {/* Diagnostic overlay */}
      <div className="fixed top-0 right-0 z-50 bg-black bg-opacity-70 text-white p-2 text-xs pointer-events-none">
        <div>EXTREME DEBUG MODE ACTIVE</div>
        <div>Canvas ID: {canvasHtmlId}</div>
        <div>Script executed: {scriptExecuted ? "YES" : "NO"}</div>
        <div>Loading: {isLoading ? "YES" : "NO"}</div>
      </div>
      
      <Navigation />
      
      {/* Content with reduced opacity to ensure animation is visible */}
      <div 
        className="pt-24 pb-20 min-h-screen transition-all duration-1000 relative z-20"
        style={{ 
          opacity: isLoading ? 0 : 0.85,
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