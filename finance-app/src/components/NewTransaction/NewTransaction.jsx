import React, { useState, useContext } from 'react';
import { TransactionsContext } from '../TransactionsContext';
import { IoCloseCircleOutline } from "react-icons/io5";

const categories = ['General', 'Dining Out', 'Groceries', 'Entertainment', 'Transportation', 'Lifestyle', 'Personal Care', 'Education', 'Bills', 'Shopping'];

const NewTransactionModal = ({ isOpen, toggleNewTransactionModal }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [charactersLeft, setCharactersLeft] = useState(30);
  const [category, setCategory] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const { addTransaction } = useContext(TransactionsContext); // Use addTransaction from context

  const characterLimit = 30;
  const avatarURL = 'https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg';

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      avatar: avatarURL,
      name,
      category,
      date: transactionDate,
      amount: parseFloat(amount),
      recurring: isRecurring
    };

    // Use the addTransaction function to save the new transaction
    addTransaction(newTransaction);

    // Clear form fields
    setName('');
    setAmount('');
    setCategory('');
    setTransactionDate('');
    setIsRecurring(false);

    // Close the modal after adding the transaction
    toggleNewTransactionModal();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 50 }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <div className='flex flex-row items-center justify-between mb-4'>
          <h3 className="text-lg font-bold">Add New Transaction</h3>
          <button className="" type="button" onClick={toggleNewTransactionModal}>
            <IoCloseCircleOutline size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Transaction Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setCharactersLeft(characterLimit - e.target.value.length);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g Urban Services"
              maxLength={characterLimit}
            />
            <p className="text-sm text-right text-gray-500">{charactersLeft} characters left</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Transaction Date
            </label>
            <input
              type="date"
              id="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min={today}
            />
          </div>

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
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g $1000"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="mr-2"
            />
            <label className="block text-gray-700 text-sm font-bold" htmlFor="recurring">
              Recurring Transaction
            </label>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-black hover:bg-gray-950 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTransactionModal;


















// import React, { useState, useContext } from 'react';
// import { TransactionsContext } from '../TransactionsContext';
// import { IoCloseCircleOutline } from "react-icons/io5";

// const categories = ['General', 'Dining Out', 'Groceries', 'Entertainment', 'Transportation', 'Lifestyle', 'Personal Care', 'Education', 'Bills', 'Shopping'];

// const NewTransactionModal = ({ isOpen, toggleNewTransactionModal }) => {
//   const [name, setName] = useState('');
//   const [amount, setAmount] = useState('');
//   const [charactersLeft, setCharactersLeft] = useState(30); // Track characters left
//   const [category, setCategory] = useState('');
//   const [transactionDate, setTransactionDate] = useState(''); // Add transaction date state
//   const [isRecurring, setIsRecurring] = useState(false); // Add recurring state
//   const { addBudget } = useContext(TransactionsContext);

//   const characterLimit = 30; // Set character limit to 30

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add logic to handle form submission and adding a transaction
//   };

//   // Get today's date in YYYY-MM-DD format
//   const today = new Date().toISOString().split('T')[0];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 50 }}>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[50%]">
//         <div className='flex flex-row items-center justify-between mb-4'>
//           <h3 className="text-lg font-bold">Add New Transaction</h3>
//           <button className="" type="button" onClick={toggleNewTransactionModal}>
//             <IoCloseCircleOutline size={24} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {/* Transaction Name Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//               Transaction Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//                 setCharactersLeft(characterLimit - e.target.value.length);
//               }}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="e.g Urban Services"
//               maxLength={characterLimit} // Limit input length
//             />
//             {/* Characters left display */}
//             <p className="text-sm text-right text-gray-500">{charactersLeft} characters left</p>
//           </div>

//           {/* Transaction Date Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
//               Transaction Date
//             </label>
//             <input
//               type="date"
//               id="date"
//               value={transactionDate}
//               onChange={(e) => setTransactionDate(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               min={today} // Disable past dates
//             />
//           </div>

//           {/* Category Dropdown */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
//               Category
//             </label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="">Select a Category</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Amount Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
//               Amount
//             </label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="e.g $1000"
//             />
//           </div>

//           {/* Recurring Checkbox */}
//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               id="recurring"
//               checked={isRecurring}
//               onChange={(e) => setIsRecurring(e.target.checked)}
//               className="mr-2"
//             />
//             <label className="block text-gray-700 text-sm font-bold" htmlFor="recurring">
//               Recurring Transaction
//             </label>
//           </div>

//           <div className="flex items-center justify-between">
//             <button
//               className="bg-black hover:bg-gray-950 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Add Transaction
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewTransactionModal;