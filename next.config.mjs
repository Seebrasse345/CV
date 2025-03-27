/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
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
};

export default nextConfig; 