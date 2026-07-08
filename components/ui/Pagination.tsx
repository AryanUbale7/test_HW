import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  basePath?: string;
  searchParams?: Record<string, string | string[] | undefined>;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  basePath = '/articles',
  searchParams = {}
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, val]) => {
      if (typeof val === 'string') {
        params.set(key, val);
      } else if (Array.isArray(val) && val[0]) {
        params.set(key, val[0]);
      }
    });
    params.set('page', page.toString());
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-16 pt-8 border-t border-sage/30">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          prefetch={false}
          className="px-4 py-2 font-sans text-sm text-charcoal hover:text-gold transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 font-sans text-sm text-charcoal/40 cursor-not-allowed select-none">
          Previous
        </span>
      )}
      
      <span className="font-sans text-sm text-deep-green font-medium">
        Page {currentPage} of {totalPages}
      </span>
      
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          prefetch={false}
          className="px-4 py-2 font-sans text-sm text-charcoal hover:text-gold transition-colors"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 font-sans text-sm text-charcoal/40 cursor-not-allowed select-none">
          Next
        </span>
      )}
    </div>
  );
};
