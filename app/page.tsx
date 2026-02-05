'use client';

import React from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import BentoGrid from '@/components/BentoGrid';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import GlassSphere from '@/components/GlassSphere';
import LiquidEtherBackground from '@/components/LiquidEtherBackground';
import BlurText from '@/components/BlurText';
import { useProjectModal } from '@/lib/useProjectModal';
import { projects } from '@/lib/projectsData';
import CertificationsSection from '@/components/CertificationsSection';
import EducationSection from '@/components/EducationSection';
import AmazonProject from '@/components/AmazonProject';

// TODO: Reemplazar con tu foto real
const heroImage = '/images/hero.webp'; // Coloca tu foto en public/images/hero.webp

const services = [
  {
    title: 'Product Design',
    description: 'End-to-end product design from research to implementation',
    icon: '🎨',
  },
  {
    title: 'UI/UX Design',
    description: 'Creating intuitive and beautiful user interfaces',
    icon: '✨',
  },
  {
    title: 'Frontend Development',
    description: 'Building responsive and performant web applications',
    icon: '💻',
  },
  {
    title: 'Design Systems',
    description: 'Creating scalable design systems and component libraries',
    icon: '🔧',
  },
];

export default function Home() {
  const { selectedProject, isOpen, openModal, closeModal } = useProjectModal();

  return (
    <main className="min-h-screen relative">
      {/* Liquid Ether Background */}
      <LiquidEtherBackground
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        mouseForce={14}
        cursorSize={90}
        isViscous={false}
        viscous={24}
        iterationsViscous={16}
        iterationsPoisson={16}
        resolution={0.35}
        isBounce={false}
        autoDemo={false}
        autoSpeed={0.35}
        autoIntensity={1.6}
        takeoverDuration={0.25}
        autoResumeDelay={4000}
        autoRampDuration={0.6}
      />
      
      {/* Glass Sphere Background */}
      <GlassSphere />
      
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isOpen}
        onClose={closeModal}
      />
      {/* Hero Section - High-Tech Style */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent dark:bg-transparent">

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {/* Large Title */}
              <div className="mb-16 md:mb-20 text-center flex justify-center items-center">
                <h1 className="text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-display font-bold text-gray-900 dark:text-white tracking-[-0.03em] leading-[0.9] glow-effect">
                  FerGonz
                </h1>
              </div>
              
              {/* Subtitle - 2026 Trend: Bold and Expressive */}
              <BlurText
                text="Digital Product Designer & Developer"
                delay={50}
                animateBy="words"
                direction="top"
                className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-16 md:mb-20 text-gray-800 dark:text-white/90 tracking-[-0.01em] leading-tight max-w-4xl mx-auto"
              />
              
              {/* Description - 2026 Trend: Generous Spacing */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-white/60 mb-20 md:mb-24 max-w-3xl mx-auto font-sans font-light leading-relaxed">
                Creating beautiful, user-centered digital experiences that drive results
              </p>
              
              {/* CTA Button */}
              <motion.a
                href="#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-12 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-mono text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-white/90 transition-all duration-300 border border-white/10 dark:border-white/20 hover:border-cyan-400/50 dark:hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                View My Work
              </motion.a>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border border-gray-400 dark:border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-3 bg-gray-600 dark:bg-white/50 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - 2026 Trend: Extra Large Typography */}
      <section id="about" className="relative min-h-screen flex items-center justify-center bg-transparent dark:bg-transparent backdrop-blur-sm py-32 md:py-40 z-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-display font-bold mb-20 md:mb-24 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.9]">
                About Me
              </h2>
              
              <div className="space-y-10 md:space-y-12 text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-white/70 font-sans font-light leading-relaxed text-center max-w-4xl mx-auto">
                <p>
                  I'm a Digital Product Designer & Developer passionate about creating
                  experiences that users love and businesses need. With expertise in both
                  design and development, I bring ideas to life from concept to code.
                </p>
                <p>
                  My approach combines user research, strategic thinking, and technical
                  execution to deliver products that are not only beautiful but also
                  functional and scalable.
                </p>
              </div>

              {/* Skills - 2026 Trend: Generous Spacing */}
              <div className="mt-24 md:mt-32 flex flex-wrap gap-4 md:gap-6 justify-center">
                {[
                  'Product Design',
                  'UI/UX Design',
                  'Frontend Development',
                  'React',
                  'Next.js',
                  'TypeScript',
                  'Figma',
                  'Design Systems',
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="px-8 py-4 border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md hover:border-cyan-400/50 dark:hover:border-cyan-400/50 hover:bg-white/10 dark:hover:bg-white/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300"
                  >
                    <span className="text-base font-mono font-medium text-gray-800 dark:text-white/90 uppercase tracking-wider">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Section - 2026 Trend: Bold Headlines */}
      <section id="work" className="relative min-h-screen flex items-center justify-center bg-transparent dark:bg-transparent backdrop-blur-sm py-32 md:py-40 z-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <h2 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-display font-bold mb-8 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.9]">
              Selected Work
            </h2>
            <p className="text-center text-base md:text-lg text-gray-600 dark:text-white/50 mb-24 md:mb-32 max-w-3xl mx-auto font-mono uppercase tracking-widest">
              Click any project to view the full case study
            </p>
            <BentoGrid>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={openModal}
                />
              ))}
              <AmazonProject className="md:col-span-2 lg:col-span-3" />
            </BentoGrid>
          </motion.div>
        </div>
      </section>

      {/* Services Section - 2026 Trend: Expressive Typography */}
      <section id="services" className="relative min-h-screen flex items-center justify-center bg-transparent dark:bg-transparent backdrop-blur-sm py-32 md:py-40 z-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <h2 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-display font-bold mb-24 md:mb-32 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.9]">
              Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md hover:border-cyan-400/50 dark:hover:border-cyan-400/50 hover:bg-white/10 dark:hover:bg-white/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500 p-8 hover:scale-[1.02]"
                >
                  <div className="text-5xl md:text-6xl mb-8">{service.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold mb-6 text-gray-900 dark:text-white tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 dark:text-white/60 font-sans font-light leading-relaxed text-base md:text-lg">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Education Section */}
      <EducationSection />

      {/* Contact Section - 2026 Trend: Large Headlines */}
      <section id="contact" className="relative min-h-screen flex items-center justify-center bg-transparent dark:bg-transparent backdrop-blur-sm py-32 md:py-40 z-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto w-full"
          >
            <h2 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-display font-bold mb-20 md:mb-24 text-gray-900 dark:text-white tracking-[-0.03em] text-center leading-[0.9]">
              Let's Work Together
            </h2>
            <div className="border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md p-8 md:p-12">
              <form
                className="space-y-8"
                action="https://formspree.io/f/xeeljrpo"
                method="POST"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-widest mb-3 text-gray-600 dark:text-white/60"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-4 bg-white/80 dark:bg-white/5 border border-white/10 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/30 focus:outline-none focus:border-cyan-400/50 dark:focus:border-cyan-400/50 focus:bg-white/90 dark:focus:bg-white/10 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 font-light"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-widest mb-3 text-gray-600 dark:text-white/60"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-4 bg-white/80 dark:bg-white/5 border border-white/10 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/30 focus:outline-none focus:border-cyan-400/50 dark:focus:border-cyan-400/50 focus:bg-white/90 dark:focus:bg-white/10 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 font-light"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-widest mb-3 text-gray-600 dark:text-white/60"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-4 bg-white/80 dark:bg-white/5 border border-white/10 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/30 focus:outline-none focus:border-cyan-400/50 dark:focus:border-cyan-400/50 focus:bg-white/90 dark:focus:bg-white/10 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] resize-none transition-all duration-300 font-light"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-mono text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-white/90 hover:border-cyan-400/50 dark:hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-white/10 dark:border-white/20 transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-gray-300 dark:border-white/10">
                <div className="flex justify-center space-x-8">
                  {/* TODO: Reemplazar con tus redes sociales reales */}
                  <a
                    href="https://www.linkedin.com/in/fergonz/"
                    className="text-gray-600 dark:text-white/40 hover:text-cyan-400 dark:hover:text-cyan-400 text-xs font-mono uppercase tracking-widest transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - High-Tech Style */}
      <footer className="py-12 border-t border-white/10 dark:border-white/10 bg-transparent dark:bg-transparent backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <p className="text-center text-gray-600 dark:text-white/30 text-xs font-mono uppercase tracking-widest">
            © 2026 Ferguson González. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
