'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { certificationsData, type Certification } from '@/lib/certificationsData';
import { ExternalLink } from 'lucide-react';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative min-h-screen flex items-center justify-center bg-transparent dark:bg-transparent backdrop-blur-sm py-32 md:py-40 z-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-6xl mx-auto"
        >
          <h2 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-display font-bold mb-8 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.9]">
            Certifications
          </h2>
          <p className="text-center text-base md:text-lg text-gray-600 dark:text-white/50 mb-24 md:mb-32 max-w-3xl mx-auto font-mono uppercase tracking-widest">
            Professional credentials & continuous learning
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {certificationsData.map((cert, index) => (
              <CertificationCard key={index} certification={cert} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CertificationCard({ certification, index }: { certification: Certification; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md hover:border-cyan-400/50 dark:hover:border-cyan-400/50 hover:bg-white/10 dark:hover:bg-white/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500 p-8 hover:scale-[1.02] group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2 text-gray-900 dark:text-white tracking-tight">
            {certification.title}
          </h3>
          <p className="text-lg font-sans font-medium text-gray-700 dark:text-white/80 mb-1">
            {certification.issuer}
          </p>
          <p className="text-sm font-mono text-gray-600 dark:text-white/50 uppercase tracking-wider">
            {certification.date}
          </p>
        </div>
        {certification.link && (
          <motion.a
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 p-2 text-gray-600 dark:text-white/40 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors duration-300"
            aria-label="View certification"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        )}
      </div>
      
      {certification.type && (
        <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/10">
          <span className="text-xs font-mono text-gray-500 dark:text-white/40 uppercase tracking-widest">
            {certification.type}
          </span>
        </div>
      )}
      
      {certification.credentialId && (
        <div className="mt-3">
          <span className="text-xs font-mono text-gray-500 dark:text-white/40">
            ID: {certification.credentialId}
          </span>
        </div>
      )}
    </motion.div>
  );
}
