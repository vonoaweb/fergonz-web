'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Research & Discovery',
    description: 'Understanding users, business goals, and market context through interviews, surveys, and competitive analysis.',
  },
  {
    number: '02',
    title: 'Ideation & Strategy',
    description: 'Creating user personas, journey maps, and defining the information architecture and design strategy.',
  },
  {
    number: '03',
    title: 'Wireframing & Prototyping',
    description: 'Low and high-fidelity wireframes, interactive prototypes, and testing concepts with real users.',
  },
  {
    number: '04',
    title: 'Visual Design',
    description: 'Crafting beautiful interfaces with attention to typography, color, spacing, and visual hierarchy.',
  },
  {
    number: '05',
    title: 'Testing & Iteration',
    description: 'Usability testing, gathering feedback, and iterating based on real user data and insights.',
  },
  {
    number: '06',
    title: 'Handoff & Launch',
    description: 'Collaborating with developers, creating design systems, and ensuring pixel-perfect implementation.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative bg-transparent dark:bg-transparent py-24 md:py-32 z-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.9]">
            Process
          </h2>
          <p className="text-center text-gray-500 dark:text-white/50 font-mono text-sm uppercase tracking-widest mb-16 md:mb-20">
            How I approach every project
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 hover:border-cyan-400/40 dark:hover:border-cyan-400/30 hover:bg-white dark:hover:bg-white/10 transition-all duration-500"
              >
                <span className="text-4xl md:text-5xl font-display font-bold text-cyan-500/20 dark:text-cyan-400/15 group-hover:text-cyan-500/40 dark:group-hover:text-cyan-400/30 transition-colors duration-500">
                  {step.number}
                </span>
                <h3 className="text-lg md:text-xl font-display font-semibold text-gray-900 dark:text-white mt-3 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 dark:text-white/50 font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
