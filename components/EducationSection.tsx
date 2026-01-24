'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { educationData, type Education } from '@/lib/educationData';
import { GraduationCap } from 'lucide-react';

export default function EducationSection() {
  return (
    <section id="education" className="relative min-h-screen flex items-center justify-center bg-transparent dark:bg-transparent backdrop-blur-sm py-32 md:py-40 z-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-6xl mx-auto"
        >
          <h2 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-display font-bold mb-8 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.9]">
            Education
          </h2>
          <p className="text-center text-base md:text-lg text-gray-600 dark:text-white/50 mb-24 md:mb-32 max-w-3xl mx-auto font-mono uppercase tracking-widest">
            Academic background & professional development
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {educationData.map((edu, index) => (
              <EducationCard key={index} education={edu} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EducationCard({ education, index }: { education: Education; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md hover:border-cyan-400/50 dark:hover:border-cyan-400/50 hover:bg-white/10 dark:hover:bg-white/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500 p-8 hover:scale-[1.02] group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white/10 dark:bg-white/10 rounded-lg group-hover:bg-cyan-400/20 dark:group-hover:bg-cyan-400/20 transition-colors duration-300">
          <GraduationCap className="w-6 h-6 text-gray-700 dark:text-white/80" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2 text-gray-900 dark:text-white tracking-tight">
            {education.title}
          </h3>
          <p className="text-lg font-sans font-medium text-gray-700 dark:text-white/80 mb-1">
            {education.institution}
          </p>
          <p className="text-sm font-mono text-gray-600 dark:text-white/50 uppercase tracking-wider">
            {education.year}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
