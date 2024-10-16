import React, { useState } from 'react';

const AddWithdraw = ({ pot, action }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform add/withdraw logic here based on action prop
    if (action === "Add") {
      // Add money logic
    } else {
      // Withdraw money logic
    }
  };

  return (
    <div>
      <h2>{action} Money</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium">
            Amount
          </label>
          <input 
            type="number" 
            id="amount" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)} 
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {action} Money
        </button>
      </form>
    </div>
  );
};

export default AddWithdraw;








// import React from 'react';
// import { IoCloseCircleOutline } from "react-icons/io5";


// const AddWithdraw = () => {
//   return (
//     <div>
//         <div className='flex items-center justify-between'>
//             <span>{"Withdraw from"/"Add to"} {pot.name}</span>
//             <IoCloseCircleOutline size={24} />
//         </div>
//         <div>
//             <div className='flex items-center justify-between'>
//                 <p className='text-xs text-gray-500'>Total Saved</p>
//                 <p className='font-semibold text-2xl'>${(pot.total).toFixed(2)}</p>
//             </div>
//             <div className="w-full bg-gray-200 rounded h-2 my-3">
//                 <div 
//                     className="h-full rounded" 
//                     style={{ 
//                         width: `${Math.min((pot.total / pot.target) * 100, 100)}%`, 
//                         backgroundColor: pot.theme 
//                     }}
//                       />
//             </div>
//             <div className='flex items-center justify-between'>
//                 {/* <div>{((pot.total * pot.target) / 100)}%</div> */}
//                 <div className='font-bold text-gray-500'>{((pot.total / pot.target) * 100).toFixed(2)}%</div>
//                 <span className='text-gray-500 text-sm'>Target of ${pot.target} </span>
//             </div>
//         </div>
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maximum">
//                     Target
//                     </label>
//                     <input
//                     type="number"
//                     id="target"
//                     value={target}
//                     onChange={(e) => setTarget(e.target.value)}
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     placeholder="$ e.g 20"
//                     />
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <button
//                     className="bg-black hover:bg-gray-950 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     type="submit"
//                     >
//                     Confirm {" Withdrawal/Addition"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default AddWithdraw