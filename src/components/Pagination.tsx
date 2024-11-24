import React from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const generatePageNumbers = () => {
    const pages: (number | JSX.Element)[] = [];
    const visiblePages = 1;

    if (currentPage > visiblePages + 1) {
      pages.push(1, <BsThreeDots key="dots-before" />);
    } else {
      for (let i = 1; i < currentPage; i++) {
        pages.push(i);
      }
    }

    for (
      let i = Math.max(1, currentPage - visiblePages);
      i <= Math.min(totalPages, currentPage + visiblePages);
      i++
    ) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (currentPage < totalPages - visiblePages) {
      pages.push(<BsThreeDots key="dots-after" />, totalPages);
    } else {
      for (let i = currentPage + 1; i <= totalPages; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-2 p-4">
      <button
        className="px-2 py-1 h-8 flex flex-col items-center justify-center text-sm md:text-base md:px-3 md:py-1 text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <GrLinkPrevious />
      </button>

      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`px-2 py-1 h-8 flex flex-col items-center justify-center text-sm md:text-base md:px-3 md:py-1 rounded-md ${
              currentPage === page
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-500 hover:bg-gray-300"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="px-2 py-1 h-8 flex flex-col items-center justify-center text-sm md:text-base md:px-3 md:py-1 text-gray-500"
          >
            {page}
          </span>
        )
      )}

      <button
        className="px-2 py-1 h-8 flex flex-col items-center justify-center text-sm md:text-base md:px-3 md:py-1 text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <GrLinkNext />
      </button>
    </nav>
  );
};

export default Pagination;
