// import React, { useContext } from 'react';
// import { TransactionsContext } from './TransactionsContext';

// const RecurringTransactions = () => {
//   const { transactions } = useContext(TransactionsContext); // Access transactions from context

//   // Filter for recurring transactions
//   const recurringTransactions = transactions.filter(transaction => transaction.recurring);

//   return (
//     <div className="bg-white rounded-lg p-8">
//       <h2 className="text-2xl font-bold mb-4">Recurring Transactions</h2>
//       {recurringTransactions.length > 0 ? (
//         <ul className="space-y-2">
//           {recurringTransactions.map((transaction, index) => (
//             <li key={index} className="flex items-center justify-between p-2 border-b">
//               <div className="flex items-center">
//                 <img src={transaction.avatar} alt={transaction.name} className="w-8 h-8 rounded-full mr-3" />
//                 <span className="font-semibold">{transaction.name}</span>
//               </div>
//               <span className={`font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
//                 {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
//               </span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div className="py-4 text-center">No recurring transactions found.</div>
//       )}
//     </div>
//   );
// };

// export default RecurringTransactions;





import { useContext, useEffect, useState } from 'react';
import { TransactionsContext } from './TransactionsContext';
import { useSearchParams } from 'react-router-dom'; 
import BillsFilter from './BillsFilter';
import { PiReceiptLight  } from "react-icons/pi";


const RecurringBills = () => {
  const { transactions, searchQuery, sortBy } = useContext(TransactionsContext); // Access transactions from context

  // Filter for recurring transactions
  const recurringTransactions = transactions.filter(transaction => transaction.recurring);

  // Search functionality based on transaction name
  const filteredTransactions = recurringTransactions.filter(transaction => 
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort functionality
  const sortedTransactions = filteredTransactions.sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(a.date) - new Date(b.date);
      case 'oldest':
        return new Date(b.date) - new Date(a.date);
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

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='h-full'>
      <h2 className='text-3xl lg:text-xl font-bold mb-4'>Recurring Bills</h2>
      <div className='flex flex-col lg:flex-row gap-5'>
        <div className='flex flex-col md:flex-row lg:flex-col w-full lg:w-[30%] space-y-7 space-x-0 md:space-y-0 md:space-x-5  lg:space-y-7 lg:space-x-0'>
          <div className='flex flex-row md:flex-col items-center md:items-start md:justify-between space-x-5 md:space-x-0 bg-black text-white rounded-lg p-5 w-full md:w-[50%] lg:w-full'>
            <span className='text-3xl '><PiReceiptLight /></span>
            <div className='flex flex-col md:pt-8'>
              <span className=''>Total Bills</span>
              <span className='text-3xl md:text-5xl lg:text-3xl font-bold'>$384.98</span>
            </div>
          </div>
          <div className='bg-white text-black rounded-lg p-5 space-y-5 w-full md:w-[50%] lg:w-full'>
            <span className='font-bold text-xl'>Summary</span>
            <span className='flex items-center justify-between pb-2 border-b-2 border-gray-100'>
              <span>Paid Bills</span>
              <span className='font-bold'>4($190.00)</span>
            </span>
            <span className='flex items-center justify-between pb-2 border-b-2 border-gray-100'>
              <span>Total Upcoming</span>
              <span className='font-bold'>4($194.98)</span>
            </span>
            <span className='flex items-center justify-between text-red-700 '>
              <span>Due Soon</span>
              <span className='font-bold'>2($59.98)</span>
            </span>
          </div>
        </div>
        <div className='bg-white rounded-lg p-8 pb-12 md:pb-16 lg:pb-3 lg:w-[70%] h-full lg:h-[90vh] flex flex-col justify-around'>
        <BillsFilter />

        <div className='bg-white rounded-lg w-full h-full overflow-y-auto scroll-hidden'>
          {!isSmallScreen ? (
            <table className='min-w-full bg-white'>
              <thead className=''>
                <tr className='text-gray-600 text-sm font-semibold'>
                  <th className='py-2 px-4 border-b text-left'>Bill Title</th>
                  <th className='py-2 px-4 border-b text-left'>Due Date</th>
                  <th className='py-2 px-4 border-b text-right'>Amount</th>
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.length > 0 ? (
                  sortedTransactions.map((transaction, index) => (
                    <tr key={index} className='hover:bg-gray-100'>
                      <td className='py-2 px-4 border-b flex items-center font-semibold'>
                        <img src={transaction.avatar} alt={transaction.name} className='w-8 h-8 rounded-full mr-3' />
                        {transaction.name}
                      </td>
                      <td className='py-2 px-4 border-b text-gray-600 text-sm'>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className={`py-2 px-4 border-b text-right font-semibold ${transaction.amount < 0 ? 'text-black' : 'text-green-500'}`}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-4 text-center">No recurring transactions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            sortedTransactions.length > 0 ? (
              sortedTransactions.map((transaction, index) => (
                <div key={index} className='flex items-center justify-between w-full py-2 border-b hover:bg-gray-100'>
                  <div className='flex items-center justify-start w-[70%]'>
                    <div className='font-semibold'>
                      <img src={transaction.avatar} alt={transaction.name} className='w-8 h-8 rounded-full mr-3' />
                    </div>
                    <div className='flex flex-col items-start'>
                      <div>{transaction.name}</div>
                    </div>
                  </div>
                  <div className='flex flex-col-reverse items-end'>
                    <div className='text-gray-600 text-sm'>{new Date(transaction.date).toLocaleDateString()}</div>
                    <div className={`text-right font-semibold ${transaction.amount < 0 ? 'text-black' : 'text-green-500'}`}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 text-center">No recurring transactions found.</div>
            )
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default RecurringBills;























































// import { useContext, useEffect, useState } from 'react';
// import { TransactionsContext } from './TransactionsContext';
// import Pagination from './Pagination';
// // import TransactionsFilter from './TransactionsFilter';
// import { useSearchParams } from 'react-router-dom'; // Import useSearchParams
// import BillsFilter from './BillsFilter';

// const RecurringBills = () => {
//   const { 
//     currentTransactions, 
//     currentPage, setCurrentPage, 
//     totalPages, 
//     categoryFilter, setCategoryFilter 
//   } = useContext(TransactionsContext);
  
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

//   // Read the category from the query parameters
//   const [searchParams] = useSearchParams();
//   const queryCategory = searchParams.get('category');

//   // Filter transactions to show only recurring ones
//   const recurringTransactions = currentTransactions.filter(transaction => transaction.recurring);

//   useEffect(() => {
//     if (queryCategory) {
//       setCategoryFilter(queryCategory); // Update category filter based on query param
//     }
//   }, [queryCategory, setCategoryFilter]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 768);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className='h-full'>
//       <h2 className='text-3xl lg:text-xl font-bold mb-4'>Recurring Bills</h2>
//       <div className='bg-white rounded-lg p-8 pb-3 h-[80vh] lg:h-[90vh] flex flex-col justify-around'>
//         <BillsFilter />

//         <div className='bg-white rounded-lg w-full h-full overflow-y-auto scroll-hidden'>
//           {!isSmallScreen ? (
//             <table className='min-w-full bg-white'>
//               <thead className='bg-green-600'>
//                 <tr className='text-gray-600 text-sm font-semibold'>
//                   <th className='py-2 px-4 border-b text-left'>Bill Title</th>
//                   <th className='py-2 px-4 border-b text-left'>Due Date</th>
//                   <th className='py-2 px-4 border-b text-right'>Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recurringTransactions.length > 0 ? (
//                   recurringTransactions.map((transaction, index) => (
//                     <tr key={index} className='hover:bg-gray-100'>
//                       <td className='py-2 px-4 border-b flex items-center font-semibold'>
//                         <img src={transaction.avatar} alt={transaction.name} className='w-8 h-8 rounded-full mr-3' />
//                         {transaction.name}
//                       </td>
//                       <td className='py-2 px-4 border-b text-gray-600 text-sm'>{new Date(transaction.date).toLocaleDateString()}</td>
//                       <td className={`py-2 px-4 border-b text-right font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
//                         {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="3" className="py-4 text-center">No recurring transactions found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           ) : (
//             recurringTransactions.length > 0 ? (
//               recurringTransactions.map((transaction, index) => (
//                 <div key={index} className='flex items-center justify-between w-full py-2 border-b hover:bg-gray-100'>
//                   <div className='flex items-center justify-start w-[70%]'>
//                     <div className='font-semibold'>
//                       <img src={transaction.avatar} alt={transaction.name} className='w-8 h-8 rounded-full mr-3' />
//                     </div>
//                     <div className='flex flex-col items-start'>
//                       <div>{transaction.name}</div>
//                     </div>
//                   </div>
//                   <div className='flex flex-col-reverse items-end'>
//                     <div className='text-gray-600 text-sm'>{new Date(transaction.date).toLocaleDateString()}</div>
//                     <div className={`text-right font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
//                       {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="py-4 text-center">No recurring transactions found.</div>
//             )
//           )}
//         </div>
// {/* 
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           goToPage={setCurrentPage}
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default RecurringBills;











// import { useContext, useEffect, useState } from 'react';
// import { TransactionsContext } from './TransactionsContext';
// import Pagination from './Pagination';
// // import TransactionsFilter from './TransactionsFilter';
// import { useSearchParams } from 'react-router-dom'; // Import useSearchParams
// import BillsFilter from './BillsFilter';

// const RecurringBills = () => {
//   const { 
//     currentTransactions, 
//     currentPage, setCurrentPage, 
//     totalPages, 
//     categoryFilter, setCategoryFilter 
//   } = useContext(TransactionsContext);
  
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

//   // Read the category from the query parameters
//   const [searchParams] = useSearchParams();
//   const queryCategory = searchParams.get('category');

//   // Filter transactions to show only recurring ones
//   const recurringTransactions = currentTransactions.filter(transaction => transaction.isRecurring);

//   useEffect(() => {
//     if (queryCategory) {
//       setCategoryFilter(queryCategory); // Update category filter based on query param
//     }
//   }, [queryCategory, setCategoryFilter]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 768);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className='h-full'>
//       <h2 className='text-3xl lg:text-xl font-bold mb-4'>Recurring Bills</h2>
//       <div className='bg-white rounded-lg p-8 pb-3 h-[80vh] lg:h-[90vh] flex flex-col justify-around'>
//         <BillsFilter />

//         <div className='bg-white rounded-lg w-full h-full overflow-y-auto scroll-hidden'>
//           {!isSmallScreen ? (
//             <table className='min-w-full bg-white'>
//               <thead className='bg-green-600'>
//                 <tr className='text-gray-600 text-sm font-semibold'>
//                   <th className='py-2 px-4 border-b text-left'>Bill Title</th>
//                   <th className='py-2 px-4 border-b text-left'>Due Date</th>
//                   <th className='py-2 px-4 border-b text-right'>Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recurringTransactions.length > 0 ? (
//                   recurringTransactions.map((transaction, index) => (
//                     <tr key={index} className='hover:bg-gray-100'>
//                       <td className='py-2 px-4 border-b flex items-center font-semibold'>
//                         <img src={transaction.avatar} alt={transaction.name} className='w-8 h-8 rounded-full mr-3' />
//                         {transaction.name}
//                       </td>
//                       <td className='py-2 px-4 border-b text-gray-600 text-sm'>{new Date(transaction.date).toLocaleDateString()}</td>
//                       <td className={`py-2 px-4 border-b text-right font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
//                         {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="3" className="py-4 text-center">No recurring transactions found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           ) : (
//             recurringTransactions.length > 0 ? (
//               recurringTransactions.map((transaction, index) => (
//                 <div key={index} className='flex items-center justify-between w-full py-2 border-b hover:bg-gray-100'>
//                   <div className='flex items-center justify-start w-[70%]'>
//                     <div className='font-semibold'>
//                       <img src={transaction.avatar} alt={transaction.name} className='w-8 h-8 rounded-full mr-3' />
//                     </div>
//                     <div className='flex flex-col items-start'>
//                       <div>{transaction.name}</div>
//                     </div>
//                   </div>
//                   <div className='flex flex-col-reverse items-end'>
//                     <div className='text-gray-600 text-sm'>{new Date(transaction.date).toLocaleDateString()}</div>
//                     <div className={`text-right font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
//                       {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="py-4 text-center">No recurring transactions found.</div>
//             )
//           )}
//         </div>

//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           goToPage={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default RecurringBills;
