import React, { useContext, useRef, useState, useEffect } from 'react';
import { TransactionsContext } from './TransactionsContext';
import { IoMdSearch } from "react-icons/io";
import { RiFilter2Fill } from "react-icons/ri";
import { PiSortAscendingFill } from "react-icons/pi";

const TransactionsFilter = () => {
  const {
    searchQuery, setSearchQuery,
    sortBy, setSortBy,
    categoryFilter, setCategoryFilter,
  } = useContext(TransactionsContext);

  // Category options
  const categories = ['All', 'Entertainment', 'Bills', 'Groceries', 'Dining Out', 'Transportation', 'Personal Care', 'Education', 'Lifestyle', 'Shopping', 'General'];

  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const sortDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  // Close dropdowns if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex flex-row justify-between items-center mb-4'>
      {/* Search */}
      <div className="flex items-center border rounded w-[50%] md:w-[30%]">
        <input
          type='text'
          placeholder='Search transaction'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full p-2 border-none focus:outline-none'
        />
        <IoMdSearch className='text-gray-500 mr-2' />
      </div>

      {/* Dropdowns for Small Screens */}
      <div className="md:hidden flex space-x-4">
        {/* Sort Icon */}
        <div className="relative" ref={sortDropdownRef}>
          <PiSortAscendingFill
            className="text-2xl text-gray-600 cursor-pointer"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          />
          {showSortDropdown && (
            <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg p-2 z-10">
              <ul className='cursor-pointer p-2 w-[150px]'>
                <li className='py-1' onClick={() => setSortBy('latest')}>Latest</li>
                <li className='py-1' onClick={() => setSortBy('oldest')}>Oldest</li>
                <li className='py-1' onClick={() => setSortBy('A-Z')}>A to Z</li>
                <li className='py-1' onClick={() => setSortBy('Z-A')}>Z to A</li>
                <li className='py-1' onClick={() => setSortBy('highest')}>Highest Amount</li>
                <li className='py-1' onClick={() => setSortBy('lowest')}>Lowest Amount</li>
              </ul>
            </div>
          )}
        </div>

        {/* Category Icon */}
        <div className="relative" ref={categoryDropdownRef}>
          <RiFilter2Fill
            className="text-2xl text-gray-600 cursor-pointer"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          />
          {showCategoryDropdown && (
            <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg p-2 z-10">
              <ul className='cursor-pointer p-2 w-[150px]'>
                {categories.map((category) => (
                  <li key={category} className='py-1' onClick={() => setCategoryFilter(category)}>
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Sort and Filter for Medium and Larger Screens */}
      <div className="hidden md:flex space-x-4">
        <label className='text-gray-600 text-sm'>
          <span className='p-3'>Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='mb-2 md:mb-0 p-2 border rounded'
          >
            <option value='latest'>Latest</option>
            <option value='oldest'>Oldest</option>
            <option value='A-Z'>A to Z</option>
            <option value='Z-A'>Z to A</option>
            <option value='highest'>Highest Amount</option>
            <option value='lowest'>Lowest Amount</option>
          </select>
        </label>

        <label className='text-gray-600 text-sm'>
          <span className='p-3'>Category</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='p-2 border rounded'
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default TransactionsFilter;











// import React, { useState, useEffect, useRef } from 'react';
// import { IoMdSearch } from "react-icons/io";
// import { RiFilter2Fill } from "react-icons/ri";
// import { PiSortAscendingFill } from "react-icons/pi";

// const TransactionsFilter = ({ searchQuery, setSearchQuery, sortBy, setSortBy, categoryFilter, setCategoryFilter }) => {
//   // Category options
//   const categories = ['All', 'Entertainment', 'Bills', 'Groceries', 'Dining Out', 'Transportation', 'Personal Care', 'Education', 'Lifestyle', 'Shopping', 'General'];

//   const [showSortDropdown, setShowSortDropdown] = useState(false);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

//   const sortDropdownRef = useRef(null);
//   const categoryDropdownRef = useRef(null);

//   // Close dropdowns if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
//         setShowSortDropdown(false);
//       }
//       if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
//         setShowCategoryDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className='flex flex-row justify-between items-center mb-4'>
//       {/* Search */}
//       <div className="flex items-center border rounded w-[50%] md:w-[30%] ">
//         <input
//           type='text'
//           placeholder='Search transaction'
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className='w-full p-2 border-none focus:outline-none'
//         />
//         <IoMdSearch className='text-gray-500 mr-2' />
//       </div>

//       {/* Dropdowns for Small Screens */}
//       <div className="md:hidden flex space-x-4">
//         {/* Sort Icon */}
//         <div className="relative" ref={sortDropdownRef}>
//           <PiSortAscendingFill
//             className="text-2xl text-gray-600 cursor-pointer"
//             onClick={() => setShowSortDropdown(!showSortDropdown)}
//           />
//           {showSortDropdown && (
//             <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg p-2 z-10">
//               <ul className='cursor-pointer p-2 w-[150px]'>
//                 <li className='py-1' onClick={() => setSortBy('latest')}>Latest</li>
//                 <li className='py-1' onClick={() => setSortBy('oldest')}>Oldest</li>
//                 <li className='py-1' onClick={() => setSortBy('A-Z')}>A to Z</li>
//                 <li className='py-1' onClick={() => setSortBy('Z-A')}>Z to A</li>
//                 <li className='py-1' onClick={() => setSortBy('highest')}>Highest Amount</li>
//                 <li className='py-1' onClick={() => setSortBy('lowest')}>Lowest Amount</li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Category Icon */}
//         <div className="relative" ref={categoryDropdownRef}>
//           <RiFilter2Fill
//             className="text-2xl text-gray-600 cursor-pointer"
//             onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
//           />
//           {showCategoryDropdown && (
//             <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg p-2 z-10">
//               <ul className='cursor-pointer p-2 w-[150px]'>
//                 {categories.map((category) => (
//                   <li key={category} className='py-1' onClick={() => setCategoryFilter(category)}>
//                     {category}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Sort and Filter for Medium and Larger Screens */}
//       <div className="hidden md:flex space-x-4">
//         <label className='text-gray-600 text-sm'>
//           <span className='p-3'>Sort by</span>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className='mb-2 md:mb-0 p-2 border rounded'
//           >
//             <option value='latest'>Latest</option>
//             <option value='oldest'>Oldest</option>
//             <option value='A-Z'>A to Z</option>
//             <option value='Z-A'>Z to A</option>
//             <option value='highest'>Highest Amount</option>
//             <option value='lowest'>Lowest Amount</option>
//           </select>
//         </label>

//         <label className='text-gray-600 text-sm'>
//           <span className='p-3'>Category</span>
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className='p-2 border rounded'
//           >
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default TransactionsFilter;