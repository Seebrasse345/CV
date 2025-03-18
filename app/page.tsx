'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiMapPin,
  FiFile,
  FiExternalLink,
  FiCalendar,
  FiAward,
  FiBook,
  FiCode
} from 'react-icons/fi';

// Add print-specific styles
const printStyles = `
  @media print {
    /* Disable animations for print */
    * {
      animation: none !important;
      transition: none !important;
      transform: none !important;
      opacity: 1 !important;
    }
    
    /* Remove shadows and reduce visual effects for print */
    .shadow-card, .shadow-button, .shadow-card-hover, .shadow-button-hover {
      box-shadow: none !important;
    }
    
    /* Remove gradient backgrounds - use solid colors instead */
    .bg-gradient-professional {
      background: #1e3a8a !important;
    }
    
    .bg-gradient-accent, .bg-gradient-skill {
      background: #0891b2 !important;
    }
    
    /* Optimize images for print */
    img {
      max-resolution: 72dpi;
    }
    
    /* Reduce font sizes for print */
    .text-4xl, .text-5xl {
      font-size: 24pt !important;
    }
    
    .text-2xl, .text-xl {
      font-size: 16pt !important;
    }
    
    .text-lg, .text-base {
      font-size: 12pt !important;
    }
    
    .text-sm, .text-xs {
      font-size: 10pt !important;
    }
  }
`;

export default function Home() {
  // Animation setup for sections
  function AnimatedSection({ children, id }: { children: React.ReactNode; id: string }) {
    const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true,
    });

    return (
      <motion.div
        ref={ref}
        id={id}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        {children}
      </motion.div>
    );
  }

  // Enable smooth scrolling for anchor links
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Inject print styles
    const style = document.createElement('style');
    style.innerHTML = printStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <ThemeToggle />
      
      {/* Header */}
      <motion.header 
        className="bg-gradient-professional text-white py-10 px-6 md:py-16 md:px-10 relative overflow-hidden shadow-xl print:shadow-none print:py-6 print:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-center print:text-3xl print:mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Matthaios Markatis
          </motion.h1>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 print:gap-2 print:mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="contact-item">
              <FiMail />
              <a href="mailto:matthaiosmarkatis@gmail.com">matthaiosmarkatis@gmail.com</a>
            </div>
            <div className="contact-item">
              <FiPhone />
              <a href="tel:07480699246">07480 699246</a>
            </div>
            <div className="contact-item">
              <FiLinkedin />
              <a href="https://www.linkedin.com/in/matthaios-markatis" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/matthaios-markatis
              </a>
            </div>
            <div className="contact-item">
              <FiGithub />
              <a href="https://github.com/Seebrasse345" target="_blank" rel="noopener noreferrer">
                github.com/Seebrasse345
              </a>
            </div>
            <div className="contact-item">
              <FiMapPin />
              <span>123 Ash Crescent, Eckington S21 4AD</span>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative header dots pattern - hide in print */}
        <div className="absolute inset-0 opacity-10 pointer-events-none print:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_rgba(255,255,255,0.05)_21%,_transparent_22%)] bg-[length:20px_20px]"></div>
        </div>
        
        {/* Decorative header gradient line - reduce in print */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-secondary to-secondary-light print:h-0.5"></div>
      </motion.header>

      {/* Summary */}
      <motion.div 
        className="max-w-4xl mx-auto px-4 md:px-8 py-8 print:py-2 print:px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-card border-l-4 border-secondary print:p-3 print:shadow-none">
          <p className="text-lg leading-relaxed print:text-sm">
            BSc Physics graduate from the University of Sheffield with robust academic foundation in <span className="highlight">theoretical physics</span> and <span className="highlight">computational methods</span>. Recently completed the <span className="highlight">IBM Data Science</span> and <span className="highlight">IBM AI Engineering Professional Certificates</span>, establishing advanced competencies in <span className="highlight">machine learning</span>, <span className="highlight">statistical analysis</span>, and <span className="highlight">AI engineering</span>. Proficient in developing sophisticated engineering solutions integrating <span className="highlight">hardware</span> and <span className="highlight">software</span>, including a fully <span className="highlight">autonomous drone system</span> with custom-configured flight controller and embedded software, and an <span className="highlight">IoT-based wildfire detection system</span> utilizing LoRaWAN sensors with machine learning predictive capabilities. Extensive experience in <span className="highlight">automation technologies</span>, intelligent <span className="highlight">AI agents</span>, and <span className="highlight">embedded systems</span>. Seeking opportunities to advance technological innovation through applied <span className="highlight">AI</span>, <span className="highlight">automation</span>, and <span className="highlight">hardware integration</span> in professional engineering environments.
          </p>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20 print:px-2 print:pb-2">
        {/* Technical Skills - Moved up and made more compact */}
        <AnimatedSection id="skills">
          <div className="section-title">
            <FiCode className="inline-block mr-2" /> Technical Skills
          </div>
          <div className="section-content bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm print:p-2 print:shadow-none">
            {/* More comprehensive skills layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 print:grid-cols-3 print:gap-1">
              <div className="skill-category">
                <div className="skill-title text-sm font-semibold text-primary border-b pb-1 mb-2">Programming</div>
                <div className="skill-list flex flex-wrap gap-1">
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
              
              <div className="skill-category">
                <div className="skill-title text-sm font-semibold text-primary border-b pb-1 mb-2">Machine Learning & AI</div>
                <div className="skill-list flex flex-wrap gap-1">
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
              
              <div className="skill-category">
                <div className="skill-title text-sm font-semibold text-primary border-b pb-1 mb-2">AI Development</div>
                <div className="skill-list flex flex-wrap gap-1">
                  <span className="skill-pill">Model Deployment</span>
                  <span className="skill-pill">Model Training</span>
                  <span className="skill-pill">Model Optimization</span>
                  <span className="skill-pill">AI System Architecture</span>
                  <span className="skill-pill">Prompt Engineering</span>
                  <span className="skill-pill">OpenAI API</span>
                  <span className="skill-pill">Diffusion Models</span>
                  <span className="skill-pill">GPT Models</span>
                  <span className="skill-pill">Statistical Analysis</span>
                </div>
              </div>
              
              <div className="skill-category">
                <div className="skill-title text-sm font-semibold text-primary border-b pb-1 mb-2">Web & API</div>
                <div className="skill-list flex flex-wrap gap-1">
                  <span className="skill-pill">Flask</span>
                  <span className="skill-pill">React</span>
                  <span className="skill-pill">Next.js</span>
                  <span className="skill-pill">RESTful APIs</span>
                  <span className="skill-pill">OAuth</span>
                  <span className="skill-pill">Web Automation</span>
                  <span className="skill-pill">Firebase</span>
                  <span className="skill-pill">SQL/SQLite</span>
                  <span className="skill-pill">Playwright</span>
                  <span className="skill-pill">Data Visualization</span>
                </div>
              </div>
              
              <div className="skill-category">
                <div className="skill-title text-sm font-semibold text-primary border-b pb-1 mb-2">IoT & Embedded</div>
                <div className="skill-list flex flex-wrap gap-1">
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
              
              <div className="skill-category">
                <div className="skill-title text-sm font-semibold text-primary border-b pb-1 mb-2">Tools & Platforms</div>
                <div className="skill-list flex flex-wrap gap-1">
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
            
            {/* Hidden keywords for ATS optimization - hide completely in print */}
            <div className="hidden print:hidden">
              <p>
                Python, C++, C, JavaScript, MATLAB, R, HTML, CSS, VHDL, Flutter, Dart, Tkinter,
                TensorFlow, PyTorch, scikit-learn, Keras, CNN, LSTM, Transformer, NLP, Random Forest,
                Diffusion Models, GPT, Machine Learning, Deep Learning, Artificial Intelligence,
                Model Training, Model Optimization, Model Deployment, LLM Fine-tuning, AI Agents,
                OpenAI API, GPT API, Whisper API, Local LLM Deployment, AI System Architecture,
                Prompt Engineering, Flask, React, Next.js, RESTful API, OAuth, Web Scraping,
                Playwright, Web Automation, Spotify API, Weather API, Form Handling,
                Arduino, Raspberry Pi, ESP32, LoRaWAN, MQTT, LabView, PID Control, Sensor Integration,
                The Things Network, Environmental Monitoring, Data Science, Data Analysis,
                SQL, SQLite, Database Management, Firebase, Cloud Services, GPS Navigation,
                Telemetry Systems, Leaflet.js, Computer Vision, Statistical Analysis, Neural Networks,
                ETL Pipelines, IBM Watson Studio, Coqui TTS, FFmpeg, API Compatibility, System Prompts,
                F7 Flight Controller, iNav Firmware, ESCs, GPU-accelerated Training, Provider Pattern,
                Dynamic Form Parsing, HTML Selector Analysis, Error Recovery, Data Engineer, 
                Data Scientist, Machine Learning Engineer, AI Engineer, Robotics Engineer,
                Software Engineer, Front-end Developer, Back-end Developer, Full-stack Developer,
                IoT Developer, Embedded Systems Engineer, Computer Vision Engineer, NLP Engineer,
                AI Research Engineer, Autonomous Systems Engineer, Deep Learning Specialist,
                Technical Skills, Programming Languages, Python Expert, JavaScript Developer,
                Machine Learning Algorithms, Neural Network Architecture, Deep Learning Frameworks,
                Hardware Integration, AI Applications, Sensor Technology, Data Processing,
                Algorithm Design, Software Development, Technical Expertise, Graduate Resume,
                Physics Degree, BSc Physics, Engineering Skills, Technical Project Experience,
                Scientific Programming, IoT Architecture, Smart Devices, Data Analytics,
                PhD Research Assistant, Research and Development, Laboratory Experience,
                Simulation Modeling, Technical Report Writing, Computational Methods,
                Quantitative Analysis, Computer Science, AI Automation, Embedded Software,
                Application Development, System Design, Data Pipeline, Technical Assessment
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection id="education">
          <div className="section-title">
            <FiBook className="inline-block mr-2" /> Education
          </div>
          <div className="section-content print:p-2">
            <div className="space-y-6 print:space-y-2">
              <div className="education-item">
                <h3 className="text-xl font-semibold text-primary dark:text-white">BSc Physics</h3>
                <div className="flex items-center text-text-light text-sm mb-3">
                  <FiCalendar className="mr-1" /> University of Sheffield | 2020 - 2024
                </div>
                <div className="flex items-center text-text-light text-sm mb-4">
                  <FiAward className="mr-1" /> 2:1 Classification (Upper Second-Class Honours)
                </div>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md mb-4">
                  <h4 className="text-primary dark:text-white font-semibold text-center mb-3 border-b pb-2">Programming & Technical Modules</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex justify-between bg-background-light dark:bg-gray-700 p-2 rounded">
                      <span className="font-medium">Advanced Programming in Python</span>
                      <span className="font-semibold text-primary">82%</span>
                    </div>
                    <div className="flex justify-between bg-background-light dark:bg-gray-700 p-2 rounded">
                      <span className="font-medium">Programming in Python</span>
                      <span className="font-semibold text-primary">78%</span>
                    </div>
                    <div className="flex justify-between bg-background-light dark:bg-gray-700 p-2 rounded">
                      <span className="font-medium">Physical Computing</span>
                      <span className="font-semibold text-primary">70%</span>
                    </div>
                    <div className="flex justify-between bg-background-light dark:bg-gray-700 p-2 rounded">
                      <span className="font-medium">Physics with LabView</span>
                      <span className="font-semibold text-primary">67%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                  <h4 className="text-primary dark:text-white font-semibold text-center mb-3 border-b pb-2">Physics Core Modules</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex justify-between bg-background-light dark:bg-gray-700 p-2 rounded">
                      <span className="font-medium">Physics of Materials</span>
                      <span className="font-semibold text-primary">75%</span>
                    </div>
                    <div className="flex justify-between bg-background-light dark:bg-gray-700 p-2 rounded">
                      <span className="font-medium">Atomic and Laser Physics</span>
                      <span className="font-semibold text-primary">69%</span>
                    </div>
                    <div className="flex justify-between bg-background-light dark:bg-gray-700 p-2 rounded">
                      <span className="font-medium">Particle Physics</span>
                      <span className="font-semibold text-primary">67%</span>
                    </div>
                    <div className="flex justify-between bg-background-light dark:bg-gray-700 p-2 rounded">
                      <span className="font-medium">Solid State Physics</span>
                      <span className="font-semibold text-primary">66%</span>
                    </div>
                    <div className="flex justify-between bg-background-light dark:bg-gray-700 p-2 rounded">
                      <span className="font-medium">Nuclear Physics</span>
                      <span className="font-semibold text-primary">66%</span>
                    </div>
                    <div className="flex justify-between bg-background-light dark:bg-gray-700 p-2 rounded">
                      <span className="font-medium">Classical and Quantum Physics</span>
                      <span className="font-semibold text-primary">64%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="education-item">
                <h3 className="text-xl font-semibold text-primary dark:text-white">A-Levels</h3>
                <div className="flex items-center text-text-light text-sm mb-4">
                  <FiCalendar className="mr-1" /> Eckington Sixth Form | 2018 - 2020
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md text-center">
                    <div className="font-semibold text-primary">Physics</div>
                    <div className="font-bold text-2xl text-secondary mt-2">A</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md text-center">
                    <div className="font-semibold text-primary">Biology</div>
                    <div className="font-bold text-2xl text-secondary mt-2">A</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md text-center">
                    <div className="font-semibold text-primary">Chemistry</div>
                    <div className="font-bold text-2xl text-secondary mt-2">B</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Professional Certifications */}
        <AnimatedSection id="certifications">
          <div className="section-title">
            <FiAward className="inline-block mr-2" /> Professional Certifications
          </div>
          <div className="section-content print:p-2">
            <div className="space-y-6 print:space-y-2">
              <div className="cert-item">
                <div className="relative overflow-hidden">
                  <h3 className="text-xl font-semibold text-primary dark:text-white">IBM AI Engineering Professional Certificate</h3>
                  <div className="flex items-center text-text-light text-sm mb-4">
                    <FiCalendar className="mr-1" /> Coursera | August 2024
                  </div>
                  <p className="mb-4">
                    Comprehensive 6-course program covering advanced Machine Learning, Deep Learning, and AI Engineering topics. Gained hands-on experience with industry-standard tools and frameworks for building and deploying production-ready AI models.
                  </p>
                  <div className="mb-4"><strong>Key Skills:</strong> TensorFlow, Keras, PyTorch, scikit-learn, Model Deployment, Neural Networks, Computer Vision, Model Optimization</div>
                  <div className="mb-4"><strong>Results:</strong> Learned to use IBM Watson and deployed a traffic light identification algorithm that achieved 98% accuracy in a real-time image processing pipeline after thorough data cleaning and optimization.</div>
                  <a 
                    href="https://www.coursera.org/account/accomplishments/professional-cert/AGN5UHFNXHV9" 
                    className="cert-link"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink className="mr-1" /> Verify Certificate
                  </a>
                </div>
              </div>
              
              <div className="cert-item">
                <h3 className="text-xl font-semibold text-primary dark:text-white">IBM Data Science Professional Certificate</h3>
                <div className="flex items-center text-text-light text-sm mb-4">
                  <FiCalendar className="mr-1" /> Coursera | July 2024
                </div>
                <p className="mb-4">
                  Intensive 12-course program covering the complete data science workflow from data collection to insights delivery. Developed end-to-end data science projects using industry-standard methodologies and tools.
                </p>
                <div className="mb-4"><strong>Key Skills:</strong> Python, SQL, Data Analysis, Statistical Analysis, Machine Learning, Data Visualization, IBM Watson Studio, ETL Pipelines</div>
                <div className="mb-4"><strong>Results:</strong> Developed a SpaceX Falcon landing prediction classifier that achieved 80% accuracy in modeling launch success rates by leveraging data from launch locations, historical launches, and weather conditions after thorough data cleaning and feature engineering.</div>
                <a 
                  href="https://www.coursera.org/account/accomplishments/professional-cert/3BJMEB8AEYKN" 
                  className="cert-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FiExternalLink className="mr-1" /> Verify Certificate
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Key Projects */}
        <AnimatedSection id="projects">
          <div className="section-title">
            <FiFile className="inline-block mr-2" />Projects
          </div>
          <div className="section-content print:p-2">
            <div className="space-y-6 print:space-y-2">
              <div className="project-item">
                <div className="lg:grid lg:grid-cols-3 gap-6 print:gap-2">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">Wildfire Detection System (IoT + Machine Learning)</h3>
                    <div className="text-text-light text-sm mb-4">University of Sheffield Research Project 2024</div>
                    <p className="mb-4">
                      Developed a comprehensive real-time fire detection system using IoT sensors to monitor environmental conditions across multiple locations. Implemented Raspberry Pi Zero W as the main controller with LoRaWAN sensors for long-range wireless data transmission. Integrated Random Forest and Decision Tree models to analyze environmental data and deployed a machine learning prediction model on a live web interface with interactive mapping, trained on NASA FIRMS and satellite data.
                    </p>
                    <div className="mb-4"><strong>Results:</strong> Achieved early warning capability of 10 minutes before fire spread, handled thousands of concurrent sensor updates reliably, and maintained detection accuracy of 86% across diverse environmental conditions.</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="project-tag">Raspberry Pi</span>
                      <span className="project-tag">LoRaWAN</span>
                      <span className="project-tag">MQTT</span>
                      <span className="project-tag">The Things Network</span>
                      <span className="project-tag">Random Forest</span>
                      <span className="project-tag">Decision Trees</span>
                      <span className="project-tag">Flask</span>
                      <span className="project-tag">SQLite</span>
                      <span className="project-tag">Leaflet.js</span>
                      <span className="project-tag">Weather API</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-card hidden lg:block print:p-2 print:shadow-none">
                    <h4 className="font-semibold mb-3">Technical Features:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Custom sensor hardware integration</li>
                      <li>Real-time anomaly detection</li>
                      <li>Interactive mapping interface</li>
                      <li>ML-based prediction model</li>
                      <li>Data persistence with SQLite</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="project-item">
                <div className="lg:grid lg:grid-cols-3 gap-6 print:gap-2">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">Home-built Autonomous FPV Drone with iNav Autopilot</h3>
                    <div className="text-text-light text-sm mb-4">Personal Hardware Project 2024</div>
                    <p className="mb-4">
                      Designed and built a fully autonomous FPV drone from scratch, integrating an F7 flight controller, 4-in-1 ESCs, telemetry modules, and GPS systems for precise navigation. Configured iNav firmware for autonomous waypoint navigation, implemented PID tuning for flight stabilization, and developed failsafe protocols for emergency situations. The system includes custom electronics integration and sensor fusion for reliable autonomous operation.
                    </p>
                    <div className="mb-4"><strong>Results:</strong> Successfully implemented autonomous navigation capabilities allowing the drone to follow predefined GPS waypoints within a 1-2 km range and return to base without manual intervention, demonstrating reliable inertial guidance and precise positioning capabilities.</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="project-tag">F7 Flight Controller</span>
                      <span className="project-tag">iNav Firmware</span>
                      <span className="project-tag">4-in-1 ESCs</span>
                      <span className="project-tag">GPS Navigation</span>
                      <span className="project-tag">Telemetry</span>
                      <span className="project-tag">PID Control</span>
                      <span className="project-tag">Custom Electronics</span>
                      <span className="project-tag">Autonomous Systems</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-card hidden lg:block print:p-2 print:shadow-none">
                    <h4 className="font-semibold mb-3">Technical Achievements:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Hardware-firmware integration</li>
                      <li>Autonomous waypoint navigation</li>
                      <li>PID loop optimization</li>
                      <li>Fail-safe protocol implementation</li>
                      <li>PCB-level system integration</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="project-item">
                <div className="lg:grid lg:grid-cols-3 gap-6 print:gap-2">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">Imagine You - AI Personal Image Generation App</h3>
                    <div className="text-text-light text-sm mb-4">Flutter Mobile Application 2024</div>
                    <p className="mb-4">
                      Developed a full Flutter Android app enabling users to create personalized AI image models of themselves and generate custom images across various styles and scenarios. Implemented a complete pipeline for training custom FLUX.1 diffusion models using the Replicate API, with OAuth authentication, Firebase database integration, and Stripe payment processing. The app features an interactive chat interface, advanced image generation settings, and secure user data management.
                    </p>
                    <div className="mb-4"><strong>Results:</strong> Successfully developed and released a production-ready app on the Google Play Store capable of fine-tuning custom diffusion models on just 20-30 user images. The app enables users to generate personalized AI representations through an intuitive chat interface with high-quality and consistent results, while maintaining secure payment processing and user authentication systems.</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="project-tag">Flutter</span>
                      <span className="project-tag">Firebase</span>
                      <span className="project-tag">OAuth</span>
                      <span className="project-tag">Stripe</span>
                      <span className="project-tag">Diffusion Models</span>
                      <span className="project-tag">Replicate API</span>
                      <span className="project-tag">Custom Model Training</span>
                      <span className="project-tag">Provider Pattern</span>
                      <span className="project-tag">GPU-accelerated Training</span>
                      <span className="project-tag">Google Play Store</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-card hidden lg:block print:p-2 print:shadow-none">
                    <h4 className="font-semibold mb-3">Advanced Features:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Custom AI model training</li>
                      <li>Mobile-optimized diffusion models</li>
                      <li>Intuitive UI for complex functionality</li>
                      <li>Secure cloud integration</li>
                      <li>Custom image generation parameters</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="project-item">
                <div className="lg:grid lg:grid-cols-3 gap-6 print:gap-2">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">LinkedIn Job Application Automator</h3>
                    <div className="text-text-light text-sm mb-4">Web Automation Project 2024</div>
                    <p className="mb-4">
                      Built a sophisticated automation system using Python and Playwright that handles the entire LinkedIn job application process. The system features intelligent form detection and auto-filling capabilities, customizable job search with advanced filters, automatic cover letter generation using GPT, session persistence to avoid frequent logins, and comprehensive error handling for robust operation across various application formats.
                    </p>
                    <div className="mb-4"><strong>Results:</strong> Achieved seamless automation capable of submitting up to 400 targeted job applications daily without interruption or human intervention, demonstrating exceptional reliability and adaptability to varying application formats.</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="project-tag">Python</span>
                      <span className="project-tag">Playwright</span>
                      <span className="project-tag">Web Automation</span>
                      <span className="project-tag">OpenAI API</span>
                      <span className="project-tag">Dynamic Form Parsing</span>
                      <span className="project-tag">HTML Selector Analysis</span>
                      <span className="project-tag">Error Recovery</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-card hidden lg:block print:p-2 print:shadow-none">
                    <h4 className="font-semibold mb-3">Technical Capabilities:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Intelligent form detection</li>
                      <li>Dynamic workflow adaptation</li>
                      <li>AI-powered document generation</li>
                      <li>Session state management</li>
                      <li>Robust error handling</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="project-item">
                <div className="lg:grid lg:grid-cols-3 gap-6 print:gap-2">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">Custom LLM Discord Bot</h3>
                    <div className="text-text-light text-sm mb-4">AI Integration Project 2024</div>
                    <p className="mb-4">
                      Developed a versatile Discord bot featuring local LLM integration for intelligent conversations, voice capabilities with text-to-speech functionality, music playback with advanced controls, and comprehensive server management tools. The system uses custom system prompts for different contexts and integrates with locally-hosted language models through an OpenAI-compatible API interface, enabling sophisticated AI-driven interactions within Discord.
                    </p>
                    <div className="mb-4"><strong>Results:</strong> Successfully implemented and deployed the bot to a personal Discord server, subsequently published it to a public bot marketplace where it gained adoption across 20+ servers. The bot continues to receive regular updates and maintenance, demonstrating sustainable development practices and user engagement.</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="project-tag">Python</span>
                      <span className="project-tag">Discord.py</span>
                      <span className="project-tag">Local LLM Integration</span>
                      <span className="project-tag">Coqui TTS</span>
                      <span className="project-tag">FFmpeg</span>
                      <span className="project-tag">API Compatibility</span>
                      <span className="project-tag">System Prompts</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-card hidden lg:block print:p-2 print:shadow-none">
                    <h4 className="font-semibold mb-3">Key Integrations:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Local model deployment</li>
                      <li>Voice channel interaction</li>
                      <li>Context-aware AI responses</li>
                      <li>Server administration tools</li>
                      <li>Audio processing pipeline</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Work Experience */}
        <AnimatedSection id="experience">
          <div className="section-title">
            <FiAward className="inline-block mr-2" /> Work Experience
          </div>
          <div className="section-content print:p-2">
            <div className="space-y-6 print:space-y-2">
              <div className="job-item">
                <div className="lg:grid lg:grid-cols-3 gap-6 print:gap-2">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">NHS Shadowing Experience</h3>
                    <div className="text-text-light text-sm mb-4">Sheffield Teaching Hospitals NHS Trust | June 2023 - August 2023</div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-primary dark:text-accent mb-2">Overview:</h4>
                      <p className="mb-3">Completed clinical shadowing in various hospital departments, observing medical procedures and patient care processes. Gained exposure to healthcare technology systems and electronic patient records management.</p>
                      
                      <h4 className="font-semibold text-primary dark:text-accent mb-2">Key Observations:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Observed integration of electronic health record systems across departments</li>
                        <li>Gained insight into medical device data integration and patient monitoring systems</li>
                        <li>Observed diagnostic imaging technology workflows and data management</li>
                        <li>Experienced multidisciplinary healthcare team communication structures</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-card hidden lg:block print:p-2 print:shadow-none">
                    <h4 className="font-semibold mb-3">Relevant Exposure:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Healthcare information systems</li>
                      <li>Medical device integration</li>
                      <li>Clinical workflows</li>
                      <li>Patient data management</li>
                      <li>Interdisciplinary coordination</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="job-item">
                <div className="lg:grid lg:grid-cols-3 gap-6 print:gap-2">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">Team Leader / Supervisor</h3>
                    <div className="text-text-light text-sm mb-4">Meltdown-Wetherspoons | February 2022 - November 2023</div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-primary dark:text-accent mb-2">Primary Responsibilities:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Managed daily operations and led staff training in high-volume city venues</li>
                        <li>Coordinated workflow processes to maximize efficiency during peak service periods</li>
                        <li>Developed and implemented crisis management strategies for busy service environments</li>
                        <li>Supervised team members, providing performance feedback and development opportunities</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary dark:text-accent mb-2">Key Achievements:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Improved operational efficiency by 15% through streamlined service protocols</li>
                        <li>Recognized for excellent leadership during high-pressure situations</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-card hidden lg:block print:p-2 print:shadow-none">
                    <h4 className="font-semibold mb-3">Skills Developed:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Team leadership</li>
                      <li>Crisis management</li>
                      <li>Operational efficiency</li>
                      <li>Staff training & development</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="job-item">
                <div className="lg:grid lg:grid-cols-3 gap-6 print:gap-2">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">Bartender / Front of House</h3>
                    <div className="text-text-light text-sm mb-4">Various Establishments | September 2018 - October 2021</div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-primary dark:text-accent mb-2">Primary Responsibilities:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Delivered exceptional customer service in high-end dining environments</li>
                        <li>Maintained strong communication between kitchen and front-of-house staff</li>
                        <li>Managed complex drink orders and maintained product knowledge</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary dark:text-accent mb-2">Key Achievements:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Recognized for meticulous attention to detail and customer satisfaction</li>
                        <li>Consistently received positive customer feedback</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-card hidden lg:block print:p-2 print:shadow-none">
                    <h4 className="font-semibold mb-3">Skills Developed:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Customer service excellence</li>
                      <li>Team communication</li>
                      <li>Product knowledge</li>
                      <li>Fast-paced work environment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-professional text-white text-center py-6 print:py-2 print:text-black print:bg-none">
        <div className="max-w-4xl mx-auto px-4">
          <div>Matthaios Markatis | 123 Ash Crescent, Eckington S21 4AD | 
            <a href="https://www.linkedin.com/in/matthaios-markatis" className="text-secondary-light hover:underline ml-1 print:text-black">LinkedIn</a> | 
            <a href="mailto:matthaiosmarkatis@gmail.com" className="text-secondary-light hover:underline ml-1 print:text-black">matthaiosmarkatis@gmail.com</a>
          </div>
        </div>
      </footer>
    </main>
  );
} 