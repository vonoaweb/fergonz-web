'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const rafRef = useRef<number | null>(null);
  const pendingPosition = useRef<number | null>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    pendingPosition.current = percentage;

    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      if (pendingPosition.current !== null) {
        setSliderPosition(pendingPosition.current);
      }
      pendingPosition.current = null;
      rafRef.current = null;
    });
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateFromClientX(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1 && e.pointerType !== 'touch') return;
    updateFromClientX(e.clientX);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updateFromClientX(e.clientX);
  };

  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full my-12 md:my-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 shadow-xl"
      >
        <div
          ref={containerRef}
          className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] cursor-col-resize select-none touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onClick={handleClick}
        >
          {/* After Image — full background */}
          <div className="absolute inset-0">
            <Image
              src={afterImage}
              alt={afterLabel}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Before Image — clipped by container width */}
          <div
            className="absolute top-0 left-0 h-full overflow-hidden z-10"
            style={{ width: `${sliderPosition}%` }}
          >
            <div
              className="relative h-full"
              style={{ width: `${10000 / Math.max(sliderPosition, 1)}%` }}
            >
              <Image
                src={beforeImage}
                alt={beforeLabel}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>

          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-white z-20 pointer-events-none"
            style={{
              left: `${sliderPosition}%`,
              transform: 'translateX(-50%)',
              boxShadow: '0 0 12px rgba(0,0,0,0.4)',
            }}
          >
            {/* Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-300">
              <GripVertical className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          {/* Before Label */}
          <div className="absolute top-4 left-4 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg z-10 pointer-events-none">
            <span className="text-xs md:text-sm font-mono font-semibold text-white uppercase tracking-wider">
              {beforeLabel}
            </span>
          </div>

          {/* After Label */}
          <div className="absolute top-4 right-4 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg z-10 pointer-events-none">
            <span className="text-xs md:text-sm font-mono font-semibold text-white uppercase tracking-wider">
              {afterLabel}
            </span>
          </div>

          {/* Drag instruction */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-md z-10 pointer-events-none">
            <p className="text-xs font-mono text-white/80">
              ← Drag to compare →
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
