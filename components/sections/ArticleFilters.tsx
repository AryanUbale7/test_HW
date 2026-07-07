'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ArticleFiltersProps {
  basePath?: string;
}

export const ArticleFilters: React.FC<ArticleFiltersProps> = ({ basePath = '/articles' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentArm = searchParams.get('arm') || 'All';
  const currentType = searchParams.get('type') || '';

  const arms = ['All', 'Creation', 'Protection', 'Legacy'];
  const types = ['Insight', 'News'];

  const handleArmChange = (arm: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (arm === 'All') {
      params.delete('arm');
    } else {
      params.set('arm', arm);
    }
    params.delete('page'); // Reset pagination on filter change
    router.push(`${basePath}?${params.toString()}`);
  };

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentType === type) {
      params.delete('type');
    } else {
      params.set('type', type);
    }
    params.delete('page'); // Reset pagination on filter change
    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 py-6 border-b border-sage/30 mb-8">
      {/* Primary Category Filters */}
      <div className="flex items-center gap-6">
        <span className="text-charcoal font-serif italic text-lg mr-2">Filter by</span>
        <div className="flex flex-wrap gap-4">
          {arms.map(arm => (
            <button
              key={arm}
              onClick={() => handleArmChange(arm)}
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
        {types.map(type => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`text-xs font-sans uppercase tracking-[0.15em] px-3 py-1.5 border transition-colors ${
              currentType === type
                ? 'border-gold text-gold bg-gold/5'
                : 'border-sage/30 text-charcoal/60 hover:border-deep-green hover:text-deep-green'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};
