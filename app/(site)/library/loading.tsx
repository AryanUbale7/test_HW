import React from 'react';

export default function LibraryLoading() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="h-4 w-16 bg-sage/30 rounded-sm mx-auto mb-4" />
          <div className="h-10 w-48 bg-sage/30 rounded-sm mx-auto mb-6" />
          <div className="h-6 w-80 bg-sage/30 rounded-sm mx-auto" />
        </div>
        {/* Calculator section skeleton */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-sage-mist/20 border border-sage/20 p-8 rounded-sm h-64" />
          <div className="bg-sage-mist/20 border border-sage/20 p-8 rounded-sm h-64" />
        </div>
        {/* Resources skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-sage-mist/20 border border-sage/20 p-6 rounded-sm space-y-4">
              <div className="h-6 w-3/4 bg-sage/20 rounded-sm" />
              <div className="h-4 w-full bg-sage/20 rounded-sm" />
              <div className="h-4 w-2/3 bg-sage/20 rounded-sm" />
            </div>
          ))}
        </div>
        {/* FAQ skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-sage/20 p-4 rounded-sm">
              <div className="h-5 w-2/3 bg-sage/20 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
