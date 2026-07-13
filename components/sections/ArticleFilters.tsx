import React from 'react';
import Link from 'next/link';

interface ArticleFiltersProps {
  basePath?: string;
  searchParams?: Record<string, string | string[] | undefined>;
}

export const ArticleFilters: React.FC<ArticleFiltersProps> = ({ basePath = '/articles', searchParams = {} }) => {
  const currentArm = typeof searchParams.arm === 'string' ? searchParams.arm : 'All';
  const currentType = typeof searchParams.type === 'string' ? searchParams.type : '';

  const arms = ['All', 'Creation', 'Protection', 'Legacy', 'Pers.Fin', 'Economy'];
  const types = ['Insight', 'News'];

  const getArmUrl = (arm: string) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, val]) => {
      if (typeof val === 'string') {
        params.set(key, val);
      } else if (Array.isArray(val) && val[0]) {
        params.set(key, val[0]);
      }
    });
    
    if (arm === 'All') {
      params.delete('arm');
    } else {
      params.set('arm', arm);
    }
    params.delete('page'); // Reset pagination
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const getTypeUrl = (type: string) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, val]) => {
      if (typeof val === 'string') {
        params.set(key, val);
      } else if (Array.isArray(val) && val[0]) {
        params.set(key, val[0]);
      }
    });

    if (currentType === type) {
      params.delete('type');
    } else {
      params.set('type', type);
    }
    params.delete('page'); // Reset pagination
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 py-6 border-b border-sage/30 mb-8">
      {/* Primary Category Filters */}
      <div className="flex items-center gap-6">
        <span className="text-charcoal font-serif italic text-lg mr-2">Filter by</span>
        <div className="flex flex-wrap gap-4">
          {arms.map(arm => (
            <Link
              key={arm}
              href={getArmUrl(arm)}
              className={`text-sm font-sans tracking-wide transition-all duration-300 relative pb-1 ${
                currentArm === arm 
                  ? 'text-gold font-medium' 
                  : 'text-charcoal/85 hover:text-deep-green'
              }`}
            >
              {arm === 'Pers.Fin' ? 'Personal Finance' : arm}
              {currentArm === arm && (
                <span className="absolute bottom-0 left-0 w-full h-px bg-gold" />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Secondary Type Filters (Insight vs News) */}
      <div className="flex gap-4 border-l border-sage/30 pl-6">
        {types.map(type => (
          <Link
            key={type}
            href={getTypeUrl(type)}
            className={`text-xs font-sans uppercase tracking-[0.15em] px-3 py-1.5 border transition-colors ${
              currentType === type
                ? 'border-gold text-gold bg-gold/5'
                : 'border-sage/30 text-charcoal/85 hover:border-deep-green hover:text-deep-green'
            }`}
          >
            {type}
          </Link>
        ))}
      </div>
    </div>
  );
};
