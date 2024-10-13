import React, { createContext, useState, useEffect } from 'react';
import data from '../assets/data.json';

// Create the context
export const TransactionsContext = createContext();


// Get stored budgets from localStorage if available
const getStoredBudgets = () => {
  const storedBudgets = localStorage.getItem('budgets');
  return storedBudgets ? JSON.parse(storedBudgets) : data.budgets || [];
};

// Create a provider component
export const TransactionsProvider = ({ children }) => {
  const initialTransactions = data.transactions || [];
  // const initialBudgets = data.budgets || [];
  const initialPots = data.pots || [];
  const initialBalance = data.balance || [];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [budgets, setBudgets] = useState(getStoredBudgets);
  const [pots, setPots] = useState(initialPots);
  const [balance, setBalance] = useState(initialBalance);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);

  const transactionsPerPage = 10;

  // Handle adding a new budget
  const addBudget = (newBudget) => {
    const updatedBudgets = [...budgets, newBudget];
    setBudgets(updatedBudgets);
  };


    // Save budgets to localStorage when they change
    useEffect(() => {
      localStorage.setItem('budgets', JSON.stringify(budgets));
    }, [budgets]);

  // Handle filtering by search
  const filteredBySearch = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle filtering by category
  const filteredByCategory = categoryFilter === 'All'
    ? filteredBySearch
    : filteredBySearch.filter(transaction => transaction.category === categoryFilter);

  // Handle sorting
  const sortedTransactions = [...filteredByCategory].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'A-Z':
        return a.name.localeCompare(b.name);
      case 'Z-A':
        return b.name.localeCompare(a.name);
      case 'highest':
        return b.amount - a.amount;
      case 'lowest':
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  // Handle pagination
  const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);
  const currentTransactions = sortedTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  return (
    <TransactionsContext.Provider value={{
      categoryFilter, setCategoryFilter,
      searchQuery, setSearchQuery,
      sortBy, setSortBy,
      currentPage, setCurrentPage,
      totalPages, currentTransactions, budgets, setBudgets, transactions, pots, setPots, 
      balance, setBalance,  addBudget // Expose addBudget function
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};











// import React, { createContext, useState, useEffect } from 'react';
// import data from '../assets/data.json';

// // Create the context
// export const TransactionsContext = createContext();

// // Create a provider component
// export const TransactionsProvider = ({ children }) => {
//   const transactions = data.transactions || [];
//   const budgets = data.budgets || [];
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('latest');
//   const [currentPage, setCurrentPage] = useState(1);

//   const transactionsPerPage = 10;

//   // Handle filtering by search
//   const filteredBySearch = transactions.filter(transaction =>
//     transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Handle filtering by category
//   const filteredByCategory = categoryFilter === 'All'
//     ? filteredBySearch
//     : filteredBySearch.filter(transaction => transaction.category === categoryFilter);

//   // Handle sorting
//   const sortedTransactions = [...filteredByCategory].sort((a, b) => {
//     switch (sortBy) {
//       case 'latest':
//         return new Date(b.date) - new Date(a.date);
//       case 'oldest':
//         return new Date(a.date) - new Date(b.date);
//       case 'A-Z':
//         return a.name.localeCompare(b.name);
//       case 'Z-A':
//         return b.name.localeCompare(a.name);
//       case 'highest':
//         return b.amount - a.amount;
//       case 'lowest':
//         return a.amount - b.amount;
//       default:
//         return 0;
//     }
//   });

//   // Handle pagination
//   const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);
//   const currentTransactions = sortedTransactions.slice(
//     (currentPage - 1) * transactionsPerPage,
//     currentPage * transactionsPerPage
//   );

//   return (
//     <TransactionsContext.Provider value={{
//       categoryFilter, setCategoryFilter,
//       searchQuery, setSearchQuery,
//       sortBy, setSortBy,
//       currentPage, setCurrentPage,
//       totalPages, currentTransactions, budgets, transactions
//     }}>
//       {children}
//     </TransactionsContext.Provider>
//   );
// };

