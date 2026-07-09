'use client';

import React, { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils/formatDate';
import { ArticleListItem } from './ArticleListItem';

interface ArticlesFeedProps {
  initialPosts: any[];
  basePath: string;
  initialSearchParams: any;
}

export const ArticlesFeed: React.FC<ArticlesFeedProps> = ({
  initialPosts,
  basePath,
  initialSearchParams,
}) => {
  const [currentArm, setCurrentArm] = useState<string>(() => {
    return typeof initialSearchParams?.arm === 'string' ? initialSearchParams.arm : 'All';
  });
  const [currentType, setCurrentType] = useState<string>(() => {
    return typeof initialSearchParams?.type === 'string' ? initialSearchParams.type : '';
  });
  const [currentPage, setCurrentPage] = useState<number>(() => {
    return typeof initialSearchParams?.page === 'string' ? parseInt(initialSearchParams.page, 10) : 1;
  });

  // Sync state if user clicks browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      setCurrentArm(urlParams.get('arm') || 'All');
      setCurrentType(urlParams.get('type') || '');
      setCurrentPage(parseInt(urlParams.get('page') || '1', 10));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
  const types = ['Insight', 'News'];

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
      {/* Filters (Text underline style restored) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 py-6 border-b border-sage/30 mb-8">
        {/* Primary Category Filters */}
        <div className="flex items-center gap-6">
          <span className="text-charcoal font-serif italic text-lg mr-2">Filter by</span>
          <div className="flex flex-wrap gap-4">
            {arms.map((arm) => (
              <button
                key={arm}
                onClick={() => updateUrlAndState(arm, currentType, 1)}
                className={`text-sm font-sans tracking-wide transition-all duration-300 relative pb-1 ${
                  currentArm === arm
                    ? 'text-gold font-medium'
                    : 'text-charcoal/60 hover:text-deep-green'
                }`}
              >
                {arm}
                {currentArm === arm && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-gold" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Type Filters (Insight vs News) */}
        <div className="flex gap-4 border-l border-sage/30 pl-6">
          {types.map((type) => {
            const isActive = currentType === type;
            return (
              <button
                key={type}
                onClick={() => updateUrlAndState(currentArm, isActive ? '' : type, 1)}
                className={`text-xs font-sans uppercase tracking-[0.15em] px-3 py-1.5 border transition-colors ${
                  isActive
                    ? 'border-gold text-gold bg-gold/5'
                    : 'border-sage/30 text-charcoal/60 hover:border-deep-green hover:text-deep-green'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts List */}
      {paginatedPosts.length > 0 ? (
        <div className="flex flex-col mt-4">
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
            className="text-xs font-sans uppercase tracking-widest text-charcoal/60 hover:text-deep-green disabled:opacity-30 disabled:hover:text-charcoal/60 transition-colors"
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
                      : 'text-charcoal/60 hover:bg-sage-mist/50 hover:text-deep-green'
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
            className="text-xs font-sans uppercase tracking-widest text-charcoal/60 hover:text-deep-green disabled:opacity-30 disabled:hover:text-charcoal/60 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};
