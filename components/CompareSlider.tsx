'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CompareSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function CompareSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: CompareSliderProps) {
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
      <div
        ref={containerRef}
        className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md cursor-col-resize select-none"
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Before Image (Background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            className="object-cover"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* After Image (Clipped) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            className="object-cover"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white dark:bg-cyan-400 shadow-lg z-10 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-cyan-400 rounded-full border-4 border-white dark:border-cyan-400 shadow-xl flex items-center justify-center">
            <div className="flex gap-1">
              <ChevronLeft className="w-4 h-4 text-gray-900 dark:text-white" />
              <ChevronRight className="w-4 h-4 text-gray-900 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-4 py-2 bg-black/60 dark:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20">
          <span className="text-sm font-mono font-semibold text-white uppercase tracking-wider">
            {beforeLabel}
          </span>
        </div>
        <div className="absolute top-4 right-4 px-4 py-2 bg-black/60 dark:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20">
          <span className="text-sm font-mono font-semibold text-white uppercase tracking-wider">
            {afterLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
