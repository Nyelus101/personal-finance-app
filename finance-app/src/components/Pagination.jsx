import React, { useEffect, useState } from 'react';
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxButtons = isSmallScreen ? 3 : 5; // Fewer buttons for small screens

  const renderPageNumbers = () => {
    const pageButtons = [];

    if (totalPages > maxButtons) {
      // Handle ellipsis for small screens
      pageButtons.push(
        <button key={1} onClick={() => goToPage(1)} className={`${currentPage === 1 ? 'font-bold' : ''} px-2 py-1`}>
          1
        </button>
      );
      // if (currentPage > 2) pageButtons.push(<span key="start-ellipsis" className="px-2">...</span>);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(currentPage + 1, totalPages - 1);

      for (let page = startPage; page <= endPage; page++) {
        pageButtons.push(
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`${currentPage === page ? 'font-bold' : ''} px-2 py-1`}
          >
            {page}
          </button>
        );
      }

      if (currentPage < totalPages - 1) pageButtons.push(<span key="end-ellipsis" className="px-2">...</span>);
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={`${currentPage === totalPages ? 'font-bold' : ''} px-2 py-1`}
        >
          {totalPages}
        </button>
      );
    } else {
      // Display all page numbers if total pages are fewer than maxButtons
      for (let page = 1; page <= totalPages; page++) {
        pageButtons.push(
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`${currentPage === page ? 'font-bold bg-black text-white' : ''} px-4 py-1 rounded-md`}
          >
            {page}
          </button>
        );
      }
    }

    return pageButtons;
  };

  return (
    <div className='mt-4 flex justify-between items-center space-x-2'>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className='text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50 flex flex-row items-center justify-between border-2 border-gray-200 h-10'
      >
        <IoMdArrowDropleft />
        <span className='hidden md:flex'>Prev</span>
      </button>

      <div className='flex space-x-1'>{renderPageNumbers()}</div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50 flex flex-row items-center justify-between border-2 border-gray-200 h-10'
      >
        <span className='hidden md:flex'>Next</span>
        <IoMdArrowDropright />
      </button>
    </div>
  );
};

export default Pagination;
