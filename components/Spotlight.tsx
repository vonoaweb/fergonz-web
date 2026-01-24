'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Spotlight() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  if (!mounted || !isDark) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden dark:block hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-zinc-950" />
      
      {/* Spotlight gradient following mouse */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Secondary subtle gradient */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
