'use client';

import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div
      className={`
        grid
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        gap-4 md:gap-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}
