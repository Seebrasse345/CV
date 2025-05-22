'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import dynamic from 'next/dynamic';

// Dynamic import for Three.js component
const CosmicBackground = dynamic(
  () => import('@/components/three/CosmicBackground'),
  { ssr: false, loading: () => null }
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add email sending logic here
  };

  return (
    <main className="min-h-screen bg-dark relative">
      <ScrollProgress />
      
      <div className="fixed inset-0 -z-10">
        <CosmicBackground />
      </div>
      
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-gray-100 to-redAccent/90 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300 mb-6">Let's discuss your next project or opportunity</p>
            <div className="w-32 h-1 bg-gradient-to-r from-redAccent via-red-500 to-red-600 mx-auto rounded-full shadow-lg"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-dark-card/95 to-dark-lighter/90 backdrop-blur-sm rounded-3xl p-8 border border-redAccent/25 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-redAccent/3 via-transparent to-red-600/5 pointer-events-none"></div>
              
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center relative z-10">
                <span className="w-8 h-8 bg-gradient-to-r from-redAccent to-red-500 rounded-lg flex items-center justify-center mr-4 text-white shadow-lg">📱</span>
                Contact Information
              </h2>

              <div className="space-y-6 relative z-10">
                {[
                  {
                    icon: '📧',
                    label: 'Email',
                    value: 'matthaiosmarkatis@gmail.com',
                    href: 'mailto:matthaiosmarkatis@gmail.com',
                    description: 'Send me an email anytime'
                  },
                  {
                    icon: '📱',
                    label: 'Phone',
                    value: '07480 699246',
                    href: 'tel:07480699246',
                    description: 'Call or text for immediate response'
                  },
                  {
                    icon: '📍',
                    label: 'Location',
                    value: '123 Ash Crescent, Eckington S21 4AD',
                    href: '#',
                    description: 'Based in Sheffield, UK'
                  },
                  {
                    icon: '💼',
                    label: 'LinkedIn',
                    value: 'linkedin.com/in/matthaios-markatis',
                    href: 'https://www.linkedin.com/in/matthaios-markatis',
                    description: 'Professional networking'
                  },
                  {
                    icon: '🔗',
                    label: 'GitHub',
                    value: 'github.com/Seebrasse345',
                    href: 'https://github.com/Seebrasse345',
                    description: 'Check out my projects'
                  }
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-br from-dark-lighter/60 to-dark-card/60 backdrop-blur-sm rounded-xl border border-redAccent/15 hover:border-redAccent/30 transition-all duration-300 hover:transform hover:scale-105 group hover:shadow-lg hover:shadow-redAccent/10"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform group-hover:drop-shadow-lg mt-1">{contact.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400 uppercase tracking-wide mb-1">{contact.label}</div>
                      <div className="text-white font-medium group-hover:text-redAccent transition-colors text-sm break-words hyphens-auto leading-tight mb-1">
                        {contact.value}
                      </div>
                      <div className="text-xs text-gray-500">{contact.description}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-redAccent/20 relative z-10">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-redAccent to-red-400 bg-clip-text text-transparent mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Response Time', value: '< 24 hours' },
                    { label: 'Availability', value: 'Open to opportunities' },
                    { label: 'Time Zone', value: 'GMT (UK)' },
                    { label: 'Preferred Contact', value: 'Email' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-dark-card/50 rounded-lg border border-redAccent/10">
                      <div className="text-redAccent font-bold text-sm">{stat.value}</div>
                      <div className="text-gray-400 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-dark-card/95 to-dark-lighter/90 backdrop-blur-sm rounded-3xl p-8 border border-redAccent/25 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-redAccent/3 via-transparent to-red-600/5 pointer-events-none"></div>
              
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center relative z-10">
                <span className="w-8 h-8 bg-gradient-to-r from-redAccent to-red-500 rounded-lg flex items-center justify-center mr-4 text-white shadow-lg">✉️</span>
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-lighter/60 border border-redAccent/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-redAccent/50 focus:ring-2 focus:ring-redAccent/20 transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-lighter/60 border border-redAccent/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-redAccent/50 focus:ring-2 focus:ring-redAccent/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-lighter/60 border border-redAccent/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-redAccent/50 focus:ring-2 focus:ring-redAccent/20 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-lighter/60 border border-redAccent/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-redAccent/50 focus:ring-2 focus:ring-redAccent/20 transition-all duration-300 resize-vertical"
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-redAccent to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-redAccent/30 hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-redAccent/50 transform hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-redAccent/20 relative z-10">
                <p className="text-gray-400 text-sm text-center">
                  I typically respond within 24 hours. For urgent matters, feel free to call or text directly.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 bg-gradient-to-br from-dark-card/95 to-dark-lighter/90 backdrop-blur-sm rounded-3xl p-8 border border-redAccent/25 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-redAccent/3 via-transparent to-red-600/5 pointer-events-none"></div>
            
            <div className="text-center relative z-10">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Work Together?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm always interested in discussing new opportunities, whether it's a challenging data science project, 
                an AI/ML implementation, or a full-stack development opportunity. Let's connect and explore how we can 
                create something amazing together.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:matthaiosmarkatis@gmail.com"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-redAccent/20 to-red-500/20 text-redAccent font-medium rounded-lg border border-redAccent/30 hover:border-redAccent/50 hover:bg-gradient-to-r hover:from-redAccent/30 hover:to-red-500/30 transition-all duration-300"
                >
                  <span className="mr-2">📧</span>
                  Send Email
                </a>
                <a
                  href="https://www.linkedin.com/in/matthaios-markatis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-redAccent/20 to-red-500/20 text-redAccent font-medium rounded-lg border border-redAccent/30 hover:border-redAccent/50 hover:bg-gradient-to-r hover:from-redAccent/30 hover:to-red-500/30 transition-all duration-300"
                >
                  <span className="mr-2">💼</span>
                  LinkedIn
                </a>
                <a
                  href="/cv"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-redAccent/20 to-red-500/20 text-redAccent font-medium rounded-lg border border-redAccent/30 hover:border-redAccent/50 hover:bg-gradient-to-r hover:from-redAccent/30 hover:to-red-500/30 transition-all duration-300"
                >
                  <span className="mr-2">📄</span>
                  View CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 