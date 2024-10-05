import { useContext, useEffect, useState } from 'react';
import { TransactionsContext } from './TransactionsContext';
import Pagination from './Pagination';
import TransactionsFilter from './TransactionsFilter';
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams

const Transactions = () => {
  const { 
    currentTransactions, 
    currentPage, setCurrentPage, 
    totalPages, 
    categoryFilter, setCategoryFilter 
  } = useContext(TransactionsContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  // Read the category from the query parameters
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('category');

  useEffect(() => {
    if (queryCategory) {
      setCategoryFilter(queryCategory); // Update category filter based on query param
    }
  }, [queryCategory, setCategoryFilter]);

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
      <h2 className='text-3xl lg:text-xl font-bold mb-4'>Transactions</h2>
      <div className='bg-white rounded-lg p-8 pb-3 h-[80vh] lg:h-[90vh] flex flex-col justify-around'>
        <TransactionsFilter />

        <div className='bg-white rounded-lg w-full h-full overflow-y-auto scroll-hidden'>
          {!isSmallScreen ? (
            <table className='min-w-full bg-white'>
              <thead className='bg-green-600'>
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
          ) : (
            currentTransactions.length > 0 ? (
              currentTransactions.map((transaction, index) => (
                <div key={index} className='flex items-center justify-between w-full py-2 border-b hover:bg-gray-100'>
                  <div className='flex items-center justify-start w-[70%]'>
                    <div className='font-semibold'>
                      <img src={transaction.avatar} alt={transaction.name} className='w-8 h-8 rounded-full mr-3' />
                    </div>
                    <div className='flex flex-col items-start'>
                      <div>{transaction.name}</div>
                      <div className='text-gray-600 text-sm'>{transaction.category}</div>
                    </div>
                  </div>
                  <div className='flex flex-col-reverse items-end'>
                    <div className='text-gray-600 text-sm'>{new Date(transaction.date).toLocaleDateString()}</div>
                    <div className={`text-right font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 text-center">No transactions found.</div>
            )
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Transactions;











// import React, { useContext, useEffect, useState } from 'react';
// import { TransactionsContext } from './TransactionsContext';
// import Pagination from './Pagination';
// import TransactionsFilter from './TransactionsFilter';

// const Transactions = () => {
//   const {
//     currentTransactions,
//     currentPage, setCurrentPage,
//     totalPages,
//   } = useContext(TransactionsContext);

//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

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
//       <h2 className='text-3xl lg:text-xl font-bold mb-4'>Transactions</h2>
//       <div className='bg-white rounded-lg p-8 pb-3 h-[80vh] lg:h-[90vh] flex flex-col justify-around'>
//         <TransactionsFilter />

//         <div className='bg-white rounded-lg w-full h-full overflow-y-auto scroll-hidden'>
//           {!isSmallScreen ? (
//             <table className='min-w-full bg-white'>
//               <thead className='bg-green-600'>
//                 <tr className='text-gray-600 text-sm font-semibold'>
//                   <th className='py-2 px-4 border-b text-left'>Recipient/Sender</th>
//                   <th className='py-2 px-4 border-b text-left'>Category</th>
//                   <th className='py-2 px-4 border-b text-left'>Transaction Date</th>
//                   <th className='py-2 px-4 border-b text-right'>Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTransactions.length > 0 ? (
//                   currentTransactions.map((transaction, index) => (
//                     <tr key={index} className='hover:bg-gray-100'>
//                       <td className='py-2 px-4 border-b flex items-center font-semibold'>
//                         <img src={transaction.avatar} alt={transaction.name} className='w-8 h-8 rounded-full mr-3' />
//                         {transaction.name}
//                       </td>
//                       <td className='py-2 px-4 border-b text-gray-600 text-sm'>{transaction.category}</td>
//                       <td className='py-2 px-4 border-b text-gray-600 text-sm'>{new Date(transaction.date).toLocaleDateString()}</td>
//                       <td className={`py-2 px-4 border-b text-right font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
//                         {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="py-4 text-center">No transactions found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           ) : (
//             currentTransactions.length > 0 ? (
//               currentTransactions.map((transaction, index) => (
//                 <div key={index} className='flex items-center justify-between w-full py-2 border-b hover:bg-gray-100'>
//                   <div className='flex items-center justify-start w-[70%]'>
//                     <div className='font-semibold'>
//                       <img src={transaction.avatar} alt={transaction.name} className='w-8 h-8 rounded-full mr-3' />
//                     </div>
//                     <div className='flex flex-col items-start'>
//                       <div>{transaction.name}</div>
//                       <div className='text-gray-600 text-sm'>{transaction.category}</div>
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
//               <div className="py-4 text-center">No transactions found.</div>
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

// export default Transactions;

