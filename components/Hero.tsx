'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle: string
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track if animation has started
  const [animationStarted, setAnimationStarted] = useState(false)
  
  // Split the title into words for a word-by-word animation
  const titleWords = title.split(' ')

  useEffect(() => {
    // Slightly delay the animation for a dramatic effect
    const timer = setTimeout(() => {
      setIsVisible(true)
      
      // Delay the animation start slightly
      setTimeout(() => {
        setAnimationStarted(true)
      }, 300)
    }, 200)
    
    return () => clearTimeout(timer)
  }, [title])

  // Calculate animation stagger delays
  const getWordDelay = (index: number) => {
    return index * 200 // 200ms between each word
  }
  
  const getLetterDelay = (wordIndex: number, letterIndex: number) => {
    return getWordDelay(wordIndex) + letterIndex * 30 // 30ms between each letter within a word
  }

  return (
    <div className="hero-container" ref={containerRef}>
      {/* Dark background panel for better visibility */}
      <div 
        className="absolute inset-x-0 mx-auto w-full max-w-4xl py-8 px-4 rounded-lg bg-black bg-opacity-50 backdrop-blur-sm border border-red-900/30 shadow-xl"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      />

      <div className="relative mb-12 z-10">
        <h1 className="hero-title text-center max-w-4xl mx-auto relative flex flex-wrap justify-center">
          {titleWords.map((word, wordIndex) => (
            <div 
              key={`word-${wordIndex}`}
              className="mr-4 md:mr-6 mb-2 overflow-hidden"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                transitionDelay: `${getWordDelay(wordIndex)}ms`
              }}
            >
              {word.split('').map((char, charIndex) => (
                <span
                  key={`char-${wordIndex}-${charIndex}`}
                  className={`inline-block`}
                  style={{
                    color: char === 'D' ? 'rgb(255, 0, 0)' : 'white',
                    animationName: animationStarted ? 'glow-pulse' : 'none',
                    animationDuration: '3s',
                    animationDelay: `${getLetterDelay(wordIndex, charIndex)}ms`,
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'ease-in-out',
                    textShadow: char === 'D' ? '0 0 10px rgba(255, 0, 0, 0.7)' : '0 0 5px rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </h1>
        
        {/* Red horizontal line that grows */}
        <div 
          className="absolute bottom-0 left-1/2 bg-redAccent h-0.5 rounded-full"
          style={{
            width: isVisible ? '150px' : '0px',
            transform: 'translateX(-50%)',
            transition: 'width 1.5s ease-in-out',
            transitionDelay: '1s',
            opacity: 0.8,
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.7)'
          }}
        />
      </div>
      
      <p 
        className="hero-subtitle text-center max-w-2xl mx-auto z-10 relative"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 1s ease, transform 1s ease',
          transitionDelay: '1.2s',
          textShadow: '0 0 10px rgba(0, 0, 0, 0.8)'
        }}
      >
        {subtitle}
      </p>
      
      <div 
        className="flex flex-wrap justify-center gap-4 mt-16 z-10 relative"
      >
        {['View CV', 'Projects', 'Contact'].map((text, index) => (
          <Link 
            key={text}
            href={`/${text === 'View CV' ? 'cv' : text.toLowerCase()}`} 
            className="cta-button relative overflow-hidden group"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease, background-color 0.3s ease',
              transitionDelay: `${1.5 + index * 0.15}s`
            }}
          >
            {/* Button background effect */}
            <span 
              className="absolute inset-0 w-0 bg-redAccent opacity-30 group-hover:w-full transition-all duration-500 ease-out"
            />
            <span className="relative z-10">{text}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hero 