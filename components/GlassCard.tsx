import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`
        backdrop-blur-lg
        bg-white/10 dark:bg-white/5
        border border-white/20 dark:border-white/10
        rounded-3xl
        p-6 md:p-8
        shadow-lg shadow-primary/5 dark:shadow-primary/10
        transition-all duration-300
        ${hover ? 'hover:scale-105 hover:shadow-xl hover:shadow-primary/20' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
