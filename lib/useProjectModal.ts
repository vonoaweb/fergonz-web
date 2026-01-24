'use client';

import { useState, useCallback } from 'react';
import { Project } from './projectsData';

export function useProjectModal() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
    // Small delay to allow fade-out animation
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  }, []);

  return {
    selectedProject,
    isOpen,
    openModal,
    closeModal,
  };
}
