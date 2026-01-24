'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  priority = false,
  sizes,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Verificar si la imagen probablemente no existe
  const isPlaceholder = !src || 
    src === '/images/hero.webp' || 
    (src.startsWith('/images/') && hasError);

  // Detectar si es un proyecto de PayPal para un placeholder especial
  const isPayPalProject = alt.toLowerCase().includes('paypal');
  
  // Detectar tipo de proyecto por título
  const projectType = alt.toLowerCase();
  const isDelivery = projectType.includes('delivery');
  const isEcommerce = projectType.includes('e-commerce') || projectType.includes('ecommerce');
  const isSaaS = projectType.includes('saas') || projectType.includes('dashboard');
  const isBanking = projectType.includes('banking') || projectType.includes('bank');
  const isBrand = projectType.includes('brand') || projectType.includes('identity');
  const isHealthcare = projectType.includes('healthcare') || projectType.includes('health');

  // Determinar gradiente según tipo de proyecto
  const getGradient = () => {
    if (isPayPalProject) {
      return 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-700 dark:via-blue-600 dark:to-blue-800';
    }
    if (isDelivery) {
      return 'bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 dark:from-orange-700 dark:via-orange-600 dark:to-red-700';
    }
    if (isEcommerce) {
      return 'bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 dark:from-purple-700 dark:via-purple-600 dark:to-pink-700';
    }
    if (isSaaS) {
      return 'bg-gradient-to-br from-cyan-600 via-cyan-500 to-blue-600 dark:from-cyan-700 dark:via-cyan-600 dark:to-blue-700';
    }
    if (isBanking) {
      return 'bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 dark:from-green-700 dark:via-green-600 dark:to-emerald-700';
    }
    if (isBrand) {
      return 'bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 dark:from-indigo-700 dark:via-indigo-600 dark:to-purple-700';
    }
    if (isHealthcare) {
      return 'bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-600 dark:from-teal-700 dark:via-teal-600 dark:to-cyan-700';
    }
    return 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950';
  };

  if (isPlaceholder || hasError) {
    return (
      <div
        className={`
          ${fill ? 'absolute inset-0' : ''}
          ${className}
          ${getGradient()}
          flex items-center justify-center
          rounded-2xl
          relative overflow-hidden
        `}
        style={!fill && width && height ? { width, height } : {}}
      >
        {/* Pattern overlay para más textura */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="text-center p-8 relative z-10">
          {isPayPalProject ? (
            <>
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.618 3.092-2.42 5.126-5.176 5.126h-2.38v4.61c0 .723-.564 1.277-1.287 1.277H12.19l-1.015 4.916a.938.938 0 0 1-.926.788H7.076z"/>
                </svg>
              </div>
              <p className="text-lg font-display font-bold text-white mb-2">
                PayPal Project
              </p>
              <p className="text-sm text-white/80 font-mono">
                {alt}
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-8 h-8 text-white/80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-white/90 mb-1 font-display">
                {alt}
              </p>
              <p className="text-xs text-white/60 font-mono">
                Agrega la imagen en public/images/
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <>
        {isLoading && (
          <div className={`absolute inset-0 ${getGradient()} animate-pulse rounded-2xl`} />
        )}
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
          onError={handleError}
          onLoad={handleLoad}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          sizes={sizes || '100vw'}
          quality={80}
          decoding="async"
        />
      </>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`${getGradient()} animate-pulse rounded-2xl`} style={{ width, height }} />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        quality={80}
        decoding="async"
      />
    </>
  );
}
