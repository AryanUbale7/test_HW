import React from 'react';

export default function GlossaryTermLoading() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-12 bg-sage/20 rounded-sm" />
          <div className="h-4 w-4 bg-sage/20 rounded-sm" />
          <div className="h-4 w-16 bg-sage/20 rounded-sm" />
          <div className="h-4 w-4 bg-sage/20 rounded-sm" />
          <div className="h-4 w-24 bg-sage/20 rounded-sm" />
        </div>
        {/* Term title */}
        <div className="h-10 w-1/2 bg-sage/20 rounded-sm mb-4" />
        {/* Arm badge */}
        <div className="h-6 w-24 bg-sage/20 rounded-sm mb-8" />
        {/* Short definition */}
        <div className="h-6 w-full bg-sage/20 rounded-sm mb-2" />
        <div className="h-6 w-3/4 bg-sage/20 rounded-sm mb-8" />
        {/* Long definition body */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-full bg-sage/20 rounded-sm" />
          ))}
          <div className="h-4 w-2/3 bg-sage/20 rounded-sm" />
        </div>
        {/* Related terms */}
        <div className="mt-12 pt-8 border-t border-sage/20 space-y-4">
          <div className="h-6 w-32 bg-sage/20 rounded-sm" />
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-24 bg-sage/20 rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
