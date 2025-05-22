'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';

// Central vertex component removed for cleaner design

// Enhanced particles with improved respawn logic
const GravityParticles: React.FC<{
  mouseRef: React.RefObject<THREE.Vector2>;
}> = ({ mouseRef }) => {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const animParams = useRef({
    time: 0,
    mouseX: 0,
    mouseY: 0,
    mouseSpeed: 0,
    mouseStrength: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    isInteracting: false,
    interactionTime: 0,
    interactionIntensity: 0
  });
  
  // Particle system with fixed arrays
  const particleSystem = useMemo(() => {
    const count = 3200;
    const gravityCenter = new THREE.Vector3(0, 0.2, 0);
    
    // Create all arrays with fixed sizes
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3); 
    const colors = new Float32Array(count * 3);
    const baseSizes = new Float32Array(count);
    const currentSizes = new Float32Array(count);
    const pulseFactors = new Float32Array(count); 
    const flowFactors = new Float32Array(count * 2);
    const originalColors = new Float32Array(count * 3);
    const orbitalAngles = new Float32Array(count);
    const orbitalRadii = new Float32Array(count);
    const lifespans = new Float32Array(count);
    const maxLifespans = new Float32Array(count);
    
    // Initialize all particles
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const i2 = i * 2;
      
      // Distribution
      const clusterProb = Math.random();
      let radius;
      
      if (clusterProb < 0.5) {
        radius = 4 + Math.random() * 10;
      } else if (clusterProb < 0.8) {
        radius = 14 + Math.random() * 16;
      } else {
        radius = 30 + Math.random() * 20;
      }
      
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) + gravityCenter.y;
      const z = radius * Math.cos(phi) * 0.6;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Orbital properties
      const distanceFromCenter = Math.sqrt(x*x + (y - gravityCenter.y)*(y - gravityCenter.y) + z*z);
      orbitalRadii[i] = distanceFromCenter;
      orbitalAngles[i] = Math.atan2(y - gravityCenter.y, x);
      
      // Lifespan
      maxLifespans[i] = 60 + Math.random() * 120;
      lifespans[i] = Math.random() * maxLifespans[i];
      
      // Movement
      const baseSpeed = 0.0004 + Math.random() * 0.0008;
      const flowAngle = Math.random() * Math.PI * 2;
      flowFactors[i2] = flowAngle;
      flowFactors[i2 + 1] = 0.3 + Math.random() * 0.7;
      
      const orbitalSpeed = 0.6 / Math.max(distanceFromCenter * 0.25, 1);
      velocities[i3] = Math.cos(flowAngle) * baseSpeed + (-Math.sin(orbitalAngles[i]) * orbitalSpeed * 0.2);
      velocities[i3 + 1] = Math.sin(flowAngle) * baseSpeed + (Math.cos(orbitalAngles[i]) * orbitalSpeed * 0.2);
      velocities[i3 + 2] = (Math.random() - 0.5) * baseSpeed * 0.2;
      
      // Colors
      const colorType = Math.random();
      let baseR, baseG, baseB;
      
      if (colorType < 0.4) {
        baseR = 0.15 + Math.random() * 0.2;
        baseG = 0.3 + Math.random() * 0.3;
        baseB = 0.8 + Math.random() * 0.2;
      } else if (colorType < 0.7) {
        baseR = 0.4 + Math.random() * 0.2;
        baseG = 0.2 + Math.random() * 0.2;
        baseB = 0.7 + Math.random() * 0.3;
      } else {
        const brightness = 0.8 + Math.random() * 0.2;
        baseR = brightness * 0.9;
        baseG = brightness * 0.95;
        baseB = brightness;
      }
      
      colors[i3] = originalColors[i3] = baseR;
      colors[i3 + 1] = originalColors[i3 + 1] = baseG;
      colors[i3 + 2] = originalColors[i3 + 2] = baseB;
      
      // Sizes
      if (Math.random() < 0.05) {
        baseSizes[i] = 0.04 + Math.random() * 0.03;
      } else if (Math.random() < 0.2) {
        baseSizes[i] = 0.02 + Math.random() * 0.02; 
      } else {
        baseSizes[i] = 0.006 + Math.random() * 0.014;
      }
      
      currentSizes[i] = baseSizes[i];
      pulseFactors[i] = Math.random() * Math.PI * 2;
    }
    
    return {
      count,
      gravityCenter,
      positions,
      velocities,
      colors,
      baseSizes,
      currentSizes,
      pulseFactors,
      flowFactors,
      originalColors,
      orbitalAngles,
      orbitalRadii,
      lifespans,
      maxLifespans
    };
  }, []);
  
  // Helper functions - removed clear zone logic
  
  const respawnParticle = (i: number) => {
      const i3 = i * 3;
    const i2 = i * 2;
      
    const newRadius = 25 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    particleSystem.positions[i3] = newRadius * Math.sin(phi) * Math.cos(theta);
    particleSystem.positions[i3 + 1] = newRadius * Math.sin(phi) * Math.sin(theta) + particleSystem.gravityCenter.y;
    particleSystem.positions[i3 + 2] = newRadius * Math.cos(phi) * 0.6;
    
    const distanceFromCenter = Math.sqrt(
      particleSystem.positions[i3] * particleSystem.positions[i3] + 
      (particleSystem.positions[i3 + 1] - particleSystem.gravityCenter.y) * (particleSystem.positions[i3 + 1] - particleSystem.gravityCenter.y) + 
      particleSystem.positions[i3 + 2] * particleSystem.positions[i3 + 2]
    );
    particleSystem.orbitalRadii[i] = distanceFromCenter;
    particleSystem.orbitalAngles[i] = Math.atan2(particleSystem.positions[i3 + 1] - particleSystem.gravityCenter.y, particleSystem.positions[i3]);
    
    particleSystem.lifespans[i] = particleSystem.maxLifespans[i];
    
    const newSpeed = 0.0003 + Math.random() * 0.0006;
    const newFlowAngle = Math.random() * Math.PI * 2;
    particleSystem.velocities[i3] = Math.cos(newFlowAngle) * newSpeed;
    particleSystem.velocities[i3 + 1] = Math.sin(newFlowAngle) * newSpeed;
    particleSystem.velocities[i3 + 2] = (Math.random() - 0.5) * newSpeed * 0.2;
    
    particleSystem.flowFactors[i2] = newFlowAngle;
  };
  
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    animParams.current.time = clock.getElapsedTime();
    const time = animParams.current.time;
    
    // Mouse interaction
    if (mouseRef.current) {
      const targetMouseX = mouseRef.current.x * viewport.width / 2;
      const targetMouseY = mouseRef.current.y * viewport.height / 2;
      const mouseDx = targetMouseX - animParams.current.lastMouseX;
      const mouseDy = targetMouseY - animParams.current.lastMouseY;
      const mouseSpeed = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
      
      animParams.current.mouseSpeed = mouseSpeed;
      animParams.current.mouseX = targetMouseX;
      animParams.current.mouseY = targetMouseY;
      animParams.current.mouseStrength = Math.min(1.0, mouseSpeed * 6);
      animParams.current.lastMouseX = targetMouseX;
      animParams.current.lastMouseY = targetMouseY;
    }
    
    const geometry = mesh.current.geometry;
    const positionAttribute = geometry.attributes.position;
    const colorAttribute = geometry.attributes.color;
    const sizeAttribute = geometry.attributes.size;
    
    if (positionAttribute && colorAttribute && sizeAttribute) {
      const positions = positionAttribute.array as Float32Array;
      const colors = colorAttribute.array as Float32Array;
      const sizes = sizeAttribute.array as Float32Array;
      
      for (let i = 0; i < particleSystem.count; i++) {
      const i3 = i * 3;
        const i2 = i * 2;
        
        // Update lifespan
        particleSystem.lifespans[i] -= 1;
        
        // Check for respawn
        if (particleSystem.lifespans[i] <= 0) {
          respawnParticle(i);
          continue;
        }
        
        // Gravitational attraction
        const dx = particleSystem.gravityCenter.x - positions[i3];
        const dy = particleSystem.gravityCenter.y - positions[i3 + 1];
        const dz = particleSystem.gravityCenter.z - positions[i3 + 2];
        const distanceToCenter = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        if (distanceToCenter > 1.5) {
          const gravityStrength = 0.0001 / Math.max(distanceToCenter * 0.5, 1);
          particleSystem.velocities[i3] += (dx / distanceToCenter) * gravityStrength;
          particleSystem.velocities[i3 + 1] += (dy / distanceToCenter) * gravityStrength;
          particleSystem.velocities[i3 + 2] += (dz / distanceToCenter) * gravityStrength;
        }
        
        // Orbital motion
        const currentRadius = particleSystem.orbitalRadii[i];
        if (currentRadius > 2 && currentRadius < 30) {
          const orbitalSpeed = 0.05 / Math.max(currentRadius * 0.2, 1);
          particleSystem.orbitalAngles[i] += orbitalSpeed * (0.9 + Math.sin(time * 0.2 + i * 0.01) * 0.2);
          
          const orbitalForceX = -Math.sin(particleSystem.orbitalAngles[i]) * 0.0002;
          const orbitalForceY = Math.cos(particleSystem.orbitalAngles[i]) * 0.0002;
          
          particleSystem.velocities[i3] += orbitalForceX;
          particleSystem.velocities[i3 + 1] += orbitalForceY;
        }
        
        // Flow
        const flowDir = particleSystem.flowFactors[i2] + time * 0.05;
        const flowStrength = particleSystem.flowFactors[i2 + 1];
        particleSystem.velocities[i3] += Math.cos(flowDir) * 0.00004 * flowStrength;
        particleSystem.velocities[i3 + 1] += Math.sin(flowDir) * 0.00004 * flowStrength;
        
        // Update position
        positions[i3] += particleSystem.velocities[i3];
        positions[i3 + 1] += particleSystem.velocities[i3 + 1];
        positions[i3 + 2] += particleSystem.velocities[i3 + 2];
        
        // Pulsing
        const pulse = 0.8 + Math.sin(time * 0.3 + particleSystem.pulseFactors[i]) * 0.2;
        const lifeFade = particleSystem.lifespans[i] / particleSystem.maxLifespans[i];
        sizes[i] = particleSystem.baseSizes[i] * pulse * Math.min(1.0, lifeFade * 2);
        
        // Colors with life-based fading
        const colorIntensity = 0.8 + Math.sin(time * 0.1 + i * 0.01) * 0.2;
        const fadeMultiplier = Math.min(1.0, lifeFade * 3);
        
        colors[i3] = particleSystem.originalColors[i3] * colorIntensity * fadeMultiplier;
        colors[i3 + 1] = particleSystem.originalColors[i3 + 1] * colorIntensity * fadeMultiplier;
        colors[i3 + 2] = particleSystem.originalColors[i3 + 2] * colorIntensity * fadeMultiplier;
        
        // Removed clear zone repulsion - no longer needed
        
        // Mouse interaction
        const { mouseX, mouseY, mouseStrength } = animParams.current;
        if (mouseStrength > 0.01) {
          const mouseDx = mouseX - positions[i3];
          const mouseDy = mouseY - positions[i3 + 1];
          const mouseDist = Math.sqrt(mouseDx*mouseDx + mouseDy*mouseDy);
          
          if (mouseDist < 5) {
            const normalizedDist = mouseDist / 5;
            let force = normalizedDist < 0.4 ? -0.05 * mouseStrength : 0.01 * mouseStrength;
            
            if (mouseDist > 0.01) {
              particleSystem.velocities[i3] += (mouseDx/mouseDist) * force;
              particleSystem.velocities[i3 + 1] += (mouseDy/mouseDist) * force;
            }
          }
        }
        
        // Drag
        particleSystem.velocities[i3] *= 0.995;
        particleSystem.velocities[i3 + 1] *= 0.995;
        particleSystem.velocities[i3 + 2] *= 0.99;
        
        // Boundary check
        const currentDist = Math.sqrt(positions[i3]**2 + positions[i3+1]**2 + positions[i3+2]**2);
        if (currentDist > 50) {
          respawnParticle(i);
        }
      }
      
      positionAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;
      sizeAttribute.needsUpdate = true;
    }
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particleSystem.positions} 
          count={particleSystem.count} 
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particleSystem.colors} 
          count={particleSystem.count} 
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={particleSystem.currentSizes} 
          count={particleSystem.count} 
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Simplified mouse trail
const MouseTrail: React.FC<{
  mouseRef: React.RefObject<THREE.Vector2>;
}> = ({ mouseRef }) => {
  const trailRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const trailSystem = useMemo(() => {
    const maxPoints = 15;
    const positions = new Float32Array(maxPoints * 3);
    const colors = new Float32Array(maxPoints * 3);
    const sizes = new Float32Array(maxPoints);
    
    for (let i = 0; i < maxPoints; i++) {
      const i3 = i * 3;
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = -100;
      
      const t = i / maxPoints;
      const fade = 1.0 - t;
      colors[i3] = 0.4 + 0.5 * fade;
      colors[i3 + 1] = 0.6 + 0.4 * fade;
      colors[i3 + 2] = 0.9 + 0.1 * fade;
      sizes[i] = 0.12 * Math.pow(fade, 0.8);
    }
    
    return { maxPoints, positions, colors, sizes };
  }, []);
  
  const lastMousePos = useRef(new THREE.Vector2());
  const pointIndex = useRef(0);
  const lastUpdateTime = useRef(0);
  
  useFrame(({ clock }) => {
    if (!trailRef.current || !mouseRef.current) return;
    const time = clock.getElapsedTime();
    if (time - lastUpdateTime.current < 0.03) return;
    lastUpdateTime.current = time;
    
    const currentX = mouseRef.current.x * viewport.width / 2;
    const currentY = mouseRef.current.y * viewport.height / 2;
    const dx = currentX - lastMousePos.current.x;
    const dy = currentY - lastMousePos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const geometry = trailRef.current.geometry;
    const positionAttribute = geometry.attributes.position;
    
    if (positionAttribute) {
      const positionArray = positionAttribute.array as Float32Array;
      
      if (dist > 0.02) {
        const currentPointBase = pointIndex.current * 3;
        positionArray[currentPointBase] = currentX;
        positionArray[currentPointBase + 1] = currentY;
        positionArray[currentPointBase + 2] = 0;
        pointIndex.current = (pointIndex.current + 1) % trailSystem.maxPoints;
        lastMousePos.current.set(currentX, currentY);
      }

      for (let i = 0; i < trailSystem.maxPoints; i++) {
        positionArray[i * 3 + 2] -= 0.02;
      }
      
      positionAttribute.needsUpdate = true;
    }
  });
  
  return (
    <points ref={trailRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={trailSystem.positions} 
          count={trailSystem.maxPoints} 
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={trailSystem.colors} 
          count={trailSystem.maxPoints} 
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={trailSystem.sizes} 
          count={trailSystem.maxPoints} 
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Background stars
const StarsBackground: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null);
  
  const starSystem = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseSizes = new Float32Array(count);
    const currentSizes = new Float32Array(count);
    const twinkleFactors = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 45 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      const brightness = 0.4 + Math.random() * 0.6;
      colors[i3] = brightness * (0.85 + Math.random() * 0.15);
      colors[i3 + 1] = brightness * (0.9 + Math.random() * 0.1);
      colors[i3 + 2] = brightness;
      
      baseSizes[i] = 0.015 + Math.random() * 0.03;
      currentSizes[i] = baseSizes[i];
      twinkleFactors[i] = Math.random() * Math.PI * 2;
    }
    
    return { count, positions, colors, baseSizes, currentSizes, twinkleFactors };
  }, []);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    
    const geometry = meshRef.current.geometry;
    const sizeAttribute = geometry.attributes.size;
    
    if (sizeAttribute) {
      const sizeArray = sizeAttribute.array as Float32Array;
      
      for (let i = 0; i < starSystem.count; i++) {
        const twinkle = 0.7 + Math.sin(time * (0.3 + Math.random() * 0.4) + starSystem.twinkleFactors[i]) * 0.3;
        sizeArray[i] = starSystem.baseSizes[i] * twinkle;
      }
      
      sizeAttribute.needsUpdate = true;
    }
  });
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={starSystem.positions} 
          count={starSystem.count} 
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={starSystem.colors} 
          count={starSystem.count} 
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={starSystem.currentSizes} 
          count={starSystem.count} 
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const CosmicScene: React.FC = () => {
  const mousePosition = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  return (
    <>
      <StarsBackground />
      <GravityParticles mouseRef={mousePosition} />
      <MouseTrail mouseRef={mousePosition} />
    </>
  );
};

const CosmicBackground: React.FC = () => {
  const mousePosition = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const lastInteractionTimeRef = useRef<number>(Date.now());
  
  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    lastInteractionTimeRef.current = Date.now();
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      mousePosition.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      lastInteractionTimeRef.current = Date.now();
      event.preventDefault();
    }
  };
  
  const handleClick = () => {
    lastInteractionTimeRef.current = Date.now();
  };
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('click', handleClick);
    
    const interval = setInterval(() => {
      if (Date.now() - lastInteractionTimeRef.current > 5000) {
        const time = Date.now() * 0.0001;
        mousePosition.current.x = Math.sin(time) * 0.2 + Math.sin(time * 1.3) * 0.08;
        mousePosition.current.y = Math.cos(time * 0.7) * 0.15 + Math.cos(time * 1.9) * 0.06;
      }
    }, 80);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 75 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
      >
        <color attach="background" args={['#080411']} />
        <CosmicScene />
        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default CosmicBackground; 