'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  loop?: boolean;
  loopDelay?: number;
}

export default function Typewriter({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '',
  loop = false,
  loopDelay = 2000 
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        setCurrentIndex(0);
      }, delay);
      return () => clearTimeout(delayTimeout);
    }
  }, [delay]);

  useEffect(() => {
    if (currentIndex === 0 && displayText === '' && delay > 0) {
      return;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < text.length) {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else if (loop) {
          setTimeout(() => {
            setIsDeleting(true);
          }, loopDelay);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex(0);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, displayText, isDeleting, text, speed, loop, loopDelay, delay]);

  return <span className={className}>{displayText}<span className="animate-pulse">|</span></span>;
}

