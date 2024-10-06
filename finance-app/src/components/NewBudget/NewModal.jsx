import React, { useState } from 'react';

const categories = ['Groceries', 'Entertainment', 'Rent', 'Utilities', 'Transportation', 'Healthcare', 'Savings'];

const colorOptions = [
  { name: 'Green', color: '#28a745' },
  { name: 'Yellow', color: '#ffc107' },
  { name: 'Cyan', color: '#17a2b8' },
  { name: 'Navy', color: '#001f3f' },
  { name: 'Red', color: '#dc3545' },
  { name: 'Purple', color: '#6f42c1' },
  { name: 'Turquoise', color: '#40e0d0' },
  { name: 'Brown', color: '#8b4513' },
  { name: 'Magenta', color: '#ff00ff' },
  { name: 'Blue', color: '#007bff' },
  { name: 'Navy Grey', color: '#5f6368' },
  { name: 'Army Green', color: '#4b5320' },
  { name: 'Pink', color: '#ff69b4' },
  { name: 'Gold', color: '#ffd700' },
  { name: 'Orange', color: '#ff8c00' }
];

const Modal = ({ isOpen, toggleModal }) => {
  const [category, setCategory] = useState('');
  const [maximum, setMaximum] = useState('');
  const [selectedColor, setSelectedColor] = useState(null); // Store selected color object
  const [dropdownOpen, setDropdownOpen] = useState(false);  // Manage dropdown visibility

  // Handle form submission (this can be adjusted to fit your needs)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Budget Added:', { category, maximum, selectedColor });
    toggleModal(); // Close modal after submission
  };

  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setDropdownOpen(false);  // Close the dropdown after selection
  };

  if (!isOpen) return null; // Render nothing if modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <h3 className="text-lg font-bold mb-4">Add New Budget</h3>
        <form onSubmit={handleSubmit}>
          
          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select 
              id="category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

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
            />
          </div>

          {/* Custom Color Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
              Color Tag
            </label>
            <div className="relative">
              <button 
                type="button" 
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between" 
                onClick={handleDropdownToggle} // Toggle dropdown
              >
                {selectedColor ? (
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full inline-block mr-2" style={{ backgroundColor: selectedColor.color }}></span>
                    {selectedColor.name}
                  </span>
                ) : (
                  <span>Select a Color</span>
                )}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto z-10">
                  <ul>
                    {colorOptions.map(option => (
                      <li 
                        key={option.name} 
                        className="cursor-pointer p-2 hover:bg-gray-100 flex items-center"
                        onClick={() => handleColorSelect(option)} // Select color and close dropdown
                      >
                        <span className="w-3 h-3 rounded-full inline-block mr-2" style={{ backgroundColor: option.color }}></span>
                        {option.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="submit"
            >
              Add Budget
            </button>
            <button 
              className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="button" 
              onClick={toggleModal} // Close modal
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;



