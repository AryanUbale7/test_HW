import React from 'react';

export const IntroStrip = () => {
  return (
    <div className="border-b border-sage/30 pt-0.5 pb-2 bg-ivory/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex flex-col md:flex-row md:items-center justify-start items-start gap-3 md:gap-6">
        
        {/* Left Side: Tagline (Restored to exact original vertical position) */}
        <div className="shrink-0 pt-0.5">
          <p className="text-charcoal font-sans font-semibold tracking-wide text-sm sm:text-base text-left">
            Helping families build, protect & pass on wealth
          </p>
        </div>

        {/* Vertical Divider line between tagline and distributor info */}
        <div className="hidden md:block w-px h-8 bg-sage/40 shrink-0 self-center mx-1" />

        {/* Right / Middle: Distributor details placed right next to tagline with larger font size */}
        <div className="flex flex-col text-left border-t md:border-t-0 border-sage/20 pt-2 md:pt-0">
          {/* Line 1 */}
          <div className="font-serif text-sm sm:text-base md:text-[16px] text-charcoal leading-snug flex flex-wrap items-center gap-x-2">
            <span className="font-medium text-deep-green">AMFI-registered Distributor</span>
            <span className="text-gold font-sans font-bold">—</span>
            <span className="whitespace-nowrap">Mutual Funds</span>
            <span className="text-gold font-sans font-bold text-xs select-none">·</span>
            <span className="whitespace-nowrap">SIF</span>
            <span className="text-gold font-sans font-bold text-xs select-none">·</span>
            <span className="whitespace-nowrap">PMS</span>
          </div>

          {/* Line 2 */}
          <div className="font-serif text-xs sm:text-sm md:text-[14.5px] text-charcoal/90 leading-snug mt-0.5 flex flex-wrap items-center gap-x-2">
            <span className="font-medium text-charcoal">Legacy Planning</span>
            <span className="text-gold font-sans font-bold">—</span>
            <span className="italic text-deep-green font-normal">depth over volume, always.</span>
          </div>
        </div>

      </div>
    </div>
  );
};



