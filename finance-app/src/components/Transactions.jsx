import React, { useState } from 'react';
import data from '../assets/data.json';
import Pagination from './Pagination';
import TransactionsFilter from './TransactionsFilter'; // Import TransactionsFilter component

const Transactions = () => {
  const transactions = data.transactions || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const transactionsPerPage = 10;

  // Handle page changes
  const goToPage = (page) => setCurrentPage(page);

  // Filter by search query
  const filteredBySearch = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter by category
  const filteredByCategory = categoryFilter === 'All'
    ? filteredBySearch
    : filteredBySearch.filter(transaction => transaction.category === categoryFilter);

  // Sort the filtered transactions
  const sortedTransactions = [...filteredByCategory].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'A-Z':
        return a.name.localeCompare(b.name);
      case 'Z-A':
        return b.name.localeCompare(a.name);
      case 'highest':
        return b.amount - a.amount;
      case 'lowest':
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  // Calculate total pages
  const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);

  // Slice transactions to only show the current page's data
  const currentTransactions = sortedTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  return (
    <div className='h-full'>
      <h2 className='text-3xl lg:text-xl font-bold mb-4'>Transactions</h2>
      <div className='bg-white rounded-lg p-8 pb-3 h-[500px] lg:h-[90%] flex flex-col justify-around'>
      {/* Render the TransactionsFilter component */}
      <TransactionsFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {/* Transactions Table */}
      <div className='bg-white rounded-lg w-full h-full overflow-y-auto scroll-hidden '>
        <table className='min-w-full bg-white'>
          <thead className='bg-green-600 hidden md:table-header-group'>
            <tr className='text-gray-600 text-sm font-semibold'>
              <th className='py-2 px-4 border-b text-left'>Recipient/Sender</th>
              <th className='py-2 px-4 border-b text-left'>Category</th>
              <th className='py-2 px-4 border-b text-left'>Transaction Date</th>
              <th className='py-2 px-4 border-b text-right'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction, index) => (
                <tr key={index} className='hover:bg-gray-100'>
                  <td className='py-2 px-4 border-b flex items-center font-semibold'>
                    <img src={transaction.avatar} alt={transaction.name} className='w-8 h-8 rounded-full mr-3' />
                    {transaction.name}
                  </td>
                  <td className='py-2 px-4 border-b text-gray-600 text-sm'>{transaction.category}</td>
                  <td className='py-2 px-4 border-b text-gray-600 text-sm'>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className={`py-2 px-4 border-b text-right font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
      </div>
    </div>
  );
};

export default Transactions;











// import React, { useState } from 'react';
// import data from '../assets/data.json';
// import Pagination from './Pagination'; // Import the Pagination component

// const Transactions = () => {
//   const transactions = data.transactions || [];
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('latest');
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const transactionsPerPage = 10;

//   // Category options
//   const categories = ['All', 'Entertainment', 'Bills', 'Groceries', 'Dining Out', 'Transportation', 'Personal Care', 'Education', 'Lifestyle', 'Shopping', 'General'];

//   // Handle page changes
//   const goToPage = (page) => setCurrentPage(page);

//   // Filter by search query
//   const filteredBySearch = transactions.filter(transaction =>
//     transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Filter by category
//   const filteredByCategory = categoryFilter === 'All'
//     ? filteredBySearch
//     : filteredBySearch.filter(transaction => transaction.category === categoryFilter);

//   // Sort the filtered transactions
//   const sortedTransactions = [...filteredByCategory].sort((a, b) => {
//     switch (sortBy) {
//       case 'latest':
//         return new Date(b.date) - new Date(a.date);
//       case 'oldest':
//         return new Date(a.date) - new Date(b.date);
//       case 'A-Z':
//         return a.name.localeCompare(b.name);
//       case 'Z-A':
//         return b.name.localeCompare(a.name);
//       case 'highest':
//         return b.amount - a.amount;
//       case 'lowest':
//         return a.amount - b.amount;
//       default:
//         return 0;
//     }
//   });

//   // Calculate total pages
//   const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);

//   // Slice transactions to only show the current page's data
//   const currentTransactions = sortedTransactions.slice(
//     (currentPage - 1) * transactionsPerPage,
//     currentPage * transactionsPerPage
//   );

//   return (
//     <div className='h-full'>
//       <h2 className='text-xl font-semibold mb-4'>Transactions</h2>
      
//       {/* Search, Sort, and Filter Controls */}
//       <div className='flex flex-col sm:flex-row justify-between mb-4'>
//         {/* Search */}
//         <input
//           type='text'
//           placeholder='Search by name'
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className='mb-2 sm:mb-0 p-2 border rounded'
//         />

//         {/* Sort */}
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className='mb-2 sm:mb-0 p-2 border rounded'
//         >
//           <option value='latest'>Latest</option>
//           <option value='oldest'>Oldest</option>
//           <option value='A-Z'>A to Z</option>
//           <option value='Z-A'>Z to A</option>
//           <option value='highest'>Highest Amount</option>
//           <option value='lowest'>Lowest Amount</option>
//         </select>

//         {/* Filter by Category */}
//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           className='p-2 border rounded'
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Transactions Table */}
//       <div className='bg-white rounded-lg'>
//         <table className='min-w-full bg-white'>
//           <thead>
//             <tr>
//               <th className='py-2 px-4 border-b text-left'>Recipient/Sender</th>
//               <th className='py-2 px-4 border-b text-left'>Category</th>
//               <th className='py-2 px-4 border-b text-left'>Transaction Date</th>
//               <th className='py-2 px-4 border-b text-right'>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentTransactions.length > 0 ? (
//               currentTransactions.map((transaction, index) => (
//                 <tr key={index} className='hover:bg-gray-100'>
//                   <td className='py-2 px-4 border-b flex items-center'>
//                     <img src={transaction.avatar} alt={transaction.name} className='w-8 h-8 rounded-full mr-3' />
//                     {transaction.name}
//                   </td>
//                   <td className='py-2 px-4 border-b'>{transaction.category}</td>
//                   <td className='py-2 px-4 border-b'>{new Date(transaction.date).toLocaleDateString()}</td>
//                   <td className={`py-2 px-4 border-b text-right ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
//                     {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="py-4 text-center">No transactions found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         goToPage={goToPage}
//       />
//     </div>
//   );
// };

// export default Transactions;

