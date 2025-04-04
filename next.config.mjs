/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Remove or comment out the 'export' output to enable API routes
  // output: 'export',
  // Disable image optimization since we're doing a static export
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
  // Set trailing slash to true for better compatibility with static exports
  trailingSlash: true,
};

export default nextConfig; 