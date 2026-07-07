'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  basePath?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, basePath = '/articles' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-16 pt-8 border-t border-sage/30">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 font-sans text-sm text-charcoal disabled:opacity-50 disabled:cursor-not-allowed hover:text-gold transition-colors"
      >
        Previous
      </button>
      
      <span className="font-sans text-sm text-deep-green font-medium">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 font-sans text-sm text-charcoal disabled:opacity-50 disabled:cursor-not-allowed hover:text-gold transition-colors"
      >
        Next
      </button>
    </div>
  );
};
