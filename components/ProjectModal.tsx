'use client';

import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import ImageWithFallback from './ImageWithFallback';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/projectsData';
import GlassCard from './GlassCard';
import CompareSlider from './CompareSlider';
import InsuranceComparison from './InsuranceComparison';
import ResearchSection from './ResearchSection';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = React.useState(false);
  const [lightboxImage, setLightboxImage] = React.useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [preloadedImages, setPreloadedImages] = React.useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Preload images when modal opens
  useEffect(() => {
    if (!isOpen || !project) return;

    const imagesToPreload = project.images || [project.image];
    const preloadPromises = imagesToPreload.map((src) => {
      return new Promise<void>((resolve) => {
        if (preloadedImages.has(src)) {
          resolve();
          return;
        }
        const img = new Image();
        img.onload = () => {
          setPreloadedImages((prev) => new Set(prev).add(src));
          resolve();
        };
        img.onerror = () => resolve();
        img.src = src;
      });
    });

    Promise.all(preloadPromises);
  }, [isOpen, project, preloadedImages]);

  const openLightbox = useCallback((image: string, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  const nextImage = useCallback(() => {
    if (!project?.images) return;
    setLightboxIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % project.images!.length;
      setLightboxImage(project.images![nextIndex]);
      return nextIndex;
    });
  }, [project?.images]);

  const prevImage = useCallback(() => {
    if (!project?.images) return;
    setLightboxIndex((prevIndex) => {
      const prevIndexCalc = (prevIndex - 1 + project.images!.length) % project.images!.length;
      setLightboxImage(project.images![prevIndexCalc]);
      return prevIndexCalc;
    });
  }, [project?.images]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          closeLightbox();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, lightboxImage]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxImage || !project?.images) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, project?.images, nextImage, prevImage]);

  if (!mounted || !project || !isOpen) return null;

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="
                w-full max-w-5xl
                max-h-[90vh]
                overflow-y-auto
                pointer-events-auto
                backdrop-blur-xl
                bg-white/95 dark:bg-black/95
                border border-gray-300 dark:border-white/20
                shadow-2xl
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                  className="
                  absolute top-6 right-6
                  w-10 h-10
                  backdrop-blur-sm
                  bg-gray-200/80 dark:bg-white/10
                  border border-gray-300 dark:border-white/20
                  flex items-center justify-center
                  transition-all duration-300
                  hover:bg-gray-300/80 dark:hover:bg-white/20 hover:border-gray-400 dark:hover:border-white/40
                  z-10
                "
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5 text-gray-900 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
                {/* Single Image (if no gallery) */}
                {(!project.images || project.images.length === 0) && (
                  <div className="relative w-full h-64 md:h-80 lg:h-96 mb-16 md:mb-20 overflow-hidden rounded-2xl">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </div>
                )}

                {/* Title & Role */}
                <div className="mb-12 sm:mb-16 md:mb-20">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-5 md:mb-8 text-gray-900 dark:text-white tracking-tight leading-[0.95]">
                    {project.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-600 dark:text-white/50 font-mono uppercase tracking-widest">
                    {project.role}
                  </p>
                </div>

                {/* Problem */}
                <div className="mb-12 sm:mb-16 md:mb-20">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-6 md:mb-10 text-gray-900 dark:text-white tracking-tight flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-4"></span>
                    The Challenge
                  </h3>
                  <div className="border-l-4 border-red-500/40 pl-6 md:pl-10">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-white/70 leading-relaxed font-light">
                      {project.problem}
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div className="mb-12 sm:mb-16 md:mb-20">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-6 md:mb-10 text-gray-900 dark:text-white tracking-tight flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-4"></span>
                    The Solution
                  </h3>
                  <div className="border-l-4 border-blue-500/40 pl-6 md:pl-10">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-white/70 leading-relaxed font-light">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Insurance Comparison - Only for Insurance Transformation */}
                {project.title.toLowerCase().includes('insurance') && (
                  <div className="mb-16 md:mb-20 w-full">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-8 md:mb-10 text-gray-900 dark:text-white tracking-tight flex items-center">
                      <span className="w-2 h-2 rounded-full bg-purple-500 mr-4"></span>
                      Before & After Comparison
                    </h3>
                    <InsuranceComparison
                      beforeImage="/images/pantalla_5.webp"
                      afterImage="/images/pantalla_6.webp"
                      beforeLabel="Legacy Interface (2016)"
                      afterLabel="My Redesign (2025)"
                    />
                  </div>
                )}

                {/* Research Section - Only for Insurance Transformation */}
                {project.title.toLowerCase().includes('insurance') && (
                  <ResearchSection
                    pdfUrl="/images/seguros_v2.pdf"
                  />
                )}

                {/* Results */}
                {project.results && (
                  <div className="mb-10 sm:mb-12 md:mb-16">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-6 md:mb-10 text-gray-900 dark:text-white tracking-tight flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-4"></span>
                      Results
                    </h3>
                    <div className="border-l-4 border-green-500/40 pl-6 md:pl-10">
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 dark:text-white/80 leading-relaxed font-light">
                        {project.results}
                      </p>
                    </div>
                  </div>
                )}

                {/* Image Gallery - At the bottom */}
                {project.images && project.images.length > 0 && (
                  <div className="mt-12 sm:mt-16 md:mt-20 pt-10 md:pt-16 border-t border-gray-200 dark:border-white/10">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-6 md:mb-10 text-gray-900 dark:text-white tracking-tight flex items-center">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 mr-4"></span>
                      Project Gallery
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {project.images.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl cursor-pointer group"
                          onClick={() => openLightbox(img, index)}
                        >
                          <ImageWithFallback
                            src={img}
                            alt={`${project.title} - Image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                                />
                              </svg>
                              <p className="text-white text-sm font-mono mt-2 uppercase tracking-wider">
                                Click to enlarge
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confidentiality Note for PayPal/NDA Projects */}
                {project.title.toLowerCase().includes('paypal') && (
                  <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-gray-200 dark:border-white/10">
                    <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6 text-amber-600 dark:text-amber-400 mr-3 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        <div>
                          <h4 className="text-sm md:text-base font-mono font-semibold text-amber-900 dark:text-amber-200 uppercase tracking-wider mb-2">
                            Confidentiality Note
                          </h4>
                          <p className="text-sm md:text-base text-amber-800 dark:text-amber-300 leading-relaxed font-light">
                            Due to Non-Disclosure Agreements (NDA) and intellectual property protections, I cannot share internal wireframes, source files, or proprietary process documentation. This portfolio entry showcases the final, publicly deployed solution.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Link to Project (if available) */}
                {project.link && project.link !== '#' && (
                  <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-gray-200 dark:border-white/10">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center
                        px-10 py-5 md:px-12 md:py-6
                        bg-gray-900 dark:bg-white
                        text-white dark:text-black
                        font-mono
                        text-sm md:text-base
                        uppercase
                        tracking-widest
                        transition-all duration-300
                        hover:bg-gray-800 dark:hover:bg-white/90
                        hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]
                      "
                    >
                      View Full Project
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 ml-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Lightbox for full-size images - Full Screen */}
          <AnimatePresence>
            {lightboxImage && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black z-[200]"
                  onClick={closeLightbox}
                />
                <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close button */}
                    <button
                      onClick={closeLightbox}
                      className="absolute top-6 right-6 z-20 w-14 h-14 bg-black/50 dark:bg-black/70 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 dark:hover:bg-black/90 transition-all duration-300 shadow-lg"
                      aria-label="Close lightbox"
                    >
                      <svg
                        className="w-7 h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    {/* Navigation buttons */}
                    {project.images && project.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-black/50 dark:bg-black/70 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 dark:hover:bg-black/90 transition-all duration-300 shadow-lg"
                          aria-label="Previous image"
                        >
                          <svg
                            className="w-7 h-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-black/50 dark:bg-black/70 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 dark:hover:bg-black/90 transition-all duration-300 shadow-lg"
                          aria-label="Next image"
                        >
                          <svg
                            className="w-7 h-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Image counter */}
                    {project.images && project.images.length > 1 && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-5 py-3 bg-black/50 dark:bg-black/70 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
                        <p className="text-white text-sm font-mono font-semibold">
                          {lightboxIndex + 1} / {project.images.length}
                        </p>
                      </div>
                    )}

                    {/* Full screen image container */}
                    <div className="relative w-screen h-full flex items-start justify-center overflow-y-auto overflow-x-hidden">
                      <div className="w-screen min-h-full flex items-start justify-center">
                        <ImageWithFallback
                          src={lightboxImage}
                          alt={`${project.title} - Image ${lightboxIndex + 1}`}
                          width={1920}
                          height={1080}
                          className="w-screen h-auto object-contain"
                          priority
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
