'use client';

import React from 'react';
import Navigation from '@/components/Navigation';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-dark pt-24">
      <Navigation />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-white mb-6">Contact</h1>
        <p className="text-gray-400 mb-8">This page will contain contact information and a contact form.</p>
      </div>
    </main>
  );
} 