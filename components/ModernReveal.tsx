'use client';

import { useState, useEffect } from 'react';

interface ModernRevealProps {
  text: string;
  delay?: number;
  repeatDelay?: number;
  className?: string;
}

export default function ModernReveal({ 
  text, 
  delay = 0, 
  repeatDelay = 5000,
  className = '' 
}: ModernRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
      
      // Reset after repeatDelay
      const resetTimer = setTimeout(() => {
        setIsRevealed(false);
        // Re-trigger after a short pause
        setTimeout(() => setIsRevealed(true), 100);
      }, repeatDelay);
      
      return () => clearTimeout(resetTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, repeatDelay]);

  return (
    <span 
      className={`inline-block transition-all duration-700 ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {text}
    </span>
  );
}

