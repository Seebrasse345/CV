'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

export default function TermsPage() {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the markdown content
    fetch('/tncs.txt')
      .then(response => response.text())
      .then(text => {
        // Extract the markdown content between the ```markdown tags
        const regex = /```markdown([\s\S]*?)```/;
        const match = text.match(regex);
        if (match && match[1]) {
          setMarkdownContent(match[1]);
        } else {
          setMarkdownContent('Error loading terms and conditions.');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading markdown:', error);
        setMarkdownContent('Error loading terms and conditions.');
        setIsLoading(false);
      });
  }, []);

  // Animation variants for content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <main className="min-h-screen bg-dark">
      <Navigation />
      
      <div className="pt-24 pb-20 min-h-screen"
        style={{ 
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <div className="container mx-auto px-4">
          {/* Header with page title */}
          <div className="text-center py-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent" 
              style={{ 
                backgroundImage: 'linear-gradient(135deg, #7B2CBF 0%, #C77DFF 100%)',
                textShadow: '0 0 15px rgba(123, 44, 191, 0.6)'
              }}
            >
              Terms and Conditions
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Please review our terms and conditions for using Imagine You
            </p>
          </div>

          {/* Markdown Content */}
          <motion.div 
            className="max-w-4xl mx-auto bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-purple-700 border-opacity-20 p-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 