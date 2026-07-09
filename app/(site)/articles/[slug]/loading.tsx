import React from 'react';

export default function ArticleDetailLoading() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-12 bg-sage/20 rounded-sm" />
          <div className="h-4 w-4 bg-sage/20 rounded-sm" />
          <div className="h-4 w-16 bg-sage/20 rounded-sm" />
          <div className="h-4 w-4 bg-sage/20 rounded-sm" />
          <div className="h-4 w-32 bg-sage/20 rounded-sm" />
        </div>
        {/* Title */}
        <div className="h-10 w-3/4 bg-sage/20 rounded-sm mb-4" />
        {/* Meta line */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-4 w-24 bg-sage/20 rounded-sm" />
          <div className="h-6 w-20 bg-sage/20 rounded-sm" />
        </div>
        {/* Cover image */}
        <div className="w-full aspect-[16/9] bg-sage/20 rounded-sm mb-10" />
        {/* Body paragraphs */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-4 w-full bg-sage/20 rounded-sm" />
          ))}
          <div className="h-4 w-2/3 bg-sage/20 rounded-sm" />
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-5/6 bg-sage/20 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
