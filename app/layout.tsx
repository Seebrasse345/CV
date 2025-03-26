import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Markatis Development',
  description: 'Professional software development and AI solutions by Matthaios Markatis - Physics graduate specializing in AI, machine learning, and embedded systems.',
  keywords: 'Markatis Development, Matthaios Markatis, Software Development, AI, Machine Learning, Embedded Systems, Python, Data Science',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-dark text-white flex flex-col min-h-screen`}>
        {children}
        <Footer />
      </body>
    </html>
  );
} 