"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const minLoaderTime = 3000; // 3 seconds to appreciate the premium preloader
    const startTime = Date.now();

    const deactivateLoader = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoaderTime - elapsed);

      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 800); // Allow time for exit animations
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      deactivateLoader();
    } else {
      const handleLoad = () => {
        deactivateLoader();
      };
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Lock scroll while preloader is active
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--removed-body-scroll-width, 0px)';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // Generate gold particles around the logo area
  const particles = Array.from({ length: 20 }).map((_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const distance = 80 + Math.random() * 50;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 1.5 + Math.random() * 2,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
    };
  });

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#123D2D]"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } 
          }}
        >
          {/* Radial gold backdrop bloom */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,193,88,0.06)_0%,transparent_65%)] pointer-events-none" />

          {/* Logo Centerpiece wrapper */}
          <div className="relative w-[280px] h-[280px] flex items-center justify-center">
            
            {/* Ambient Gold glow behind the logo */}
            <motion.div 
              className="absolute w-[160px] h-[160px] rounded-full bg-[#E5C158]/5 blur-3xl pointer-events-none"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Exact branding emblem image */}
            <motion.div
              className="relative overflow-hidden w-[180px] h-[180px] flex items-center justify-center rounded-full"
              initial={{ opacity: 0, scale: 0.6, filter: 'blur(8px)' }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: 'blur(0px)'
              }}
              transition={{
                duration: 1.2,
                ease: [0.34, 1.56, 0.64, 1] // Luxurious spring reveal
              }}
              exit={{
                scale: 0.7,
                opacity: 0,
                filter: 'blur(6px)',
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
              style={{
                boxShadow: '0 0 35px rgba(229,193,88,0.15)',
              }}
            >
              {/* Clean brand emblem without distorting masks */}
              <motion.img 
                src="/logo/emblem.png" 
                alt="Honworth Emblem" 
                className="w-full h-full object-contain pointer-events-none select-none"
                animate={{
                  scale: [1, 1.03, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Shimmer sweep effect overlay */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  delay: 1.5,
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 3.5
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25) 50%, transparent)',
                }}
              />
            </motion.div>

            {/* Gold dust particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-gradient-to-tr from-[#E5C158] to-[#FFF]"
                style={{
                  width: particle.size,
                  height: particle.size,
                  x: particle.x * 0.2,
                  y: particle.y * 0.2,
                  boxShadow: "0 0 6px rgba(229,193,88,0.7)",
                  left: "50%",
                  top: "50%"
                }}
                animate={{
                  x: [particle.x * 0.2, particle.x * 1.15],
                  y: [particle.y * 0.2, particle.y * 1.15 - 35],
                  opacity: [0, 0.75, 0],
                  scale: [1, 1.25, 0.5]
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Precise brand logo text and tagline */}
          <motion.div
            className="mt-6 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 1.0, duration: 0.8 } 
            }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }}
          >
            <h2 className="font-serif text-[#EFEBDA] text-xl uppercase tracking-[0.25em] font-medium">
              Honworth
            </h2>
            <p className="font-sans text-[10px] text-[#E5C158] tracking-[0.35em] uppercase font-light">
              WEALTH. LEGACY. HONOURED.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
