import { useState } from 'react';

export const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getCurrentPageItems = <T>(items: T[]): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);
    return items.slice(startIndex, endIndex);
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    handlePageChange,
    getCurrentPageItems,
  };
};
