'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  reason: string;
}

interface FormStatus {
  submitted: boolean;
  error: boolean;
  message: string;
}

export default function AccountDeletionPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    reason: ''
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({
    submitted: false,
    error: false,
    message: ''
  });

  // Load only on client-side
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants for content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ submitted: true, error: false, message: 'Processing your request...' });

    try {
      const response = await fetch('/api/send-deletion-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({
          submitted: true,
          error: false,
          message: 'Your account deletion request has been submitted. We will process it within 48 hours.'
        });
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          reason: ''
        });
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }
    } catch (error: unknown) {
      setFormStatus({
        submitted: true,
        error: true,
        message: `Failed to submit request: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden"
      style={{ 
        background: 'radial-gradient(circle at center, rgba(26, 0, 51, 0.8) 0%, rgba(13, 13, 13, 0.9) 70%, #0D0D0D 100%)'
      }}
    >
      <Navigation />
      
      <div className="pt-24 pb-20 transition-all duration-1000 min-h-screen"
        style={{ 
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'translateY(20px)' : 'translateY(0)'
        }}
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center py-10 md:py-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent" 
              style={{ 
                backgroundImage: 'linear-gradient(135deg, #7B2CBF 0%, #C77DFF 100%)',
                textShadow: '0 0 15px rgba(123, 44, 191, 0.6)'
              }}
            >
              Account Deletion
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Request to permanently delete your account and associated data
            </p>
          </div>

          {/* Main content */}
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Data Collection Information Section */}
            <motion.section 
              className="mb-12" 
              variants={itemVariants}
            >
              <div className="bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-opacity-20"
                style={{ borderColor: '#7B2CBF' }}
              >
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-bold mb-6" style={{ color: '#C77DFF' }}>Your Data & Privacy</h2>
                  <div className="text-gray-300 space-y-5">
                    <div>
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#C77DFF' }}>Data We Collect</h3>
                      <p className="mb-4">
                        To provide our personalized AI image generation service, we collect and process the following types of data:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-dark-lighter p-4 rounded-xl">
                          <h4 className="font-semibold mb-2">Personal Information</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>First and last name</li>
                            <li>Email address</li>
                            <li>Account credentials</li>
                            <li>Profile information</li>
                          </ul>
                        </div>
                        <div className="bg-dark-lighter p-4 rounded-xl">
                          <h4 className="font-semibold mb-2">Content Data</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Uploaded photos</li>
                            <li>Photo metadata</li>
                            <li>Generated images</li>
                            <li>Text prompts and preferences</li>
                          </ul>
                        </div>
                        <div className="bg-dark-lighter p-4 rounded-xl">
                          <h4 className="font-semibold mb-2">Technical Data</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Device information and identifiers</li>
                            <li>IP address</li>
                            <li>Operating system</li>
                            <li>App usage statistics</li>
                          </ul>
                        </div>
                        <div className="bg-dark-lighter p-4 rounded-xl">
                          <h4 className="font-semibold mb-2">Payment Data</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Transaction history</li>
                            <li>Subscription information</li>
                            <li>Google Play purchase records</li>
                            <li>Billing address information</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#C77DFF' }}>Data Retention & Deletion</h3>
                      <p className="mb-3">
                        When you request account deletion, we implement the following procedures:
                      </p>
                      
                      <div className="bg-dark-lighter p-5 rounded-xl mb-4">
                        <h4 className="font-semibold mb-2">Data Deleted Immediately:</h4>
                        <ul className="list-disc pl-5 space-y-1 mb-4">
                          <li>Personal profile information (name, email, etc.)</li>
                          <li>Your AI-trained model</li>
                          <li>Generated images associated with your account</li>
                          <li>Custom settings and preferences</li>
                          <li>In-app content and prompt history</li>
                        </ul>
                        
                        <h4 className="font-semibold mb-2">Data Retained for 30 Days:</h4>
                        <ul className="list-disc pl-5 space-y-1 mb-4">
                          <li>Basic account identifiers (for recovery purposes)</li>
                          <li>Backup data (in case of accidental deletion)</li>
                        </ul>
                        
                        <h4 className="font-semibold mb-2">Data Retained for Legal Purposes:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Transaction records (as required by financial regulations)</li>
                          <li>Usage logs (anonymized after 90 days)</li>
                          <li>Certain technical information for security and fraud prevention</li>
                        </ul>
                      </div>
                      
                      <p>
                        After the 30-day retention period, all remaining personal data is permanently deleted from our systems and cannot be recovered. Anonymized and aggregated data may be retained for analytical purposes, but this information cannot be used to identify you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Deletion Information Section */}
            <motion.section 
              className="mb-12" 
              variants={itemVariants}
            >
              <div className="bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-opacity-20"
                style={{ borderColor: '#7B2CBF' }}
              >
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-bold mb-6" style={{ color: '#C77DFF' }}>Before You Delete</h2>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      We're sorry to see you go. Before proceeding with account deletion, please note:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Account deletion is permanent and cannot be undone after the 30-day recovery period</li>
                      <li>All your personal data, images, and generated content will be permanently removed</li>
                      <li>Your AI-trained model will be deleted and cannot be restored</li>
                      <li>Any active subscriptions should be cancelled separately through Google Play</li>
                      <li>Deletion requests are typically processed within 48 hours</li>
                    </ul>
                    <div className="bg-dark-lighter p-4 rounded-xl mt-3 border-l-4" style={{ borderColor: '#C77DFF' }}>
                      <h4 className="font-semibold mb-2">Google Play Subscriptions</h4>
                      <p>
                        If you have an active subscription through Google Play, deleting your account will not automatically cancel your subscription. To avoid being charged, please cancel your subscription through Google Play before deleting your account.
                      </p>
                    </div>
                    <p>
                      If you're experiencing issues with our service, our support team is available to help resolve them. Consider contacting support before deleting your account.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Deletion Form Section */}
            <motion.section
              variants={itemVariants}
            >
              <div className="bg-dark-card bg-opacity-80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-opacity-20"
                style={{ borderColor: '#7B2CBF' }}
              >
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-bold mb-6" style={{ color: '#C77DFF' }}>Deletion Request Form</h2>
                  
                  {formStatus.submitted && (
                    <div className={`mb-8 p-4 rounded-lg ${formStatus.error ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                      {formStatus.message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-gray-300 mb-2">First Name *</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-dark-lighter border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-gray-300 mb-2">Last Name *</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-dark-lighter border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-dark-lighter border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all"
                        placeholder="The email address associated with your account"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="reason" className="block text-gray-300 mb-2">Reason for Deletion</label>
                      <textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full bg-dark-lighter border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all resize-none"
                        placeholder="Please tell us why you're deleting your account (optional)"
                      ></textarea>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        type="submit"
                        disabled={formStatus.submitted && !formStatus.error}
                        className="w-full py-4 px-8 rounded-lg text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed"
                        style={{ 
                          background: 'linear-gradient(135deg, #7B2CBF 0%, #C77DFF 100%)',
                          boxShadow: '0 5px 20px rgba(123, 44, 191, 0.4)'
                        }}
                      >
                        {formStatus.submitted && !formStatus.error ? 'Processing...' : 'Delete My Account'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 