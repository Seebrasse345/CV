/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Use 'standalone' output instead of 'export' to support API routes while optimizing static pages
  output: 'standalone',
  // Configure image optimization
  images: {
    unoptimized: true,
  },
  // Skip type checking during build for better performance
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build for better performance
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Use a custom asset prefix if needed (leave empty for default)
  assetPrefix: '',
  // Set trailing slash to true for better compatibility
  trailingSlash: true,
};

export default nextConfig; 