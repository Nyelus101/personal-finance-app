import React, { useState, useContext } from 'react';
import { TransactionsContext } from '../TransactionsContext';
import { IoCloseCircleOutline } from "react-icons/io5";

const colorOptions = [
  { name: 'Green', color: '#277C78' },
  { name: 'Yellow', color: '#ffc107' },
  { name: 'Cyan', color: '#82C9D7' },
  { name: 'Navy', color: '#001f3f' },
  { name: 'Red', color: '#dc3545' },
  { name: 'Purple', color: '#826CB0' },
  { name: 'Turquoise', color: '#40e0d0' },
  { name: 'Brown', color: '#F2CDAC' },
  { name: 'Magenta', color: '#ff00ff' },
  { name: 'Blue', color: '#007bff' },
  { name: 'Navy Grey', color: '#626070' },
  { name: 'Army Green', color: '#4b5320' },
  { name: 'Pink', color: '#ff69b4' },
  { name: 'Gold', color: '#ffd700' },
  { name: 'Orange', color: '#ff8c00' }
];

const Modal = ({ isOpen, toggleModal }) => {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [charactersLeft, setCharactersLeft] = useState(30); // Track characters left
  const { addPot, pots } = useContext(TransactionsContext);

  const characterLimit = 30; // Set character limit to 30

  // Get existing categories and colors
  const existingNames = pots.map(pot => pot.name);
  const existingColors = pots.map(pot => pot.theme);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim(); // Trim whitespace from name
  // Check if the name or color already exists
    if (existingNames.includes(trimmedName)) {
        alert(`The pot name "${name}" already exists. Please choose a different name.`);
        return;
    }

    if (existingColors.includes(selectedColor?.color)) {
        alert("The selected color is already in use. Please choose a different color.");
        return;
    }
    console.log("Form submitted");
    const newPot = {
      id: Date.now(),
      name: name,
      target: parseFloat(target),
      theme: selectedColor.color,
      total: 0, // Set total to zero
    };

    console.log("New pot created:", newPot);
    addPot(newPot);
    toggleModal();  // Close modal after submission
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

  // Handle name input and character count
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= characterLimit) {
      setName(value);
      setCharactersLeft(characterLimit - value.length);
    }
  };

  if (!isOpen) return null;

  console.log("Existing Colors:", existingColors);
console.log("Color Options:", colorOptions.map(option => option.color));


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 50 }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <div className='flex flex-row items-center justify-between mb-4'>
          <h3 className="text-lg font-bold">Add New Pot</h3>
          <button className="" type="button" onClick={toggleModal}>
            <IoCloseCircleOutline size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Category (Pot Name) Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Pot Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g Rainy Days"
            />
            {/* Characters left display */}
            <p className="text-sm text-right text-gray-500">{charactersLeft} characters left</p>
          </div>

          {/* Maximum Amount */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maximum">
              Target
            </label>
            <input
              type="number"
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="$ e.g 2000"
            />
          </div>

          {/* Custom Color Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
              Theme
            </label>
            <div className="relative">
              <button
                type="button"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between"
                onClick={handleDropdownToggle}
              >
                {selectedColor ? (
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full inline-block mr-2" style={{ backgroundColor: selectedColor.color }}></span>
                    {selectedColor.name}
                  </span>
                ) : (
                  <span>Select a Theme</span>
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
                        onClick={() => handleColorSelect(option)}
                        disabled={existingColors.includes(option.color)}
                      >
                        <span
                          className={`w-3 h-3 rounded-full inline-block mr-2`}
                          style={{ backgroundColor: option.color, opacity: existingColors.includes(option.color) ? 0.5 : 1 }}
                        ></span>
                        {option.name} {existingColors.includes(option.color) && "(already selected)"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-black hover:bg-gray-950 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Pot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

















// import React, { useState, useContext } from 'react';
// import { TransactionsContext } from '../TransactionsContext';
// import { IoCloseCircleOutline } from "react-icons/io5";


// // const categories = ['Groceries', 'Entertainment', 'Rent', 'Utilities', 'Transportation', 'Healthcare', 'Savings'];
// const categories = [ 'General', 'Dining Out', 'Groceries', 'Entertainment', 'Transportation', 'Lifestyle', 'Personal Care', 'Education', 'Bills', 'Shopping'];

// const colorOptions = [
//   { name: 'Green', color: '#277C78' },
//   { name: 'Yellow', color: '#ffc107' },
//   { name: 'Cyan', color: '#82C9D7' },
//   { name: 'Navy', color: '#001f3f' },
//   { name: 'Red', color: '#dc3545' },
//   { name: 'Purple', color: '#6f42c1' },
//   { name: 'Turquoise', color: '#40e0d0' },
//   { name: 'Brown', color: '#F2CDAC' },
//   { name: 'Magenta', color: '#ff00ff' },
//   { name: 'Blue', color: '#007bff' },
//   { name: 'Navy Grey', color: '#626070' },
//   { name: 'Army Green', color: '#4b5320' },
//   { name: 'Pink', color: '#ff69b4' },
//   { name: 'Gold', color: '#ffd700' },
//   { name: 'Orange', color: '#ff8c00' }
// ];

// const Modal = ({ isOpen, toggleModal }) => {
//   const [category, setCategory] = useState('');
//   const [maximum, setMaximum] = useState('');
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const { budgets, transactions, addBudget } = useContext(TransactionsContext);

//   // Get existing categories and colors
//   const existingCategories = budgets.map(budget => budget.category);
//   const existingColors = budgets.map(budget => budget.theme);

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (existingCategories.includes(category) || existingColors.includes(selectedColor?.color)) {
//       alert("Cannot recreate an already existing category or color");
//       return;
//     }
//     const newBudget = {
//       id: Date.now(),
//       category,
//       maximum: parseFloat(maximum),
//       theme: selectedColor.color,
//     };
//     addBudget(newBudget);
//     toggleModal();  // Close modal after submission
//   };

//   // Toggle dropdown visibility
//   const handleDropdownToggle = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   // Handle color selection
//   const handleColorSelect = (color) => {
//     setSelectedColor(color);
//     setDropdownOpen(false);  // Close the dropdown after selection
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 50 }}>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[50%]">
//         <div className='flex flex-row items-center justify-between mb-4'>
//             <h3 className="text-lg font-bold ">Add New Budget</h3>
//             <button className=" " type="button" onClick={toggleModal}>
//                 <IoCloseCircleOutline size={24}/>

//             </button>
//         </div>
//         <form onSubmit={handleSubmit}>

//           {/* Category Dropdown */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
//               Pot Name
//             </label>
//             <input 
//               type="text" 
//               id="name" 
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//               placeholder="e.g Rainy Days" 
//             />
//           </div>

//           {/* Maximum Amount */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maximum">
//               Maximum Amount
//             </label>
//             <input 
//               type="number" 
//               id="maximum" 
//               value={maximum}
//               onChange={(e) => setMaximum(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//               placeholder="Maximum Amount" 
//             />
//           </div>

//           {/* Custom Color Dropdown */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
//               Color Tag
//             </label>
//             <div className="relative">
//               <button 
//                 type="button" 
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between" 
//                 onClick={handleDropdownToggle}
//               >
//                 {selectedColor ? (
//                   <span className="flex items-center">
//                     <span className="w-3 h-3 rounded-full inline-block mr-2" style={{ backgroundColor: selectedColor.color }}></span>
//                     {selectedColor.name}
//                   </span>
//                 ) : (
//                   <span>Select a Color</span>
//                 )}
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </svg>
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto z-10">
//                   <ul>
//                     {colorOptions.map(option => (
//                       <li 
//                         key={option.name} 
//                         className="cursor-pointer p-2 hover:bg-gray-100 flex items-center"
//                         onClick={() => handleColorSelect(option)} 
//                         disabled={existingColors.includes(option.color)}
//                       >
//                         <span 
//                           className={`w-3 h-3 rounded-full inline-block mr-2`} 
//                           style={{ backgroundColor: option.color, opacity: existingColors.includes(option.color) ? 0.5 : 1 }}
//                         ></span>
//                         {option.name} {existingColors.includes(option.color) && "(already selected)"}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <button 
//               className="bg-black hover:bg-gray-950 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
//               type="submit"
//             >
//               Add Pot
//             </button>
            
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Modal;
