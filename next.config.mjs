/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Bundle analyzer and optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize Three.js bundle
    if (!dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'three/examples/jsm': 'three/examples/jsm',
        'three': 'three/build/three.module.js',
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