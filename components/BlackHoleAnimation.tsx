'use client';

import React, { useEffect, useRef } from 'react';

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

/**
 * BlackHoleAnimation Component
 * 
 * A React component that renders a black hole animation using HTML Canvas.
 * This component handles its own cleanup to prevent memory leaks and 
 * animation persistence when navigating between pages.
 */
export default function BlackHoleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const isComponentMounted = useRef(true);
  
  // Initialize canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    console.log('BlackHoleAnimation: Initializing canvas');
    
    // Mark component as mounted
    isComponentMounted.current = true;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      if (!canvas || !isComponentMounted.current) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle class
    class ParticleImpl implements Particle {
      x!: number;
      y!: number;
      angle!: number;
      radius!: number;
      speed!: number;
      distance!: number;
      life!: number;
      decay!: number;
      color!: number[];
      
      constructor() {
        this.reset();
      }
      
      reset() {
        if (!canvas) return;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 3 + 1;
        this.distance = Math.random() * 200 + 50;
        this.life = 1.0;
        this.decay = Math.random() * 0.02 + 0.005;
        this.color = this.getRandomColor();
      }
      
      getRandomColor() {
        const colors = [
          [123, 44, 191], // Primary purple #7B2CBF
          [199, 125, 255], // Accent purple #C77DFF
          [160, 80, 240], // Mid purple
          [90, 20, 120]  // Deep purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        if (!canvas) return;
        
        this.angle += 0.01;
        this.distance -= this.speed * 0.05;
        this.life -= this.decay;
        
        this.x = canvas.width / 2 + Math.cos(this.angle) * this.distance;
        this.y = canvas.height / 2 + Math.sin(this.angle) * this.distance;
        
        if (this.life <= 0 || this.distance <= 0) {
          this.reset();
        }
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.life})`;
        ctx.fill();
      }
    }
    
    // Create particles
    const NUM_PARTICLES = 300;
    const particles: Particle[] = [];
    
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push(new ParticleImpl());
    }
    
    particlesRef.current = particles;
    
    // Draw black hole
    function drawBlackHole(ctx: CanvasRenderingContext2D) {
      if (!canvas) return;
      
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, 100
      );
      
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.8, 'rgba(26, 0, 51, 0.8)');
      gradient.addColorStop(1, 'rgba(26, 0, 51, 0)');
      
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#7B2CBF';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(123, 44, 191, 0.5)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    
    // Animation loop
    function animate() {
      if (!canvas || !ctx || !isComponentMounted.current) {
        // If component is unmounted or canvas is not available, stop animation
        return;
      }
      
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(13, 13, 13, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      
      drawBlackHole(ctx);
      
      // Only request a new frame if the component is still mounted
      if (isComponentMounted.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }
    
    // Start animation
    animate();
    
    // Enhanced cleanup for page navigation
    const handleBeforeUnload = () => {
      console.log('BlackHoleAnimation: Cleaning up on page unload');
      isComponentMounted.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      }
    };
    
    // Add an event listener for page navigation/unload
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Handle Next.js client-side navigation
    const handleRouteChange = () => {
      console.log('BlackHoleAnimation: Cleaning up on route change');
      isComponentMounted.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      }
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    // Clean up - this is called when the component unmounts
    return () => {
      console.log('BlackHoleAnimation: Component unmounting, cleaning up');
      isComponentMounted.current = false;
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleRouteChange);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      }
      
      // Clear the canvas explicitly
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      // Clear particle references
      particlesRef.current = [];
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 block" 
      style={{ background: '#0D0D0D' }}
      id="blackHoleCanvas"
      data-page="imagine_you"
    />
  );
} 