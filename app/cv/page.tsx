'use client'

import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import dynamic from 'next/dynamic';

// Dynamic import for Three.js component to avoid SSR issues
const CosmicBackground = dynamic(
  () => import('@/components/three/CosmicBackground'),
  { ssr: false, loading: () => null }
);

export default function CVPage() {
  const [isLoading, setIsLoading] = useState(true);
  // Track active section for navigation
  const [activeSection, setActiveSection] = useState('education');
  // Smooth scroll handling
  const mainRef = useRef<HTMLDivElement>(null);
  // Track elements that should animate on scroll
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  
  // Store refs to each main section
  const sectionRefs = {
    education: useRef<HTMLElement>(null),
    certifications: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null)
  };

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Scroll to section with smooth animation
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]?.current;
    if (section && mainRef.current) {
      const yOffset = -100; // Offset to account for navigation bar
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      mainRef.current.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
  
  // Detect which sections are in view for animations
  useEffect(() => {
    // Delay initialization until after loading is complete
    if (isLoading) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
            
            // Update active section based on what's visible
            if (entry.target.id in sectionRefs) {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '-100px 0px -100px 0px' 
      }
    );
    
    // Log that we're setting up observers
    console.log("Setting up observers for sections:", Object.keys(sectionRefs));
    
    // Observe all major sections
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
        console.log("Observing section:", ref.current.id);
      } else {
        console.warn("Section ref is null");
      }
    });
    
    // Find all elements that should animate on scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    // Force all sections to be visible initially
    Object.keys(sectionRefs).forEach(sectionId => {
      setVisibleElements(prev => new Set(prev).add(sectionId));
    });
    
    return () => observer.disconnect();
  }, [isLoading, sectionRefs]);

  // Add a custom CSS class to override animation defaults
  useEffect(() => {
    // Add a style tag to ensure all animate-on-scroll elements are visible by default
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .animate-on-scroll {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: transform 0.8s ease-out, opacity 0.8s ease-out;
      }
    `;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <main className="min-h-screen bg-dark relative">
      <div className="fixed inset-0 -z-10">
        <CosmicBackground />
      </div>
      
      <Navigation />
      
      {/* CV Navigation */}
      <div className="sticky top-16 bg-dark-lighter bg-opacity-95 backdrop-blur-sm z-30 border-b border-redAccent-darker shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar py-2 space-x-2">
            {Object.keys(sectionRefs).map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-4 py-2 whitespace-nowrap rounded-full transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-redAccent text-white font-medium shadow-neon-red'
                    : 'bg-dark-card text-gray-400 hover:text-white hover:bg-dark-lighter'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div 
        ref={mainRef}
        className="relative pt-24 pb-20 transition-all duration-1000 overflow-y-auto h-auto min-h-[calc(100vh-4rem)]"
        style={{ 
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'translateY(20px)' : 'translateY(0)',
          scrollBehavior: 'smooth'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-dark-card bg-opacity-90 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden border border-redAccent-darker">
            {/* CV Header */}
            <div 
              className="relative bg-gradient-to-r from-dark-lighter to-dark p-8 md:p-12 border-b border-redAccent animate-on-scroll" 
              id="cv-header"
              style={{
                transform: 'translateY(0)',
                opacity: 1,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
              }}
            >
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-glow">Matthaios Markatis</h1>
                <p className="text-xl text-redAccent italic mb-6 animate-pulse-glow">Physics Graduate & AI Engineer</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                  <div className="flex items-center group hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-redAccent mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:matthaiosmarkatis@gmail.com" className="hover:text-redAccent transition-colors">
                      matthaiosmarkatis@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center group hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-redAccent mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:07480699246" className="hover:text-redAccent transition-colors">07480 699246</a>
                  </div>
                  <div className="flex items-center group hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-redAccent mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <a href="https://www.linkedin.com/in/matthaios-markatis" className="hover:text-redAccent transition-colors">
                      linkedin.com/in/matthaios-markatis
                    </a>
                  </div>
                  <div className="flex items-center group hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-redAccent mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>123 Ash Crescent, Eckington S21 4AD</span>
                  </div>
                </div>
              </div>
              
              {/* Animated pulse effect for the red line */}
              <div 
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-red"
                style={{
                  animation: 'pulse-glow 3s infinite ease-in-out'
                }}
              ></div>
            </div>
            
            {/* CV Summary */}
            <div 
              className="px-6 md:px-10 py-8 bg-dark-lighter bg-opacity-60 animate-on-scroll"
              id="cv-summary"
              style={{
                transform: 'translateY(0)',
                opacity: 1,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
              }}
            >
              <p className="text-white leading-relaxed">
                BSc Physics graduate from the University of Sheffield with robust academic foundation in <span className="text-redAccent font-semibold">theoretical physics</span> and <span className="text-redAccent font-semibold">computational methods</span>. Recently completed the <span className="text-redAccent font-semibold">IBM Data Science</span> and <span className="text-redAccent font-semibold">IBM AI Engineering Professional Certificates</span>, establishing advanced competencies in <span className="text-redAccent font-semibold">machine learning</span>, <span className="text-redAccent font-semibold">statistical analysis</span>, and <span className="text-redAccent font-semibold">AI engineering</span>. Proficient in developing sophisticated engineering solutions integrating <span className="text-redAccent font-semibold">hardware</span> and <span className="text-redAccent font-semibold">software</span>, including a fully <span className="text-redAccent font-semibold">autonomous drone system</span> with custom-configured flight controller and embedded software, and an <span className="text-redAccent font-semibold">IoT-based wildfire detection system</span> utilizing LoRaWAN sensors with machine learning predictive capabilities.
              </p>
            </div>
            
            {/* CV Content - enhanced with animations */}
            <div className="px-6 md:px-10 py-8">
              {/* Education Section */}
              <section 
                ref={sectionRefs.education}
                id="education" 
                className="mb-10 animate-on-scroll"
                style={{
                  transform: 'translateY(0)',
                  opacity: 1,
                  transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
                }}
              >
                <h2 className="section-title group">
                  <span className="relative z-10 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-redAccent mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    Education
                  </span>
                </h2>
                <div className="section-content">
                  
                  <div className="job-item mb-6 animate-on-scroll" id="education-bsc">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">BSc Physics</h3>
                      <div className="text-gray-400 italic flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-redAccent mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        University of Sheffield | 2020 - 2024
                      </div>
                    </div>
                    <div className="text-gray-300 mb-4">2:1 Classification (Upper Second-Class Honours)</div>
                    
                    <div className="bg-dark-lighter bg-opacity-60 rounded-lg p-4 mb-4 hover:shadow-neon-red transition-shadow duration-300">
                      <h4 className="text-redAccent font-semibold mb-3 pb-2 border-b border-redAccent-darker">Programming & Technical Modules</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex justify-between bg-dark-card px-3 py-2 rounded">
                          <span>Advanced Programming in Python</span>
                          <span className="text-redAccent font-semibold">82%</span>
                        </div>
                        <div className="flex justify-between bg-dark-card px-3 py-2 rounded">
                          <span>Programming in Python</span>
                          <span className="text-redAccent font-semibold">78%</span>
                        </div>
                        <div className="flex justify-between bg-dark-card px-3 py-2 rounded">
                          <span>Physical Computing</span>
                          <span className="text-redAccent font-semibold">70%</span>
                        </div>
                        <div className="flex justify-between bg-dark-card px-3 py-2 rounded">
                          <span>Physics with LabView</span>
                          <span className="text-redAccent font-semibold">67%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-dark-lighter bg-opacity-60 rounded-lg p-4 hover:shadow-neon-red transition-shadow duration-300">
                      <h4 className="text-redAccent font-semibold mb-3 pb-2 border-b border-redAccent-darker">Physics Core Modules</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex justify-between bg-dark-card px-3 py-2 rounded">
                          <span>Physics of Materials</span>
                          <span className="text-redAccent font-semibold">75%</span>
                        </div>
                        <div className="flex justify-between bg-dark-card px-3 py-2 rounded">
                          <span>Atomic and Laser Physics</span>
                          <span className="text-redAccent font-semibold">69%</span>
                        </div>
                        <div className="flex justify-between bg-dark-card px-3 py-2 rounded">
                          <span>Particle Physics</span>
                          <span className="text-redAccent font-semibold">67%</span>
                        </div>
                        <div className="flex justify-between bg-dark-card px-3 py-2 rounded">
                          <span>Solid State Physics</span>
                          <span className="text-redAccent font-semibold">66%</span>
                        </div>
                        <div className="flex justify-between bg-dark-card px-3 py-2 rounded">
                          <span>Nuclear Physics</span>
                          <span className="text-redAccent font-semibold">66%</span>
                        </div>
                        <div className="flex justify-between bg-dark-card px-3 py-2 rounded">
                          <span>Classical and Quantum Physics</span>
                          <span className="text-redAccent font-semibold">64%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="job-item animate-on-scroll" id="education-alevels">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">A-Levels</h3>
                      <div className="text-gray-400 italic flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-redAccent mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Eckington Sixth Form | 2018 - 2020
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-dark-card p-4 text-center rounded-lg border-l-2 border-redAccent">
                        <div className="text-lg font-medium">Physics</div>
                        <div className="text-2xl font-bold text-redAccent mt-2">A</div>
                      </div>
                      <div className="bg-dark-card p-4 text-center rounded-lg border-l-2 border-redAccent">
                        <div className="text-lg font-medium">Biology</div>
                        <div className="text-2xl font-bold text-redAccent mt-2">A</div>
                      </div>
                      <div className="bg-dark-card p-4 text-center rounded-lg border-l-2 border-redAccent">
                        <div className="text-lg font-medium">Chemistry</div>
                        <div className="text-2xl font-bold text-redAccent mt-2">B</div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </section>
              
              {/* Certification Section */}
              <section 
                ref={sectionRefs.certifications}
                id="certifications" 
                className="mb-10 animate-on-scroll"
                style={{
                  transform: 'translateY(0)',
                  opacity: 1,
                  transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
                }}
              >
                <h2 className="section-title group">
                  <span className="relative z-10 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-redAccent mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Professional Certifications
                  </span>
                </h2>
                <div className="section-content">
                  
                  <div className="cert-item mb-6 animate-on-scroll" id="certifications-ibm-ai">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">IBM AI Engineering Professional Certificate</h3>
                      <div className="text-gray-400 italic flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-redAccent mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Coursera | August 2024
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Comprehensive 6-course program covering advanced Machine Learning, Deep Learning, and AI Engineering topics. Gained hands-on experience with industry-standard tools and frameworks for building and deploying production-ready AI models.
                    </p>
                    <div className="mb-4">
                      <span className="font-semibold text-white">Key Skills:</span> TensorFlow, Keras, PyTorch, scikit-learn, Model Deployment, Neural Networks, Computer Vision, Model Optimization
                    </div>
                    <a 
                      href="https://www.coursera.org/account/accomplishments/professional-cert/AGN5UHFNXHV9" 
                      className="cert-link inline-flex items-center" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verify Certificate
                    </a>
                  </div>
                  
                  <div className="cert-item animate-on-scroll" id="certifications-ibm-data">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">IBM Data Science Professional Certificate</h3>
                      <div className="text-gray-400 italic flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-redAccent mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Coursera | July 2024
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Intensive 12-course program covering the complete data science workflow from data collection to insights delivery. Developed end-to-end data science projects using industry-standard methodologies and tools.
                    </p>
                    <div className="mb-4">
                      <span className="font-semibold text-white">Key Skills:</span> Python, SQL, Data Analysis, Statistical Analysis, Machine Learning, Data Visualization, IBM Watson Studio, ETL Pipelines
                    </div>
                    <a 
                      href="https://www.coursera.org/account/accomplishments/professional-cert/3BJMEB8AEYKN" 
                      className="cert-link inline-flex items-center" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verify Certificate
                    </a>
                  </div>
                  
                </div>
              </section>
              
              {/* Projects Section */}
              <section 
                ref={sectionRefs.projects}
                id="projects" 
                className="mb-10 animate-on-scroll"
                style={{
                  transform: 'translateY(0)',
                  opacity: 1,
                  transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
                }}
              >
                <h2 className="section-title group">
                  <span className="relative z-10 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-redAccent mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Key Projects
                  </span>
                </h2>
                <div className="section-content">
                  
                  <div className="project-item mb-6 animate-on-scroll" id="projects-wildfire">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">Wildfire Detection System (IoT + Machine Learning)</h3>
                      <div className="text-gray-400 italic">University of Sheffield Research Project 2024</div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Developed a comprehensive real-time fire detection system using IoT sensors to monitor environmental conditions across multiple locations. Implemented Raspberry Pi Zero W as the main controller with LoRaWAN sensors for long-range wireless data transmission. Integrated Random Forest and Decision Tree models to analyze environmental data and deployed a machine learning prediction model on a live web interface with interactive mapping, trained on NASA FIRMS and satellite data.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="project-tag">Raspberry Pi</span>
                      <span className="project-tag">LoRaWAN</span>
                      <span className="project-tag">MQTT</span>
                      <span className="project-tag">The Things Network</span>
                      <span className="project-tag">Random Forest</span>
                      <span className="project-tag">Decision Trees</span>
                      <span className="project-tag">Flask</span>
                      <span className="project-tag">SQLite</span>
                      <span className="project-tag">Leaflet.js</span>
                    </div>
                  </div>
                  
                  <div className="project-item mb-6 animate-on-scroll" id="projects-drone">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">Home-built Autonomous FPV Drone with iNav Autopilot</h3>
                      <div className="text-gray-400 italic">Personal Hardware Project 2024</div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Designed and built a fully autonomous FPV drone from scratch, integrating an F7 flight controller, 4-in-1 ESCs, telemetry modules, and GPS systems for precise navigation. Configured iNav firmware for autonomous waypoint navigation, implemented PID tuning for flight stabilization, and developed failsafe protocols for emergency situations. The system includes custom electronics integration and sensor fusion for reliable autonomous operation.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="project-tag">F7 Flight Controller</span>
                      <span className="project-tag">iNav Firmware</span>
                      <span className="project-tag">4-in-1 ESCs</span>
                      <span className="project-tag">GPS Navigation</span>
                      <span className="project-tag">Telemetry</span>
                      <span className="project-tag">PID Control</span>
                      <span className="project-tag">Autonomous Systems</span>
                    </div>
                  </div>
                  
                  <div className="project-item animate-on-scroll" id="projects-imagine">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">Imagine You - AI Personal Image Generation App</h3>
                      <div className="text-gray-400 italic">Flutter Mobile Application 2024</div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Developed a sophisticated Flutter application enabling users to create personalized AI image models of themselves and generate custom images across various styles and scenarios. Implemented a complete pipeline for training custom FLUX.1 diffusion models using the Replicate API, with a robust architecture for user authentication, photo management, and model deployment. The app features an interactive chat interface and advanced image generation settings.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="project-tag">Flutter</span>
                      <span className="project-tag">Firebase</span>
                      <span className="project-tag">Diffusion Models</span>
                      <span className="project-tag">Replicate API</span>
                      <span className="project-tag">Custom Model Training</span>
                      <span className="project-tag">Provider Pattern</span>
                    </div>
                  </div>
                  
                </div>
              </section>
              
              {/* Skills Section */}
              <section 
                ref={sectionRefs.skills}
                id="skills" 
                className="mb-10 animate-on-scroll"
                style={{
                  transform: 'translateY(0)',
                  opacity: 1,
                  transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
                }}
              >
                <h2 className="section-title group">
                  <span className="relative z-10 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-redAccent mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Technical Skills
                  </span>
                </h2>
                <div className="section-content">
                  
                  <div className="skill-category mb-6 animate-on-scroll" id="skills-programming">
                    <div className="skill-title">Programming & Development</div>
                    <div className="skill-list">
                      <span className="skill-tag">Python</span>
                      <span className="skill-tag">C++</span>
                      <span className="skill-tag">MATLAB</span>
                      <span className="skill-tag">JavaScript</span>
                      <span className="skill-tag">R</span>
                      <span className="skill-tag">HTML/CSS</span>
                      <span className="skill-tag">VHDL</span>
                      <span className="skill-tag">C</span>
                      <span className="skill-tag">Flutter</span>
                      <span className="skill-tag">Tkinter</span>
                    </div>
                  </div>
                  
                  <div className="skill-category mb-6 animate-on-scroll" id="skills-machine-learning">
                    <div className="skill-title">Machine Learning & AI</div>
                    <div className="skill-list">
                      <span className="skill-tag">TensorFlow</span>
                      <span className="skill-tag">PyTorch</span>
                      <span className="skill-tag">scikit-learn</span>
                      <span className="skill-tag">Keras</span>
                      <span className="skill-tag">CNNs</span>
                      <span className="skill-tag">LSTM</span>
                      <span className="skill-tag">Transformers</span>
                      <span className="skill-tag">Random Forest</span>
                      <span className="skill-tag">Diffusion Models</span>
                      <span className="skill-tag">Model Optimization</span>
                    </div>
                  </div>
                  
                  <div className="skill-category mb-6 animate-on-scroll" id="skills-iot">
                    <div className="skill-title">IoT & Embedded Systems</div>
                    <div className="skill-list">
                      <span className="skill-tag">Arduino</span>
                      <span className="skill-tag">Raspberry Pi</span>
                      <span className="skill-tag">ESP32</span>
                      <span className="skill-tag">LoRaWAN</span>
                      <span className="skill-tag">MQTT</span>
                      <span className="skill-tag">LabView</span>
                      <span className="skill-tag">PID Control</span>
                      <span className="skill-tag">Sensor Integration</span>
                    </div>
                  </div>
                  
                  <div className="skill-category animate-on-scroll" id="skills-data-science">
                    <div className="skill-title">Data Science & Engineering</div>
                    <div className="skill-list">
                      <span className="skill-tag">NumPy</span>
                      <span className="skill-tag">Pandas</span>
                      <span className="skill-tag">Matplotlib</span>
                      <span className="skill-tag">SQL</span>
                      <span className="skill-tag">SQLite</span>
                      <span className="skill-tag">MongoDB</span>
                      <span className="skill-tag">ETL Pipelines</span>
                      <span className="skill-tag">Statistical Analysis</span>
                    </div>
                  </div>
                  
                </div>
              </section>
              
              {/* Work Experience Section */}
              <section 
                ref={sectionRefs.experience}
                id="experience" 
                className="animate-on-scroll"
                style={{
                  transform: 'translateY(0)',
                  opacity: 1,
                  transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
                }}
              >
                <h2 className="section-title group">
                  <span className="relative z-10 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-redAccent mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Work Experience
                  </span>
                </h2>
                <div className="section-content">
                  
                  <div className="job-item mb-6 animate-on-scroll" id="experience-team-leader">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">Team Leader / Supervisor</h3>
                      <div className="text-gray-400 italic">Meltdown-Wetherspoons | February 2022 - November 2023</div>
                    </div>
                    <div className="text-gray-300 mb-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Managed daily operations and led staff training in high-volume city venues</li>
                        <li>Coordinated workflow processes to maximize efficiency during peak service periods</li>
                        <li>Developed and implemented crisis management strategies for busy service environments</li>
                        <li>Supervised team members, providing performance feedback and development opportunities</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="job-item animate-on-scroll" id="experience-bartender">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">Bartender / Front of House</h3>
                      <div className="text-gray-400 italic">Various Establishments | September 2018 - October 2021</div>
                    </div>
                    <div className="text-gray-300 mb-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Delivered exceptional customer service in high-end dining environments</li>
                        <li>Maintained strong communication between kitchen and front-of-house staff</li>
                        <li>Managed complex drink orders and maintained product knowledge</li>
                        <li>Recognized for meticulous attention to detail and customer satisfaction</li>
                      </ul>
                    </div>
                  </div>
                  
                </div>
              </section>
              
            </div>
            
            {/* CV Footer - with floating animation */}
            <div 
              className="bg-dark border-t border-redAccent-darker p-6 text-center text-sm text-gray-400 animate-on-scroll"
              id="cv-footer"
              style={{
                transform: 'translateY(0)',
                opacity: 1,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
              }}
            >
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:matthaiosmarkatis@gmail.com" className="hover:text-redAccent transition-colors hover:scale-105 inline-block">
                  matthaiosmarkatis@gmail.com
                </a>
                <a href="tel:07480699246" className="hover:text-redAccent transition-colors hover:scale-105 inline-block">07480 699246</a>
                <a href="https://www.linkedin.com/in/matthaios-markatis" className="hover:text-redAccent transition-colors hover:scale-105 inline-block">
                  linkedin.com/in/matthaios-markatis
                </a>
              </div>
              <div className="mt-2">© {new Date().getFullYear()} Matthaios Markatis. All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 