import React from 'react';

export default function GlossaryLoading() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="h-10 w-56 bg-sage/30 rounded-sm mx-auto mb-4" />
          <div className="h-6 w-80 bg-sage/30 rounded-sm mx-auto" />
        </div>
        {/* Search bar skeleton */}
        <div className="h-12 w-full bg-sage/20 rounded-sm mb-8" />
        {/* Letter navigation skeleton */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-8 w-8 bg-sage/20 rounded-sm" />
          ))}
        </div>
        {/* Terms skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border-b border-sage/20 pb-6 space-y-2">
              <div className="h-6 w-40 bg-sage/20 rounded-sm" />
              <div className="h-4 w-full bg-sage/20 rounded-sm" />
              <div className="h-4 w-3/4 bg-sage/20 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
