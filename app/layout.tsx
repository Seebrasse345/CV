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
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <style dangerouslySetInnerHTML={{
          __html: `
            html {
              -webkit-text-size-adjust: none !important;
              -ms-text-size-adjust: none !important;
              text-size-adjust: none !important;
              font-size: 16px !important;
              zoom: 1 !important;
            }
            body {
              overflow-x: hidden;
              max-width: 100vw;
              font-size: 16px !important;
              zoom: 1 !important;
              transform: scale(1) !important;
              -webkit-transform: scale(1) !important;
            }
            * {
              -webkit-text-size-adjust: none !important;
              -ms-text-size-adjust: none !important;
              text-size-adjust: none !important;
            }
          `
        }} />
      </head>
      <body 
        className={`${inter.variable} font-sans bg-dark text-white flex flex-col min-h-screen`}
        style={{ 
          transform: 'scale(1)', 
          WebkitTransform: 'scale(1)',
          zoom: 1
        }}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
} 