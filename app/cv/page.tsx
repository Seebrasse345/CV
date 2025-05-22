'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import dynamic from 'next/dynamic';

// Dynamic import for Three.js component
const CosmicBackground = dynamic(
  () => import('@/components/three/CosmicBackground'),
  { ssr: false, loading: () => null }
);

export default function CVPage() {
  const [activeSection, setActiveSection] = useState('header');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Section refs for smooth scrolling
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  
  const sections = {
    header: { ref: headerRef, label: 'Overview' },
    summary: { ref: summaryRef, label: 'About Me' },
    skills: { ref: skillsRef, label: 'Skills' },
    education: { ref: educationRef, label: 'Education' },
    certifications: { ref: certificationsRef, label: 'Certifications' },
    projects: { ref: projectsRef, label: 'Projects' },
    experience: { ref: experienceRef, label: 'Experience' }
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = sections[sectionId as keyof typeof sections]?.ref.current;
    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Handle scroll events for active section detection and navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sectionElements = Object.entries(sections).map(([id, { ref }]) => ({
        id,
        element: ref.current,
        offsetTop: ref.current?.getBoundingClientRect().top || 0
      }));

      const activeElement = sectionElements.find(({ offsetTop }) => offsetTop >= -100 && offsetTop <= 300);
      if (activeElement) {
        setActiveSection(activeElement.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-dark relative">
      <ScrollProgress />
      
      <div className="fixed inset-0 -z-10">
        <CosmicBackground />
      </div>
      
      <Navigation />
      
      {/* Enhanced CV Navigation */}
      <div className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-dark-card/95 backdrop-blur-md shadow-2xl border-b border-redAccent/30' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex space-x-1 p-2 bg-dark-lighter/80 backdrop-blur-sm rounded-full border border-redAccent/20 shadow-xl">
              {Object.entries(sections).map(([sectionId, { label }]) => (
                <button
                  key={sectionId}
                  onClick={() => scrollToSection(sectionId)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSection === sectionId
                      ? 'bg-redAccent text-white shadow-lg transform scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-dark-card/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* CV Header */}
          <section ref={headerRef} className="mb-16">
            <div className="bg-gradient-to-br from-gray-900/95 via-dark-card/95 to-dark-lighter/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-redAccent/30 shadow-2xl relative overflow-hidden">
              {/* Enhanced background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-redAccent/5 via-transparent to-red-600/10 pointer-events-none"></div>
              
              <div className="text-center mb-8 relative z-10">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-gray-100 to-redAccent/90 bg-clip-text text-transparent">
                  Matthaios Markatis
                </h1>
                <p className="text-2xl text-redAccent font-light mb-6 bg-gradient-to-r from-redAccent to-red-400 bg-clip-text text-transparent">Data Scientist | ML Engineer | Systems Developer</p>
                <div className="w-32 h-1 bg-gradient-to-r from-redAccent via-red-500 to-red-600 mx-auto rounded-full shadow-lg"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
                {[
                  { icon: '📧', label: 'Email', value: 'matthaiosmarkatis@gmail.com', href: 'mailto:matthaiosmarkatis@gmail.com' },
                  { icon: '📱', label: 'Phone', value: '07480 699246', href: 'tel:07480699246' },
                  { icon: '📍', label: 'Location', value: '123 Ash Crescent, Eckington S21 4AD', href: '#' },
                  { icon: '💼', label: 'LinkedIn', value: 'matthaios-markatis', href: 'https://www.linkedin.com/in/matthaios-markatis' },
                  { icon: '🔗', label: 'GitHub', value: 'Seebrasse345', href: 'https://github.com/Seebrasse345' }
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-br from-dark-lighter/70 to-dark-card/70 backdrop-blur-sm rounded-xl border border-redAccent/20 hover:border-redAccent/40 transition-all duration-300 hover:transform hover:scale-105 group hover:shadow-lg hover:shadow-redAccent/20"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform group-hover:drop-shadow-lg">{contact.icon}</span>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{contact.label}</div>
                      <div className="text-white font-medium group-hover:text-redAccent transition-colors text-sm break-words hyphens-auto max-w-full overflow-wrap-anywhere leading-tight">
                        {contact.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* About Me Section */}
          <section ref={summaryRef} className="mb-16">
            <div className="bg-gradient-to-br from-dark-card/95 to-dark-lighter/90 backdrop-blur-sm rounded-3xl p-8 border border-redAccent/25 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-redAccent/3 via-transparent to-red-600/5 pointer-events-none"></div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center relative z-10">
                <span className="w-8 h-8 bg-gradient-to-r from-redAccent to-red-500 rounded-lg flex items-center justify-center mr-4 text-white shadow-lg">✨</span>
                About Me
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed relative z-10">
                BSc Physics graduate from the University of Sheffield with strong expertise in <strong className="text-redAccent">computational methods</strong> including <strong className="text-redAccent">numerical simulations</strong> and <strong className="text-redAccent">algorithm optimization</strong>, <strong className="text-redAccent">data analysis</strong> using advanced <strong className="text-redAccent">statistical techniques</strong>, and full-stack <strong className="text-redAccent">software development</strong>. Certified in <strong className="text-redAccent">IBM Data Science</strong> and <strong className="text-redAccent">AI Engineering</strong>, with practical achievements such as deploying a <strong className="text-redAccent">traffic light identification system</strong> with 98% accuracy. Demonstrated success in developing impactful, end-to-end solutions including an <strong className="text-redAccent">IoT-enabled wildfire detection system</strong> achieving 86% predictive accuracy and a mobile application featuring fine-tuned <strong className="text-redAccent">Diffusion models</strong> for personalized <strong className="text-redAccent">image generation</strong>. Proficient in building robust <strong className="text-redAccent">data pipelines</strong>, deploying optimized <strong className="text-redAccent">predictive models</strong>, and effectively integrating <strong className="text-redAccent">AI</strong> into scalable software solutions using cloud platforms (<strong className="text-redAccent">AWS</strong>, <strong className="text-redAccent">Azure</strong>) and advanced <strong className="text-redAccent">DevOps methodologies</strong> (<strong className="text-redAccent">CI/CD</strong>, <strong className="text-redAccent">Docker</strong>, <strong className="text-redAccent">Kubernetes</strong>). Passionate about driving technological innovation through strategic applications of <strong className="text-redAccent">AI</strong>, <strong className="text-redAccent">Data Science</strong>, and comprehensive <strong className="text-redAccent">systems engineering</strong>.
              </p>
            </div>
          </section>

          {/* Technical Skills Section */}
          <section ref={skillsRef} className="mb-16">
            <div className="bg-gradient-to-br from-dark-card/95 to-dark-lighter/90 backdrop-blur-sm rounded-3xl p-8 border border-redAccent/25 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-redAccent/3 via-transparent to-red-600/5 pointer-events-none"></div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center relative z-10">
                <span className="w-8 h-8 bg-gradient-to-r from-redAccent to-red-500 rounded-lg flex items-center justify-center mr-4 text-white shadow-lg">⚡</span>
                Technical Skills
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {[
                  {
                    category: 'Programming & Development',
                    icon: '💻',
                    skills: ['Python (NumPy, Pandas, Scikit-learn, OpenCV)', 'JavaScript/TypeScript (React, Node.js, Express)', 'SQL/NoSQL (PostgreSQL, MongoDB, Firebase)', 'C/C++, GitHub, CI/CD, REST API development', 'Accelerated via Cursor, Windsurf and Cline']
                  },
                  {
                    category: 'Machine Learning & AI',
                    icon: '🤖',
                    skills: ['TensorFlow, PyTorch, Keras, scikit-learn ecosystems', 'Neural networks (CNN, RNN, Transformers)', 'LLM fine-tuning, prompt engineering, GPT models', 'Computer vision, NLP, recommendation systems', 'Agent Tooling, RAG, MCP']
                  },
                  {
                    category: 'Data Science & Engineering',
                    icon: '📊',
                    skills: ['Statistical analysis, hypothesis testing, A/B testing', 'ETL pipelines, data preprocessing, feature engineering', 'Visualization (Matplotlib, Seaborn, Plotly, Tableau)', 'ML model deployment, monitoring, and optimization']
                  },
                  {
                    category: 'Web, Cloud & Tools',
                    icon: '☁️',
                    skills: ['Flask, React, Next.js, Firebase, OAuth', 'Cloud services (AWS, Google Cloud)', 'Docker, Jupyter, IBM Watson Studio, Azure ML', 'IAM, Ansible, Jenkins', 'Mobile app development (Flutter, Dart)']
                  },
                  {
                    category: 'Hardware & Systems',
                    icon: '🔧',
                    skills: ['Raspberry Pi, Arduino, Sensor Integration and PCB assembly', '3D Printing, AutoCAD', 'IoT, LoRaWAN, microPython', 'FPGA, VHDL, LabVIEW']
                  }
                ].map((skillGroup, index) => (
                  <div key={index} className="bg-gradient-to-br from-dark-lighter/60 to-dark-card/60 backdrop-blur-sm rounded-2xl p-6 border border-redAccent/15 hover:border-redAccent/30 transition-all duration-300 hover:shadow-lg hover:shadow-redAccent/10">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">{skillGroup.icon}</span>
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-redAccent to-red-400 bg-clip-text text-transparent">{skillGroup.category}</h3>
                    </div>
                    <div className="space-y-2">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="text-gray-300 text-sm leading-relaxed">
                          • {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Education & Certifications Section */}
          <section ref={educationRef} className="mb-16">
            <div className="bg-gradient-to-br from-dark-card/95 to-dark-lighter/90 backdrop-blur-sm rounded-3xl p-8 border border-redAccent/25 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-redAccent/3 via-transparent to-red-600/5 pointer-events-none"></div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center relative z-10">
                <span className="w-8 h-8 bg-gradient-to-r from-redAccent to-red-500 rounded-lg flex items-center justify-center mr-4 text-white shadow-lg">🎓</span>
                Education & Certifications
              </h2>
              
              {/* BSc Physics */}
              <div className="bg-gradient-to-br from-dark-lighter/60 to-dark-card/60 backdrop-blur-sm rounded-2xl p-6 border border-redAccent/15 mb-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">BSc Physics</h3>
                    <p className="text-gray-300 mb-2">University of Sheffield</p>
                    <p className="bg-gradient-to-r from-redAccent to-red-400 bg-clip-text text-transparent font-semibold">2:1 Classification (Upper Second-Class Honours)</p>
                  </div>
                  <div className="bg-gradient-to-r from-redAccent/20 to-red-500/20 text-redAccent px-4 py-2 rounded-full font-medium border border-redAccent/30">
                    2020 - 2024
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="text-lg font-semibold bg-gradient-to-r from-redAccent to-red-400 bg-clip-text text-transparent mb-3">Programming & Technical Modules</h4>
                    <div className="space-y-2">
                      {[
                        { module: 'Advanced Programming in Python', grade: '82%' },
                        { module: 'Programming in Python', grade: '78%' },
                        { module: 'Physical Computing', grade: '70%' },
                        { module: 'Physics with LabVIEW', grade: '70%' }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-dark-card/50 rounded-lg border border-redAccent/10">
                          <span className="text-gray-300">{item.module}</span>
                          <span className="text-redAccent font-bold">{item.grade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold bg-gradient-to-r from-redAccent to-red-400 bg-clip-text text-transparent mb-3">Physics Core Modules</h4>
                    <div className="space-y-2">
                      {[
                        { module: 'Physics of Materials', grade: '75%' },
                        { module: 'Atomic and Laser Physics', grade: '69%' },
                        { module: 'Particle Physics', grade: '67%' },
                        { module: 'Physics Research Project', grade: '59%' }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-dark-card/50 rounded-lg border border-redAccent/10">
                          <span className="text-gray-300">{item.module}</span>
                          <span className="text-redAccent font-bold">{item.grade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-6 relative z-10">
                {[
                  {
                    title: 'IBM AI Engineering Professional Certificate',
                    issuer: 'Coursera',
                    date: 'August 2024',
                    description: 'Comprehensive program covering machine learning, deep learning, and AI engineering with hands-on projects. Learned techniques in RL, Hyperparameter tuning, Model selection and architecture along with deployment pipelines such as AWS SageMaker.',
                    result: 'Deployed a traffic light identification system with 98% accuracy using IBM Watson and TensorFlow.'
                  },
                  {
                    title: 'IBM Data Science Professional Certificate',
                    issuer: 'Coursera', 
                    date: 'July 2024',
                    description: 'Intensive data science program covering the complete workflow from data collection to insights delivery. Learned techniques in Data Analysis, Data scraping and cleaning and full data to model development strategies along with ETL pipelines using AWS, Azure and Github Actions.',
                    result: 'Developed a SpaceX Falcon landing prediction classifier achieving 80% accuracy with a live website map through statistical analysis and feature engineering.'
                  }
                ].map((cert, index) => (
                  <div key={index} className="bg-gradient-to-br from-dark-lighter/60 to-dark-card/60 backdrop-blur-sm rounded-2xl p-6 border border-redAccent/15 hover:border-redAccent/30 transition-all duration-300 hover:shadow-lg hover:shadow-redAccent/10">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                        <p className="text-gray-400 mb-2">{cert.issuer}</p>
                        <p className="text-gray-300 mb-4">{cert.description}</p>
                      </div>
                      <div className="bg-gradient-to-r from-redAccent/20 to-red-500/20 text-redAccent px-4 py-2 rounded-full font-medium whitespace-nowrap border border-redAccent/30">
                        {cert.date}
                      </div>
                    </div>
                    
                    <div className="bg-dark-card/50 rounded-lg p-4 border border-redAccent/10">
                      <h4 className="bg-gradient-to-r from-redAccent to-red-400 bg-clip-text text-transparent font-semibold mb-2">Key Achievement:</h4>
                      <p className="text-gray-300">{cert.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section ref={projectsRef} className="mb-16">
            <div className="bg-gradient-to-br from-dark-card/95 to-dark-lighter/90 backdrop-blur-sm rounded-3xl p-8 border border-redAccent/25 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-redAccent/3 via-transparent to-red-600/5 pointer-events-none"></div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center relative z-10">
                <span className="w-8 h-8 bg-gradient-to-r from-redAccent to-red-500 rounded-lg flex items-center justify-center mr-4 text-white shadow-lg">🚀</span>
                Projects
              </h2>
              
              <div className="space-y-6 relative z-10">
                {[
                  {
                    title: 'Wildfire Detection System',
                    subtitle: 'University of Sheffield Research Project',
                    period: '2024',
                    description: 'Developed a real-time fire detection system built from a Raspberry Pi equipped with sensors and LoRaWAN, together with ML models (Random Forest, Decision Trees) to predict fire ignition before it occurs. Built a responsive web dashboard with Flask, SQLite, and Leaflet.js for interactive mapping. Trained on NASA FIRMS data, achieving 86% detection accuracy and 10-minute early warning capability. Deployed at the cheap cost of £46 per unit.',
                    icon: '🔥'
                  },
                  {
                    title: 'AI Personal Image Generation App',
                    subtitle: 'Flutter Mobile Application',
                    period: '2024',
                    description: 'Created and launched a production-ready Flutter app for personalized AI image generation. Implemented full-stack solution with custom fine-tuning pipeline for FLUX.1 diffusion models via Replicate API. Integrated secure user authentication (OAuth), database management (Firebase), and payment processing (Google Billing). Published to Google Play Store with ongoing user adoption.',
                    icon: '🎨'
                  },
                  {
                    title: 'Job Application Automator',
                    subtitle: 'Web Automation Project',
                    period: '2024',
                    description: 'Engineered an intelligent automation system using Python, Playwright, LangChain and Browser-Use that handles any job application process at any website, dynamically scraping and filling forms with the assistance of an LLM agent. Integrated Azure OpenAI API for dynamic cover letter generation, implemented pattern recognition for form detection and playwright for job description scraping, and built robust error handling for seamless operation. System capable of submitting 400+ targeted applications daily.',
                    icon: '🤖'
                  },
                  {
                    title: 'Fine-Tuned LLM Chat Bot',
                    subtitle: 'AI Integration Project',
                    period: '2024',
                    description: 'Built a fine-tuned LLM chatbot that was fine-tuned on Discord user messages using Azure ML, and Azure OpenAI. Developed a context-aware prompting system instilled with tools and an advanced audio processing pipeline with Coqui TTS for voice capabilities. Deployed via AWS SageMaker with a live CI/CD pipeline. Gained adoption across 20+ servers after publication to a bot marketplace.',
                    icon: '💬'
                  },
                  {
                    title: 'Autonomous FPV Drone with Navigation Software',
                    subtitle: 'Personal Project',
                    period: '2024',
                    description: 'Designed and built a fully autonomous drone with software for GPS waypoint navigation and PID stabilization. Implemented sensor fusion algorithms together with INaV for reliable positioning and custom Image Recognition (CVS) for vision-guided objectives. Achieved autonomous flight capabilities with precise navigation within a 1-2 km range and automated return-to-base functionality.',
                    icon: '🚁'
                  }
                ].map((project, index) => (
                  <div key={index} className="bg-gradient-to-br from-dark-lighter/60 to-dark-card/60 backdrop-blur-sm rounded-2xl p-6 border border-redAccent/15 hover:border-redAccent/30 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg hover:shadow-redAccent/10">
                    <div className="flex items-start space-x-4 mb-4">
                      <span className="text-3xl">{project.icon}</span>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white">{project.title}</h3>
                          <div className="bg-gradient-to-r from-redAccent/20 to-red-500/20 text-redAccent px-3 py-1 rounded-full text-sm font-medium border border-redAccent/30">
                            {project.period}
                          </div>
                        </div>
                        <p className="bg-gradient-to-r from-redAccent to-red-400 bg-clip-text text-transparent mb-3">{project.subtitle}</p>
                        <p className="text-gray-300">{project.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Work Experience Section */}
          <section ref={experienceRef} className="mb-16">
            <div className="bg-gradient-to-br from-dark-card/95 to-dark-lighter/90 backdrop-blur-sm rounded-3xl p-8 border border-redAccent/25 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-redAccent/3 via-transparent to-red-600/5 pointer-events-none"></div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center relative z-10">
                <span className="w-8 h-8 bg-gradient-to-r from-redAccent to-red-500 rounded-lg flex items-center justify-center mr-4 text-white shadow-lg">💼</span>
                Work Experience
              </h2>
              
              <div className="space-y-6 relative z-10">
                {[
                  {
                    title: 'AI Data Annotator & Reasoning Specialist',
                    company: 'Outlier AI',
                    period: 'June 2024 -- Present',
                    description: 'Spearheading data annotation and synthetic task creation for training large language models (LLMs) using Reinforcement Learning from Human Feedback (RLHF). Specialize in annotating and engineering tasks designed to teach models graduate-level mathematics and logical reasoning. Collaborate on fine-tuning initiatives for state-of-the-art reasoning agents with focus on structured task generation, error identification, and model behavior analysis in multi-hop reasoning environments.'
                  },
                  {
                    title: 'Team Leader',
                    company: 'Meltdown-Wetherspoons',
                    period: 'February 2022 -- November 2023',
                    description: 'Led operations and staff training in high-volume venues. Optimized workflow processes, improving operational efficiency by 15% and consistently scoring 90+ % in CQSMA. Developed crisis management strategies and provided performance coaching to team members in fast-paced environments.'
                  },
                  {
                    title: 'NHS Shadowing Experience',
                    company: 'Sheffield Teaching Hospitals NHS Trust',
                    period: 'February 2019 -- March 2019',
                    description: 'Observed healthcare technology systems and electronic patient records management across various departments. Gained insight into medical data integration, diagnostic imaging workflows, and cross-departmental information systems.'
                  }
                ].map((job, index) => (
                  <div key={index} className="bg-gradient-to-br from-dark-lighter/60 to-dark-card/60 backdrop-blur-sm rounded-2xl p-6 border border-redAccent/15 hover:border-redAccent/25 transition-all duration-300">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                        <p className="text-gray-300 mb-2">{job.company}</p>
                      </div>
                      <div className="bg-gradient-to-r from-redAccent/20 to-red-500/20 text-redAccent px-4 py-2 rounded-full font-medium border border-redAccent/30">
                        {job.period}
                      </div>
                    </div>
                    
                    <p className="text-gray-300">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center">
            <div className="bg-gradient-to-br from-dark-card/95 to-dark-lighter/90 backdrop-blur-sm rounded-3xl p-6 border border-redAccent/25 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-redAccent/3 via-transparent to-red-600/5 pointer-events-none"></div>
              <div className="flex flex-wrap justify-center gap-6 mb-4 relative z-10">
                {[
                  { label: 'Email', value: 'matthaiosmarkatis@gmail.com', href: 'mailto:matthaiosmarkatis@gmail.com' },
                  { label: 'Phone', value: '07480 699246', href: 'tel:07480699246' },
                  { label: 'LinkedIn', value: 'linkedin.com/in/matthaios-markatis', href: 'https://www.linkedin.com/in/matthaios-markatis' },
                  { label: 'GitHub', value: 'github.com/Seebrasse345', href: 'https://github.com/Seebrasse345' }
                ].map((contact, index) => (
                  <a key={index} href={contact.href} className="text-gray-400 hover:text-redAccent transition-colors">
                    {contact.value}
                  </a>
                ))}
              </div>
              <p className="text-gray-500 text-sm relative z-10">© {new Date().getFullYear()} Matthaios Markatis. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
} 