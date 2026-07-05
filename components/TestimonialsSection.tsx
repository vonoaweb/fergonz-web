'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  logo?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Fernando demonstrated leadership, honesty, responsibility, skill and desire to excel; therefore, I have no objection to extend this recommendation for the employment purposes that may be convenient for the interested party.',
    name: 'Yonatan',
    role: 'DEV Consultores',
    logo: '/images/client-devconsultores.png',
  },
  {
    quote:
      'Fernando González Orozco is a trustworthy, enterprising and hard-working person, always showing an excellent attitude, both at work and in his personal life.',
    name: 'Israel',
    role: 'Panther',
    logo: '/images/client-panther.png',
  },
  {
    quote:
      'During this cycle he performed in a responsible and committed manner in the assigned tasks.',
    name: 'Norma Isabel Villanueva Paredes',
    role: 'Mobile Lab ITESO · Microsoft',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative bg-transparent dark:bg-transparent backdrop-blur-sm py-24 md:py-32 z-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl mx-auto"
        >
          <p className="text-center text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400 mb-6">
            References
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-16 md:mb-24 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.95]">
            What people I&apos;ve worked with say
          </h2>

          <div className="grid lg:grid-cols-3 gap-6 max-w-2xl lg:max-w-none mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.figure
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 md:p-10 hover:border-cyan-400/50 dark:hover:border-cyan-400/50 hover:shadow-[0_0_24px_rgba(6,182,212,0.15)] transition-all duration-500"
              >
                <span aria-hidden="true" className="text-6xl font-display font-bold leading-none text-gradient mb-6 select-none">
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-base md:text-lg text-gray-700 dark:text-white/70 font-sans font-light leading-relaxed">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-gray-900 dark:text-white font-display font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-white/40 mt-1">
                      {testimonial.role}
                    </p>
                  </div>
                  {testimonial.logo && (
                    <div className="relative w-16 h-8 shrink-0 grayscale opacity-60">
                      <Image
                        src={testimonial.logo}
                        alt={testimonial.role}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                  )}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
