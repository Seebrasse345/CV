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

export default function TermsPage() {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

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

    // Create particle class for more impressive animation
    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      life: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.radius = Math.random() * 2 + 0.5;
        this.color = `rgba(${123 + Math.random() * 76}, ${44 + Math.random() * 81}, ${191 + Math.random() * 64}, ${Math.random() * 0.5 + 0.3})`;
        this.velocity = {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        };
        this.life = Math.random() * 5 + 2;
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life -= 0.01;

        // Reset particle if it's off-screen or depleted
        if (this.x < 0 || this.x > canvas!.width || this.y < 0 || this.y > canvas!.height || this.life <= 0) {
          this.x = Math.random() * canvas!.width;
          this.y = Math.random() * canvas!.height;
          this.life = Math.random() * 5 + 2;
        }
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.fill();

        // Add glow effect
        ctx!.shadowBlur = 10;
        ctx!.shadowColor = this.color;
      }
    }

    // Create particles array
    const particles: Particle[] = [];
    const particleCount = 100; // Increased particle count

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Simplified starry background animation
    const drawBackground = () => {
      // Slightly transparent background to create trails
      ctx!.fillStyle = 'rgba(13, 13, 13, 0.1)'; // More transparent for better visibility
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw purple gradient glow in the center
      const gradient = ctx!.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.6 // Increase size
      );
      
      gradient.addColorStop(0, 'rgba(123, 44, 191, 0.4)'); // More visible purple
      gradient.addColorStop(0.5, 'rgba(123, 44, 191, 0.2)'); // More visible purple
      gradient.addColorStop(1, 'rgba(13, 13, 13, 0)');
      
      ctx!.beginPath();
      ctx!.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.6, 0, Math.PI * 2);
      ctx!.fillStyle = gradient;
      ctx!.fill();
      
      // Update and draw all particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Add pulsating inner glow
      const time = Date.now() * 0.001;
      const pulseSize = 50 + Math.sin(time) * 20;
      const pulseOpacity = 0.5 + Math.sin(time * 1.3) * 0.2;
      
      ctx!.beginPath();
      ctx!.arc(canvas.width / 2, canvas.height / 2, pulseSize, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(199, 125, 255, ${pulseOpacity})`;
      ctx!.shadowBlur = 30;
      ctx!.shadowColor = 'rgba(199, 125, 255, 0.8)';
      ctx!.fill();
      
      ctx!.shadowBlur = 0; // Reset shadow for performance
      
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
            zIndex: -1 // Changed from -5 to -1 for better visibility
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
              Terms and Conditions
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Please review our terms and conditions for using Imagine You
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