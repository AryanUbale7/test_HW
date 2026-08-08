'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatDate } from '@/lib/utils/formatDate';
import { ArticleListItem } from './ArticleListItem';
import { Filter, X, ChevronDown } from 'lucide-react';

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
    const rawArm = searchParams.get('arm') || 'All';
    setCurrentArm(rawArm === 'Creation' ? 'Building' : rawArm);
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

  const arms = [
    { value: 'All', label: 'All Topics' },
    { value: 'Building', label: 'Building Wealth' },
    { value: 'Protection', label: 'Protection' },
    { value: 'Legacy', label: 'Legacy' },
    { value: 'Pers.Fin', label: 'Personal Finance' },
    { value: 'Economy', label: 'Economy' },
  ];

  const types = [
    { value: '', label: 'All Types' },
    { value: 'Guide', label: 'Guide' },
    { value: 'Money Conversation', label: 'Money Conversation' },
    { value: 'Note', label: 'Note' },
  ];

  // Filter posts on the client side
  const filteredPosts = initialPosts.filter((post) => {
    const postArmMapped = post.arm === 'Creation' ? 'Building' : post.arm;
    const matchesArm = currentArm === 'All' || postArmMapped === currentArm;
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

  const isFiltered = currentArm !== 'All' || currentType !== '';

  return (
    <div>
      {/* Dual Compact Dropdowns Bar */}
      <div className="mb-6 w-full bg-ivory border border-sage/30 rounded-lg p-3.5 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
          
          {/* Left: Dropdown Selectors */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-sans font-bold text-deep-green mr-1">
              <Filter className="w-3.5 h-3.5 text-gold" />
              <span>Filter:</span>
            </div>

            {/* Topic Dropdown */}
            <div className="relative">
              <select
                value={currentArm}
                onChange={(e) => updateUrlAndState(e.target.value, currentType, 1)}
                className="appearance-none bg-sage-mist/20 border border-sage/40 hover:border-gold/60 focus:border-gold text-deep-green font-sans font-medium text-xs sm:text-sm rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold transition-colors cursor-pointer"
              >
                {arms.map((arm) => (
                  <option key={arm.value} value={arm.value}>
                    Topic: {arm.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-sage absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Type Dropdown */}
            <div className="relative">
              <select
                value={currentType}
                onChange={(e) => updateUrlAndState(currentArm, e.target.value, 1)}
                className={`appearance-none bg-sage-mist/20 border border-sage/40 hover:border-gold/60 focus:border-gold font-sans font-medium text-xs sm:text-sm rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold transition-colors cursor-pointer ${
                  currentType === 'Money Conversation' ? 'text-gold font-semibold' : 'text-deep-green'
                }`}
              >
                {types.map((t) => (
                  <option key={t.value} value={t.value}>
                    Type: {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-sage absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Right: Active Filter Badges & Reset Button */}
          {isFiltered && (
            <div className="flex items-center gap-2 flex-wrap pt-1 sm:pt-0 border-t sm:border-t-0 border-sage/20">
              {currentArm !== 'All' && (
                <span className="inline-flex items-center gap-1 text-xs font-sans font-medium text-deep-green bg-sage-mist/50 border border-sage/30 px-2.5 py-1 rounded-full">
                  Topic: {currentArm === 'Pers.Fin' ? 'Personal Finance' : currentArm}
                  <button
                    onClick={() => updateUrlAndState('All', currentType, 1)}
                    className="hover:text-gold transition-colors ml-0.5"
                    aria-label="Remove topic filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {currentType !== '' && (
                <span className={`inline-flex items-center gap-1 text-xs font-sans font-medium px-2.5 py-1 rounded-full border ${
                  currentType === 'Money Conversation'
                    ? 'text-gold bg-gold/10 border-gold/40'
                    : 'text-deep-green bg-sage-mist/50 border-sage/30'
                }`}>
                  Type: {currentType}
                  <button
                    onClick={() => updateUrlAndState(currentArm, '', 1)}
                    className="hover:text-gold transition-colors ml-0.5"
                    aria-label="Remove type filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={() => updateUrlAndState('All', '', 1)}
                className="text-xs font-sans text-charcoal/60 hover:text-gold transition-colors underline ml-1"
              >
                Reset
              </button>
            </div>
          )}
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
        <div className="text-center py-20 bg-sage-mist/10 rounded-lg border border-sage/20 my-4">
          <p className="text-base sm:text-lg font-sans text-charcoal/80 mb-3">
            No articles found matching your selected filters.
          </p>
          {isFiltered && (
            <button
              onClick={() => updateUrlAndState('All', '', 1)}
              className="inline-flex items-center text-xs font-sans font-semibold text-gold hover:text-deep-green uppercase tracking-wider transition-colors"
            >
              Clear all filters
            </button>
          )}
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
