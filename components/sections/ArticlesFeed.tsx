'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatDate } from '@/lib/utils/formatDate';
import { ArticleListItem } from './ArticleListItem';

interface ArticlesFeedProps {
  initialPosts: any[];
  basePath: string;
}

export const ArticlesFeed: React.FC<ArticlesFeedProps> = ({
  initialPosts,
  basePath,
}) => {
  const [currentArm, setCurrentArm] = useState<string>('All');
  const [currentType, setCurrentType] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
 
  const searchParams = useSearchParams();
 
  // Sync state when searchParams changes (handles client-side next/link navigation and browser history)
  useEffect(() => {
    if (!searchParams) return;
    setCurrentArm(searchParams.get('arm') || 'All');
    setCurrentType(searchParams.get('type') || '');
    setCurrentPage(parseInt(searchParams.get('page') || '1', 10));
  }, [searchParams]);

  const updateUrlAndState = (newArm: string, newType: string, newPage: number) => {
    setCurrentArm(newArm);
    setCurrentType(newType);
    setCurrentPage(newPage);

    const params = new URLSearchParams();
    if (newArm !== 'All') params.set('arm', newArm);
    if (newType) params.set('type', newType);
    if (newPage > 1) params.set('page', newPage.toString());

    const qs = params.toString();
    const newUrl = qs ? `${basePath}?${qs}` : basePath;
    window.history.pushState({}, '', newUrl);
  };

  const arms = ['All', 'Creation', 'Protection', 'Legacy', 'Pers.Fin', 'Economy'];

  // Filter posts on the client side
  const filteredPosts = initialPosts.filter((post) => {
    const matchesArm = currentArm === 'All' || post.arm === currentArm;
    const matchesType = !currentType || post.type === currentType;
    return matchesArm && matchesType;
  });

  const limit = 9;
  const total = filteredPosts.length;
  const startIndex = (currentPage - 1) * limit;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

  // Reset page if current page range becomes out of bounds
  useEffect(() => {
    const maxPage = Math.ceil(total / limit) || 1;
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [total, currentPage]);

  return (
    <div>
      {/* Filters (Individual premium pill style) */}
      <div className="flex items-center justify-between mb-4 py-1 w-full">
        <div className="flex flex-row items-center flex-wrap gap-x-4 gap-y-2.5 w-full">
          <span className="text-charcoal font-serif italic text-lg shrink-0">Filter by:</span>
          <div className="flex flex-wrap gap-2.5">
            {arms.map((arm) => (
              <button
                key={arm}
                onClick={() => updateUrlAndState(arm, currentType, 1)}
                className={`text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 px-4 py-2 rounded-full border whitespace-nowrap ${
                  currentArm === arm
                    ? 'text-gold font-medium bg-sage-mist/40 border-gold/40 shadow-sm'
                    : 'text-charcoal/80 border-sage/30 hover:border-deep-green hover:text-deep-green bg-sage-mist/5'
                }`}
              >
                {arm === 'Pers.Fin' ? 'Personal Finance' : arm}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts List */}
      {paginatedPosts.length > 0 ? (
        <div className="flex flex-col mt-2">
          {paginatedPosts.map((post: any, idx: number) => (
            <ArticleListItem
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={formatDate(post.publishedAt)}
              category={post.arm || 'General'}
              href={`/articles/${post.slug}`}
              thumbnailUrl={post.thumbnailUrl}
              priority={idx === 0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg font-sans text-charcoal">No articles found matching your criteria.</p>
        </div>
      )}

      {/* Client-side Pagination */}
      {total > limit && (
        <div className="flex justify-between items-center border-t border-sage/30 pt-8 mt-12">
          <button
            disabled={currentPage <= 1}
            onClick={() => updateUrlAndState(currentArm, currentType, currentPage - 1)}
            className="text-xs font-sans uppercase tracking-widest text-charcoal/80 hover:text-deep-green disabled:opacity-30 disabled:hover:text-charcoal/80 transition-colors"
          >
            ← Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(total / limit) }).map((_, idx) => {
              const p = idx + 1;
              return (
                <button
                  key={p}
                  onClick={() => updateUrlAndState(currentArm, currentType, p)}
                  className={`w-8 h-8 rounded-full text-xs font-sans transition-colors ${
                    currentPage === p
                      ? 'bg-deep-green text-ivory'
                      : 'text-charcoal/80 hover:bg-sage-mist/50 hover:text-deep-green'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button
            disabled={currentPage >= Math.ceil(total / limit)}
            onClick={() => updateUrlAndState(currentArm, currentType, currentPage + 1)}
            className="text-xs font-sans uppercase tracking-widest text-charcoal/80 hover:text-deep-green disabled:opacity-30 disabled:hover:text-charcoal/80 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};
