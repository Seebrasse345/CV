import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Print optimization tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
        {/* Control PDF output size */}
        <style>
          {`
            @page {
              size: A4;
              margin: 0.5cm;
            }
            @media print {
              body {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
              }
            }
          `}
        </style>
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 