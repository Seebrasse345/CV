# Markatis Development Website Components

This directory contains the React components used in the Markatis Development website.

## Component Documentation

### Hero Component
`components/Hero.tsx`

The Hero component displays the main homepage hero section with animated text and call-to-action buttons.

**Features:**
- Character-by-character staggered text animation
- Delayed subtitle and button animations
- Responsive design for all screen sizes
- Special red highlight for the 'D' in 'Development'

**Props:**
- `title`: Main heading text 
- `subtitle`: Secondary descriptive text

### Navigation Component
`components/Navigation.tsx`

The Navigation component provides site-wide navigation with responsive mobile design.

**Features:**
- Transparent to solid background transition on scroll
- Mobile-friendly hamburger menu
- Active link highlighting
- Smooth animations and transitions

### Three.js Particle Effect
`components/three/ParticleEffect.tsx`

A sophisticated Three.js-based particle system that creates an interactive background effect.

**Features:**
- 3D particle animation with depth
- Mouse interaction that attracts particles
- Red color theme with varying opacity
- Dynamic wave motion animation
- Responsive design that works across all devices

**Technical Details:**
- Uses React Three Fiber for Three.js integration with React
- Implements custom shaders for particle rendering
- Dynamic bufferGeometry for performance
- Mouse position tracking for interactive effects

## Usage Guidelines

When implementing new components, please follow these patterns:

1. Use the 'use client' directive for client-side components
2. Follow the established naming conventions
3. Implement responsive design using Tailwind classes
4. Add proper TypeScript typing for props and state
5. Keep animations consistent with the site's aesthetic

## CSS Classes

The global CSS in `app/globals.css` provides several utility classes that should be used:

- `.text-glow`: For red glowing text effects
- `.hero-container`, `.hero-title`, `.hero-subtitle`: For hero section styling
- `.nav-link`: For navigation links with hover effects
- `.cta-button`: For call-to-action buttons with glow effects 