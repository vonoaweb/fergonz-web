'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, User, Briefcase, Target, TrendingUp } from 'lucide-react';

interface Persona {
  name: string;
  age: number;
  role: string;
  goals: string[];
  painPoints: string[];
  quote: string;
  avatar?: string;
}

interface ResearchSectionProps {
  pdfUrl: string;
  personas?: Persona[];
}

// Datos de las personas basados en el PDF (ajusta según el contenido real)
const defaultPersonas: Persona[] = [
  {
    name: 'Pablo',
    age: 42,
    role: 'Business Owner',
    goals: [
      'Find comprehensive insurance coverage quickly',
      'Understand policy details without confusion',
      'Manage multiple policies in one place',
    ],
    painPoints: [
      'Complex forms and unclear terminology',
      'Time-consuming application process',
      'Lack of transparency in pricing',
    ],
    quote: 'I need insurance that I can actually understand and trust.',
  },
  {
    name: 'Jaime',
    age: 35,
    role: 'Tech Professional',
    goals: [
      'Compare different insurance options easily',
      'Get instant quotes online',
      'Access policy information on mobile',
    ],
    painPoints: [
      'Outdated website design',
      'Poor mobile experience',
      'Slow response times',
    ],
    quote: 'I expect a modern, digital-first experience when buying insurance.',
  },
];

export default function ResearchSection({ pdfUrl, personas = defaultPersonas }: ResearchSectionProps) {
  return (
    <section className="my-16 md:my-24 pt-12 md:pt-16 border-t border-gray-200 dark:border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-gray-900 dark:text-white tracking-tight flex items-center">
          <span className="w-3 h-3 rounded-full bg-cyan-500 mr-4"></span>
          Deep Dive & Research
        </h3>
        <p className="text-lg md:text-xl text-gray-600 dark:text-white/60 mb-12 font-sans font-light leading-relaxed max-w-3xl">
          Comprehensive user research and persona development to understand the needs and pain points of our target audience.
        </p>

        {/* Personas Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {personas.map((persona, index) => (
            <PersonaCard key={index} persona={persona} index={index} />
          ))}
        </div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              items-center
              gap-4
              px-8
              py-5
              border-2
              border-gray-300
              dark:border-white/20
              bg-transparent
              hover:bg-white/5
              dark:hover:bg-white/5
              hover:border-cyan-400/50
              dark:hover:border-cyan-400/50
              hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]
              transition-all
              duration-300
              rounded-lg
              backdrop-blur-sm
              cursor-pointer
            "
          >
            <Download className="w-5 h-5 text-gray-700 dark:text-white/70 group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors duration-300" />
            <span className="text-base md:text-lg font-mono font-semibold text-gray-900 dark:text-white uppercase tracking-wider group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors duration-300">
              Download Full UX Research Deck (PDF)
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PersonaCard({ persona, index }: { persona: Persona; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="
        border
        border-white/10
        dark:border-white/10
        bg-white/5
        dark:bg-white/5
        backdrop-blur-md
        hover:border-cyan-400/50
        dark:hover:border-cyan-400/50
        hover:bg-white/10
        dark:hover:bg-white/10
        hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]
        transition-all
        duration-500
        p-8
        rounded-2xl
        hover:scale-[1.02]
      "
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-2xl font-display font-bold text-white">
          {persona.name[0]}
        </div>
        <div className="flex-1">
          <h4 className="text-2xl md:text-3xl font-display font-semibold mb-1 text-gray-900 dark:text-white">
            {persona.name}
          </h4>
          <div className="flex items-center gap-2 text-sm font-mono text-gray-600 dark:text-white/50">
            <User className="w-4 h-4" />
            <span>{persona.age} years old</span>
            <span className="mx-2">•</span>
            <Briefcase className="w-4 h-4" />
            <span>{persona.role}</span>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="mb-6 pl-4 border-l-4 border-cyan-400/50 dark:border-cyan-400/50">
        <p className="text-base md:text-lg text-gray-700 dark:text-white/80 font-sans font-light italic">
          "{persona.quote}"
        </p>
      </div>

      {/* Goals */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-cyan-400" />
          <h5 className="text-sm font-mono font-semibold text-gray-700 dark:text-white/70 uppercase tracking-wider">
            Goals
          </h5>
        </div>
        <ul className="space-y-2">
          {persona.goals.map((goal, i) => (
            <li key={i} className="flex items-start gap-2 text-sm md:text-base text-gray-600 dark:text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></span>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pain Points */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h5 className="text-sm font-mono font-semibold text-gray-700 dark:text-white/70 uppercase tracking-wider">
            Pain Points
          </h5>
        </div>
        <ul className="space-y-2">
          {persona.painPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm md:text-base text-gray-600 dark:text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
