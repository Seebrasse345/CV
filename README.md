# Markatis Development Website

A sleek, modern website for Markatis Development featuring an impressive Three.js particle animation, dark theme, and responsive design.

## Features

- **Stunning Three.js Particle Animation**: Interactive particle system with mouse-following effects
- **Dark Minimalist Design**: Sleek dark-themed UI with red accents for a professional look
- **Responsive Layout**: Fully responsive design that works on all device sizes
- **Optimized Performance**: Efficient Three.js implementation with dynamic loading
- **Navigation System**: Clean and intuitive navigation between pages

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **Three.js / React Three Fiber**: 3D graphics and animations
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TypeScript**: Type-safe JavaScript for better development experience

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/markatis-development.git
cd markatis-development
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
/
├── app/                 # Next.js app directory
│   ├── cv/              # CV page
│   ├── projects/        # Projects page
│   ├── contact/         # Contact page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
│
├── components/          # React components
│   ├── Hero.tsx         # Hero section component
│   ├── Navigation.tsx   # Navigation bar component
│   └── three/           # Three.js related components
│       └── ParticleEffect.tsx  # Particle animation
│
├── public/              # Static assets
│
└── tailwind.config.js   # Tailwind configuration
```

## Documentation

For detailed documentation on components, see the [components README](/components/README.md).

## Customization

### Modifying Colors

The color scheme is defined in `tailwind.config.js`. The main colors used are:

- Dark background: `#050505`
- Red accent: `#ff0000`
- Text colors: Various shades of white and gray

### Changing Animations

The particle animation can be customized in the `components/three/ParticleEffect.tsx` file. Parameters like particle count, colors, and motion patterns can be adjusted.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The Three.js library and community
- Next.js framework
- Tailwind CSS

## Deployment

For detailed information about deployment and troubleshooting, see the [DEPLOYMENT.md](./DEPLOYMENT.md) file. 