import React from 'react';

export const IntroStrip = () => {
  return (
    <div className="border-b border-sage/30 pt-0.5 pb-2 bg-ivory/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex flex-col md:flex-row justify-start items-center md:items-start gap-3 md:gap-6">
        
        {/* Left Side: Tagline (Restored to exact original vertical position & text-sm size, left-aligned) */}
        <div className="shrink-0 pt-0.5 text-left w-full md:w-auto">
          <p className="text-charcoal font-sans font-semibold tracking-wide text-sm text-left">
            Helping families build, protect & pass on wealth
          </p>
        </div>

        {/* Vertical Divider line between tagline and distributor info (Desktop only) */}
        <div className="hidden md:block w-px h-5 bg-sage/40 shrink-0 mt-1.5 mx-1" />

        {/* Middle / Right: Distributor details (Centered on mobile, left-aligned next to tagline on PC) */}
        <div className="flex flex-col text-center md:text-left items-center md:items-start border-t md:border-t-0 border-sage/20 pt-2.5 md:pt-0 w-full md:w-auto">
          {/* Line 1: Distributor + Mutual Funds · SIF · PMS · Legacy Planning */}
          <div className="font-serif text-sm sm:text-base md:text-[17px] text-charcoal leading-snug flex flex-wrap items-center justify-center md:justify-start gap-x-2 text-center md:text-left">
            <span className="font-medium text-deep-green">AMFI-registered Distributor</span>
            <span className="text-gold font-sans font-bold">—</span>
            <span className="whitespace-nowrap">Mutual Funds</span>
            <span className="text-gold font-sans font-bold text-xs select-none">·</span>
            <span className="whitespace-nowrap">SIF</span>
            <span className="text-gold font-sans font-bold text-xs select-none">·</span>
            <span className="whitespace-nowrap">PMS</span>
            <span className="text-gold font-sans font-bold text-xs select-none">·</span>
            <span className="whitespace-nowrap font-medium text-charcoal">Legacy Planning</span>
          </div>

          {/* Line 2: — Depth over volume, always. */}
          <div className="font-serif text-xs sm:text-sm md:text-[15.5px] text-charcoal/90 leading-snug mt-1 flex flex-wrap items-center justify-center md:justify-start gap-x-2 text-center md:text-left">
            <span className="text-gold font-sans font-bold">—</span>
            <span className="italic text-deep-green font-normal">
              Depth over volume, <strong className="font-bold">always</strong>.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};






