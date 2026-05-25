'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <div className="w-full my-12 md:my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 shadow-md"
        >
          <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800/30">
            <span className="text-xs md:text-sm font-mono font-semibold text-red-700 dark:text-red-400 uppercase tracking-wider">
              {beforeLabel}
            </span>
          </div>
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={beforeImage}
              alt={beforeLabel}
              fill
              className="object-contain bg-white dark:bg-gray-900"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 shadow-md"
        >
          <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800/30">
            <span className="text-xs md:text-sm font-mono font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider">
              {afterLabel}
            </span>
          </div>
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={afterImage}
              alt={afterLabel}
              fill
              className="object-contain bg-white dark:bg-gray-900"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
