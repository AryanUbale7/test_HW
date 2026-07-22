import React from 'react';
import Link from 'next/link';

export const IntroStrip = () => {
  return (
    <div className="border-b border-sage/30 pt-0.5 pb-2 bg-ivory/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <p className="text-charcoal font-sans font-semibold tracking-wide text-sm text-left">
          Helping families build, protect & pass on wealth
        </p>

      </div>
    </div>
  );
};
