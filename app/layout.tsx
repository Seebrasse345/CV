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
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              zoom: normal !important;
              transform: none !important;
            }
            html {
              -webkit-text-size-adjust: none !important;
              -ms-text-size-adjust: none !important;
              text-size-adjust: none !important;
              font-size: 16px !important;
              zoom: 1 !important;
              transform: scale(1) !important;
            }
            body {
              overflow-x: hidden;
              max-width: 100vw;
              font-size: 16px !important;
              zoom: 1 !important;
              transform: scale(1) !important;
            }
            @media screen and (max-width: 768px) {
              html { font-size: 14px !important; }
              body { font-size: 14px !important; }
            }
          `
        }} />
      </head>
      <body className={`${inter.variable} font-sans bg-dark text-white flex flex-col min-h-screen`}>
        {children}
        <Footer />
      </body>
    </html>
  );
} 