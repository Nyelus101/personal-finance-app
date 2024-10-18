import React, { createContext, useState, useEffect } from 'react';
import data from '../assets/data.json';

// Create the context
export const TransactionsContext = createContext();

// Get stored budgets from localStorage if available
const getStoredBudgets = () => {
  const storedBudgets = localStorage.getItem('budgets');
  return storedBudgets ? JSON.parse(storedBudgets) : data.budgets || [];
};

// Get stored budgets from localStorage if available
const getStoredPots = () => {
  const storedPots = localStorage.getItem('pots');
  return storedPots ? JSON.parse(storedPots) : data.pots || [];
};

// Create a provider component
export const TransactionsProvider = ({ children }) => {
  const initialTransactions = data.transactions || [];
  const initialBalance = data.balance || [];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [budgets, setBudgets] = useState(getStoredBudgets);
  const [pots, setPots] = useState(getStoredPots);
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

    // Handle adding a new pot
    const addPot = (newPot) => {
      const updatedPots = [...pots, newPot];
      setPots(updatedPots);
    };

  // Handle updating an existing budget

  const updateBudget = (updatedBudget) => {
    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) =>
        budget.id === updatedBudget.id ? updatedBudget : budget
      )
    );
  };

  const updatePot = (updatedPot) => {
    setPots((prevPots) =>
      prevPots.map((pot) =>
        pot.id === updatedPot.id ? updatedPot : pot
      )
    );
  };

  // Handle deleting a budget
  // const deleteBudget = (budgetId) => {
  //   const updatedBudgets = budgets.filter(budget => budget.id !== budgetId);
  //   setBudgets(updatedBudgets);
  // };

  const deleteBudget = (id) => {
    setBudgets((prevBudgets) => prevBudgets.filter(budget => budget.id !== id));
  };
  
  const deletePot = (id) => {
    setPots((prevPots) => prevPots.filter(pot => pot.id !== id));
  };

  // Save budgets to localStorage when they change
  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

    // Save budgets to localStorage when they change
    useEffect(() => {
      localStorage.setItem('pots', JSON.stringify(pots));
    }, [pots]);

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
      totalPages, currentTransactions, budgets, setBudgets, 
      transactions, pots, setPots, balance, setBalance, 
      addBudget, updateBudget, deleteBudget, addPot, updatePot, deletePot // Expose functions
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};