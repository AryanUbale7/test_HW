import React from 'react';

export default function GlossaryTermLoading() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-24 animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-10">
          <div className="h-3 w-10 bg-sage/20 rounded-sm" />
          <span className="text-sage/30">/</span>
          <div className="h-3 w-16 bg-sage/20 rounded-sm" />
          <span className="text-sage/30">/</span>
          <div className="h-3 w-20 bg-sage/20 rounded-sm" />
        </div>

        {/* Arm Badge skeleton */}
        <div className="mb-6">
          <div className="h-6 w-24 bg-sage/30 rounded-sm" />
        </div>

        {/* H1 Title skeleton */}
        <div className="h-10 w-2/3 bg-sage/30 rounded-md mb-8" />

        {/* Short Definition block skeleton */}
        <div className="border-l-4 border-gold/45 pl-6 mb-10 space-y-2">
          <div className="h-5 w-full bg-sage/20 rounded-sm" />
          <div className="h-5 w-4/5 bg-sage/20 rounded-sm" />
        </div>

        {/* Full explanation section header skeleton */}
        <div className="h-6 w-36 bg-sage/30 rounded-sm mb-4" />
        
        {/* Full explanation paragraph skeletons */}
        <div className="space-y-4 mb-14">
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-5/6 bg-sage/20 rounded-sm" />
        </div>

        {/* Related Terms skeleton grid */}
        <div className="mb-14">
          <div className="h-6 w-44 bg-sage/30 rounded-sm mb-6" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-sage/20 rounded-sm p-4 h-24 bg-white/20" />
            <div className="border border-sage/20 rounded-sm p-4 h-24 bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
