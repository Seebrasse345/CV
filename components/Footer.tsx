'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-lighter py-6 md:py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <Link href="/" className="text-white font-bold text-lg md:text-xl flex items-center justify-center md:justify-start group">
              <span className="text-redAccent mr-2 text-glow">M</span>
              <span>Markatis Development</span>
            </Link>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Crafting innovative software solutions
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-3 md:space-y-4">
            <div className="flex flex-wrap justify-center space-x-4 md:space-x-6">
              <Link href="/cv" className="text-gray-400 hover:text-redAccent transition-colors text-sm md:text-base">CV</Link>
              <Link href="/projects" className="text-gray-400 hover:text-redAccent transition-colors text-sm md:text-base">Projects</Link>
              <Link href="/contact" className="text-gray-400 hover:text-redAccent transition-colors text-sm md:text-base">Contact</Link>
            </div>
            <p className="text-gray-500 text-xs md:text-sm text-center md:text-right">
              &copy; {currentYear} Markatis Development. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 