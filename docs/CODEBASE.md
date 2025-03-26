# Codebase Documentation

## Components

### CosmicBackground (`components/three/CosmicBackground.tsx`)

A sophisticated Three.js-based background that creates an interactive cosmic scene with:

- **Black holes with accretion disks**: These objects have gravitational effects on nearby particles.
  - Interactive: Can be dragged around the screen
  - Visual: Dark centers with red glowing edges and particle rings

- **Planets with rings**: Celestial bodies that create gravitational wells.
  - Interactive: Can be dragged around the screen
  - Visual: Red planet bodies with tilted particle rings

- **Gravity Particles**: Thousands of particles that react to the gravitational pull of black holes and planets.
  - Physics: Responds to gravitational forces from cosmic objects
  - Behavior: Gets sucked into black holes and reset to new positions

- **Mouse Trail**: Creates a trail of particles when the user moves their mouse.
  - Visual: Fades from bright red to transparent

- **Stars Background**: A static layer of small stars that adds depth to the scene.

#### Implementation Details:

- Uses React Three Fiber for React integration with Three.js
- Implements custom physics for gravity simulation
- Uses additive blending for glowing particle effects
- Optimized with useMemo for particle generation
- Responsive to both mouse and touch interactions

#### Key Functions:

- **BlackHole Component**: Renders a black hole with an accretion disk and applies gravitational forces
- **Planet Component**: Renders a planet with orbital rings and applies weaker gravitational forces
- **GravityParticles Component**: Handles the physics simulation for particles affected by gravity
- **MouseTrail Component**: Creates an interactive trail that follows cursor movement
- **StarsBackground Component**: Adds static stars in the distance for depth

#### Usage:

```jsx
import dynamic from 'next/dynamic';

const CosmicBackground = dynamic(
  () => import('@/components/three/CosmicBackground'),
  { ssr: false, loading: () => null }
);

// In your component:
<div className="fixed inset-0 -z-10">
  <CosmicBackground />
</div>
```

### Other Components

...

## Pages

### Homepage (`app/page.tsx`)

The main landing page featuring:
- A loading spinner with smooth transitions
- The cosmic background animation
- Navigation and hero sections

## Animations

The site uses several custom animations:
- Gravity simulations in the cosmic background
- Text reveal and glow effects
- Smooth loading transitions

## Styling

- Uses Tailwind CSS with custom configurations
- Custom animations defined in globals.css and tailwind.config.js 

## Deployment

The website is set up for deployment to Vercel. The following configurations have been added to ensure smooth deployment:

### ESLint Configuration

A custom ESLint configuration has been implemented to handle React Three Fiber properties, which are not recognized by default ESLint rules:

- Custom property handling for Three.js properties such as `position`, `args`, `transparent`, etc.
- Semicolon requirements enforced to meet coding standards

### TypeScript Declarations

Custom type declarations have been added for Three.js components:

- `Trail` component from @react-three/drei with the `points` property properly typed
- Buffer attributes and other Three.js specific types

### Vercel Configuration

A `vercel.json` file is included in the root directory with appropriate configuration:

```json
{
  "buildCommand": "next build",
  "ignoreCommand": "npx eslint --quiet .",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

For more detailed information about the deployment setup, please refer to the `DEPLOYMENT.md` file in the root directory. 