'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-lighter py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-white font-bold text-xl flex items-center group">
              <span className="text-redAccent mr-2 text-glow">M</span>
              <span>Markatis Development</span>
            </Link>
            <p className="text-gray-400 mt-2">
              Crafting innovative software solutions
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-4">
              <Link href="/cv" className="text-gray-400 hover:text-redAccent transition-colors">CV</Link>
              <Link href="/projects" className="text-gray-400 hover:text-redAccent transition-colors">Projects</Link>
              <Link href="/contact" className="text-gray-400 hover:text-redAccent transition-colors">Contact</Link>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Markatis Development. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 