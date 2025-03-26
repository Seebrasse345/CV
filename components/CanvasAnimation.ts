/**
 * CanvasAnimation.ts
 * Global utility for managing canvas animations throughout the application
 * This ensures consistent behavior and renders animations in a way that avoids
 * Next.js issues with canvas elements.
 */

interface ParticleConfig {
  count: number;
  minSize: number;
  maxSize: number;
  minSpeed: number;
  maxSpeed: number;
  colorBase: [number, number, number];
  colorVariation: [number, number, number];
}

interface BlackHoleConfig {
  sizeRatio: number;
  glowColor: string;
  centralColor: string;
  pulseSpeed: number;
  pulseSize: number;
}

interface CanvasOptions {
  containerId: string;
  canvasId: string;
  zIndex: number;
  debugInfo: boolean;
  baseBackgroundColor: string;
  particles?: ParticleConfig;
  blackHole?: BlackHoleConfig;
  borderColor?: string;
}

export default class CanvasAnimation {
  private canvasId: string;
  private containerId: string;
  private zIndex: number;
  private debugInfo: boolean;
  private baseBackgroundColor: string;
  private particles?: ParticleConfig;
  private blackHole?: BlackHoleConfig;
  private borderColor?: string;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private frameCount: number = 0;
  private animationFrameId: number = 0;
  private particlesData: Array<{
    x: number;
    y: number;
    radius: number;
    color: string;
    speedX: number;
    speedY: number;
  }> = [];
  private isInitialized: boolean = false;
  private observer: MutationObserver | null = null;

  constructor(options: CanvasOptions) {
    this.canvasId = options.canvasId;
    this.containerId = options.containerId;
    this.zIndex = options.zIndex;
    this.debugInfo = options.debugInfo;
    this.baseBackgroundColor = options.baseBackgroundColor;
    this.particles = options.particles;
    this.blackHole = options.blackHole;
    this.borderColor = options.borderColor;
  }

  public init(): void {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }
    
    // Prevent double initialization
    if (this.isInitialized) {
      return;
    }
    
    try {
      // Use setTimeout to ensure DOM is fully loaded
      setTimeout(() => {
        this.createContainerAndCanvas();
        this.setupCanvas();
        this.setupMutationObserver();
        this.isInitialized = true;
      }, 100);
    } catch (error) {
      console.error("Error initializing animation:", error);
    }
  }

  private createContainerAndCanvas(): void {
    // First, create or get the container
    let container = document.getElementById(this.containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = this.containerId;
      
      // Set explicit styles to ensure it appears correctly
      Object.assign(container.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: this.zIndex.toString(),
        overflow: 'hidden',
        pointerEvents: 'none',
      });
      
      // Add it to the beginning of the body to ensure it's behind other content
      document.body.prepend(container);
    }
    
    // Then create or get the canvas
    this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = this.canvasId;
      
      // Set explicit styles to ensure it appears correctly
      Object.assign(this.canvas.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'block',
        opacity: '1',
        zIndex: '-1',
        backgroundColor: this.baseBackgroundColor,
      });
      
      if (this.borderColor) {
        this.canvas.style.border = `5px solid ${this.borderColor}`;
      }
      
      container.appendChild(this.canvas);
      
      // Add an inline script tag to ensure the canvas is properly initialized
      // This helps deal with Next.js's hydration process
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function() {
          const canvas = document.getElementById('${this.canvasId}');
          if (canvas) {
            // Force a redraw
            canvas.style.display = 'none';
            setTimeout(() => { canvas.style.display = 'block'; }, 0);
          }
        })();
      `;
      container.appendChild(script);
    }
  }

  private setupCanvas(): void {
    if (!this.canvas) return;
    
    // Set initial dimensions
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Get context
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    if (!this.ctx) {
      console.error(`Failed to get canvas context for: ${this.canvasId}`);
      return;
    }
    
    // Add an initial fill to make the canvas visible immediately
    this.ctx.fillStyle = this.baseBackgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Initialize particles if configured
    if (this.particles) {
      this.initParticles();
    }
    
    // Set up resize handler
    window.addEventListener('resize', this.handleResize);
    
    // Start animation
    this.startAnimation();
  }
  
  public cleanup(): void {
    if (!this.isInitialized) return;
    
    // Clean up all event listeners and animation frames
    window.removeEventListener('resize', this.handleResize);
    cancelAnimationFrame(this.animationFrameId);
    
    // Disconnect the observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    this.isInitialized = false;
  }
  
  private handleResize = (): void => {
    if (!this.canvas || !this.ctx) return;
    
    // Update canvas dimensions when window resizes
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Reinitialize particles
    if (this.particles) {
      this.initParticles();
    }
  };
  
  private initParticles(): void {
    if (!this.canvas || !this.particles) return;
    
    this.particlesData = [];
    
    for (let i = 0; i < this.particles.count; i++) {
      const { minSize, maxSize, minSpeed, maxSpeed, colorBase, colorVariation } = this.particles;
      
      // Generate random colors based on base color and variation
      const randomColor = [
        colorBase[0] + Math.random() * colorVariation[0],
        colorBase[1] + Math.random() * colorVariation[1],
        colorBase[2] + Math.random() * colorVariation[2]
      ];
      
      this.particlesData.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: minSize + Math.random() * (maxSize - minSize),
        color: `rgba(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]}, ${0.5 + Math.random() * 0.5})`,
        speedX: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() > 0.5 ? 1 : -1),
        speedY: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() > 0.5 ? 1 : -1)
      });
    }
  }
  
  private startAnimation(): void {
    if (!this.canvas || !this.ctx) return;
    
    const animate = (): void => {
      this.animationFrameId = requestAnimationFrame(animate);
      this.frameCount++;
      
      // Limit frame rate to reduce CPU usage if needed
      if (this.frameCount % 1 !== 0) return;
      
      // Clear the canvas with semi-transparent black for nice trails
      if (this.ctx && this.canvas) {
        this.ctx.fillStyle = `${this.baseBackgroundColor.slice(0, -1)}, 0.1)`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw animation elements
        if (this.particles && this.particlesData.length > 0) {
          this.drawParticles();
        }
        
        if (this.blackHole) {
          this.drawBlackHole();
        }
        
        // Draw debug info if enabled
        if (this.debugInfo) {
          this.drawDebugInfo();
        }
      }
    };
    
    animate();
  }
  
  private drawParticles(): void {
    if (!this.ctx || !this.canvas) return;
    
    this.particlesData.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off walls
      if (particle.x < 0 || particle.x > this.canvas!.width) {
        particle.speedX *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas!.height) {
        particle.speedY *= -1;
      }
      
      // Draw particle
      this.ctx!.beginPath();
      this.ctx!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx!.fillStyle = particle.color;
      this.ctx!.fill();
    });
  }
  
  private drawBlackHole(): void {
    if (!this.ctx || !this.canvas || !this.blackHole) return;
    
    const { sizeRatio, glowColor, centralColor, pulseSpeed, pulseSize } = this.blackHole;
    
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * sizeRatio;
    
    // Create gradient
    const gradient = this.ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.6, centralColor);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    // Pulsating glow
    const currentPulseSize = pulseSize + Math.sin(this.frameCount * pulseSpeed) * (pulseSize * 0.3);
    
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, currentPulseSize, 0, Math.PI * 2);
    this.ctx.fillStyle = `${glowColor.slice(0, -1)}, ${0.5 + Math.sin(this.frameCount * pulseSpeed * 1.5) * 0.2})`;
    this.ctx.fill();
  }
  
  private drawDebugInfo(): void {
    if (!this.ctx || !this.canvas) return;
    
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    this.ctx.font = '12px Arial';
    this.ctx.fillText(`Frame: ${this.frameCount}`, 10, 20);
    this.ctx.fillText(`Canvas ID: ${this.canvasId}`, 10, 40);
    this.ctx.fillText(`Size: ${this.canvas.width}x${this.canvas.height}`, 10, 60);
    this.ctx.fillText(`Time: ${new Date().toISOString().substr(11, 8)}`, 10, 80);
  }
  
  private setupMutationObserver(): void {
    // Disconnect any existing observer
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Create a new observer
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check if our container was removed
          const container = document.getElementById(this.containerId);
          if (!container) {
            console.log(`Animation container was removed, re-adding: ${this.containerId}`);
            this.cleanup();
            this.init();
          }
        }
      });
    });
    
    this.observer.observe(document.body, { childList: true, subtree: true });
  }
} 