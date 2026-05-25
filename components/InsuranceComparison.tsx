'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="w-full my-12 md:my-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full bg-gray-100 dark:bg-white/10 p-1 border border-gray-200 dark:border-white/10">
            <button
              onClick={() => setShowAfter(false)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold font-mono uppercase tracking-wider transition-all duration-300 ${
                !showAfter
                  ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-md'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold font-mono uppercase tracking-wider transition-all duration-300 ${
                showAfter
                  ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-md'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              After
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 shadow-xl">
          <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
            <AnimatePresence mode="wait">
              {!showAfter ? (
                <motion.div
                  key="before"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={beforeImage}
                    alt={beforeLabel}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  />
                  {/* Label */}
                  <div className="absolute top-4 left-4 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg">
                    <span className="text-xs md:text-sm font-mono font-semibold text-white uppercase tracking-wider">
                      {beforeLabel}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="after"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={afterImage}
                    alt={afterLabel}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  />
                  {/* Label */}
                  <div className="absolute top-4 right-4 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg">
                    <span className="text-xs md:text-sm font-mono font-semibold text-white uppercase tracking-wider">
                      {afterLabel}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Click hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-md pointer-events-none">
            <p className="text-xs font-mono text-white/80">
              Toggle to compare
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
