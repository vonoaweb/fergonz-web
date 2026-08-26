'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
}

const stats: Stat[] = [
  {
    value: 3.8,
    decimals: 1,
    suffix: '%',
    label: 'E-commerce conversion',
    context: 'Up from 1.2% after the Urrea Online redesign',
  },
  {
    value: 120,
    prefix: '+',
    suffix: '%',
    label: 'Mobile sales',
    context: 'After a mobile-first rebuild of the store experience',
  },
  {
    value: 10,
    suffix: 'K+',
    label: 'SKUs unified',
    context: 'One storefront for three tool brands',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Years shipping',
    context: 'Products for Amazon, PayPal & Grupo Urrea',
  },
];

function formatStat(stat: Stat, value: number) {
  return `${stat.prefix ?? ''}${value.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ''}`;
}

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // The server renders the real figure, so crawlers, link previews and anyone
  // without JS read "3.8%" rather than "0.0%". Only once JS is running — and
  // only if the visitor accepts motion — do we reset to zero to count up.
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ref.current.textContent = formatStat(stat, 0);
  }, [stat]);

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const node = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const controls = animate(0, stat.value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = formatStat(stat, v);
      },
    });
    // However the animation ends — completed or interrupted — the cell must be
    // left showing the real number, never a rounding artefact.
    return () => {
      controls.stop();
      node.textContent = formatStat(stat, stat.value);
    };
  }, [isInView, stat]);

  return <span ref={ref}>{formatStat(stat, stat.value)}</span>;
}

export default function ImpactSection() {
  return (
    <section id="impact" className="relative bg-transparent dark:bg-transparent backdrop-blur-sm py-24 md:py-32 z-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl mx-auto"
        >
          <p className="text-center text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400 mb-6">
            Proof, not promises
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-16 md:mb-24 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.95]">
            Design that moves numbers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-white/10 border border-gray-200 dark:border-white/10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/90 dark:bg-black/60 backdrop-blur-md p-6 xl:p-8 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-500"
              >
                <span className="block text-4xl md:text-5xl xl:text-6xl leading-none font-display font-bold tracking-[-0.03em] text-gradient tabular-nums whitespace-nowrap">
                  <CountUp stat={stat} />
                </span>
                <span className="mt-4 text-sm md:text-base font-mono uppercase tracking-widest text-gray-900 dark:text-white">
                  {stat.label}
                </span>
                <span className="mt-2 text-sm text-gray-500 dark:text-white/40 font-sans font-light leading-relaxed">
                  {stat.context}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
