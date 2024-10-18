import React, { useState, useContext } from 'react';
import { TransactionsContext } from './TransactionsContext';
import { PiDotsThree } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import Modal from './NewPot/NewModal';
import AddModal from './NewPot/AddModal'; // Separate Add Money Modal
import EditModal from './NewPot/EditModal';
import DeleteModal from './NewPot/DeleteModal';
// import Add from './NewPot/Add';

const Pots = () => {
  const { deletePot, addPot, pots } = useContext(TransactionsContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for Edit Modal
  const [editPot, setEditPot] = useState(null); // State to store pot to edit
  const [dropdownStates, setDropdownStates] = useState({}); // State to manage which dropdown is open for each budget
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State for Delete Modal
  const [potToDelete, setPotToDelete] = useState(null); // Pot selected for deletion
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false); // State for Add Modal
  const [selectedPotForAdd, setSelectedPotForAdd] = useState(null); // Pot selected for adding money


  // Function to open/close Add Money modal
  const toggleAddMoneyModal = (pot) => {
    setSelectedPotForAdd(pot); // Set the pot to add money
    setIsAddMoneyModalOpen(!isAddMoneyModalOpen); // Toggle the Add Money modal
  };

  // Function to open/close modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

    // Handle dropdown toggle for individual pots
    const toggleDropdown = (potId) => {
      setDropdownStates((prev) => ({
        ...prev,
        [potId]: !prev[potId] // Toggle the specific dropdown for the given potId
      }));
    };

    const handleEditClick = (pot) => {
      setEditPot(pot); // Set the budget to edit
      setIsEditModalOpen(true); // Open the Edit Modal
    };

      // Function to open/close the Edit modal
  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    setEditPot(null); // Reset the budget to edit
  };

  const handleDeleteClick = (pot) => {
    setPotToDelete(pot); // Set the budget to delete
    setDeleteModalOpen(true); // Open the Delete Modal
  };

  // Function to open/close the Delete modal
  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
    setPotToDelete(null); // Reset the budget to delete
  };

  return (
    <div className="pots-list">
      <div className='flex items-center justify-between mb-4'>
        <h2 className="text-lg font-bold">Pots</h2>
        <button 
          className='text-white text-sm bg-black p-3 rounded-2xl' 
          onClick={toggleModal} // Open modal when button is clicked
        >
          + Add New Pot
        </button>
      </div>

      {/* Render Modal */}
      <Modal isOpen={isModalOpen} toggleModal={toggleModal} />

      {/* Render Edit Modal */}
      {editPot && ( // Check if there's a budget to edit
        <EditModal isOpen={isEditModalOpen} toggleModal={toggleEditModal} pot={editPot} />
      )}

      {/* Render Delete Modal */}
      {potToDelete && (
        <DeleteModal 
          isOpen={deleteModalOpen} 
          toggleModal={toggleDeleteModal} 
          onDelete={deletePot} 
          pot={potToDelete} 
        />
      )}

      {/* Render Add Money Modal */}
      {selectedPotForAdd && (
        <AddModal isOpen={isAddMoneyModalOpen} toggleModal={() => toggleAddMoneyModal(null)} pot={selectedPotForAdd} />
      )}

      <div className='flex w-full flex-col lg:flex-row gap-5'>
        {/* Pots Section */}
        <div className='w-full h-full lg:h-[85vh] overflow-y-auto  '>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10">
            {pots.map((pot) => {
              return (
                <li key={pot.id} className="mb-4">
                  <div className="bg-white p-4 shadow rounded-lg">
                    <div className='dots flex items-center justify-between mb-2'>
                      <div className='flex items-center space-x-5'>
                        <div className='rounded-full w-5 h-5' style={{ backgroundColor: pot.theme }}></div>
                        <h3 className="text-base font-medium">{pot.name}</h3>
                      </div>
                      {/* PiDotsThree icon with dropdown toggle */}
                      <span onClick={() => toggleDropdown(pot.id)} className="cursor-pointer relative">
                        <PiDotsThree />
                        {/* Dropdown menu */}
                        {dropdownStates[pot.id] && (  // Only open dropdown for the specific budget
                          <div className="absolute top-6 right-0 z-10 bg-white shadow-lg rounded-md p-2 w-32">
                            <ul className="text-left">
                              <li 
                                className="hover:bg-gray-100 cursor-pointer px-3 py-1 rounded"
                                onClick={() => handleEditClick(pot)} // Open Edit Modal
                              >
                                Edit
                              </li>
                              <li 
                                className="hover:bg-gray-100 cursor-pointer px-3 py-1 rounded"
                                onClick={() => handleDeleteClick(pot)} // Open Delete Modal
                              >
                                Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p className='text-xs text-gray-500'>Total Saved</p>
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
                    <div className='flex w-full justify-between items-center gap-5 font-bold text-sm pt-5'>
                      <button className='w-[50%] h-12 bg-custom-bg rounded-lg'
                       onClick={() => toggleAddMoneyModal(pot)} // Open Add Money modal
                       >+ Add Money</button>
                      <button className='w-[50%] h-12 bg-custom-bg rounded-lg'>Withdraw</button>
                    </div>

                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pots;