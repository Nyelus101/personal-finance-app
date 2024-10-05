import React, { useContext } from 'react';
import { TransactionsContext } from './TransactionsContext';
import { PiDotsThree } from "react-icons/pi";
import { IoCaretForward } from "react-icons/io5";



const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

const Budgets = () => {
  const { budgets, transactions } = useContext(TransactionsContext); // Access budgets and transactions from context

  // Get current month and year
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Helper function to get the spent amount for the current month and remaining amount
  const getSpentAndRemaining = (category, maximum) => {
    // Filter transactions by category and current month
    const spentTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transaction.category === category &&
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });

    // Calculate total spent in the current month
    const totalSpent = spentTransactions.reduce((total, transaction) => total + transaction.amount, 0);

    // Calculate remaining amount
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

  return (
    <div className="budget-list">
      <h2 className="text-lg font-semibold mb-4">Budgets</h2>
      <ul>
        {budgets.map((budget) => {
          // Get spent and remaining amounts for the current month in this category
          const { totalSpent, remaining } = getSpentAndRemaining(budget.category, budget.maximum);

          return (
            <li key={budget.id} className="mb-4">
              {/* Div with white background for each budget category */}
              <div className="bg-white p-4 shadow rounded-lg">
                <div className='dots flex items-center justify-between mb-2'>
                  <div className='flex items-center space-x-5'>
                    {/* Dynamically set the background color */}
                    <div className='rounded-full w-5 h-5' style={{ backgroundColor: budget.theme }}></div>
                    <h3 className="text-lg font-medium">{budget.category}</h3>
                  </div>
                  <span><PiDotsThree /></span>
                </div>
                <p>Maximum of ${budget.maximum} </p>
                <div className="w-full bg-gray-200 rounded h-4 my-3">
                  <div 
                    className="h-full rounded" 
                    style={{ 
                      width: `${(totalSpent / budget.maximum) * 100}%`, 
                      backgroundColor: budget.theme 
                    }}
                  />
                </div>
                <div className='flex items-center justify-between text-sm py-5'>
                  {/* Spent amount */}
                  <div className='flex flex-col justify-start w-[50%] pl-5' style={{ borderLeft: `4px solid ${budget.theme}` }}>
                    <span>Spent amount: {currentMonthName} </span>
                    <span>${totalSpent.toFixed(2)}</span>
                  </div>
                  {/* Remaining amount */}
                  <div className='flex flex-col items-start justify-start w-[50%] pl-5 border-l-4'>
                    <span>Remaining</span>
                    <span>${remaining.toFixed(2)}</span>
                  </div>
                </div>

                {/* Div to display the last 3 transactions for this category */}
                <div className="mt-4">
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className="text-sm font-semibold ">Lastest Spending</h4>
                    <div className='flex items-center space-x-3 text-sm'>
                      <span>See All</span>
                      <IoCaretForward />
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {getLastThreeTransactions(budget.category).map(transaction => (
                      <li key={transaction.id} className="flex justify-between p-2 bg-gray-100 rounded">
                        <span><img src={transaction.avatar} alt="avatar" className="w-6 h-6 rounded-full" /></span>
                        <span>{transaction.name}</span>
                        <span>${transaction.amount.toFixed(2)}</span>
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
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
  );
};

export default Budgets;










{/* <div className='h-full'>
<div className='flex items-center justify-between'>
  <h2 className='text-3xl lg:text-xl font-bold mb-4'>Budgets</h2>
  <button className='bg-black text-white rounded-md p-2'> + Add New Budget</button>
</div>
<div className='bg-white rounded-lg p-8'>
  <span>{Badge} </span>
  <span>{Category} </span>
  <h4>Maximum of ${totalAmount} </h4>
  <div className='bg-gray-300'>
    <h3>Latest Spending</h3>
    <table>
      <tbody>
        <tr>
          <td>{Avatar} </td>
          <td>{Name} </td>
          <td>{Amount} </td>
          <td>{TransactionDate} </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</div> */}



// {
//   "avatar": "./assets/images/avatars/james-thompson.jpg",
//   "name": "JEdu Thompson",
//   "category": "Entertainment",
//   "date": "2024-10-11T15:45:38Z",
//   "amount": -5.00,
//   "recurring": false
// },