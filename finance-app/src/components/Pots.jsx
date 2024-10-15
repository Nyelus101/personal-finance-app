import React, { useState, useContext } from 'react';
import { TransactionsContext } from './TransactionsContext';
import { PiDotsThree } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import Modal from './NewPot/NewModal';

const Pots = () => {
  const { deletePots, addPots, pots } = useContext(TransactionsContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility


  // Function to open/close modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
                      <span><PiDotsThree /></span>
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
                      <button className='w-[50%] h-12 bg-custom-bg rounded-lg'>+ Add Money</button>
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