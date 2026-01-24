'use client';

import React from 'react';
import ImageWithFallback from './ImageWithFallback';
import { motion } from 'framer-motion';
import { Project } from '@/lib/projectsData';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  className?: string;
}

const sizeClasses = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 md:col-span-2 row-span-1',
  large: 'col-span-1 md:col-span-2 row-span-2',
  xlarge: 'col-span-1 md:col-span-3 row-span-2',
};

export default function ProjectCard({
  project,
  onClick,
  className = '',
}: ProjectCardProps) {
  const isDemo = project.isDemo;

  const handleClick = () => {
    if (isDemo) return;
    onClick(project);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={sizeClasses[project.size]}
    >
      <motion.div
        whileHover={isDemo ? undefined : { scale: 1.05 }}
        whileTap={isDemo ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={`h-full flex flex-col group relative border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md transition-all duration-500 p-5 sm:p-6 ${isDemo ? 'cursor-default' : 'cursor-pointer hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:bg-white/10 dark:hover:bg-white/10 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]'} ${className}`}
          onClick={handleClick}
        >
          <div className="relative w-full h-48 sm:h-56 md:h-64 mb-5 sm:mb-6 overflow-hidden">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover transition-transform duration-300 ${isDemo ? '' : 'group-hover:scale-110 group-hover:blur-sm'}`}
              priority={project.size === 'xlarge'}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent ${isDemo ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 flex items-end p-4`}>
              <span className="text-white text-sm sm:text-base font-semibold">
                {isDemo ? 'Concept demo • Coming soon' : 'Click to view →'}
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl md:text-2xl font-light mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-white/50 mb-4 font-light">{project.role}</p>
            <div className={`text-gray-700 dark:text-white/60 font-mono text-xs uppercase tracking-widest mt-auto flex items-center ${isDemo ? '' : 'group-hover:text-cyan-400'} transition-colors`}>
              {isDemo ? 'Case study in progress' : 'View case study'}
              {!isDemo && (
                <svg
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
