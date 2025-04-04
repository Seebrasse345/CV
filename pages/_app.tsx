import type { AppProps } from 'next/app';

// This is a minimal _app.tsx file that simply passes through components
// It allows Pages Router API routes to work without conflicting with App Router
export default function CustomApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
} 