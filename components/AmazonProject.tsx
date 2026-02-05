'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const tags = ['Visual Design', 'E-commerce', 'CRO'];

const banners = [
  { src: '/images/amazon_banner_v1.webp', alt: 'Amazon seasonal campaign banner v1' },
  { src: '/images/amazon_banner_v2.webp', alt: 'Amazon seasonal campaign banner v2' },
  { src: '/images/amazon_banner_v3.webp', alt: 'Amazon seasonal campaign banner v3' },
];

interface AmazonProjectProps {
  className?: string;
}

export default function AmazonProject({ className = '' }: AmazonProjectProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={`glass-card rounded-2xl border border-white/10 overflow-hidden p-5 sm:p-6 md:p-8 flex flex-col gap-6 ${className}`}
    >
      <div>
        <p className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-cyan-400/90 mb-3">
          Featured Experience
        </p>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
          Amazon – Seasonal Campaign Design
        </h3>
        <p className="mt-2 text-xs md:text-sm font-mono uppercase tracking-widest text-gray-600 dark:text-white/60">
          Visual Designer (Contract)
        </p>
        <p className="mt-4 text-sm md:text-base text-gray-700 dark:text-white/70 max-w-3xl">
          Designed high-conversion promotional assets for Amazon&apos;s Magazine category during Prime Day and Black Friday.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-4 py-2 rounded-full text-[11px] md:text-xs font-mono uppercase tracking-wider text-gray-800 dark:text-white/80 bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden group relative">
        <div className="relative h-52 sm:h-60 md:h-72 lg:h-[300px] w-full overflow-hidden">
          {banners.map((banner, index) => (
            <Image
              key={banner.src}
              src={banner.src}
              alt={banner.alt}
              fill
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              } [object-position:50%_100%]`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
