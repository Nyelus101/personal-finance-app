import React from 'react';

const DeleteModal = ({ isOpen, toggleModal, onDelete, pot }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete(pot.id);
    toggleModal(); // Close the modal after deletion
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 50 }}>
      <div className="bg-white rounded shadow-lg p-5">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the pot for {pot.name}?</p>
        <div className="flex justify-end mt-4">
          <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={toggleModal}>Cancel</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
