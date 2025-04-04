/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Removed: output: 'export' - This enables API routes on Vercel
  // Removed image optimization disabling, Vercel will handle it
  // images: {
  //   unoptimized: true,
  // },
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
  // Removed trailing slash as it's often used with static export
  // trailingSlash: true,
};

export default nextConfig; 