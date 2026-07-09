import React from 'react';

export default function ArticlesLoading() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Intro Strip Skeleton */}
      <div className="bg-sage-mist/40 border-b border-sage/20 py-16 md:py-24 animate-pulse">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="h-4 w-24 bg-sage/30 rounded-sm mx-auto mb-4" />
          <div className="h-10 w-64 bg-sage/30 rounded-sm mx-auto mb-6" />
          <div className="h-6 w-96 bg-sage/30 rounded-sm mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left Column: Posts Feed Skeleton */}
        <div className="w-full lg:w-2/3 space-y-8">
          {/* Filters Skeleton */}
          <div className="flex justify-between items-center py-6 border-b border-sage/30 mb-8 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-6 w-16 bg-sage/20 rounded-sm" />
              <div className="h-8 w-20 bg-sage/20 rounded-sm" />
              <div className="h-8 w-20 bg-sage/20 rounded-sm" />
              <div className="h-8 w-20 bg-sage/20 rounded-sm" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-16 bg-sage/20 rounded-sm" />
              <div className="h-8 w-16 bg-sage/20 rounded-sm" />
            </div>
          </div>

          {/* List Skeleton */}
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-center animate-pulse">
                <div className="flex-1 w-full space-y-4">
                  <div className="h-4 w-32 bg-sage/20 rounded-sm" />
                  <div className="h-8 w-3/4 bg-sage/20 rounded-sm" />
                  <div className="h-12 w-full bg-sage/20 rounded-sm" />
                </div>
                <div className="w-full md:w-1/3 shrink-0 aspect-[16/10] bg-sage/20 rounded-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sidebar Skeleton */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-10 animate-pulse">
          <div className="bg-sage-mist/20 border border-sage/20 p-8 rounded-sm space-y-4">
            <div className="h-6 w-32 bg-sage/20 rounded-sm" />
            <div className="h-16 w-full bg-sage/20 rounded-sm" />
            <div className="h-10 w-full bg-sage/20 rounded-sm" />
          </div>
        </aside>
      </div>
    </div>
  );
}
