import React, { useState, useContext } from 'react';
import { TransactionsContext } from './TransactionsContext';
import { IoCaretForward } from "react-icons/io5";



const Overview = () => {
  const { budgets, balance, transactions } = useContext(TransactionsContext); // Access transactions from context

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
            <div className='bg-blue-400 h-[30%] rounded-2xl p-3 '>
              <div className='flex items-center justify-between mb-2'>
                  <h4 className="text-sm font-bold">Pots</h4>
                  <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
                    <span className="">See Details</span>
                    <IoCaretForward />
                  </div>
              </div>
            </div>
            <div className='bg-purple-500 h-[70%] rounded-2xl p-3'>
              <div className='flex items-center justify-between mb-2'>
                  <h4 className="text-sm font-bold">Transactions</h4>
                  <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
                    <span className="">View all</span>
                    <IoCaretForward />
                  </div>
                </div>
            </div>
          </div>
          <div className='flex flex-col  w-full md:w-[40%] h-[80%] gap-3  '>
            <div className='bg-red-400 h-[60%] rounded-2xl p-3 '>
              <div className='flex items-center justify-between mb-2'>
                <h4 className="text-sm font-bold">Budgets</h4>
                <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
                  <span className="">See Details</span>
                  <IoCaretForward />
                </div>
              </div>
              <div className='flex flex-row items-center'>
                <div>donutpie</div>
                <div>summary</div>
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

export default Overview