import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Overview from './components/Overview';
import Transactions from './components/Transactions';
import Budgets from './components/Budgets';
import Pots from './components/Pots';
import RecurringBills from './components/RecurringBills';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div className="flex w-full bg-custom-bg">
        {/* Sidebar/Header Component */}
        <Header />

        {/* Main content area */}
        <div className="ml-64 p-4 w-full h-screen bg-custom-bg ">
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
  );
};

export default App;
