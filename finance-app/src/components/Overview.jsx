import React, { useContext } from 'react';
import { TransactionsContext } from './TransactionsContext';
import { IoCaretForward } from "react-icons/io5";
import DonutChart from './DonutChart';
import { PiTipJarLight } from "react-icons/pi";


const Overview = () => {
  const { budgets, balance, transactions, pots } = useContext(TransactionsContext); // Access transactions from context

  // Get the latest five transactions
  const latestTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by latest
    .slice(0, 5); // Get the last 5 transactions

  return (
    <div className='h-full'>
      <span className='text-3xl lg:text-xl font-bold mb-4'>Overview</span>
      <div className=' pt-4 space-y-4 h-full '>
        <div className='div-1 three-divs flex flex-col md:flex-row items-center justify-between w-full space-y-3 md:space-y-0'>
          <div className='flex flex-col items-start bg-black text-white p-3 space-y-1 rounded-2xl w-full md:w-[30%] ' >
            <span className='text-sm'>Current Balance</span>
            <span className='font-semibold text-3xl'>${(balance.current).toFixed(2)}</span> 
          </div>
          <div className='flex flex-col items-start bg-white text-black p-3 space-y-1 rounded-2xl w-full md:w-[30%]'>
            <span className='text-sm'>Income</span>
            <span className='font-semibold text-3xl'>${(balance.income).toFixed(2)}</span>
          </div>
          <div className='flex flex-col items-start bg-white text-black p-3 space-y-1 rounded-2xl w-full md:w-[30%]'>
            <span className='text-sm'>Expenses</span>
            <span className='font-semibold text-3xl'>${(balance.expenses).toFixed(2)}</span>
          </div>
        </div>
        <div className='div-2 flex flex-col md:flex-row gap-4 h-full '>
          <div className=' w-full md:w-[60%] flex flex-col h-[80%] gap-3 '>
            <div className='bg-white h-[30%] rounded-2xl p-3 '>
              <div className='flex items-center justify-between mb-2'>
                  <h4 className="text-sm font-bold">Pots</h4>
                  <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
                    <span className="">See Details</span>
                    <IoCaretForward />
                  </div>
              </div>
              <div className='flex flex-row items-center justify-between w-full gap-2'>
                <div className='flex flex-row items-center gap-7 rounded-2xl p-2 w-[40%] bg-custom-bg'>
                  <div className='text-5xl'>
                    <PiTipJarLight />
                  </div>
                  <div className='flex flex-col space-y-1 '>
                    <span className='text-base'>Total Saved</span>
                    <span className='font-bold text-4xl'>$850</span>
                  </div>
                </div>
                <div className='w-[60%] bg-yellow-300'>
                  <ul className="grid grid-cols-2 ">
                    {pots.slice(0, 4).map((pot) => (
                      <li key={pot.id} className="">
                        <div className="bg-white  shadow rounded-lg">
                          <p className='font-semibold text-2xl'>${(pot.total).toFixed(2)}</p>                
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
            <div className='bg-white h-[70%] rounded-2xl p-3'>
              <div className='flex items-center justify-between mb-2'>
                  <h4 className="text-sm font-bold">Transactions</h4>
                  <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
                    <span className="">View all</span>
                    <IoCaretForward />
                  </div>                
              </div>
              <div className='transactions-list space-y-2'>
                {latestTransactions.map((transaction) => (
                  <div key={transaction.id} className='flex items-center justify-between border-b-2 bg-white px-2 py-1 rounded-lg '>
                    <div className='flex items-center justify-between w-full  space-x-2'>
                      <div className='flex items-center gap-5'>
                        <div className='bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center'>
                          <img src={transaction.avatar} />
                        </div>
                        <span className='block font-bold'>{transaction.name}</span>
                      </div>
                      <div className='flex flex-col items-end  text-sm'>
                        <span className={`text-right font-semibold ${transaction.amount < 0 ? 'text-black' : 'text-green-500'}`}>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}</span>
                        <span className='text-gray-400 text-xs'>{new Date(transaction.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col  w-full md:w-[40%] h-[80%] gap-3  '>
            <div className='bg-white h-[60%] rounded-2xl p-3 '>
              <div className='flex items-center justify-between '>
                <h4 className="text-sm font-bold">Budgets</h4>
                <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
                  <span className="">See Details</span>
                  <IoCaretForward />
                </div>
              </div>
              <div className='flex flex-row items-center'>
                <div className='w-[70%] flex items-center h-full'>
                  {/* Apply specific width/height using Tailwind and restrict to max size */}
                  <div className="w-full h-fit ">
                    <DonutChart budgets={budgets} transactions={transactions} />
                  </div>
                </div>
                <div className='summary w-[30%]'>
                <div className='spendingSummary pt-4'>
                  {budgets.map((budget, index) => {
                    return (
                      <div key={index} className='category-item flex flex-col py-1 items-start '>
                        <div className='flex flex-col items-start pl-2' style={{ borderLeft: `4px solid ${budget.theme}` }}>
                          <h4 className='text-sm font-normal text-gray-400'>{budget.category}</h4>
                          <span className='font-bold text-sm text-black'>${budget.maximum.toFixed(2)}</span> 
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
              </div>
            </div>
            <div className='bg-white h-[40%] rounded-2xl p-3 '>
              <div className='flex items-center justify-between mb-2'>
                  <h4 className="text-sm font-bold">Recurring Bills</h4>
                  <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
                    <span className="">See Details</span>
                    <IoCaretForward />
                  </div>
              </div>
              <div className='space-y-2'>
                <div className='flex  items-center justify-between bg-custom-bg p-2 rounded-lg' style={{ borderLeft: `4px solid #277C78` }}>
                  <span className='text-gray-600'>Paid Bills</span>
                  <span className='font-bold'>$190.00</span>
                </div>
                <div className='flex  items-center justify-between bg-custom-bg p-2 rounded-lg' style={{ borderLeft: `4px solid #F2CDAC` }}>
                  <span className='text-gray-600'>Total Upcoming</span>
                  <span className='font-bold'>$194.98</span>
                </div>
                <div className='flex  items-center justify-between bg-custom-bg p-2 rounded-lg' style={{ borderLeft: `4px solid #82C9D7` }}>
                  <span className='text-gray-600'>Due Soon</span>
                  <span className='font-bold'>$59.98</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview;












// import React, { useState, useContext } from 'react';
// import { TransactionsContext } from './TransactionsContext';
// import { IoCaretForward } from "react-icons/io5";
// import DonutChart from './DonutChart'; // Import the DonutChart component




// const Overview = () => {
//   const { budgets, balance, transactions } = useContext(TransactionsContext); // Access transactions from context

//   return (
//     <div className='h-full'>
//       <span className='text-3xl lg:text-xl font-bold mb-4'>Overview</span>
//       <div className=' pt-4 space-y-4 h-full '>
//         <div className='div-1 three-divs flex flex-col md:flex-row items-center justify-between w-full space-y-3 md:space-y-0'>
//           <div className='flex flex-col items-start bg-black text-white p-3 space-y-1 rounded-2xl w-full md:w-[30%] ' >
//             <span className='text-sm'>Current Balance</span>
//             <span className='font-semibold text-3xl'>${(balance.current).toFixed(2)}</span> 
//           </div>
//           <div className='flex flex-col items-start bg-white text-black p-3 space-y-1 rounded-2xl w-full md:w-[30%]'>
//             <span className='text-sm'>Income</span>
//             <span className='font-semibold text-3xl'>${(balance.income).toFixed(2)}</span>
//           </div>
//           <div className='flex flex-col items-start bg-white text-black p-3 space-y-1 rounded-2xl w-full md:w-[30%]'>
//           <span className='text-sm'>Expenses</span>
//           <span className='font-semibold text-3xl'>${(balance.expenses).toFixed(2)}</span>
//           </div>
//         </div>
//         <div className='div-2 flex flex-col md:flex-row gap-4 h-full '>
//           <div className=' w-full md:w-[60%] flex flex-col h-[80%] gap-3 '>
//             <div className='bg-blue-400 h-[30%] rounded-2xl p-3 '>
//               <div className='flex items-center justify-between mb-2'>
//                   <h4 className="text-sm font-bold">Pots</h4>
//                   <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
//                     <span className="">See Details</span>
//                     <IoCaretForward />
//                   </div>
//               </div>
//             </div>
//             <div className='bg-purple-500 h-[70%] rounded-2xl p-3'>
//               <div className='flex items-center justify-between mb-2'>
//                   <h4 className="text-sm font-bold">Transactions</h4>
//                   <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
//                     <span className="">View all</span>
//                     <IoCaretForward />
//                   </div>                
//               </div>
//               <div className='transactions-list'>transactions-list </div>
//             </div>
//           </div>
//           <div className='flex flex-col  w-full md:w-[40%] h-[80%] gap-3  '>
//             <div className='bg-white h-[60%] rounded-2xl p-3 '>
//               <div className='flex items-center justify-between '>
//                 <h4 className="text-sm font-bold">Budgets</h4>
//                 <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
//                   <span className="">See Details</span>
//                   <IoCaretForward />
//                 </div>
//               </div>
//               <div className='flex flex-row items-center'>
//                 <div className='w-[70%] flex items-center h-full'>
//                   {/* Apply specific width/height using Tailwind and restrict to max size */}
//                   <div className="w-full h-fit ">
//                     <DonutChart budgets={budgets} transactions={transactions} />
//                   </div>
//                 </div>
//                 <div className='summary w-[30%]'>
//                 <div className='spendingSummary pt-4'>
//                   {budgets.map((budget, index) => {
//                     return (
//                       <div key={index} className='category-item flex flex-col py-1 items-start '>
//                         <div className='flex flex-col items-start pl-2' style={{ borderLeft: `4px solid ${budget.theme}` }}>
//                           <h4 className='text-sm font-normal text-gray-400'>{budget.category}</h4>
//                           <span className='font-bold text-sm text-black'>${budget.maximum.toFixed(2)}</span> 
//                         </div>
                        
//                       </div>
//                     );
//                   })}
//                 </div>
//                 </div>
//               </div>
//             </div>
//             <div className='bg-white h-[40%] rounded-2xl p-3 '>
//               <div className='flex items-center justify-between mb-2'>
//                   <h4 className="text-sm font-bold">Recurring Bills</h4>
//                   <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
//                     <span className="">See Details</span>
//                     <IoCaretForward />
//                   </div>
//               </div>
//               <div className='space-y-2'>
//                 <div className='flex  items-center justify-between bg-custom-bg p-2 rounded-lg' style={{ borderLeft: `4px solid #277C78` }}>
//                   <span className='text-gray-600'>Paid Bills</span>
//                   <span className='font-bold'>$190.00</span>
//                 </div>
//                 <div className='flex  items-center justify-between bg-custom-bg p-2 rounded-lg' style={{ borderLeft: `4px solid #F2CDAC` }}>
//                   <span className='text-gray-600'>Total Upcoming</span>
//                   <span className='font-bold'>$194.98</span>
//                 </div>
//                 <div className='flex  items-center justify-between bg-custom-bg p-2 rounded-lg' style={{ borderLeft: `4px solid #82C9D7` }}>
//                   <span className='text-gray-600'>Due Soon</span>
//                   <span className='font-bold'>$59.98</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Overview