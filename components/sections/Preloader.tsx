"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const minLoaderTime = 2800; // Let the animation play fully (2.8s)
    const startTime = Date.now();

    const deactivateLoader = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoaderTime - elapsed);

      setTimeout(() => {
        setIsExiting(true);
        // Match exit animation duration (0.8s) before fully unmounting
        setTimeout(() => {
          setIsVisible(false);
        }, 800);
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

  // Lock body scroll during preloader
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      // Prevent layout shift
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

  // SVG dimensions & centers
  const cx = 150;
  const cy = 150;

  // Concentric rings configuration (radii and custom organic variations)
  const rings = [
    { radius: 18, waviness: 0.12, freq: 3, phase: 0.2, delay: 0.2 },
    { radius: 32, waviness: 0.08, freq: 4, phase: 1.1, delay: 0.5 },
    { radius: 46, waviness: 0.06, freq: 3, phase: 2.3, delay: 0.8 },
    { radius: 60, waviness: 0.07, freq: 5, phase: 0.7, delay: 1.1 },
    { radius: 76, waviness: 0.05, freq: 4, phase: 3.1, delay: 1.4 },
  ];

  // Helper to generate a wavy, imperfect organic loop resembling the hand-drawn Honworth logo
  const generateOrganicPath = (r: number, waviness: number, freq: number, phase: number) => {
    const points = [];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const factor = 1 + Math.sin(angle * freq + phase) * waviness;
      const currR = r * factor;
      const x = cx + Math.cos(angle) * currR;
      const y = cy + Math.sin(angle) * currR;
      points.push({ x, y });
    }

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < steps; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const xc = (p0.x + p1.x) / 2;
      const yc = (p0.y + p1.y) / 2;
      d += ` Q ${p0.x} ${p0.y}, ${xc} ${yc}`;
    }
    d += ` Q ${points[steps].x} ${points[steps].y}, ${points[0].x} ${points[0].y} Z`;
    return d;
  };

  // Generate 25 floating particles
  const particles = Array.from({ length: 25 }).map((_, i) => {
    const angle = (i / 25) * Math.PI * 2;
    const distance = 80 + Math.random() * 60;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 1 + Math.random() * 2,
      duration: 3 + Math.random() * 4,
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
          {/* Ambient radial glow background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,79,0.06)_0%,transparent_70%)] pointer-events-none" />

          {/* Core Logo Container */}
          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            
            {/* Glowing gold backdrops */}
            <motion.div 
              className="absolute w-[180px] h-[180px] rounded-full bg-[#D4A44F]/5 blur-3xl pointer-events-none"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* SVG concentric rings workspace */}
            <svg
              className="w-full h-full drop-shadow-[0_0_20px_rgba(212,164,79,0.25)]"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Premium gold metallic gradient */}
                <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C59C50" />
                  <stop offset="25%" stopColor="#F6F2E0" />
                  <stop offset="50%" stopColor="#D4A44F" />
                  <stop offset="75%" stopColor="#EFEBDA" />
                  <stop offset="100%" stopColor="#CD9441" />
                </linearGradient>
                
                {/* Secondary highlight sweep */}
                <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A44F" />
                  <stop offset="50%" stopColor="#FFF" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#CD9441" />
                </linearGradient>

                {/* Glow Filter */}
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Concentric Rings */}
              {rings.map((ring, idx) => {
                const pathData = generateOrganicPath(ring.radius, ring.waviness, ring.freq, ring.phase);
                return (
                  <g key={idx}>
                    {/* Glow layer underneath */}
                    <motion.path
                      d={pathData}
                      stroke="url(#goldMetallic)"
                      strokeWidth={1.5}
                      strokeOpacity={0.35}
                      filter="url(#goldGlow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          pathLength: { delay: ring.delay, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
                          opacity: { delay: ring.delay, duration: 0.4 }
                        }
                      }}
                      exit={{
                        pathLength: 0,
                        opacity: 0,
                        transition: { duration: 0.6, ease: "easeInOut" }
                      }}
                    />

                    {/* Main crisp ring layer */}
                    <motion.path
                      d={pathData}
                      stroke="url(#goldMetallic)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: 1,
                        scale: [1, 1.015, 1],
                        transition: {
                          pathLength: { delay: ring.delay, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
                          scale: { delay: 1.8 + idx * 0.1, duration: 0.8, ease: "easeOut" }
                        }
                      }}
                      exit={{
                        pathLength: 0,
                        scale: 0.01,
                        transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }
                      }}
                      style={{ originX: "150px", originY: "150px" }}
                    />
                  </g>
                );
              })}

              {/* Center Dot (Start and end anchor) */}
              <motion.circle
                cx={cx}
                cy={cy}
                r={4}
                fill="url(#goldMetallic)"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1.5, 1],
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
                exit={{
                  scale: [1, 2, 0.1],
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              />
            </svg>

            {/* Sweeping premium reflection shimmer overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.35, 0],
                rotate: [0, 360]
              }}
              transition={{
                delay: 1.8,
                duration: 2.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3
              }}
              style={{
                background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.4) 180deg, transparent 360deg)",
                mixBlendMode: "overlay",
                borderRadius: "50%"
              }}
            />

            {/* Infinite breathing scale loop */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                delay: 2.2,
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Gold dust particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-gradient-to-tr from-[#D4A44F] to-[#FFF]"
                style={{
                  width: particle.size,
                  height: particle.size,
                  x: particle.x * 0.15,
                  y: particle.y * 0.15,
                  boxShadow: "0 0 6px rgba(212,164,79,0.8)",
                  left: "50%",
                  top: "50%"
                }}
                animate={{
                  x: [particle.x * 0.15, particle.x * 1.1],
                  y: [particle.y * 0.15, particle.y * 1.1 - 40],
                  opacity: [0, 0.8, 0],
                  scale: [1, 1.2, 0.6]
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

          {/* Subtitle / Loader Branding */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-1.5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 1.2, duration: 0.8 } 
            }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }}
          >
            <h2 className="font-serif text-[#EFEBDA] text-lg uppercase tracking-[0.25em] font-medium">
              Honworth
            </h2>
            <p className="font-sans text-xs text-[#D4A44F]/70 tracking-[0.3em] uppercase font-light">
              Wealth &middot; Legacy &middot; Honoured
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
