import React, { useContext } from 'react';
import { TransactionsContext } from './TransactionsContext';

const Budgets = () => {
  const { budgets, transactions } = useContext(TransactionsContext); // Access budgets and transactions from context

  // Helper function to get the last 3 transactions for each category
  const getLastThreeTransactions = (category) => {
    // Filter transactions by category and sort them by date (latest first)
    const filteredTransactions = transactions
      .filter(transaction => transaction.category === category)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Return the last 3 transactions
    return filteredTransactions.slice(0, 3);
  };

  return (
    <div className="budget-list">
      <h2 className="text-lg font-semibold mb-4">Budgets</h2>
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id} className="mb-4">
            {/* Div with white background for each budget category */}
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-medium mb-2">{budget.category}</h3>
              <p className="text-gray-500">Budget Amount: {budget.amount}</p>
              <p className="text-gray-500">Theme: {budget.theme}</p>

              {/* Div to display the last 3 transactions for this category */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Last 3 Transactions:</h4>
                <ul className="space-y-2">
                  {getLastThreeTransactions(budget.category).map(transaction => (
                    <li key={transaction.id} className="flex justify-between p-2 bg-gray-100 rounded">
                      <span> <img src={transaction.avatar} /> </span>
                      <span>{transaction.name}</span>
                      <span>{transaction.amount}</span>
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
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