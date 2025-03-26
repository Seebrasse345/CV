'use client'

import React, { useRef, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useFrame, Canvas, useThree } from '@react-three/fiber'
import { AdaptiveDpr, Preload, useTexture, Trail } from '@react-three/drei'

// Create a custom shader material for more advanced visual effects
const ParticleMaterial = () => {
  // Create a custom shader for particles with glow effects
  const shader = {
    uniforms: {
      pointTexture: { value: null },
      time: { value: 0 },
      color: { value: new THREE.Color('#ff0000') },
      mousePosition: { value: new THREE.Vector2(0, 0) },
      mouseStrength: { value: 0 },
    },
    vertexShader: `
      attribute float size;
      attribute vec3 customColor;
      varying vec3 vColor;
      uniform float time;
      uniform vec2 mousePosition;
      uniform float mouseStrength;
      
      void main() {
        vColor = customColor;
        
        // Create wave effect
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        
        // Scale based on camera distance and add subtle oscillation
        float distanceFactor = 1.0 + sin(time * 0.5 + position.x * 0.5) * 0.2;
        
        // Mouse interaction
        float mouseDistance = distance(position.xy, mousePosition);
        float mouseFactor = max(0.0, 1.0 - mouseDistance / 2.0) * mouseStrength;
        
        // Apply scale with oscillation and mouse effect
        gl_PointSize = size * (150.0 / -mvPosition.z) * distanceFactor * (1.0 + mouseFactor * 2.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D pointTexture;
      uniform vec3 color;
      varying vec3 vColor;
      
      void main() {
        // Circular particle with soft edge
        vec2 uv = gl_PointCoord.xy - 0.5;
        float r = length(uv) * 2.0;
        float a = 1.0 - smoothstep(0.8, 1.0, r);
        
        // Apply color and alpha
        vec3 finalColor = mix(vColor, color, 0.5);
        
        // Add glow effect
        float glow = max(0.0, 1.0 - r * 1.2) * 0.7;
        finalColor += vColor * glow;
        
        gl_FragColor = vec4(finalColor, a);
        
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  }

  return shader
}

interface ParticleProps {
  mouseRef: React.RefObject<THREE.Vector2>;
}

interface GravitySource {
  position: THREE.Vector3;
  strength: number;
  radius: number;
  isBlackHole?: boolean;
  isPlanet?: boolean;
  color?: THREE.Color;
  ringRadius?: number;
  ringRotation?: number;
  orbitSpeed?: number;
}

// Black hole component with accretion disk
const BlackHole: React.FC<{
  position: [number, number, number];
  radius: number;
  strength: number;
  mouseRef: React.RefObject<THREE.Vector2>;
  isInteractive?: boolean;
  id: number;
  updateGravitySource: (id: number, position: THREE.Vector3) => void;
}> = ({ position, radius, strength, mouseRef, isInteractive = false, id, updateGravitySource }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const diskRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // Is this black hole being dragged by the user?
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
      
      // Create a ring distribution with some randomness
      const ringRadius = radius * (2 + Math.random() * 2); // Disk from 2x to 4x black hole radius
      const radiusVariation = Math.random() * 0.3; // Thickness of the disk
      
      // Tilt the disk a bit for a more realistic look
      const tiltAngle = Math.PI * 0.15;
      
      positions[i3] = ringRadius * Math.cos(angle);
      positions[i3 + 1] = (ringRadius * Math.sin(angle)) * Math.cos(tiltAngle) + (Math.random() - 0.5) * radiusVariation;
      positions[i3 + 2] = (ringRadius * Math.sin(angle)) * Math.sin(tiltAngle) + (Math.random() - 0.5) * radiusVariation;
      
      // Red/orange gradient for accretion disk
      const dist = Math.sqrt(positions[i3] * positions[i3] + positions[i3 + 1] * positions[i3 + 1] + positions[i3 + 2] * positions[i3 + 2]);
      const temp = 1.0 - Math.min(1, Math.max(0, (dist - radius * 2) / (radius * 2))); // Normalized temp (hotter closer to black hole)

      colors[i3] = 0.9 + temp * 0.1; // Red (brighter near hole)
      colors[i3 + 1] = 0.2 + temp * 0.3; // Some green for orange glow
      colors[i3 + 2] = 0.1 * temp; // Very little blue
      
      // Particles get larger near black hole
      sizes[i] = 0.02 + 0.08 * temp;
    }
    
    return [positions, colors, sizes];
  }, [radius]);
  
  // Animation
  useFrame(({ clock }) => {
    if (!meshRef.current || !diskRef.current) return;
    
    // Rotate the accretion disk
    diskRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    
    // Pulsing effect for the black hole
    const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
    
    // If interactive and being dragged, update position
    if (isInteractive && isDragging.current && mouseRef.current) {
      const x = mouseRef.current.x * viewport.width / 2;
      const y = mouseRef.current.y * viewport.height / 2;
      meshRef.current.position.x = x;
      meshRef.current.position.y = y;
      
      // Update disk position
      diskRef.current.position.x = x;
      diskRef.current.position.y = y;
      
      // Update gravity source position in parent
      updateGravitySource(id, new THREE.Vector3(x, y, 0));
    }
  });
  
  const handlePointerDown = (e: any) => {
    if (isInteractive) {
      e.stopPropagation();
      isDragging.current = true;
    }
  };
  
  const handlePointerUp = () => {
    isDragging.current = false;
  };
  
  useEffect(() => {
    // Add global pointer up listener
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);
  
  return (
    <group>
      {/* Black hole core */}
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={handlePointerDown}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color="black" />
        
        {/* Glow effect */}
        <mesh>
          <sphereGeometry args={[radius * 1.2, 32, 32]} />
          <meshBasicMaterial 
            color="#ff0000" 
            transparent 
            opacity={0.1} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </mesh>
      
      {/* Accretion disk */}
      <points ref={diskRef} position={position}>
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

// Planet with orbiting particles
const Planet: React.FC<{
  position: [number, number, number];
  radius: number;
  color: string;
  mouseRef: React.RefObject<THREE.Vector2>;
  isInteractive?: boolean;
  id: number;
  updateGravitySource: (id: number, position: THREE.Vector3) => void;
}> = ({ position, radius, color, mouseRef, isInteractive = false, id, updateGravitySource }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // Is this planet being dragged by the user?
  const isDragging = useRef(false);
  const [hovered, setHovered] = useState(false);
  
  // Create orbital ring particles
  const particleCount = 1000;
  const [ringPositions, ringColors, ringSizes] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Create two distinct rings
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      
      // Determine which ring this particle belongs to
      const isOuterRing = i >= particleCount / 2;
      
      // Ring radius and thickness
      const ringRadius = radius * (isOuterRing ? 2.5 : 1.8);
      const thickness = radius * 0.1;
      
      // Tilt the rings in different directions
      const tiltAngle = isOuterRing ? Math.PI * 0.25 : Math.PI * -0.15;
      
      positions[i3] = ringRadius * Math.cos(angle) + (Math.random() - 0.5) * thickness;
      positions[i3 + 1] = ringRadius * Math.sin(angle) * Math.cos(tiltAngle) + (Math.random() - 0.5) * thickness;
      positions[i3 + 2] = ringRadius * Math.sin(angle) * Math.sin(tiltAngle) + (Math.random() - 0.5) * thickness;
      
      // Color based on inner/outer ring
      if (isOuterRing) {
        colors[i3] = 0.9; // Red
        colors[i3 + 1] = 0.1 + Math.random() * 0.1; // Little green
        colors[i3 + 2] = 0.1 + Math.random() * 0.1; // Little blue
      } else {
        colors[i3] = 0.7 + Math.random() * 0.3; // Red with variation
        colors[i3 + 1] = 0.2 + Math.random() * 0.1; // Little green
        colors[i3 + 2] = 0; // No blue
      }
      
      // Smaller particles for rings
      sizes[i] = 0.02 + Math.random() * 0.03;
    }
    
    return [positions, colors, sizes];
  }, [radius]);
  
  // Animation
  useFrame(({ clock }) => {
    if (!meshRef.current || !ringsRef.current) return;
    
    // Rotate the rings at different speeds
    ringsRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    ringsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    
    // Planet rotation
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    
    // If interactive and being dragged, update position
    if (isInteractive && isDragging.current && mouseRef.current) {
      const x = mouseRef.current.x * viewport.width / 2;
      const y = mouseRef.current.y * viewport.height / 2;
      meshRef.current.position.x = x;
      meshRef.current.position.y = y;
      
      // Update rings position
      ringsRef.current.position.x = x;
      ringsRef.current.position.y = y;
      
      // Update gravity source position in parent
      updateGravitySource(id, new THREE.Vector3(x, y, 0));
    }
  });
  
  const handlePointerDown = (e: any) => {
    if (isInteractive) {
      e.stopPropagation();
      isDragging.current = true;
    }
  };
  
  const handlePointerUp = () => {
    isDragging.current = false;
  };
  
  useEffect(() => {
    // Add global pointer up listener
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);
  
  return (
    <group>
      {/* Planet core */}
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={handlePointerDown}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Planet rings */}
      <points ref={ringsRef} position={position}>
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
          size={0.06}
          sizeAttenuation={true}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// Gravity-affected particle system
const GravityParticles: React.FC<{
  count?: number;
  mouseRef: React.RefObject<THREE.Vector2>;
  gravitySources: GravitySource[];
}> = ({ count = 4000, mouseRef, gravitySources }) => {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // For mouse trails
  const [mouseTrailPoints, setMouseTrailPoints] = useState<THREE.Vector3[]>([]);
  const lastMousePos = useRef<THREE.Vector2>(new THREE.Vector2());
  
  // Animation parameters
  const animParams = useRef({
    time: 0,
    mouseX: 0,
    mouseY: 0,
    mouseStrength: 0
  });
  
  // Create particles with physics properties
  const [positions, velocities, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribute particles in a large sphere
      const radius = 10 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) * 0.5; // Flatten z-axis a bit
      
      // Initial velocities - circular motion
      const speed = 0.002 + Math.random() * 0.002;
      velocities[i3] = -positions[i3 + 1] * speed;
      velocities[i3 + 1] = positions[i3] * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;
      
      // Reddish colors with variation
      colors[i3] = 0.7 + Math.random() * 0.3; // Red
      colors[i3 + 1] = Math.random() * 0.2; // A touch of green
      colors[i3 + 2] = Math.random() * 0.1; // Very little blue
      
      // Random sizes
      sizes[i] = 0.02 + Math.random() * 0.04;
    }
    
    return [positions, velocities, colors, sizes];
  }, [count]);
  
  // Animation loop with gravity physics
  useFrame(({ clock, mouse }) => {
    if (!mesh.current) return;
    
    // Time progression
    const deltaTime = 0.016; // Assuming ~60fps
    animParams.current.time = clock.getElapsedTime();
    
    // Update mouse parameters
    if (mouseRef.current) {
      // Smooth mouse movement
      animParams.current.mouseX += (mouseRef.current.x * viewport.width / 2 - animParams.current.mouseX) * 0.1;
      animParams.current.mouseY += (mouseRef.current.y * viewport.height / 2 - animParams.current.mouseY) * 0.1;
      
      // Mouse strength based on movement
      const mouseMovement = Math.sqrt(
        Math.pow(mouseRef.current.x - lastMousePos.current.x, 2) +
        Math.pow(mouseRef.current.y - lastMousePos.current.y, 2)
      );
      
      animParams.current.mouseStrength = THREE.MathUtils.lerp(
        animParams.current.mouseStrength,
        mouseMovement * 15,
        0.1
      );
      
      // Update last mouse position
      lastMousePos.current.copy(mouseRef.current);
      
      // Add points to mouse trail
      if (mouseMovement > 0.005) {
        const newPoint = new THREE.Vector3(
          animParams.current.mouseX,
          animParams.current.mouseY,
          0
        );
        
        setMouseTrailPoints(prev => {
          // Add new point and limit array length
          const updated = [newPoint, ...prev];
          if (updated.length > 20) {
            return updated.slice(0, 20);
          }
          return updated;
        });
      }
    }
    
    // Update particle positions and apply physics
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Apply current velocity
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Apply gravity from all sources
      for (const source of gravitySources) {
        const dx = source.position.x - positions[i3];
        const dy = source.position.y - positions[i3 + 1];
        const dz = source.position.z - positions[i3 + 2];
        
        const distSq = dx * dx + dy * dy + dz * dz;
        const dist = Math.sqrt(distSq);
        
        if (dist > source.radius * 1.2) { // Only affect particles outside the source
          // Calculate gravitational force
          const force = source.strength / Math.max(distSq, 0.1);
          
          // Black holes have stronger pull
          const multiplier = source.isBlackHole ? 2.0 : 1.0;
          
          // Apply force to velocity
          velocities[i3] += (dx / dist) * force * deltaTime * multiplier;
          velocities[i3 + 1] += (dy / dist) * force * deltaTime * multiplier;
          velocities[i3 + 2] += (dz / dist) * force * deltaTime * multiplier;
        } else if (source.isBlackHole) {
          // Particles inside black holes get reset to a random position
          const radius = 15 + Math.random() * 10;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          
          positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i3 + 2] = radius * Math.cos(phi) * 0.5;
          
          // Reset velocity
          velocities[i3] = (Math.random() - 0.5) * 0.01;
          velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
          velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;
        }
      }
      
      // Mouse gravity effect
      const mouseX = animParams.current.mouseX;
      const mouseY = animParams.current.mouseY;
      const mouseStrength = animParams.current.mouseStrength;
      
      if (mouseStrength > 0.1) {
        const dx = mouseX - positions[i3];
        const dy = mouseY - positions[i3 + 1];
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        
        if (dist < 3) {
          const force = 0.05 * mouseStrength / Math.max(dist, 0.1);
          velocities[i3] += (dx / dist) * force * deltaTime;
          velocities[i3 + 1] += (dy / dist) * force * deltaTime;
        }
      }
      
      // Apply some drag to prevent unlimited acceleration
      velocities[i3] *= 0.998;
      velocities[i3 + 1] *= 0.998;
      velocities[i3 + 2] *= 0.998;
      
      // Boundary check - wrap particles if they go too far
      if (Math.abs(positions[i3]) > 30) positions[i3] *= -0.8;
      if (Math.abs(positions[i3 + 1]) > 30) positions[i3 + 1] *= -0.8;
      if (Math.abs(positions[i3 + 2]) > 15) positions[i3 + 2] *= -0.8;
    }
    
    // Update geometry
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <>
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
          size={0.1}
          sizeAttenuation={true}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* Mouse trail effect */}
      {mouseTrailPoints.length > 1 && (
        <Trail
          width={0.5}
          length={mouseTrailPoints.length}
          color={"#ff3030"}
          attenuation={(width) => width * 0.9}
          points={mouseTrailPoints}
        />
      )}
    </>
  );
};

// Main scene component 
const CosmicScene: React.FC = () => {
  const mousePosition = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  
  // Track gravity sources (black holes and planets)
  const [gravitySources, setGravitySources] = useState<GravitySource[]>([
    {
      position: new THREE.Vector3(-5, 3, 0),
      strength: 0.5,
      radius: 0.8,
      isBlackHole: true
    },
    {
      position: new THREE.Vector3(6, -4, 0),
      strength: 0.3,
      radius: 0.6,
      isPlanet: true,
      color: new THREE.Color('#aa2222')
    },
    {
      position: new THREE.Vector3(0, 0, 0),
      strength: 0.2,
      radius: 0.5,
      isPlanet: true,
      color: new THREE.Color('#ff4444')
    }
  ]);
  
  // Update a gravity source position
  const updateGravitySource = (id: number, position: THREE.Vector3) => {
    setGravitySources(prev => 
      prev.map((source, idx) => 
        idx === id ? { ...source, position } : source
      )
    );
  };
  
  return (
    <>
      {/* Black holes */}
      {gravitySources.map((source, idx) => 
        source.isBlackHole ? (
          <BlackHole
            key={`blackhole-${idx}`}
            id={idx}
            position={[source.position.x, source.position.y, source.position.z]}
            radius={source.radius}
            strength={source.strength}
            mouseRef={mousePosition}
            isInteractive={true}
            updateGravitySource={updateGravitySource}
          />
        ) : null
      )}
      
      {/* Planets */}
      {gravitySources.map((source, idx) => 
        source.isPlanet ? (
          <Planet
            key={`planet-${idx}`}
            id={idx}
            position={[source.position.x, source.position.y, source.position.z]}
            radius={source.radius}
            color={source.color ? `#${source.color.getHexString()}` : '#ff3333'}
            mouseRef={mousePosition}
            isInteractive={true}
            updateGravitySource={updateGravitySource}
          />
        ) : null
      )}
      
      {/* Particles affected by gravity */}
      <GravityParticles
        count={6000}
        mouseRef={mousePosition}
        gravitySources={gravitySources}
      />
    </>
  );
};

// Main component
const ParticleEffect: React.FC = () => {
  const mousePosition = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  
  const handleMouseMove = (event: MouseEvent) => {
    // Calculate normalized coordinates (-1 to 1)
    mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      // Get the first touch
      const touch = event.touches[0];
      // Calculate normalized coordinates (-1 to 1)
      mousePosition.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      
      // Prevent default to avoid scrolling while interacting with particles
      event.preventDefault();
    }
  };
  
  // Track last interaction time with useRef
  const lastInteractionTimeRef = useRef<number>(Date.now());
  
  useEffect(() => {
    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add touch support for mobile devices
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Simulate mouse movement when no interaction is happening
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
    
    // Track last interaction time
    const updateInteractionTime = () => {
      lastInteractionTimeRef.current = Date.now();
    };
    
    window.addEventListener('mousemove', updateInteractionTime);
    window.addEventListener('touchmove', updateInteractionTime);
    window.addEventListener('click', updateInteractionTime);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousemove', updateInteractionTime);
      window.removeEventListener('touchmove', updateInteractionTime);
      window.removeEventListener('click', updateInteractionTime);
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

export default ParticleEffect; 