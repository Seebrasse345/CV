'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  // Track elements that should animate on scroll - this is used for animation triggers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  
  // Create individual refs outside useMemo
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  
  // Refs for different CV sections - using the individual refs
  const sectionRefs = useMemo(() => ({
    header: headerRef,
    summary: summaryRef,
    skills: skillsRef,
    education: educationRef,
    certifications: certificationsRef,
    projects: projectsRef,
    experience: experienceRef
  }), []);

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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-redAccent mr-2 group-hover:animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <a href="https://github.com/Seebrasse345" className="hover:text-redAccent transition-colors">
                      github.com/Seebrasse345
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CV Summary */}
            <div 
              className="p-8 bg-dark-card border-b border-redAccent-darker animate-on-scroll"
              id="cv-summary"
              style={{
                transform: 'translateY(0)',
                opacity: 1,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
              }}
            >
              <p className="text-white leading-relaxed">
                BSc Physics graduate from the University of Sheffield with robust academic foundation in theoretical physics and computational methods. Recently completed the IBM Data Science and IBM AI Engineering Professional Certificates, establishing advanced competencies in machine learning, statistical analysis, and AI engineering. Proficient in developing sophisticated engineering solutions integrating hardware and software, including a fully autonomous drone system with custom-configured flight controller and embedded software, and an IoT-based wildfire detection system utilizing LoRaWAN sensors with machine learning predictive capabilities. Extensive experience in automation technologies, intelligent AI agents, and embedded systems. Seeking opportunities to advance technological innovation through applied AI, automation, and hardware integration in professional engineering environments.
              </p>
            </div>
            
            {/* Skills Section - Moved below profile description */}
            <section 
              ref={sectionRefs.skills}
              id="skills" 
              className="p-8 border-b border-redAccent-darker animate-on-scroll"
              style={{
                transform: 'translateY(0)',
                opacity: 1,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
              }}
            >
              <h2 className="section-title">Technical Skills</h2>
              <div className="section-content">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Programming Skills */}
                  <div className="skill-category">
                    <h3 className="skill-title">Programming</h3>
                    <div className="skill-list">
                      <span className="skill-pill">Python</span>
                      <span className="skill-pill">C++</span>
                      <span className="skill-pill">C</span>
                      <span className="skill-pill">JavaScript</span>
                      <span className="skill-pill">MATLAB</span>
                      <span className="skill-pill">R</span>
                      <span className="skill-pill">HTML/CSS</span>
                      <span className="skill-pill">VHDL</span>
                      <span className="skill-pill">Dart/Flutter</span>
                    </div>
                  </div>
                  
                  {/* Machine Learning & AI */}
                  <div className="skill-category">
                    <h3 className="skill-title">Machine Learning & AI</h3>
                    <div className="skill-list">
                      <span className="skill-pill">TensorFlow</span>
                      <span className="skill-pill">PyTorch</span>
                      <span className="skill-pill">Keras</span>
                      <span className="skill-pill">scikit-learn</span>
                      <span className="skill-pill">CNNs</span>
                      <span className="skill-pill">NLP</span>
                      <span className="skill-pill">Transformers</span>
                      <span className="skill-pill">Computer Vision</span>
                      <span className="skill-pill">LLM Fine-tuning</span>
                      <span className="skill-pill">Random Forest</span>
                      <span className="skill-pill">Decision Trees</span>
                      <span className="skill-pill">Neural Networks</span>
                    </div>
                  </div>
                  
                  {/* AI Development */}
                  <div className="skill-category">
                    <h3 className="skill-title">AI Development</h3>
                    <div className="skill-list">
                      <span className="skill-pill">Model Deployment</span>
                      <span className="skill-pill">Model Training</span>
                      <span className="skill-pill">Model Optimization</span>
                      <span className="skill-pill">AI System Architecture</span>
                      <span className="skill-pill">Prompt Engineering</span>
                      <span className="skill-pill">OpenAI API</span>
                      <span className="skill-pill">Diffusion Models</span>
                      <span className="skill-pill">GPT Models</span>
                    </div>
                  </div>
                  
                  {/* Web & API */}
                  <div className="skill-category">
                    <h3 className="skill-title">Web & API</h3>
                    <div className="skill-list">
                      <span className="skill-pill">Flask</span>
                      <span className="skill-pill">React</span>
                      <span className="skill-pill">Next.js</span>
                      <span className="skill-pill">RESTful APIs</span>
                      <span className="skill-pill">OAuth</span>
                      <span className="skill-pill">Web Automation</span>
                      <span className="skill-pill">Firebase</span>
                      <span className="skill-pill">SQL/SQLite</span>
                      <span className="skill-pill">Playwright</span>
                    </div>
                  </div>
                  
                  {/* IoT & Embedded */}
                  <div className="skill-category">
                    <h3 className="skill-title">IoT & Embedded</h3>
                    <div className="skill-list">
                      <span className="skill-pill">Arduino</span>
                      <span className="skill-pill">Raspberry Pi</span>
                      <span className="skill-pill">ESP32</span>
                      <span className="skill-pill">LoRaWAN</span>
                      <span className="skill-pill">PID Control</span>
                      <span className="skill-pill">MQTT</span>
                      <span className="skill-pill">GPS Systems</span>
                      <span className="skill-pill">Telemetry</span>
                      <span className="skill-pill">Sensor Integration</span>
                    </div>
                  </div>
                  
                  {/* Tools & Platforms */}
                  <div className="skill-category">
                    <h3 className="skill-title">Tools & Platforms</h3>
                    <div className="skill-list">
                      <span className="skill-pill">Git</span>
                      <span className="skill-pill">Replicate API</span>
                      <span className="skill-pill">Weather API</span>
                      <span className="skill-pill">The Things Network</span>
                      <span className="skill-pill">Leaflet.js</span>
                      <span className="skill-pill">IBM Watson Studio</span>
                      <span className="skill-pill">ETL Pipelines</span>
                      <span className="skill-pill">LabView</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* CV Content - enhanced with animations */}
            <div className="px-6 md:px-10 py-8">
              {/* Education Section */}
              <section 
                ref={sectionRefs.education}
                id="education" 
                className="p-8 border-b border-redAccent-darker animate-on-scroll"
                style={{
                  transform: 'translateY(0)',
                  opacity: 1,
                  transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                }}
              >
                <h2 className="section-title">Education</h2>
                <div className="section-content">
                  <div className="education-item mb-8">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">BSc Physics</h3>
                      <div className="text-redAccent">2020 - 2024</div>
                    </div>
                    <div className="text-white mb-1 italic">University of Sheffield | 2:1 Classification (Upper Second-Class Honours)</div>
                    
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-redAccent mb-2">Programming & Technical Modules</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-4">
                        <div className="flex justify-between">
                          <span>Advanced Programming in Python</span>
                          <span className="text-redAccent">82%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Programming in Python</span>
                          <span className="text-redAccent">78%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Physical Computing</span>
                          <span className="text-redAccent">70%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Physics with LabView</span>
                          <span className="text-redAccent">67%</span>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-redAccent mb-2">Physics Core Modules</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        <div className="flex justify-between">
                          <span>Physics of Materials</span>
                          <span className="text-redAccent">75%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Atomic and Laser Physics</span>
                          <span className="text-redAccent">69%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Particle Physics</span>
                          <span className="text-redAccent">67%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Solid State Physics</span>
                          <span className="text-redAccent">66%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nuclear Physics</span>
                          <span className="text-redAccent">66%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Classical and Quantum Physics</span>
                          <span className="text-redAccent">64%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="education-item">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">A-Levels</h3>
                      <div className="text-redAccent">2018 - 2020</div>
                    </div>
                    <div className="text-white mb-3 italic">Eckington Sixth Form</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex justify-between">
                        <span>Physics</span>
                        <span className="text-redAccent">A</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Biology</span>
                        <span className="text-redAccent">A</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chemistry</span>
                        <span className="text-redAccent">B</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Certification Section */}
              <section 
                ref={sectionRefs.certifications}
                id="certifications" 
                className="p-8 border-b border-redAccent-darker animate-on-scroll"
                style={{
                  transform: 'translateY(0)',
                  opacity: 1,
                  transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                }}
              >
                <h2 className="section-title">Professional Certifications</h2>
                <div className="section-content">
                  <div className="cert-item mb-8">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">IBM AI Engineering Professional Certificate</h3>
                      <div className="text-redAccent">August 2024</div>
                    </div>
                    <div className="text-white mb-3 italic">Coursera</div>
                    
                    <p className="mb-4">
                      Comprehensive 6-course program covering advanced Machine Learning, Deep Learning, and AI Engineering topics. Gained hands-on experience with industry-standard tools and frameworks for building and deploying production-ready AI models.
                    </p>
                    
                    <div className="mb-4">
                      <div className="text-lg font-semibold text-redAccent mb-2">Key Skills:</div>
                      <p>TensorFlow, Keras, PyTorch, scikit-learn, Model Deployment, Neural Networks, Computer Vision, Model Optimization</p>
                    </div>
                    
                    <div>
                      <div className="text-lg font-semibold text-redAccent mb-2">Results:</div>
                      <p>Learned to use IBM Watson and deployed a traffic light identification algorithm that achieved 98% accuracy in a real-time image processing pipeline after thorough data cleaning and optimization.</p>
                    </div>
                  </div>
                  
                  <div className="cert-item">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">IBM Data Science Professional Certificate</h3>
                      <div className="text-redAccent">July 2024</div>
                    </div>
                    <div className="text-white mb-3 italic">Coursera</div>
                    
                    <p className="mb-4">
                      Intensive 12-course program covering the complete data science workflow from data collection to insights delivery. Developed end-to-end data science projects using industry-standard methodologies and tools.
                    </p>
                    
                    <div className="mb-4">
                      <div className="text-lg font-semibold text-redAccent mb-2">Key Skills:</div>
                      <p>Python, SQL, Data Analysis, Statistical Analysis, Machine Learning, Data Visualization, IBM Watson Studio, ETL Pipelines</p>
                    </div>
                    
                    <div>
                      <div className="text-lg font-semibold text-redAccent mb-2">Results:</div>
                      <p>Developed a SpaceX Falcon landing prediction classifier that achieved 80% accuracy in modeling launch success rates by leveraging data from launch locations, historical launches, and weather conditions after thorough data cleaning and feature engineering.</p>
                    </div>
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
                <a href="https://github.com/Seebrasse345" className="hover:text-redAccent transition-colors hover:scale-105 inline-block">
                  github.com/Seebrasse345
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