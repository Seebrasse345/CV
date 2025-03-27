import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata, Viewport } from 'next';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Matthaios Markatis | Developer',
  description: 'Professional portfolio for Matthaios Markatis, a full-stack developer specializing in JavaScript, Python, and modern web technologies.',
  keywords: 'Markatis Development, Matthaios Markatis, Software Development, AI, Machine Learning, Embedded Systems, Python, Data Science',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Navigation cleanup script
              if (typeof window !== 'undefined') {
                // Clean up any lingering canvas animations when navigating between pages
                window.addEventListener('beforeunload', function() {
                  // Try to find and clean up black hole canvas
                  const blackHoleCanvas = document.getElementById('blackHoleCanvas');
                  if (blackHoleCanvas) {
                    const ctx = blackHoleCanvas.getContext('2d');
                    if (ctx) {
                      ctx.clearRect(0, 0, blackHoleCanvas.width, blackHoleCanvas.height);
                    }
                  }
                });
                
                // Also clean canvas on navigation events
                window.addEventListener('popstate', function() {
                  // Cleanup on browser back/forward navigation
                  const blackHoleCanvas = document.getElementById('blackHoleCanvas');
                  if (blackHoleCanvas) {
                    const ctx = blackHoleCanvas.getContext('2d');
                    if (ctx) {
                      ctx.clearRect(0, 0, blackHoleCanvas.width, blackHoleCanvas.height);
                    }
                  }
                });
              }
            `
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans bg-dark text-white flex flex-col min-h-screen`}>
        {children}
        <Footer />
      </body>
    </html>
  );
} 