import React from 'react';

export default function ArticleLoading() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-16 animate-pulse">
        {/* Category & Type badges */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="h-6 w-20 bg-sage/30 rounded-sm" />
          <div className="h-6 w-16 bg-sage/30 rounded-sm" />
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="h-10 w-4/5 bg-sage/30 rounded-md" />
          <div className="h-10 w-2/3 bg-sage/30 rounded-md" />
        </div>

        {/* Date & Author */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <div className="h-4 w-32 bg-sage/20 rounded-sm" />
          <div className="h-4 w-4 bg-sage/20 rounded-full" />
          <div className="h-4 w-24 bg-sage/20 rounded-sm" />
        </div>

        {/* Image Placeholder */}
        <div className="aspect-[21/9] w-full bg-sage/20 rounded-md mb-16" />

        {/* Content Paragraph Skeletons */}
        <div className="space-y-6">
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-5/6 bg-sage/20 rounded-sm" />
          <br />
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-11/12 bg-sage/20 rounded-sm" />
          <div className="h-4 w-4/5 bg-sage/20 rounded-sm" />
          <br />
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-full bg-sage/20 rounded-sm" />
          <div className="h-4 w-3/4 bg-sage/20 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
