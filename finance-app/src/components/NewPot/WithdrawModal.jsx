import React, { useState, useContext, useEffect } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { TransactionsContext } from '../TransactionsContext';

const WithdrawModal = ({ pot, isOpen, toggleModal }) => {
  const { updatePot } = useContext(TransactionsContext); // Access the updatePot function from context
  const [amount, setAmount] = useState('');
  const [newTotal, setNewTotal] = useState(pot.total); // State to store the new total

  // Update the new total dynamically while typing, subtracting the input amount from the pot's total
  useEffect(() => {
    const newAmount = parseFloat(amount) || 0;
    // Ensure the new total doesn't go below 0
    setNewTotal(Math.max(pot.total - newAmount, 0));
  }, [amount, pot.total]);

  // Handle form submission to update the pot's total
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPot = {
      ...pot,
      total: newTotal, // Set the updated total after withdrawal
    };
    updatePot(updatedPot); // Update the pot in context
    toggleModal(); // Close the modal after updating
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 50 }}>
      <div className="bg-white p-8 space-y-5 rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <div className='flex items-center justify-between'>
          <span className='font-bold text-2xl '>Withdraw from '{pot.name}'</span>
          <button className="" type="button" onClick={toggleModal}>
            <IoCloseCircleOutline size={24} />
          </button>
        </div>
        <p>Withdraw money from your pot. The amount will be added back to your main balance.</p>
        <div>
          <div className='flex items-center justify-between'>
            <p className='text-xs text-gray-500'>New Total</p>
            <p className='font-semibold text-2xl'>${newTotal.toFixed(2)}</p>
          </div>
          <div className="w-full bg-gray-200 rounded h-2 my-3">
            <div 
              className="h-full rounded" 
              style={{ 
                width: `${Math.min((newTotal / pot.target) * 100, 100)}%`, 
                backgroundColor: pot.theme 
              }}
            />
          </div>
          <div className='flex items-center justify-between'>
            <div className='font-bold text-gray-500'>{((newTotal / pot.target) * 100).toFixed(2)}%</div>
            <span className='text-gray-500 text-sm'>Target of ${pot.target}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium">
              Amount to Withdraw
            </label>
            <input 
              type="number" 
              id="amount" 
              value={amount}
              onChange={(e) => {
                const inputValue = e.target.value;
                // Ensure that if the input is empty or negative, the value is set to 0
                if (inputValue === '' || Number(inputValue) < 0) {
                  setAmount(0);
                } else {
                  setAmount(inputValue);
                }
              }}
              className="w-full p-2 border rounded"
              placeholder='$'
              min="0" // Prevents typing negative values directly
              max={pot.total} // Ensure you can't withdraw more than available
            />
          </div>
          <button 
            type="submit" 
            className="bg-black text-white w-full px-4 py-2 rounded"
          >
            Confirm Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawModal;
