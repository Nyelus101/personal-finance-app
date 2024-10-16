import React, { useState, useContext } from 'react';
import { TransactionsContext } from '../TransactionsContext';

const EditModal = ({ isOpen, toggleModal, pot }) => {
  const [target, setTarget] = useState(pot.target);
  const { updatePot } = useContext(TransactionsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPot = {
      ...pot,
      target: parseFloat(target),
    };
    updatePot(updatedPot);
    toggleModal(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 50 }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <h3 className="text-lg font-bold mb-4">Edit Pot</h3>
        <form onSubmit={handleSubmit}>
          {/* Maximum Amount */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="target">
              Target
            </label>
            <input
              type="number"
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Target"
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

export default EditModal;
