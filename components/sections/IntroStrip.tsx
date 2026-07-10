import React from 'react';
import Link from 'next/link';

export const IntroStrip = () => {
  return (
    <div className="border-b border-sage/30 py-4 px-4 sm:px-6 lg:px-8 flex items-center bg-ivory/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <p className="text-charcoal/80 font-sans tracking-wide text-sm text-center sm:text-left">
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
