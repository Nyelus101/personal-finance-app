import React from 'react';

const DeleteModal = ({ isOpen, toggleModal, onDelete, budget }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete(budget.id);
    toggleModal(); // Close the modal after deletion
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-5">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the budget for {budget.category}?</p>
        <div className="flex justify-end mt-4">
          <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={toggleModal}>Cancel</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
