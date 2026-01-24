'use client';

import React, { useState, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#work', label: 'Work' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-40
        transition-all duration-500
        ${scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-black/50 border-b border-gray-300 dark:border-white/10' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-20 md:h-24">
          <a
            href="#home"
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white hover:text-cyan-400 transition-colors duration-300 tracking-tight"
          >
            FG<span className="text-cyan-400">.</span>
          </a>

          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white font-mono text-sm uppercase tracking-widest transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
