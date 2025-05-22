'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Add interface for navigation links
interface NavLinkData {
  title: string;
  path: string;
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Track scroll position to change navigation style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'CV', path: '/cv' },
    { title: 'Imagine You', path: '/imagine_you' },
    { title: 'Projects', path: '/projects' },
    { title: 'Contact', path: '/contact' },
  ];

  // Nested navigation links for Imagine You
  const isImagineYouPath = pathname?.startsWith('/imagine_you');
  const imagineYouSublinks: NavLinkData[] = [
    { title: 'Terms & Conditions', path: '/imagine_you/terms' },
    { title: 'Privacy Policy', path: '/imagine_you/privacy_policy' },
    { title: 'Account Deletion', path: '/imagine_you/account_deletion' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-lighter bg-opacity-80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/"
            prefetch={true}
            className="text-white font-bold text-xl flex items-center hover:text-cosmicAccent transition-colors"
          >
                        <span className="relative z-10 flex items-center">              M<span className="text-cosmicAccent">.</span>MARKATIS              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cosmicAccent transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>            </span>
          </Link>

                          {/* Desktop Navigation */}          <div className="hidden md:flex space-x-4 lg:space-x-6">            {navLinks.map(link => (              <NavLink                 key={link.path}                 href={link.path}                 label={link.title}                 isActive={(pathname === link.path) || (link.path === '/imagine_you' && !!isImagineYouPath)}              />            ))}          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'transform rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-dark-card bg-opacity-95 backdrop-blur-md transition-all duration-300 ${
          isMenuOpen
            ? 'max-h-96 opacity-100 py-4 border-b border-cosmicAccent shadow-lg'
            : 'max-h-0 opacity-0 overflow-hidden border-none'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {navLinks.map(link => (
                        <MobileNavLink               key={link.path}               href={link.path}               label={link.title}               isActive={(pathname === link.path) || (link.path === '/imagine_you' && !!isImagineYouPath)}              onClick={() => setIsMenuOpen(false)}            />
          ))}
          
          {/* Display Imagine You sublinks if the pathname starts with /imagine_you */}
          {isImagineYouPath && (
            <div className="pl-4 border-l-2 border-cosmicAccent-muted mt-2 space-y-3">
              {imagineYouSublinks.map(sublink => (
                <MobileNavLink
                  key={sublink.path}
                  href={sublink.path}
                  label={sublink.title}
                  isActive={pathname === sublink.path}
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// Desktop Navigation Link
function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const pathname = usePathname();
  // Special handling for home link - needed to ensure it only shows as active on exact '/' path
  const isActiveLink = href === '/' ? isActive && href === pathname : isActive;
  
  // Check if this is the Imagine You link
  const isImagineYouLink = href === '/imagine_you';
  const isImagineYouPath = pathname?.startsWith('/imagine_you');
  
  // Define Imagine You sublinks here within the component scope
  const imagineYouSublinks: NavLinkData[] = [
    { title: 'Terms & Conditions', path: '/imagine_you/terms' },
    { title: 'Privacy Policy', path: '/imagine_you/privacy_policy' },
    { title: 'Account Deletion', path: '/imagine_you/account_deletion' },
  ];
  
  return (
    <div className="relative group">
      <Link
        href={href}
                className={`group relative py-2 text-sm font-medium tracking-wider ${          isActiveLink            ? 'text-cosmicAccent'            : 'text-gray-300 hover:text-white'        }`}
      >
        {label}
                <div className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 origin-left ${          isActiveLink            ? 'bg-cosmicAccent scale-x-100'            : 'bg-white scale-x-0 group-hover:scale-x-100'        }`}></div>
      </Link>
      
            {/* Dropdown for Imagine You section */}      {isImagineYouLink && (        <div className="absolute left-0 mt-2 w-48 bg-dark-card bg-opacity-90 backdrop-blur-md rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all origin-top duration-200 z-50">
          {imagineYouSublinks.map(sublink => (
            <Link
              key={sublink.path}
              href={sublink.path}
                            className={`block px-4 py-2 text-sm ${                pathname === sublink.path                   ? 'text-cosmicAccent bg-dark-lighter'                   : 'text-gray-300 hover:text-white hover:bg-dark-lighter'              }`}
            >
              {sublink.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Mobile Navigation Link
function MobileNavLink({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick: () => void }) {
  const pathname = usePathname();
  // Special handling for home link - matches desktop behavior
  const isActiveLink = href === '/' ? isActive && href === pathname : isActive;
  
  return (
    <Link
      href={href}
      onClick={onClick}
            className={`block py-2 px-4 text-base rounded-md transition-all duration-200 ${        isActiveLink          ? 'bg-cosmicAccent text-white'          : 'text-gray-300 hover:bg-dark-lighter hover:text-white'      }`}
    >
      {label}
    </Link>
  );
} 