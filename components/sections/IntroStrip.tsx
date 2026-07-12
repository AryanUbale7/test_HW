import React from 'react';
import Link from 'next/link';

export const IntroStrip = () => {
  return (
    <div className="border-b border-sage/30 py-2.5 bg-ivory/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <p className="text-charcoal/70 font-sans font-medium tracking-wide text-sm text-center sm:text-left">
          Helping families create, protect & pass on wealth
        </p>
        <Link 
          href="/my-story" 
          className="group flex items-center gap-2 text-gold font-sans font-medium text-sm transition-colors hover:text-deep-green shrink-0"
        >
          About Honworth
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
};
