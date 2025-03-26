'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { AdaptiveDpr, Preload, Text } from '@react-three/drei';

// Type definitions
interface CosmicObjectProps {
  position: [number, number, number];
  radius: number;
  mouseRef: React.RefObject<THREE.Vector2>;
  isInteractive?: boolean;
  updatePosition?: (id: number, position: THREE.Vector3) => void;
  id: number;
}

interface GravitySource {
  position: THREE.Vector3;
  strength: number;
  radius: number;
  type: 'blackhole' | 'planet';
}

// Black hole with accretion disk
const BlackHole: React.FC<CosmicObjectProps> = ({
  position,
  radius,
  mouseRef,
  isInteractive = false,
  updatePosition,
  id,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const discRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // Interaction state
  const isDragging = useRef(false);
  const [hovered, setHovered] = useState(false);
  
  // Create accretion disk particles
  const particleCount = 2000;
  const [diskPositions, diskColors, diskSizes] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      
      // Create a ring distribution
      const ringRadius = radius * (2 + Math.random() * 3); // 2-5x black hole radius
      const thickness = radius * 0.3;
      
      // Slight tilt to the disk
      const tilt = Math.PI * 0.2;
      const x = ringRadius * Math.cos(angle);
      const y = ringRadius * Math.sin(angle) * Math.cos(tilt);
      const z = ringRadius * Math.sin(angle) * Math.sin(tilt);
      
      positions[i3] = x + (Math.random() - 0.5) * thickness;
      positions[i3 + 1] = y + (Math.random() - 0.5) * thickness;
      positions[i3 + 2] = z + (Math.random() - 0.5) * thickness * 0.5;
      
      // Red-orange gradient for accretion disk
      const distFromCenter = Math.sqrt(x*x + y*y + z*z);
      const heat = 1.0 - Math.min(1, Math.max(0, (distFromCenter - radius*2) / (radius*4))); // 0-1 heat factor
      
      colors[i3] = 1.0; // Red
      colors[i3 + 1] = 0.1 + heat * 0.3; // Orange/yellow closer to center
      colors[i3 + 2] = heat * 0.2; // A bit of blue for hottest parts
      
      // Particles get larger near center
      sizes[i] = 0.03 + 0.1 * heat;
    }
    
    return [positions, colors, sizes];
  }, [radius]);
  
  // Animation
  useFrame(({ clock }) => {
    if (!groupRef.current || !discRef.current) return;
    
    // Rotate the accretion disk
    discRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    
    // Pulsating effect for the black hole
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
    
    // Enhanced pulse effect when hovered
    const hoverScale = hovered ? 1.1 : 1.0;
    groupRef.current.scale.set(
      pulse * hoverScale, 
      pulse * hoverScale, 
      pulse * hoverScale
    );
    
    // Handle dragging if interactive
    if (isInteractive && isDragging.current && mouseRef.current && updatePosition) {
      const x = mouseRef.current.x * viewport.width / 2;
      const y = mouseRef.current.y * viewport.height / 2;
      
      groupRef.current.position.x = x;
      groupRef.current.position.y = y;
      
      // Update position in parent
      updatePosition(id, new THREE.Vector3(x, y, groupRef.current.position.z));
    }
  });
  
  // Interaction handlers
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (isInteractive) {
      e.stopPropagation();
      isDragging.current = true;
      document.body.style.cursor = 'grabbing';
    }
  };
  
  const handleDocumentPointerDown = () => {
    // This is a compatible handler for document events
  };
  
  const handleDocumentPointerMove = () => {
    // This is a compatible handler for document events
  };
  
  const handlePointerUp = () => {
    isDragging.current = false;
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  };
  
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    if (!isDragging.current) {
      document.body.style.cursor = 'auto';
    }
  };
  
  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      document.body.style.cursor = 'auto';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <group ref={groupRef} position={position} onClick={(e) => e.stopPropagation()}>
      {/* Black hole center */}
      <mesh
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>
      
      {/* Enhanced glow effect when hovered */}
      <mesh>
        <sphereGeometry args={[radius * 1.2, 32, 32]} />
        <meshBasicMaterial 
          color="#ff0000" 
          transparent 
          opacity={hovered ? 0.3 : 0.15} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* "Drag me" hint when hovered */}
      {hovered && isInteractive && (
        <mesh position={[0, radius * 2, 0]}>
          <sprite scale={[2, 0.5, 1]}>
            <spriteMaterial 
              color="#ffffff"
              transparent={true}
              opacity={0.8}
              depthTest={false}
            />
          </sprite>
          <Text
            position={[0, 0, 0.1]}
            scale={0.2}
            color="#ff0000"
            anchorX="center"
            anchorY="middle"
          >
            DRAG ME
          </Text>
        </mesh>
      )}
      
      {/* Accretion disk */}
      <points ref={discRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={diskPositions}
            count={particleCount}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={diskColors}
            count={particleCount}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            array={diskSizes}
            count={particleCount}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          sizeAttenuation={true}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// Planet with rings
const Planet: React.FC<CosmicObjectProps> = ({
  position,
  radius,
  mouseRef,
  isInteractive = false,
  updatePosition,
  id,
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Interaction state
  const isDragging = useRef(false);
  const [hovered, setHovered] = useState(false);
  
  // Create orbital ring particles
  const particleCount = 1000;
  const [ringPositions, ringColors, ringSizes] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      
      // Two distinct rings
      const isOuterRing = i > particleCount / 2;
      
      // Ring radius and tilt angle
      const ringRadius = radius * (isOuterRing ? 2.5 : 1.8);
      const thickness = radius * 0.15;
      const tiltAngle = isOuterRing ? Math.PI * 0.15 : Math.PI * 0.1;
      
      positions[i3] = ringRadius * Math.cos(angle) + (Math.random() - 0.5) * thickness;
      positions[i3 + 1] = ringRadius * Math.sin(angle) * Math.cos(tiltAngle) + (Math.random() - 0.5) * thickness;
      positions[i3 + 2] = ringRadius * Math.sin(angle) * Math.sin(tiltAngle) + (Math.random() - 0.5) * thickness;
      
      // Red color scheme with variation
      if (isOuterRing) {
        colors[i3] = 0.8 + Math.random() * 0.2; // Red
        colors[i3 + 1] = 0.1 + Math.random() * 0.2; // Some green
        colors[i3 + 2] = Math.random() * 0.1; // Very little blue
      } else {
        colors[i3] = 1.0; // Brighter red for inner ring
        colors[i3 + 1] = 0.2 + Math.random() * 0.1; // A bit more orange
        colors[i3 + 2] = 0.05 + Math.random() * 0.05; // Trace blue
      }
      
      // Size varies between rings
      sizes[i] = isOuterRing 
        ? 0.02 + Math.random() * 0.02 // Smaller outer particles
        : 0.03 + Math.random() * 0.03; // Larger inner particles
    }
    
    return [positions, colors, sizes];
  }, [radius]);
  
  // Animation
  useFrame(({ clock }) => {
    if (!planetRef.current || !ringsRef.current || !groupRef.current) return;
    
    // Planet self-rotation
    planetRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    
    // Rings rotation
    ringsRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    
    // Enhanced hover effect
    const hoverScale = hovered ? 1.1 : 1.0;
    groupRef.current.scale.set(hoverScale, hoverScale, hoverScale);
    
    // Handle dragging if interactive
    if (isInteractive && isDragging.current && mouseRef.current && updatePosition) {
      const x = mouseRef.current.x * viewport.width / 2;
      const y = mouseRef.current.y * viewport.height / 2;
      
      groupRef.current.position.x = x;
      groupRef.current.position.y = y;
      
      // Update position in parent
      updatePosition(id, new THREE.Vector3(x, y, groupRef.current.position.z));
    }
  });
  
  // Interaction handlers
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (isInteractive) {
      e.stopPropagation();
      isDragging.current = true;
      document.body.style.cursor = 'grabbing';
    }
  };
  
  const handleDocumentPointerDown = () => {
    // This is a compatible handler for document events
  };
  
  const handleDocumentPointerMove = () => {
    // This is a compatible handler for document events
  };
  
  const handlePointerUp = () => {
    isDragging.current = false;
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  };
  
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    if (!isDragging.current) {
      document.body.style.cursor = 'auto';
    }
  };
  
  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      document.body.style.cursor = 'auto';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <group ref={groupRef} position={position}>
      {/* Planet body */}
      <mesh
        ref={planetRef}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color="#660000" />
        
        {/* Enhanced glow effect when hovered */}
        <mesh>
          <sphereGeometry args={[radius * 1.1, 32, 32]} />
          <meshBasicMaterial 
            color="#aa0000" 
            transparent 
            opacity={hovered ? 0.3 : 0.1} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </mesh>
      
      {/* "Drag me" hint when hovered */}
      {hovered && isInteractive && (
        <mesh position={[0, radius * 2, 0]}>
          <sprite scale={[2, 0.5, 1]}>
            <spriteMaterial 
              color="#ffffff"
              transparent={true}
              opacity={0.8}
              depthTest={false}
            />
          </sprite>
          <Text
            position={[0, 0, 0.1]}
            scale={0.2}
            color="#ff0000"
            anchorX="center"
            anchorY="middle"
          >
            DRAG ME
          </Text>
        </mesh>
      )}
      
      {/* Planet rings */}
      <points ref={ringsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={ringPositions}
            count={particleCount}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={ringColors}
            count={particleCount}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            array={ringSizes}
            count={particleCount}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          sizeAttenuation={true}
          vertexColors
          transparent
          opacity={hovered ? 0.9 : 0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// Particles affected by gravity from black holes and planets
const GravityParticles: React.FC<{
  mouseRef: React.RefObject<THREE.Vector2>;
  gravitySources: GravitySource[];
}> = ({ mouseRef, gravitySources }) => {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // Animation parameters
  const animParams = useRef({
    time: 0,
    mouseX: 0,
    mouseY: 0,
    mouseSpeed: 0,
    mouseStrength: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    isScattering: false,
    scatterTime: 0,
    lastScatterTime: 0, // Track when last scatter occurred
    scatterIntensity: 0  // Track intensity of scatter effect
  });
  
  // Create particles with physics properties
  const count = 5000;
  const [positions, velocities, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3); // Store velocity for each particle
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions in a sphere, avoiding the center area
      const radius = 10 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) * 0.3; // Flatten z
      
      // Initial velocities (slight orbital motion)
      const speed = 0.005 + Math.random() * 0.005;
      velocities[i3] = -positions[i3 + 1] * speed / radius;
      velocities[i3 + 1] = positions[i3] * speed / radius;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed * 0.2;
      
      // Red colors with variation
      colors[i3] = 0.8 + Math.random() * 0.2; // Red
      colors[i3 + 1] = Math.random() * 0.3; // Little green
      colors[i3 + 2] = Math.random() * 0.2; // Very little blue
      
      // Various sizes
      sizes[i] = 0.02 + Math.random() * 0.04;
    }
    
    return [positions, velocities, colors, sizes];
  }, [count]);
  
  // Function to check if particle is in the text/title clear zone
  const isInClearZone = (x: number, y: number): boolean => {
    // Define rectangle for title area (centered, with the title width/height)
    const clearZoneWidth = 8; // Adjust based on actual title width
    const clearZoneHeight = 4; // Adjust based on actual title height
    
    return Math.abs(x) < clearZoneWidth / 2 && 
           Math.abs(y - 0.5) < clearZoneHeight / 2; // Slightly above center
  };
  
  // Animation loop with physics
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    // Update time and delta time
    const deltaTime = 0.016; // ~60fps
    animParams.current.time = clock.getElapsedTime();
    
    // Update mouse parameters
    if (mouseRef.current) {
      // Calculate mouse movement speed
      const mouseX = mouseRef.current.x * viewport.width / 2;
      const mouseY = mouseRef.current.y * viewport.height / 2;
      
      const mouseDx = mouseX - animParams.current.lastMouseX;
      const mouseDy = mouseY - animParams.current.lastMouseY;
      const mouseSpeed = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
      
      // Store mouse speed for use in particle effects
      animParams.current.mouseSpeed = mouseSpeed;
      
      // Enhanced detection for scatter effect - More sensitive (reduced threshold from 0.2 to 0.15)
      if (mouseSpeed > 0.15) {
        animParams.current.isScattering = true;
        animParams.current.scatterTime = animParams.current.time;
        
        // Increase scatter intensity based on mouse speed - More responsive (increased multiplier from 3 to 4)
        animParams.current.scatterIntensity = Math.min(1.0, mouseSpeed * 4);
        animParams.current.lastScatterTime = animParams.current.time;
      } else if (animParams.current.time - animParams.current.scatterTime > 0.15) { // Reduced cooldown from 0.2 to 0.15
        // Gradually reduce scatter intensity - More gradual fade (changed from 0.95 to 0.97)
        animParams.current.scatterIntensity *= 0.97;
        if (animParams.current.scatterIntensity < 0.05) { // Reduced threshold from 0.1 to 0.05
          animParams.current.isScattering = false;
        }
      }
      
      // Even smoother mouse movement tracking - More responsive (increased from 0.15 to 0.2)
      animParams.current.mouseX += (mouseX - animParams.current.mouseX) * 0.2;
      animParams.current.mouseY += (mouseY - animParams.current.mouseY) * 0.2;
      
      // Update mouse strength based on movement - Faster response (increased from 0.3 to 0.4)
      animParams.current.mouseStrength = THREE.MathUtils.lerp(
        animParams.current.mouseStrength,
        Math.min(1.0, mouseSpeed * 12), // Stronger effect (increased from 10 to 12)
        0.4
      );
      
      // Store previous position
      animParams.current.lastMouseX = mouseX;
      animParams.current.lastMouseY = mouseY;
    }
    
    // Get current positions and update based on physics
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    const colorArray = mesh.current.geometry.attributes.color.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Apply current velocity
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Check if particle is in the clear zone for the title
      if (isInClearZone(positions[i3], positions[i3 + 1])) {
        // Add repulsive force from center to push particles away from text area
        const dx = positions[i3];
        const dy = positions[i3 + 1] - 0.5; // Slightly above center
        const distSq = dx*dx + dy*dy;
        const dist = Math.sqrt(distSq);
        
        if (dist < 0.1) continue; // Avoid division by very small numbers
        
        // Apply stronger repulsive force - Increased from 0.08 to 0.1
        const force = 0.1 / Math.max(distSq, 0.01);
        velocities[i3] += (dx/dist) * force;
        velocities[i3 + 1] += (dy/dist) * force;
      }
      
      // Check if particle is too far from all gravity sources and add a return force
      let tooFar = true;
      let closestSourceDist = 1000;
      const closestSourceVector = new THREE.Vector3();
      let closestSourceStrength = 0;
      let closestSourceType = '';
      
      // Apply gravity from all sources
      for (const source of gravitySources) {
        const dx = source.position.x - positions[i3];
        const dy = source.position.y - positions[i3 + 1];
        const dz = source.position.z - positions[i3 + 2];
        
        const distSq = dx*dx + dy*dy + dz*dz;
        const dist = Math.sqrt(distSq);
        
        // Track closest source for return force
        if (dist < closestSourceDist) {
          closestSourceDist = dist;
          closestSourceVector.set(dx, dy, dz).normalize();
          closestSourceStrength = source.strength;
          closestSourceType = source.type;
        }
        
        // If within reasonable range of any source, not too far - Increased range from 15 to 18
        if (dist < 18) {
          tooFar = false;
        }
        
        // Skip if inside source radius + small buffer
        if (dist < source.radius * 1.2) {
          if (source.type === 'blackhole') {
            // Particles inside black holes get "reset" to a random position
            const newRadius = 15 + Math.random() * 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            positions[i3] = newRadius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = newRadius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = newRadius * Math.cos(phi) * 0.3;
            
            // New velocity
            velocities[i3] = (Math.random() - 0.5) * 0.01;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;
          }
          continue;
        }
        
        // Gravitational force - Enhanced gravity strength (reduced divisor from 0.1 to 0.08)
        const forceMagnitude = source.strength / Math.max(distSq, 0.08);
        
        // Apply to velocity (stronger effect for black holes)
        const multiplier = source.type === 'blackhole' ? 2.2 : 1.2; // Increased both multipliers
        velocities[i3] += (dx/dist) * forceMagnitude * deltaTime * multiplier;
        velocities[i3 + 1] += (dy/dist) * forceMagnitude * deltaTime * multiplier;
        velocities[i3 + 2] += (dz/dist) * forceMagnitude * deltaTime * multiplier;
      }
      
      // If too far from all sources, apply stronger return force toward closest source
      if (tooFar && closestSourceDist < 1000) {
        // Apply stronger return force - Increased from 0.01 to 0.015
        const returnStrength = closestSourceType === 'blackhole' ? 0.02 : 0.015;
        velocities[i3] += closestSourceVector.x * returnStrength;
        velocities[i3 + 1] += closestSourceVector.y * returnStrength;
        velocities[i3 + 2] += closestSourceVector.z * returnStrength;
        
        // Also slightly update color to indicate "return mode"
        colorArray[i3] = Math.min(1.0, colorArray[i3] * 1.01); // Increase red
        colorArray[i3 + 1] *= 0.99; // Decrease green
        colorArray[i3 + 2] *= 0.99; // Decrease blue
      }
      
      // Enhanced mouse gravity/repulsion with stronger scatter effect
      const mouseX = animParams.current.mouseX;
      const mouseY = animParams.current.mouseY;
      const mouseStrength = animParams.current.mouseStrength;
      
      // More sensitive mouse interaction (threshold reduced from 0.05 to 0.03)
      if (mouseStrength > 0.03) {
        const dx = mouseX - positions[i3];
        const dy = mouseY - positions[i3 + 1];
        const distSq = dx*dx + dy*dy;
        const dist = Math.sqrt(distSq);
        
        // Larger radius of effect for scattering (increased from 6 to 7 units)
        if (dist < 7) {
          // Calculate scatter force based on distance
          // Stronger scattering effect and more dynamic response
          const scatterFactor = animParams.current.isScattering ? 
            3.0 + animParams.current.scatterIntensity * 2.0 : // Up to 5.0x (previously 4.0x)
            1.5; // Base repulsion increased from 1.2 to 1.5
          
          // Stronger repulsion (increased from 0.15 to 0.2)
          const repulsionStrength = 0.2 * mouseStrength * scatterFactor;
          // Wider area of effect (changed from 6 to 7)
          const distanceFactor = 1.0 - Math.min(1.0, dist / 7);
          
          // Apply repulsion force - push particles away from mouse
          // Reduced minimum distance for stronger close effect (from 0.1 to 0.08)
          const force = repulsionStrength * distanceFactor / Math.max(0.08, dist);
          velocities[i3] -= (dx/dist) * force;
          velocities[i3 + 1] -= (dy/dist) * force;
          
          // Add stronger upward impulse for a more dynamic effect (increased from 0.003 to 0.004)
          velocities[i3 + 1] += 0.004 * mouseStrength;
          
          // Add more randomness for natural dispersion during scatter
          // Double randomness when scattering (increased from 0.02 to 0.03)
          const randomFactor = animParams.current.isScattering ? 0.03 : 0.015;
          velocities[i3] += (Math.random() - 0.5) * randomFactor * mouseStrength;
          velocities[i3 + 1] += (Math.random() - 0.5) * randomFactor * mouseStrength;
          velocities[i3 + 2] += (Math.random() - 0.5) * randomFactor * mouseStrength * 0.5;
          
          // Add more pronounced color variation for particles being scattered
          if (animParams.current.isScattering) {
            // Brighten particles when scattered - more dramatic effect
            colorArray[i3] = Math.min(1.0, colorArray[i3] * 1.08); // Increase red
            colorArray[i3 + 1] = Math.min(0.5, colorArray[i3 + 1] * 1.15); // Increase green slightly
            colorArray[i3 + 2] = Math.min(0.3, colorArray[i3 + 2] * 1.1); // Increase blue slightly
          }
        }
      }
      
      // Apply variable drag to prevent unlimited acceleration
      // Less drag for high-speed particles (more energetic scattering)
      const speed = Math.sqrt(
        velocities[i3] * velocities[i3] + 
        velocities[i3 + 1] * velocities[i3 + 1] + 
        velocities[i3 + 2] * velocities[i3 + 2]
      );
      
      // Dynamic drag: faster particles experience less drag
      const dragFactor = speed > 0.05 ? 0.997 : 0.995;
      velocities[i3] *= dragFactor;
      velocities[i3 + 1] *= dragFactor;
      velocities[i3 + 2] *= dragFactor;
      
      // Enhanced boundary check - more aggressive return to scene to prevent losing particles
      const maxDist = 25;
      
      // Instead of hard bouncing, apply stronger force the further the particle goes
      if (Math.abs(positions[i3]) > maxDist) {
        const direction = positions[i3] > 0 ? -1 : 1;
        const excess = Math.abs(positions[i3]) - maxDist;
        // Stronger return force (increased from 0.01 to 0.02)
        velocities[i3] += direction * excess * 0.02;
      }
      
      if (Math.abs(positions[i3 + 1]) > maxDist) {
        const direction = positions[i3 + 1] > 0 ? -1 : 1;
        const excess = Math.abs(positions[i3 + 1]) - maxDist;
        // Stronger return force
        velocities[i3 + 1] += direction * excess * 0.02;
      }
      
      if (Math.abs(positions[i3 + 2]) > maxDist * 0.5) {
        const direction = positions[i3 + 2] > 0 ? -1 : 1;
        const excess = Math.abs(positions[i3 + 2]) - maxDist * 0.5;
        // Stronger return force
        velocities[i3 + 2] += direction * excess * 0.02;
      }
      
      // Hard boundary at extreme distances to absolutely prevent particles from being lost
      const absoluteMaxDist = maxDist * 1.5;
      if (Math.abs(positions[i3]) > absoluteMaxDist) {
        positions[i3] = Math.sign(positions[i3]) * absoluteMaxDist;
        velocities[i3] *= -0.5; // Bounce with energy loss
      }
      
      if (Math.abs(positions[i3 + 1]) > absoluteMaxDist) {
        positions[i3 + 1] = Math.sign(positions[i3 + 1]) * absoluteMaxDist;
        velocities[i3 + 1] *= -0.5; // Bounce with energy loss
      }
      
      if (Math.abs(positions[i3 + 2]) > absoluteMaxDist * 0.5) {
        positions[i3 + 2] = Math.sign(positions[i3 + 2]) * absoluteMaxDist * 0.5;
        velocities[i3 + 2] *= -0.5; // Bounce with energy loss
      }
    }
    
    // Update geometry
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.geometry.attributes.color.needsUpdate = true;
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
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

// Mouse trail effect
const MouseTrail: React.FC<{
  mouseRef: React.RefObject<THREE.Vector2>;
}> = ({ mouseRef }) => {
  const trailRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // Trail settings
  const maxPoints = 20;
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(maxPoints * 3);
    const colors = new Float32Array(maxPoints * 3);
    const sizes = new Float32Array(maxPoints);
    
    // Initialize all points at origin
    for (let i = 0; i < maxPoints; i++) {
      const i3 = i * 3;
      
      // Put them far away initially
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = -100; // Hidden behind camera
      
      // Fade from bright to dim red
      const t = i / maxPoints;
      colors[i3] = 1.0; // Red
      colors[i3 + 1] = 0.3 * (1.0 - t); // Green fades out
      colors[i3 + 2] = 0.2 * (1.0 - t); // Blue fades out
      
      // Size decreases along trail
      sizes[i] = 0.2 * (1.0 - t * 0.8);
    }
    
    return [positions, colors, sizes];
  }, []);
  
  // Track mouse movement for trail
  const lastMousePos = useRef(new THREE.Vector2());
  const hasMovedEnough = useRef(false);
  
  useFrame(() => {
    if (!trailRef.current || !mouseRef.current) return;
    
    const currentX = mouseRef.current.x * viewport.width / 2;
    const currentY = mouseRef.current.y * viewport.height / 2;
    
    // Calculate distance moved
    const dx = currentX - lastMousePos.current.x;
    const dy = currentY - lastMousePos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Only update trail when significant movement
    if (dist > 0.1) {
      const positionArray = trailRef.current.geometry.attributes.position.array as Float32Array;
      
      // Shift all points back
      for (let i = maxPoints - 1; i > 0; i--) {
        const i3 = i * 3;
        const prev3 = (i - 1) * 3;
        
        positionArray[i3] = positionArray[prev3];
        positionArray[i3 + 1] = positionArray[prev3 + 1];
        positionArray[i3 + 2] = 0; // Keep all points in view
      }
      
      // Add new point at front of trail
      positionArray[0] = currentX;
      positionArray[1] = currentY;
      positionArray[2] = 0;
      
      // Update last position
      lastMousePos.current.set(currentX, currentY);
      hasMovedEnough.current = true;
      
      // Update geometry
      trailRef.current.geometry.attributes.position.needsUpdate = true;
    } else if (hasMovedEnough.current) {
      // Gradually fade out trail when mouse stops
      const positionArray = trailRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < maxPoints; i++) {
        const i3 = i * 3;
        positionArray[i3 + 2] -= 0.2; // Move points away from camera
      }
      
      trailRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Check if trail is now completely hidden
      if (positionArray[0 + 2] < -10) {
        hasMovedEnough.current = false;
      }
    }
  });
  
  return (
    <points ref={trailRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={maxPoints}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={maxPoints}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={maxPoints}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
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

// Stars background
const StarsBackground: React.FC = () => {
  // Create many small distant stars
  const count = 1000;
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position stars in a large sphere around the scene
      const radius = 30 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Mostly white with hints of red
      const brightness = 0.6 + Math.random() * 0.4;
      colors[i3] = brightness;
      colors[i3 + 1] = brightness * (0.7 + Math.random() * 0.3);
      colors[i3 + 2] = brightness * (0.7 + Math.random() * 0.3);
      
      // Varying sizes for twinkling effect
      sizes[i] = 0.05 + Math.random() * 0.05;
    }
    
    return [positions, colors, sizes];
  }, []);
  
  // Subtle twinkling
  useFrame(({ clock }) => {
    // No need to update positions - just simulate twinkling with material params
  });
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
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

// New component for visualizing the text's clear zone
const ClearZone: React.FC = () => {
  return (
    <mesh position={[0, 0.5, -1]}>
      <planeGeometry args={[8, 4]} />
      <meshBasicMaterial 
        color="#000000"
        transparent={true}
        opacity={0.3}
        blending={THREE.MultiplyBlending}
        depthWrite={false}
      />
      {/* Subtle border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(8, 4)]} />
        <lineBasicMaterial 
          color="#440000"
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </mesh>
  );
};

// Cosmic scene with all elements
const CosmicScene: React.FC = () => {
  const mousePosition = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  
  // Define gravity sources - moved away from the center
  const [gravitySources, setGravitySources] = useState<GravitySource[]>([
    {
      position: new THREE.Vector3(-8, 5, 0),  // Moved further away from center
      strength: 0.05,
      radius: 0.8,
      type: 'blackhole'
    },
    {
      position: new THREE.Vector3(7, -6, 0),  // Moved further away from center
      strength: 0.03,
      radius: 0.6,
      type: 'planet'
    },
    {
      position: new THREE.Vector3(9, 6, 0),  // Moved to top-right instead of center
      strength: 0.02,
      radius: 0.5,
      type: 'planet'
    }
  ]);
  
  // Function to update a gravity source position (for draggable objects)
  const updateObjectPosition = (id: number, position: THREE.Vector3) => {
    setGravitySources(prev => 
      prev.map((source, idx) => 
        idx === id ? { ...source, position } : source
      )
    );
  };
  
  return (
    <>
      {/* Stars background */}
      <StarsBackground />
      
      {/* Clear zone for text */}
      <ClearZone />
      
      {/* Black holes */}
      {gravitySources.map((source, idx) => 
        source.type === 'blackhole' ? (
          <BlackHole
            key={`blackhole-${idx}`}
            id={idx}
            position={[source.position.x, source.position.y, source.position.z]}
            radius={source.radius}
            mouseRef={mousePosition}
            isInteractive={true}
            updatePosition={updateObjectPosition}
          />
        ) : null
      )}
      
      {/* Planets */}
      {gravitySources.map((source, idx) => 
        source.type === 'planet' ? (
          <Planet
            key={`planet-${idx}`}
            id={idx}
            position={[source.position.x, source.position.y, source.position.z]}
            radius={source.radius}
            mouseRef={mousePosition}
            isInteractive={true}
            updatePosition={updateObjectPosition}
          />
        ) : null
      )}
      
      {/* Particles affected by gravity */}
      <GravityParticles
        mouseRef={mousePosition}
        gravitySources={gravitySources}
      />
      
      {/* Mouse trail */}
      <MouseTrail mouseRef={mousePosition} />
    </>
  );
};

// Main component
const CosmicBackground: React.FC = () => {
  const mousePosition = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  
  // Track last interaction time
  const lastInteractionTimeRef = useRef<number>(Date.now());
  
  const handleMouseMove = (event: MouseEvent) => {
    // Calculate normalized coordinates (-1 to 1)
    mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    lastInteractionTimeRef.current = Date.now();
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      // Calculate normalized coordinates (-1 to 1)
      mousePosition.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      lastInteractionTimeRef.current = Date.now();
      
      // Prevent default to avoid scrolling while interacting with objects
      event.preventDefault();
    }
  };
  
  const handleClick = () => {
    lastInteractionTimeRef.current = Date.now();
  };
  
  useEffect(() => {
    // Add interaction listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('click', handleClick);
    
    // Simulate mouse movement when no interaction
    const interval = setInterval(() => {
      // Only apply gentle animation if no recent user interaction
      if (Date.now() - lastInteractionTimeRef.current > 2000) {
        const time = Date.now() * 0.0005;
        // Create gentle circular motion
        const x = Math.sin(time) * 0.3;
        const y = Math.cos(time * 0.8) * 0.2;
        mousePosition.current.x = x;
        mousePosition.current.y = y;
      }
    }, 50);
    
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
        camera={{ position: [0, 0, 15], fov: 60 }} 
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#050505']} />
        <CosmicScene />
        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default CosmicBackground; 