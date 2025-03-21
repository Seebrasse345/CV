import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Matthaios Markatis - CV',
  description: 'Professional CV of Matthaios Markatis - Physics graduate specializing in AI, machine learning, and embedded systems.',
  keywords: 'Matthaios Markatis, CV, Resume, Physics, Machine Learning, AI, Embedded Systems, Python, Data Science',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
} 