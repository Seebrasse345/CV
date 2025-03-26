'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'CV', path: '/cv' },
    { title: 'Projects', path: '/projects' },
    { title: 'Contact', path: '/contact' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-lighter py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl flex items-center group">
          <span className="text-redAccent mr-2 text-glow group-hover:animate-pulse-red transition-all">M</span>
          <span className="group-hover:text-redAccent transition-colors">Markatis</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="h-6 w-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`nav-link ${pathname === link.path ? 'active' : ''}`}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-dark-lighter py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`nav-link block ${pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navigation 