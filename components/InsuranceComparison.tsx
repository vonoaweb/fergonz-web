'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GripVertical } from 'lucide-react';

interface InsuranceComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function InsuranceComparison({
  beforeImage,
  afterImage,
  beforeLabel = 'Legacy Interface (2016)',
  afterLabel = 'My Redesign (2025)',
}: InsuranceComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div className="w-full my-12 md:my-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md shadow-xl"
      >
        <div
          ref={containerRef}
          className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] cursor-col-resize select-none"
          onMouseMove={handleMouseMove}
          onMouseDown={() => setIsDragging(true)}
          onTouchMove={handleTouchMove}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* After Image (Background - Right Side - Always visible) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={afterImage}
              alt={afterLabel}
              fill
              className="object-cover"
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Before Image (Overlay - Left Side - Visible when slider is left, hidden when slider moves right) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${sliderPosition}% 0 0)` }}
          >
            <Image
              src={beforeImage}
              alt={beforeLabel}
              fill
              className="object-cover"
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Slider Line with Handle */}
          <motion.div
            className="absolute top-0 bottom-0 w-1 bg-white dark:bg-cyan-400 shadow-2xl z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
            animate={{
              boxShadow: isDragging
                ? '0 0 30px rgba(6, 182, 212, 0.8)'
                : '0 0 20px rgba(255, 255, 255, 0.5)',
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Handle Circle */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-cyan-400 rounded-full border-4 border-white dark:border-cyan-400 shadow-2xl flex items-center justify-center group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <GripVertical className="w-6 h-6 text-gray-900 dark:text-white" />
            </motion.div>
          </motion.div>

          {/* Before Label (Left Side) */}
          <motion.div
            className="absolute top-6 left-6 px-5 py-3 bg-black/70 dark:bg-black/80 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/20 shadow-lg z-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-sm md:text-base font-mono font-semibold text-white uppercase tracking-wider">
              {beforeLabel}
            </span>
          </motion.div>

          {/* After Label (Right Side) */}
          <motion.div
            className="absolute top-6 right-6 px-5 py-3 bg-black/70 dark:bg-black/80 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/20 shadow-lg z-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-sm md:text-base font-mono font-semibold text-white uppercase tracking-wider">
              {afterLabel}
            </span>
          </motion.div>

          {/* Instruction Text (Bottom Center) */}
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 dark:bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 dark:border-white/10 z-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-xs md:text-sm font-mono text-white/80 text-center">
              Drag to compare
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
