// Budgets.js
import React, { useState, useContext } from 'react';
import { TransactionsContext } from './TransactionsContext';
import { PiDotsThree } from "react-icons/pi";
import { IoCaretForward } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Modal from './NewBudget/NewModal';
import DonutChart from './DonutChart'; // Import the DonutChart component

const Budgets = () => {
  const { budgets, transactions } = useContext(TransactionsContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [activeDropdown, setActiveDropdown] = useState(null); // State to manage dropdown visibility

  // Helper function to get the spent and remaining amount for a category
  const getSpentAndRemaining = (category, maximum) => {
    const spentTransactions = transactions.filter(transaction => transaction.category === category);
    const totalSpent = spentTransactions.reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
    const remaining = maximum - totalSpent;

    return { totalSpent, remaining };
  };

  // Helper function to get the last 3 transactions for each category
  const getLastThreeTransactions = (category) => {
    const filteredTransactions = transactions
      .filter(transaction => transaction.category === category)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return filteredTransactions.slice(0, 3);
  };

  // Handle navigation to Transactions page with filter
  const handleSeeAll = (category) => {
    navigate(`/transactions?category=${encodeURIComponent(category)}`); // Navigate with the category filter
  };

  // Function to open/close modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to calculate total spent and maximum across all budgets
  const getTotalSpentAndMaximum = () => {
    const totalSpent = budgets.reduce((sum, budget) => {
      const spentForCategory = transactions
        .filter(transaction => transaction.category === budget.category)
        .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

      return sum + spentForCategory;
    }, 0);

    const totalMaximum = budgets.reduce((sum, budget) => sum + budget.maximum, 0);

    return { totalSpent, totalMaximum };
  };

  // Handle dropdown toggle
  const toggleDropdown = (budgetId) => {
    if (activeDropdown === budgetId) {
      setActiveDropdown(null); // Close if already open
    } else {
      setActiveDropdown(budgetId); // Open dropdown for the clicked budget
    }
  };

  return (
    <div className="budget-list">
      <div className='flex items-center justify-between mb-4'>
        <h2 className="text-lg font-bold">Budgets</h2>
        <button 
          className='text-white text-sm bg-black p-3 rounded-2xl' 
          onClick={toggleModal} // Open modal when button is clicked
        >
          + Add New Budget
        </button>
      </div>

      {/* Render Modal */}
      <Modal isOpen={isModalOpen} toggleModal={toggleModal} />

      <div className='flex w-full flex-col lg:flex-row gap-5'>
        {/* Spending Summary Section */}
        <div className='w-full lg:w-[40%] bg-white rounded-lg p-4'>
          <DonutChart budgets={budgets} transactions={transactions} /> {/* Use DonutChart here */}
          
          <div className='spendingSummary pt-4'>
            <span className='font-bold text-lg'>Spending Summary</span>
            {budgets.map((budget, index) => {
              const { totalSpent } = getSpentAndRemaining(budget.category, budget.maximum); // Call the helper function

              return (
                <div key={index} className='category-item mb-2 flex items-center justify-between p-2 pb-4 border-b-2 last:border-none border-gray-100 '>
                  <div className='flex items-center space-x-2'>
                    <div className='h-5 w-1 rounded-sm' style={{ backgroundColor: budget.theme }}></div>
                    <h4 className='text-md font-normal text-gray-400'>{budget.category}</h4>
                  </div>

                  <p className='space-x-3'>
                    <span className='font-bold'>
                      ${totalSpent.toFixed(2)}
                    </span>  
                    <span className='text-sm text-gray-500'>of</span>
                    <span className='text-sm text-gray-500'>${budget.maximum}</span> 
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Budgets Section */}
        <div className='w-full lg:w-[60%] h-full lg:h-[85vh] lg:overflow-y-auto lg:scroll-hidden'>
          <ul>
            {budgets.map((budget) => {
              const { totalSpent, remaining } = getSpentAndRemaining(budget.category, budget.maximum);

              return (
                <li key={budget.id} className="mb-4 relative"> {/* Use relative positioning to contain the dropdown */}
                  <div className="bg-white p-4 shadow rounded-lg">
                    <div className='dots flex items-center justify-between mb-2'>
                      <div className='flex items-center space-x-5'>
                        <div className='rounded-full w-5 h-5' style={{ backgroundColor: budget.theme }}></div>
                        <h3 className="text-lg font-medium">{budget.category}</h3>
                      </div>
                      {/* PiDotsThree icon with dropdown toggle */}
                      <span onClick={() => toggleDropdown(budget.id)} className="cursor-pointer relative">
                        <PiDotsThree />
                        {/* Dropdown menu */}
                        {activeDropdown === budget.id && (
                          <div className="absolute top-6 right-0 z-10 bg-white shadow-lg rounded-md p-2 w-32">
                            <ul className="text-left">
                              <li 
                                className="hover:bg-gray-100 cursor-pointer px-3 py-1 rounded"
                                onClick={() => console.log('Edit clicked')}
                              >
                                Edit
                              </li>
                              <li 
                                className="hover:bg-gray-100 cursor-pointer px-3 py-1 rounded"
                                onClick={() => console.log('Delete clicked')}
                              >
                                Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </span>
                    </div>
                    <p>Maximum of ${budget.maximum}</p>
                    <div className="w-full bg-gray-200 rounded h-4 my-3">
                      <div 
                        className="h-full rounded" 
                        style={{ 
                          width: `${Math.min((totalSpent / budget.maximum) * 100, 100)}%`, 
                          backgroundColor: budget.theme 
                        }}
                      />
                    </div>
                    <div className='flex items-center justify-between text-sm py-5'>
                      <div className='flex flex-col justify-start w-[50%] pl-5' style={{ borderLeft: `4px solid ${budget.theme}` }}>
                        <span>Spent</span>
                        <span>
                          ${totalSpent.toFixed(2)}
                        </span>
                      </div>
                      <div className='flex flex-col items-start justify-start w-[50%] pl-5 border-l-4'>
                        <span>Remaining</span>
                        <span>${remaining.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-4 bg-custom-bg rounded-lg p-7">
                      <div className='flex items-center justify-between mb-2'>
                        <h4 className="text-sm font-semibold">Latest Spending</h4>
                        <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
                          <span className="">See All</span>
                          <IoCaretForward />
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {getLastThreeTransactions(budget.category).map(transaction => (
                          <li key={transaction.id} className="flex justify-between p-2 rounded border-b-2 last:border-b-0">
                            <div className='flex items-center space-x-5'>
                              <span><img src={transaction.avatar} alt="avatar" className="w-6 h-6 rounded-full" /></span>
                              <span className='font-bold'>{transaction.name}</span>
                            </div>
                            <div className='flex flex-col justify-end items-end'>
                              <span className='font-bold'>
                                {transaction.amount < 0 
                                  ? `-$${Math.abs(transaction.amount).toFixed(2)}` 
                                  : `$${transaction.amount.toFixed(2)}`
                                }
                              </span>
                              <span>
                                {new Date(transaction.date).toLocaleDateString('en-GB', {
                                  day: '2-digit', 
                                  month: 'short', 
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
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

export default Budgets;















// // Budgets.js
// import React, { useState, useContext } from 'react';
// import { TransactionsContext } from './TransactionsContext';
// import { PiDotsThree } from "react-icons/pi";
// import { IoCaretForward } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import Modal from './NewBudget/NewModal';
// import DonutChart from './DonutChart'; // Import the DonutChart component

// const Budgets = () => {
//   const { budgets, transactions } = useContext(TransactionsContext);
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
//   const [dropdownOpen, setDropdownOpen] = useState(null); // State to track which budget's dropdown is open


//   // Helper function to get the spent and remaining amount for a category
//   const getSpentAndRemaining = (category, maximum) => {
//     const spentTransactions = transactions.filter(transaction => transaction.category === category);
//     const totalSpent = spentTransactions.reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
//     const remaining = maximum - totalSpent;

//     return { totalSpent, remaining };
//   };

//     // Function to toggle dropdown
//     const toggleDropdown = (id) => {
//       setDropdownOpen(dropdownOpen === id ? null : id); // Toggle the dropdown for the clicked budget
//     };

//   // Prepare data for the donut chart is moved to DonutChart component

//   // Helper function to get the last 3 transactions for each category
//   const getLastThreeTransactions = (category) => {
//     const filteredTransactions = transactions
//       .filter(transaction => transaction.category === category)
//       .sort((a, b) => new Date(b.date) - new Date(a.date));
//     return filteredTransactions.slice(0, 3);
//   };

//   // Handle navigation to Transactions page with filter
//   const handleSeeAll = (category) => {
//     navigate(`/transactions?category=${encodeURIComponent(category)}`); // Navigate with the category filter
//   };

//   // Function to open/close modal
//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//     // Function to handle edit (placeholder for now)
//     const handleEdit = (budgetId) => {
//       console.log("Edit clicked for budget ID:", budgetId);
//       // Add your logic for opening the edit modal here
//     };
  
//     // Function to handle delete (placeholder for now)
//     const handleDelete = (budgetId) => {
//       console.log("Delete clicked for budget ID:", budgetId);
//       // Add your logic for deleting the budget here
//     };

//   // Function to calculate total spent and maximum across all budgets
//   const getTotalSpentAndMaximum = () => {
//     const totalSpent = budgets.reduce((sum, budget) => {
//       const spentForCategory = transactions
//         .filter(transaction => transaction.category === budget.category)
//         .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

//       return sum + spentForCategory;
//     }, 0);

//     const totalMaximum = budgets.reduce((sum, budget) => sum + budget.maximum, 0);

//     return { totalSpent, totalMaximum };
//   };

//   return (
//     <div className="budget-list">
//       <div className='flex items-center justify-between mb-4'>
//         <h2 className="text-lg font-bold">Budgets</h2>
//         <button 
//           className='text-white text-sm bg-black p-3 rounded-2xl' 
//           onClick={toggleModal} // Open modal when button is clicked
//         >
//           + Add New Budget
//         </button>
//       </div>

//       {/* Render Modal */}
//       <Modal isOpen={isModalOpen} toggleModal={toggleModal} />

//       <div className='flex w-full flex-col lg:flex-row gap-5'>
//         {/* Spending Summary Section */}
//         <div className='w-full lg:w-[40%] bg-white rounded-lg p-4'>
//           <DonutChart budgets={budgets} transactions={transactions} /> {/* Use DonutChart here */}
          
//           <div className='spendingSummary pt-4'>
//             <span className='font-bold text-lg'>Spending Summary</span>
//             {budgets.map((budget, index) => {
//               const { totalSpent } = getSpentAndRemaining(budget.category, budget.maximum); // Call the helper function

//               return (
//                 <div key={index} className='category-item mb-2 flex items-center justify-between p-2 pb-4 border-b-2 last:border-none border-gray-100 '>
//                   <div className='flex items-center space-x-2'>
//                     <div className='h-5 w-1 rounded-sm' style={{ backgroundColor: budget.theme }}></div>
//                     <h4 className='text-md font-normal text-gray-400'>{budget.category}</h4>
//                   </div>

//                   <p className='space-x-3'>
//                     <span className='font-bold'>
//                       ${totalSpent.toFixed(2)}
//                     </span>  
//                     <span className='text-sm text-gray-500'>of</span>
//                     <span className='text-sm text-gray-500'>${budget.maximum}</span> 
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Budgets Section */}
//         <div className='w-full lg:w-[60%] h-full lg:h-[85vh] lg:overflow-y-auto lg:scroll-hidden'>
//           <ul>
//             {budgets.map((budget) => {
//               const { totalSpent, remaining } = getSpentAndRemaining(budget.category, budget.maximum);

//               return (
//                 <li key={budget.id} className="mb-4">
//                   <div className="bg-white p-4 shadow rounded-lg">
//                     <div className='dots flex items-center justify-between mb-2'>
//                       <div className='flex items-center space-x-5'>
//                         <div className='rounded-full w-5 h-5' style={{ backgroundColor: budget.theme }}></div>
//                         <h3 className="text-lg font-medium">{budget.category}</h3>
//                       </div>
//                       <span><PiDotsThree /></span>
//                     </div>
//                     <p>Maximum of ${budget.maximum}</p>
//                     <div className="w-full bg-gray-200 rounded h-4 my-3">
//                       <div 
//                         className="h-full rounded" 
//                         style={{ 
//                           width: `${Math.min((totalSpent / budget.maximum) * 100, 100)}%`, 
//                           backgroundColor: budget.theme 
//                         }}
//                       />
//                     </div>
//                     <div className='flex items-center justify-between text-sm py-5'>
//                       <div className='flex flex-col justify-start w-[50%] pl-5' style={{ borderLeft: `4px solid ${budget.theme}` }}>
//                         <span>Spent</span>
//                         <span>
//                           ${totalSpent.toFixed(2)}
//                         </span>
//                       </div>
//                       <div className='flex flex-col items-start justify-start w-[50%] pl-5 border-l-4'>
//                         <span>Remaining</span>
//                         <span>${remaining.toFixed(2)}</span>
//                       </div>
//                     </div>

//                     <div className="mt-4 bg-custom-bg rounded-lg p-7">
//                       <div className='flex items-center justify-between mb-2'>
//                         <h4 className="text-sm font-semibold">Latest Spending</h4>
//                         <div className='flex items-center space-x-3 text-sm cursor-pointer' onClick={() => handleSeeAll(budget.category)}>
//                           <span className="">See All</span>
//                           <IoCaretForward />
//                         </div>
//                       </div>
//                       <ul className="space-y-2">
//                         {getLastThreeTransactions(budget.category).map(transaction => (
//                           <li key={transaction.id} className="flex justify-between p-2 rounded border-b-2 last:border-b-0">
//                             <div className='flex items-center space-x-5'>
//                               <span><img src={transaction.avatar} alt="avatar" className="w-6 h-6 rounded-full" /></span>
//                               <span className='font-bold'>{transaction.name}</span>
//                             </div>
//                             <div className='flex flex-col justify-end items-end'>
//                               <span className='font-bold'>
//                                 {transaction.amount < 0 
//                                   ? `-$${Math.abs(transaction.amount).toFixed(2)}` 
//                                   : `$${transaction.amount.toFixed(2)}`
//                                 }
//                               </span>
//                               <span>
//                                 {new Date(transaction.date).toLocaleDateString('en-GB', {
//                                   day: '2-digit', 
//                                   month: 'short', 
//                                   year: 'numeric'
//                                 })}
//                               </span>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Budgets;






// {
//   "avatar": "./assets/images/avatars/james-thompson.jpg",
//   "name": "JEdu Thompson",
//   "category": "Entertainment",
//   "date": "2024-10-11T15:45:38Z",
//   "amount": -5.00,
//   "recurring": false
// },