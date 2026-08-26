'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';
import { designFiles, DesignFile } from '@/lib/designFilesData';

function embedUrlFor(file: DesignFile) {
  return `https://embed.figma.com/design/${file.fileKey}/file?node-id=0-1&embed-host=share`;
}

function FileBlock({ file, index }: { file: DesignFile; index: number }) {
  // The embed is opt-in per file: the page never ships an iframe that would sit
  // empty for anyone the file isn't shared with.
  const [showEmbed, setShowEmbed] = useState(false);
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-gray-200 dark:border-white/10 pt-10 md:pt-14"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-7">
        <div className="min-w-0">
          <span className="block text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400 mb-3">
            {number} · {file.role}
          </span>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-gray-900 dark:text-white tracking-[-0.02em] leading-tight">
            {file.name}
          </h3>
          <p className="mt-2 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-white/40">
            {file.meta}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-cyan-500/60 dark:border-cyan-400/50 text-cyan-700 dark:text-cyan-300 font-mono text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-black transition-all duration-300 flex items-center gap-2"
          >
            Open in Figma
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7m0 0H9m8 0v8" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setShowEmbed((v) => !v)}
            className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-white/15 text-gray-700 dark:text-white/70 font-mono text-xs uppercase tracking-widest hover:border-gray-500 dark:hover:border-white/40 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
          >
            {showEmbed ? 'Hide live file' : 'Live file'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-6 mb-9">
        <div className="lg:col-span-2 space-y-4">
          <p className="text-base md:text-lg text-gray-700 dark:text-white/70 font-light leading-relaxed">
            {file.what}
          </p>
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-[0.25em] text-gray-400 dark:text-white/30 mb-2">
              Why it is built this way
            </span>
            <p className="text-sm md:text-base text-gray-600 dark:text-white/55 font-light leading-relaxed">
              {file.why}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-4 lg:border-l lg:border-gray-200 lg:dark:border-white/10 lg:pl-8 self-start">
          {file.system.map((token) => (
            <div key={token.label} className="min-w-0">
              <dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 dark:text-white/30">
                {token.label}
              </dt>
              <dd className="mt-1 text-sm font-mono text-gray-900 dark:text-white break-words">
                {token.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {showEmbed && (
        <div className="mb-9">
          <p className="mb-3 text-xs text-gray-500 dark:text-white/35 font-light">
            Figma renders this viewer only while the file is shared publicly. If the frame shows an
            error, use <span className="font-mono">Open in Figma</span> above.
          </p>
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-black/40">
            <iframe
              title={`${file.name} — live Figma file`}
              src={embedUrlFor(file)}
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}

      <div
        className={`grid gap-4 md:gap-5 ${
          file.frames.length === 1
            ? 'grid-cols-1'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {file.frames.map((frame, i) => (
          <figure
            key={frame.image}
            className="group border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-lg overflow-hidden transition-all duration-500 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]"
          >
            <div
              className="relative w-full overflow-hidden"
              style={{
                backgroundColor: file.frameBg,
                aspectRatio:
                  file.frames.length === 1 ? file.soloAspect ?? '16 / 10' : '16 / 10',
              }}
            >
              <ImageWithFallback
                src={frame.image}
                alt={`${file.name} — ${frame.title}`}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                sizes={
                  file.frames.length === 1
                    ? '(min-width: 1280px) 1150px, 92vw'
                    : '(min-width: 1280px) 380px, (min-width: 640px) 45vw, 90vw'
                }
                priority={index === 0 && i === 0}
              />
            </div>
            <figcaption className="p-5">
              <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 mb-2">
                {frame.title}
              </span>
              <p className="text-sm text-gray-600 dark:text-white/50 font-light leading-relaxed">
                {frame.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </motion.article>
  );
}

export default function DesignFilesSection() {
  const frameCount = designFiles.reduce((n, f) => n + f.frames.length, 0);

  return (
    <section
      id="design-files"
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
            Design files · Figma
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.9]">
            Straight From Figma
          </h2>
          <p className="text-center text-sm md:text-base text-gray-600 dark:text-white/50 mb-16 md:mb-20 max-w-3xl mx-auto font-light leading-relaxed">
            {designFiles.length} source files — {frameCount} artboards from product flows, brand
            systems and icon sets. Each one carries the reasoning behind its decisions, not just the
            result, and links to the file it came from.
          </p>

          <div className="space-y-16 md:space-y-24">
            {designFiles.map((file, index) => (
              <FileBlock key={file.fileKey} file={file} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
