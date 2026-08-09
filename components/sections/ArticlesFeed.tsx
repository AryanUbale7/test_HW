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

  const arms = ['All', 'Building', 'Protection', 'Legacy', 'Pers.Fin', 'Economy'];
  const types = ['All', 'Guide', 'Money Conversation'];

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

  return (
    <div>
      {/* Topic & Type Filters (Pill Button Layout) */}
      <div className="mb-6 w-full space-y-4 bg-sage-mist/10 border border-sage/20 rounded-md p-4 sm:p-5">
        {/* Topic Filter */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm uppercase tracking-widest font-sans font-bold text-deep-green shrink-0 sm:pt-2">
            Topic:
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
            {arms.map((arm) => (
              <button
                key={arm}
                onClick={() => updateUrlAndState(arm, currentType, 1)}
                className={`text-xs sm:text-sm font-sans tracking-wide transition-all duration-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border whitespace-nowrap ${
                  currentArm === arm
                    ? 'text-gold font-semibold bg-sage-mist/60 border-gold/50 shadow-xs'
                    : 'text-charcoal/80 border-sage/30 hover:border-deep-green hover:text-deep-green bg-ivory/60'
                }`}
              >
                {arm === 'Pers.Fin' ? (
                  <>
                    <span className="hidden sm:inline">Personal Finance</span>
                    <span className="inline sm:hidden">Personal Fin</span>
                  </>
                ) : arm}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter (Guide / Money Conversation / Note) */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 border-t border-sage/20 pt-3">
          <span className="text-xs sm:text-sm uppercase tracking-widest font-sans font-bold text-deep-green shrink-0 sm:pt-2">
            Type:
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
            {types.map((typeVal) => {
              const filterVal = typeVal === 'All' ? '' : typeVal;
              const isSelected = currentType === filterVal;
              const isMoneyConversation = typeVal === 'Money Conversation';
              return (
                <button
                  key={typeVal}
                  onClick={() => updateUrlAndState(currentArm, filterVal, 1)}
                  className={`text-xs sm:text-sm font-sans tracking-wide transition-all duration-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border whitespace-nowrap ${
                    isSelected
                      ? isMoneyConversation
                        ? 'text-gold font-bold bg-gold/15 border-gold shadow-xs'
                        : 'text-deep-green font-bold bg-sage-mist/60 border-deep-green shadow-xs'
                      : isMoneyConversation
                        ? 'text-gold font-medium border-gold/40 hover:border-gold hover:bg-gold/10 bg-ivory/80'
                        : 'text-charcoal/80 border-sage/30 hover:border-deep-green hover:text-deep-green bg-ivory/60'
                  }`}
                >
                  {typeVal}
                </button>
              );
            })}
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
