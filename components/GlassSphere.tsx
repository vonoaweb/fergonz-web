'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function GlassSphere() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize to -1 to 1 range
      const xPercent = (clientX / innerWidth) * 2 - 1;
      const yPercent = (clientY / innerHeight) * 2 - 1;
      
      // Update with smooth spring animation
      mouseX.set(xPercent * 50);
      mouseY.set(yPercent * 50);
      
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform values for the sphere
  const rotateX = useTransform(y, [-50, 50], [30, -30]);
  const rotateY = useTransform(x, [-50, 50], [-30, 30]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          rotateX,
          rotateY,
        }}
      >
        {/* Main Glass Sphere */}
        <motion.div
          className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
          animate={{
            scale: isHovering ? 1.1 : 1,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/20 via-primary/10 to-transparent blur-3xl" />
          
          {/* Glass sphere */}
          <div
            className="relative w-full h-full rounded-full"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(99, 102, 241, 0.1) 100%)
              `,
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: `
                0 0 100px rgba(99, 102, 241, 0.2),
                inset 0 0 100px rgba(255, 255, 255, 0.05),
                0 0 200px rgba(99, 102, 241, 0.1)
              `,
            }}
          >
            {/* Inner highlights */}
            <div
              className="absolute top-[20%] left-[25%] w-[30%] h-[30%] rounded-full blur-xl"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute bottom-[25%] right-[20%] w-[25%] h-[25%] rounded-full blur-xl"
              style={{
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
              }}
            />
            
            {/* Refraction lines */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 w-px h-full opacity-10"
                  style={{
                    transform: `rotate(${i * 45}deg) translateX(-50%)`,
                    background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 300;
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/30 blur-sm"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1,
                }}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
