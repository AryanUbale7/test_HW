"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const minLoaderTime = 3200; // Let the full animation play (3.2s)
    const startTime = Date.now();

    const deactivateLoader = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoaderTime - elapsed);

      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 800); // Wait for exit animation
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

  // SVG Center Coordinates
  const cx = 150;
  const cy = 150;

  // Exact concentric rings configuration designed to trace the original Honworth logo
  const rings = [
    { radius: 18, waviness: 0.12, freq: 3, phase: 0.2, delay: 0.2, strokeWidth: 14 },
    { radius: 31, waviness: 0.08, freq: 4, phase: 1.1, delay: 0.5, strokeWidth: 16 },
    { radius: 45, waviness: 0.06, freq: 3, phase: 2.3, delay: 0.8, strokeWidth: 18 },
    { radius: 58, waviness: 0.07, freq: 5, phase: 0.7, delay: 1.1, strokeWidth: 20 },
    { radius: 74, waviness: 0.05, freq: 4, phase: 3.1, delay: 1.4, strokeWidth: 22 },
  ];

  // Helper to generate the organic path matching the hand-drawn rings
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

  // Generate 25 floating gold dust particles
  const particles = Array.from({ length: 25 }).map((_, i) => {
    const angle = (i / 25) * Math.PI * 2;
    const distance = 90 + Math.random() * 60;
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,79,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* preloader centerpiece container */}
          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            
            {/* Soft backdrop glow */}
            <motion.div 
              className="absolute w-[200px] h-[200px] rounded-full bg-[#D4A44F]/5 blur-3xl pointer-events-none"
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

            {/* SVG Workspace containing emblem image masked by organic drawing strokes */}
            <svg
              className="w-full h-full drop-shadow-[0_0_25px_rgba(212,164,79,0.3)]"
              viewBox="0 0 300 300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* SVG Mask: concentric strokes draw themselves to reveal the underlying emblem */}
                <mask id="emblemDrawMask">
                  {/* Background black to hide everything initially */}
                  <rect x="0" y="0" width="300" height="300" fill="black" />
                  
                  {/* concentric white strokes to progressively reveal emblem rings */}
                  {rings.map((ring, idx) => {
                    const pathData = generateOrganicPath(ring.radius, ring.waviness, ring.freq, ring.phase);
                    return (
                      <motion.path
                        key={idx}
                        d={pathData}
                        stroke="white"
                        strokeWidth={ring.strokeWidth}
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: 1,
                          transition: {
                            delay: ring.delay,
                            duration: 1.2,
                            ease: [0.25, 0.1, 0.25, 1]
                          }
                        }}
                      />
                    );
                  })}
                  
                  {/* Center dot mask reveal */}
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r={8}
                    fill="white"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                  />
                </mask>

                {/* Shimmer sweep effect */}
                <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF" stopOpacity={0} />
                  <stop offset="50%" stopColor="#FFF" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#FFF" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* The actual high-quality logo emblem, masked by the organic drawing paths */}
              <g mask="url(#emblemDrawMask)">
                <image
                  href="/logo/emblem.png"
                  x="50"
                  y="50"
                  width="200"
                  height="200"
                />
              </g>

              {/* Sweeping premium reflection shimmer overlay (only on top of the logo shape) */}
              <g mask="url(#emblemDrawMask)">
                <motion.rect
                  x="50"
                  y="50"
                  width="200"
                  height="200"
                  fill="url(#shimmerGrad)"
                  initial={{ x: -200 }}
                  animate={{ x: 200 }}
                  transition={{
                    delay: 1.8,
                    duration: 1.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
              </g>
            </svg>

            {/* Breathing scale overlay logic */}
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
                  x: [particle.x * 0.15, particle.x * 1.15],
                  y: [particle.y * 0.15, particle.y * 1.15 - 40],
                  opacity: [0, 0.8, 0],
                  scale: [1, 1.3, 0.5]
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
