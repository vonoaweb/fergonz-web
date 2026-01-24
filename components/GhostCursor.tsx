'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GhostCursorProps {
  reducedEffects?: boolean;
}

export default function GhostCursor({ reducedEffects = false }: GhostCursorProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Ultra-fast, highly responsive spring config - minimal lag
  const springConfig = { damping: 15, stiffness: 600, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Trailing dots with minimal delays for faster response
  const trailConfig1 = { damping: 18, stiffness: 500, mass: 0.25 };
  const trailConfig2 = { damping: 20, stiffness: 450, mass: 0.3 };
  const trailConfig3 = { damping: 22, stiffness: 400, mass: 0.35 };
  
  const trailX1 = useSpring(cursorX, trailConfig1);
  const trailY1 = useSpring(cursorY, trailConfig1);
  const trailX2 = useSpring(cursorX, trailConfig2);
  const trailY2 = useSpring(cursorY, trailConfig2);
  const trailX3 = useSpring(cursorX, trailConfig3);
  const trailY3 = useSpring(cursorY, trailConfig3);

  // Direct hover detection - no throttling for instant response
  const checkHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) {
      setIsHovering(false);
      return;
    }
    
    const isInteractive = 
      target.matches('a, button, input, textarea, [role="button"], [onclick], [class*="cursor-pointer"]') ||
      target.closest('a, button, [role="button"], [class*="cursor-pointer"]') !== null;
    
    setIsHovering(isInteractive);
  }, []);

  useEffect(() => {
    // Only enable on desktop
    const checkDesktop = () => {
      const desktop = window.matchMedia('(min-width: 768px)').matches;
      setIsDesktop(desktop);
      if (!desktop) {
        setIsVisible(false);
      }
    };
    
    checkDesktop();
    const resizeHandler = () => checkDesktop();
    window.addEventListener('resize', resizeHandler);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
      checkHover(e);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
      setIsHovering(false);
      setIsClicking(false);
    };

    if (isDesktop) {
      // Hide default cursor only on desktop
      document.body.classList.add('ghost-cursor-active');
      document.documentElement.style.cursor = 'none';

      window.addEventListener('mousemove', moveCursor, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeaveWindow);
      document.addEventListener('mousedown', handleMouseDown, { passive: true });
      document.addEventListener('mouseup', handleMouseUp, { passive: true });
    }

    return () => {
      if (isDesktop) {
        document.body.classList.remove('ghost-cursor-active');
        document.documentElement.style.cursor = 'auto';
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseleave', handleMouseLeaveWindow);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
      }
      window.removeEventListener('resize', resizeHandler);
    };
  }, [cursorX, cursorY, isDesktop, checkHover]);

  if (!isDesktop || !isVisible) return null;

  return (
    <>
      {/* Trailing dots - disabled in reduced mode */}
      {!reducedEffects && (
        <>
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9995] will-change-transform"
            style={{
              x: trailX3,
              y: trailY3,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400/20 dark:bg-cyan-400/30 blur-sm" />
          </motion.div>
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9996] will-change-transform"
            style={{
              x: trailX2,
              y: trailY2,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div className="w-3 h-3 rounded-full bg-cyan-400/30 dark:bg-cyan-400/40 blur-[1px]" />
          </motion.div>
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9997] will-change-transform"
            style={{
              x: trailX1,
              y: trailY1,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400/40 dark:bg-cyan-400/50" />
          </motion.div>
        </>
      )}

      {/* Main cursor dot - more visible */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-4 h-4 rounded-full bg-cyan-400 dark:bg-cyan-400 mix-blend-difference"
          animate={{
            scale: isClicking ? 0.2 : isHovering ? 0 : 1,
            opacity: isClicking ? 0.6 : 1,
          }}
          transition={{ duration: 0.05, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Outer ring - main cursor - more visible and larger */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-14 h-14 rounded-full border-2 border-cyan-400/60 dark:border-cyan-400/80"
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 2.2 : 1,
            opacity: isClicking ? 0.3 : isHovering ? 1 : 0.6,
          }}
          transition={{ duration: 0.08, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Hover effect ring - pulsing - disabled in reduced mode */}
      {isHovering && !reducedEffects && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] will-change-transform"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 1.5, opacity: 0.6 }}
          animate={{ 
            scale: [1.5, 3, 1.5],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{ 
            duration: 1.0, 
            repeat: Infinity, 
            ease: 'easeInOut',
            times: [0, 0.5, 1]
          }}
        >
          <div className="w-24 h-24 rounded-full border-2 border-cyan-400/60 dark:border-cyan-400/80" />
        </motion.div>
      )}

      {/* Click ripple effect - disabled in reduced mode */}
      {isClicking && !reducedEffects && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9996] will-change-transform"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="w-28 h-28 rounded-full border-2 border-cyan-400/70 dark:border-cyan-400/90" />
        </motion.div>
      )}
    </>
  );
}
