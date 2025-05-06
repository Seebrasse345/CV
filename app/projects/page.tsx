'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  repository?: string;
  liveDemo?: string;
  imageUrl?: string;
  colorAccent: string;
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  
  // Define project data
  const projects: Project[] = [
    {
      id: 'advanced-pc-assistant',
      title: 'Advanced PC Assistant',
      description: 'An AI-powered agent that assists with various PC tasks using OpenAI\'s API, featuring Retrieval Augmented Generation (RAG) with a knowledge base.',
      features: [
        'Command Execution for system commands',
        'File Operations for file management',
        'System Information monitoring',
        'Web Requests and scraping capabilities',
        'Knowledge Base with RAG integration',
        'HTTP Traffic Logging for analysis'
      ],
      technologies: ['Python', 'OpenAI API', 'RAG', 'SQLite', 'CLI Interface'],
      repository: 'https://github.com/yourusername/advanced-pc-assistant',
      colorAccent: 'from-blue-500 to-purple-600'
    },
    {
      id: 'discord-bot',
      title: 'Custom LLM Discord Bot',
      description: 'A versatile Discord bot with voice, music, conversation, and server management capabilities powered by local LLM integration.',
      features: [
        'Conversation Management via chat and DMs',
        'Text-to-Speech (TTS) capabilities',
        'Voice Commands for voice channels',
        'Music Player with YouTube integration',
        'Server Management utilities',
        'Local LLM Integration for AI responses'
      ],
      technologies: ['Python', 'Discord.py', 'FFmpeg', 'Local LLMs', 'OpenAI API'],
      repository: 'https://github.com/your-username/discord-bot',
      colorAccent: 'from-indigo-600 to-blue-400'
    },
    {
      id: 'cv-website',
      title: 'CV Website',
      description: 'A modern, interactive CV website built with Next.js, Tailwind CSS, and Framer Motion.',
      features: [
        'Clean, modern design with smooth animations',
        'Dark mode support',
        'Fully responsive for all devices',
        'Fast performance and SEO optimized',
        'Ready for Vercel deployment'
      ],
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'React Icons', 'next-themes'],
      repository: 'https://github.com/username/matthaios-markatis-cv',
      liveDemo: 'https://matthaiosmarkatis.com',
      colorAccent: 'from-red-600 to-red-800'
    },
    {
      id: 'imagineyou-flutter',
      title: 'Imagine You',
      description: 'A Flutter application that lets users create personalized AI image models of themselves and generate custom images in various styles using AI diffusion models.',
      features: [
        'User Authentication with Firebase',
        'Photo Upload for model training',
        'Custom Model Training with Replicate API',
        'Image Generation through text prompts',
        'Chat Interface for interaction',
        'Image Gallery and sharing capabilities'
      ],
      technologies: ['Flutter', 'Firebase', 'Replicate API', 'Provider Pattern', 'Photo_view'],
      colorAccent: 'from-pink-500 to-purple-500'
    },
    {
      id: 'incubator-project',
      title: 'Incubator Project',
      description: 'A PyQt5-based application for monitoring and controlling an incubator system with MQTT integration for data collection.',
      features: [
        'Real-time monitoring of temperature and humidity',
        'Historical data visualization',
        'System logs display',
        'MQTT integration',
        'SQLite database for data storage',
        'SSH capability for remote systems'
      ],
      technologies: ['Python', 'PyQt5', 'MQTT', 'SQLite', 'Paramiko (SSH)'],
      colorAccent: 'from-green-500 to-teal-500'
    },
    {
      id: 'linkedin-job-agent',
      title: 'LinkedIn Job Application Automator',
      description: 'Automates the process of applying to jobs on LinkedIn using Python and Playwright, handling login, job search, and form filling.',
      features: [
        'Automated LinkedIn login with session persistence',
        'Job search with customizable filters',
        'Automatic form filling for applications',
        'Cover letter generation using GPT',
        'Progress tracking and error handling'
      ],
      technologies: ['Python', 'Playwright', 'OpenAI API', 'Web Automation'],
      colorAccent: 'from-blue-600 to-teal-400'
    },
    {
      id: 'mp-statement-writer',
      title: 'MP Statement Writer',
      description: 'An AI-powered application designed to help Members of Parliament create unique and focused public statements from generic government communications.',
      features: [
        'Statement Rewriting for personalization',
        'Audience Targeting customization',
        'Tone Selection options',
        'Local Context Integration',
        'History Management for tracking',
        'Template System for reuse'
      ],
      technologies: ['Python', 'Tkinter', 'OpenAI API', 'SQLite'],
      colorAccent: 'from-blue-700 to-indigo-500'
    },
    {
      id: 'shroomcult-website',
      title: 'Shroomcult Website',
      description: 'A Next.js project bootstrapped with create-next-app, featuring automatic optimization and modern web technologies.',
      features: [
        'Server-side rendering capabilities',
        'Static site generation',
        'Automatic font optimization',
        'Easy deployment on Vercel'
      ],
      technologies: ['Next.js', 'React', 'Geist Font', 'Vercel'],
      colorAccent: 'from-purple-600 to-purple-800'
    },
    {
      id: 'spacex-dashboard',
      title: 'SpaceX Launch Dashboard',
      description: 'A data visualization dashboard for SpaceX launch data built with Dash and Plotly.',
      features: [
        'Filter launch data by launch site',
        'View success rate through pie charts',
        'Analyze correlation between payload mass and success',
        'Filter data by payload mass range'
      ],
      technologies: ['Python', 'Dash', 'Plotly', 'Pandas'],
      colorAccent: 'from-gray-700 to-gray-900'
    },
    {
      id: 'spotify-playlist-generator',
      title: 'Spotify Playlist Generator',
      description: 'A web application that helps users generate personalized Spotify playlists based on favorite artists, built with Flask and the Spotify Web API.',
      features: [
        'Spotify account authentication',
        'Artist search functionality',
        'Playlist generation with customizable length',
        'Direct integration with Spotify'
      ],
      technologies: ['Python', 'Flask', 'Spotify Web API', 'OAuth 2.0', 'Three.js'],
      colorAccent: 'from-green-600 to-teal-600'
    },
    {
      id: 'video-transcripter',
      title: 'Video Transcripter',
      description: 'A simple Python tool that automatically transcribes video files using OpenAI\'s Whisper API.',
      features: [
        'Processes common video file formats',
        'Extracts audio from video files',
        'Splits large audio files into smaller chunks',
        'Transcribes using Whisper API',
        'Cleans up temporary files'
      ],
      technologies: ['Python', 'OpenAI Whisper API', 'FFmpeg'],
      colorAccent: 'from-gray-600 to-slate-700'
    },
    {
      id: 'wildfire-detection',
      title: 'Wildfire Detection System',
      description: 'A real-time fire detection system using IoT sensors to monitor temperature and humidity levels with machine learning for fire prediction.',
      features: [
        'Real-time temperature and humidity monitoring',
        'MQTT integration with The Things Network',
        'Interactive map interface',
        'Heat map visualization',
        'Weather API integration',
        'Machine learning fire prediction'
      ],
      technologies: ['Python', 'Flask', 'MQTT', 'SQLite', 'Leaflet.js', 'Random Forest'],
      colorAccent: 'from-orange-600 to-red-700'
    }
  ];

  // Filter projects based on search query and category
  useEffect(() => {
    let filtered = projects;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(project => 
        project.technologies.some(tech => tech.toLowerCase() === selectedCategory.toLowerCase())
      );
    }
    
    setVisibleProjects(filtered);
  }, [searchQuery, selectedCategory]);

  // Get all unique technologies for filtering
  const allTechnologies = Array.from(
    new Set(
      projects.flatMap(project => project.technologies.map(tech => tech.toLowerCase()))
    )
  ).sort();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="min-h-screen bg-dark pt-24 pb-16">
      <Navigation />
      <div className="container mx-auto px-4 py-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6 relative inline-block">
            My Projects
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-redAccent"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            A collection of my work in AI, automation, web development, data science, and embedded systems.
            Each project represents a unique solution to complex problems.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 px-4 py-2 bg-dark-card border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-redAccent"
            />
            <div className="absolute right-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === null 
                  ? 'bg-redAccent text-white'
                  : 'bg-dark-card text-gray-300 hover:bg-gray-700'
              } transition-colors`}
            >
              All
            </button>
            
            {['Python', 'React', 'Next.js', 'Flutter', 'API'].map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedCategory(tech === selectedCategory ? null : tech)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === tech 
                    ? 'bg-redAccent text-white'
                    : 'bg-dark-card text-gray-300 hover:bg-gray-700'
                } transition-colors`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {visibleProjects.map((project) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              className="bg-dark-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-800"
            >
              <div className={`h-3 bg-gradient-to-r ${project.colorAccent}`} />
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-redAccent mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs bg-dark-lighter rounded-md text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-redAccent hover:text-redAccent-lighter transition-colors text-sm font-medium"
                  >
                    View Details
                  </Link>
                  
                  {project.repository && (
                    <a 
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Empty state for no search results */}
        {visibleProjects.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl text-gray-400 mb-4">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="mt-4 px-4 py-2 bg-redAccent text-white rounded-md hover:bg-redAccent-lighter transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}