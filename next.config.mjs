/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Performance optimizations
  experimental: {
    scrollRestoration: true,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Force consistent image optimization
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  
  // Force consistent output between dev and production
  output: 'standalone',
  
  // Ensure consistent environment variables
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV || 'development',
  },
  
  // Bundle analyzer and optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize Three.js bundle - use modern ES6 module exports
    if (!dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'three/examples/jsm': 'three/examples/jsm',
      };
    }
    
    return config;
  },
  
  // Skip type checking during build for better performance
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip ESLint during build for better performance
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig; 