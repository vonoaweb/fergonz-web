'use client';

import { motion } from 'framer-motion';
import { experienceData } from '@/lib/experienceData';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative bg-transparent dark:bg-transparent py-24 md:py-32 z-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.9]">
            Experience
          </h2>
          <p className="text-center text-gray-500 dark:text-white/50 font-mono text-sm uppercase tracking-widest mb-16 md:mb-20">
            10+ years in UX/UI Design
          </p>

          <div className="max-w-3xl mx-auto">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative pl-8 pb-10 last:pb-0 border-l-2 border-gray-200 dark:border-white/10 last:border-transparent group"
              >
                {/* Timeline dot */}
                <div className={`absolute left-[-7px] top-1 w-3 h-3 rounded-full ${
                  exp.current
                    ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                    : 'bg-gray-300 dark:bg-white/20 group-hover:bg-cyan-400 transition-colors duration-300'
                }`} />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-semibold text-gray-900 dark:text-white">
                      {exp.company}
                    </h3>
                    <p className="text-sm md:text-base font-mono text-cyan-600 dark:text-cyan-400">
                      {exp.role}
                    </p>
                  </div>
                  <span className="text-xs md:text-sm font-mono text-gray-400 dark:text-white/40 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-sm md:text-base text-gray-500 dark:text-white/50 font-light leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
