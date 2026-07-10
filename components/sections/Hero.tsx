"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative bg-[#123D2D] text-[#EFEBDA] py-24 md:py-32 overflow-hidden border-b border-[#D4A44F]/20">
      {/* Subtle radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,164,79,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Background soft concentric rings motif */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] rounded-full border border-[#D4A44F]/5 pointer-events-none flex items-center justify-center">
        <div className="w-[400px] h-[400px] rounded-full border border-[#D4A44F]/5 flex items-center justify-center">
          <div className="w-[300px] h-[300px] rounded-full border border-[#D4A44F]/5 flex items-center justify-center">
            <div className="w-[200px] h-[200px] rounded-full border border-[#D4A44F]/5" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.span 
              className="text-[#D4A44F] font-sans text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Private Wealth Advisory
            </motion.span>
            
            <motion.h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#FFF] leading-[1.1] mb-6 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Architecting <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A44F] via-[#F6F2E0] to-[#CD9441]">Generational Wealth.</span>
            </motion.h2>

            <motion.p 
              className="font-sans text-base md:text-lg text-[#EFEBDA]/80 font-light max-w-xl mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We design bespoke financial architectures that protect your assets, optimize growth, and preserve your family's legacy for generations to come.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link 
                href="/reach-me" 
                className="bg-[#D4A44F] text-[#123D2D] hover:bg-[#FFF] hover:text-[#123D2D] text-center font-medium px-8 py-3.5 rounded-sm transition-all shadow-md focus-visible:ring-2 focus-visible:ring-[#FFF] focus:outline-none text-sm tracking-wider uppercase font-sans"
              >
                Start a Conversation
              </Link>
              <Link 
                href="/how-i-work" 
                className="border border-[#EFEBDA]/30 text-[#EFEBDA] hover:bg-[#EFEBDA]/10 hover:border-[#EFEBDA] text-center font-medium px-8 py-3.5 rounded-sm transition-all focus-visible:ring-2 focus-visible:ring-[#D4A44F] focus:outline-none text-sm tracking-wider uppercase font-sans"
              >
                Explore Our Approach
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Pillars / Feature Card */}
          <motion.div 
            className="lg:col-span-5 w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="bg-[#1a4d3a]/60 border border-[#D4A44F]/20 p-8 md:p-10 rounded-sm relative overflow-hidden shadow-2xl backdrop-blur-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle,rgba(212,164,79,0.1)_0%,transparent_70%)] pointer-events-none" />
              
              <h3 className="font-serif text-2xl text-[#FFF] mb-8 pb-4 border-b border-[#D4A44F]/10">
                Advisory Pillars
              </h3>

              <div className="space-y-6">
                {/* Pillar 1 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-sm bg-[#D4A44F]/10 flex items-center justify-center text-[#D4A44F] font-serif text-sm shrink-0 border border-[#D4A44F]/20">
                    I
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#FFF] mb-1">Wealth Creation</h4>
                    <p className="font-sans text-xs text-[#EFEBDA]/75 font-light leading-relaxed">
                      Custom mutual fund portfolios, asset allocation modelings, and growth engines aligned with your specific timeline.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-sm bg-[#D4A44F]/10 flex items-center justify-center text-[#D4A44F] font-serif text-sm shrink-0 border border-[#D4A44F]/20">
                    II
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#FFF] mb-1">Wealth Protection</h4>
                    <p className="font-sans text-xs text-[#EFEBDA]/75 font-light leading-relaxed">
                      Shielding asset holdings from inflation, tax erosion, and capital risk using robust structure modeling.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-sm bg-[#D4A44F]/10 flex items-center justify-center text-[#D4A44F] font-serif text-sm shrink-0 border border-[#D4A44F]/20">
                    III
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#FFF] mb-1">Wealth Legacy</h4>
                    <p className="font-sans text-xs text-[#EFEBDA]/75 font-light leading-relaxed">
                      Arranging smooth transition frameworks, wills, trusts, and legacy planning to honor your achievements across generations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
