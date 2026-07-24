import React from 'react';

export const IntroStrip = () => {
  return (
    <div className="border-b border-sage/30 py-2 bg-ivory/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-6">
        
        {/* Left Side: Tagline (Exact original text & styling) */}
        <div className="shrink-0">
          <p className="text-charcoal font-sans font-semibold tracking-wide text-sm text-left">
            Helping families build, protect & pass on wealth
          </p>
        </div>

        {/* Right Side: Distributor Info & Motto in right empty space */}
        <div className="flex flex-col md:items-end text-left md:text-right border-t md:border-t-0 border-sage/20 pt-2 md:pt-0">
          {/* Line 1 */}
          <div className="font-serif text-xs sm:text-sm text-charcoal/90 leading-snug flex flex-wrap items-center gap-x-1.5 md:justify-end">
            <span className="font-medium text-deep-green">AMFI-registered Distributor</span>
            <span className="text-gold font-sans font-bold">—</span>
            <span className="whitespace-nowrap">Mutual Funds</span>
            <span className="text-gold font-sans font-bold text-xs select-none">·</span>
            <span className="whitespace-nowrap">SIF</span>
            <span className="text-gold font-sans font-bold text-xs select-none">·</span>
            <span className="whitespace-nowrap">PMS</span>
          </div>

          {/* Line 2 */}
          <div className="font-serif text-xs sm:text-[13px] text-charcoal/85 leading-snug mt-0.5 flex flex-wrap items-center gap-x-1.5 md:justify-end">
            <span className="font-medium text-charcoal">Legacy Planning</span>
            <span className="text-gold font-sans font-bold">—</span>
            <span className="italic text-deep-green font-normal">depth over volume, always.</span>
          </div>
        </div>

      </div>
    </div>
  );
};


