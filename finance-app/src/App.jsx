import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Overview from './components/Overview';
import Transactions from './components/Transactions';
import Budgets from './components/Budgets';
import Pots from './components/Pots';
import RecurringBills from './components/RecurringBills';
import Header from './components/Header';
import { TransactionsProvider } from './components/TransactionsContext';

const App = () => {
  const [headerView, setHeaderView] = useState(true); // Lift headerView state to App
  return (
    <TransactionsProvider>
      <Router>
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-custom-bg">
          {/* Sidebar/Header Component */}
          <Header headerView={headerView} setHeaderView={setHeaderView} />

          {/* Main content area */}
          <div className={`flex-1 p-4 ${headerView ? 'lg:ml-64' : 'lg:ml-20'} lg:pt-5 pt-5 lg:h-screen h-full bg-custom-bg`}>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/pots" element={<Pots />} />
              <Route path="/recurring-bills" element={<RecurringBills />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TransactionsProvider>
  );
};

export default App;