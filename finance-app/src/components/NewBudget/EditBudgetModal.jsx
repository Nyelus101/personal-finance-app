import React, { useState, useContext, useEffect } from 'react';
import { TransactionsContext } from '../TransactionsContext';

const EditBudgetModal = ({ isOpen, toggleModal, budget }) => {
  const { budgets, setBudgets } = useContext(TransactionsContext);
  const [maximum, setMaximum] = useState('');

  // Populate the maximum value when the modal opens
  useEffect(() => {
    if (budget) {
      setMaximum(budget.maximum);
    }
  }, [budget, isOpen]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBudgets = budgets.map((b) => 
      b.id === budget.id ? { ...b, maximum: parseFloat(maximum) } : b
    );
    setBudgets(updatedBudgets);
    toggleModal();  // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 50 }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <h3 className="text-lg font-bold mb-4">Edit Budget</h3>
        <form onSubmit={handleSubmit}>
          {/* Maximum Amount */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maximum">
              Maximum Amount
            </label>
            <input 
              type="number" 
              id="maximum" 
              value={maximum}
              onChange={(e) => setMaximum(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              placeholder="Maximum Amount" 
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="submit"
            >
              Save Changes
            </button>
            <button 
              className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="button" 
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBudgetModal;
