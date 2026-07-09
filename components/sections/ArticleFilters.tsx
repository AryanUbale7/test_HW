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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-6 border-b border-sage/30 mb-8">
      {/* Primary Category Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-charcoal font-sans font-semibold text-sm">Filter:</span>
        <div className="flex flex-wrap gap-2">
          {arms.map(arm => {
            const isActive = currentArm === arm;
            return (
              <Link
                key={arm}
                href={getArmUrl(arm)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                  isActive 
                    ? 'bg-gold text-ivory shadow-sm' 
                    : 'bg-sage-mist/50 text-charcoal/80 hover:bg-sage-mist hover:text-deep-green'
                }`}
              >
                {arm}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Secondary Type Filters (Insight vs News) */}
      <div className="flex gap-2.5 flex-wrap">
        {types.map(type => (
          <Link
            key={type}
            href={getTypeUrl(type)}
            className={`text-xs font-sans uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-sm border transition-colors ${
              currentType === type
                ? 'border-gold text-gold bg-gold/5 font-medium'
                : 'border-sage/30 text-charcoal/60 hover:border-deep-green hover:text-deep-green'
            }`}
          >
            {type}
          </Link>
        ))}
      </div>
    </div>
  );
};
