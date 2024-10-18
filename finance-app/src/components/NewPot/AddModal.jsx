import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";

const Add = ({ pot, isOpen, toggleModal }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 50 }}>
      <div className="bg-white p-8 space-y-5 rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <div className='flex items-center justify-between'>
          <span className='font-bold text-2xl '>Add to '{pot.name}'</span>
          <button className="" type="button" onClick={toggleModal}>
            <IoCloseCircleOutline size={24} />
          </button>
        </div>
        <p>Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.</p>
        <div>
          <div className='flex items-center justify-between'>
            <p className='text-xs text-gray-500'>New Amount</p>
            <p className='font-semibold text-2xl'>${(pot.total).toFixed(2)}</p>
          </div>
          <div className="w-full bg-gray-200 rounded h-2 my-3">
            <div 
              className="h-full rounded" 
              style={{ 
                width: `${Math.min((pot.total / pot.target) * 100, 100)}%`, 
                backgroundColor: pot.theme 
                }}
            />
          </div>
          <div className='flex items-center justify-between'>
            {/* <div>{((pot.total * pot.target) / 100)}%</div> */}
            <div className='font-bold text-gray-500'>{((pot.total / pot.target) * 100).toFixed(2)}%</div>
            <span className='text-gray-500 text-sm'>Target of ${pot.target} </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium">
              Amount to Add
            </label>
            <input 
              type="number" 
              id="amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)} 
              className="w-full p-2 border rounded"
              placeholder='$'
            />
          </div>
          <button 
            type="submit" 
            className="bg-black text-white w-full px-4 py-2 rounded"
          >
            Confirm Addition
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
