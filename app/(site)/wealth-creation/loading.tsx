import React from 'react';

export default function ArmPageLoading() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32 animate-pulse">
        {/* Section header skeleton */}
        <div className="text-center mb-8">
          <div className="h-4 w-20 bg-sage/30 rounded-sm mx-auto mb-4" />
          <div className="h-10 w-56 bg-sage/30 rounded-sm mx-auto" />
        </div>
        {/* Advisor block skeleton */}
        <div className="flex items-center gap-4 py-4 px-6 mb-12 bg-sage-mist/20 border border-sage/20 rounded-sm">
          <div className="h-4 w-24 bg-sage/20 rounded-sm" />
          <div className="h-4 w-40 bg-sage/20 rounded-sm" />
        </div>
        {/* Philosophy section */}
        <div className="mb-12 space-y-3">
          <div className="h-6 w-40 bg-sage/20 rounded-sm mb-4" />
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-3/4 bg-sage/20 rounded-sm" />
        </div>
        {/* Offering section */}
        <div className="mb-12 space-y-3">
          <div className="h-6 w-48 bg-sage/20 rounded-sm mb-4" />
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-2/3 bg-sage/20 rounded-sm" />
        </div>
        {/* Related articles skeleton */}
        <div className="mb-12">
          <div className="h-6 w-36 bg-sage/20 rounded-sm mb-6" />
          <div className="grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-sage/20 rounded-sm overflow-hidden">
                <div className="aspect-[16/10] bg-sage/20" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-sage/20 rounded-sm" />
                  <div className="h-3 w-full bg-sage/20 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA skeleton */}
        <div className="text-center py-12 border-t border-sage/20">
          <div className="h-8 w-48 bg-sage/20 rounded-sm mx-auto mb-4" />
          <div className="h-10 w-40 bg-sage/20 rounded-sm mx-auto" />
        </div>
      </div>
    </div>
  );
}
