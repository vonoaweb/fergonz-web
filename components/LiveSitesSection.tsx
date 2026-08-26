'use client';

import { motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';
import { sites, Site } from '@/lib/sitesData';

function SiteCard({ site, index }: { site: Site; index: number }) {
  return (
    <motion.a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-lg overflow-hidden shadow-sm dark:shadow-none transition-all duration-500 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:bg-white dark:hover:bg-white/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-white/5">
        <ImageWithFallback
          src={site.image}
          alt={`${site.name} website`}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 90vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-mono uppercase tracking-widest flex items-center gap-2">
            Visit site
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7m0 0H9m8 0v8" />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-5">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 mb-2">
          {site.category}
        </span>
        <h3 className="text-lg md:text-xl font-display font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
          {site.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-white/50 font-light leading-relaxed mb-4">
          {site.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {site.stack.map((item) => (
            <span
              key={item}
              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/50 border border-gray-200/80 dark:border-white/10"
            >
              {item}
            </span>
          ))}
        </div>
        <span className="mt-4 text-[11px] font-mono lowercase tracking-wide text-gray-400 dark:text-white/30 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors truncate">
          {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </span>
      </div>
    </motion.a>
  );
}

export default function LiveSitesSection() {
  return (
    <section
      id="sites"
      className="relative flex items-center justify-center bg-transparent dark:bg-transparent backdrop-blur-sm py-24 md:py-32 z-10"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <p className="text-center text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400 mb-6">
            VonoaWeb · my studio
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.9]">
            Sites Running Live
          </h2>
          <p className="text-center text-sm md:text-base text-gray-600 dark:text-white/50 mb-16 md:mb-20 max-w-3xl mx-auto font-light leading-relaxed">
            Beyond the case studies, I design and ship production websites for small and
            medium businesses across Mexico, the US and Canada — from architecture studios and
            logistics hubs to e-commerce brands. I run this practice as{' '}
            <a
              href="https://vonoaweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white border-b border-cyan-500/50 dark:border-cyan-400/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              VonoaWeb
            </a>
            . Every card below opens the real, live site.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {sites.map((site, index) => (
              <SiteCard key={site.url} site={site} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
