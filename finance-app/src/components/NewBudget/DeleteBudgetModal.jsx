// DeleteBudgetModal.js
import React from 'react';

const DeleteBudgetModal = ({ isOpen, toggleModal, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 50 }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
        <p>Are you sure you want to delete this budget?</p>
        <div className="mt-4 flex justify-between">
          <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            onClick={() => { onDelete(); toggleModal();}}
          >
            Delete
          </button>
          <button 
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            onClick={toggleModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBudgetModal;
