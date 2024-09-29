import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <aside className="w-64 h-full bg-gray-800 text-white fixed rounded-r-2xl">
      <nav className="p-4">
        <ul>
          <li className="mb-4"><Link to="/">Overview</Link></li>
          <li className="mb-4"><Link to="/transactions">Transactions</Link></li>
          <li className="mb-4"><Link to="/budgets">Budgets</Link></li>
          <li className="mb-4"><Link to="/pots">Pots</Link></li>
          <li className="mb-4"><Link to="/recurring-bills">Recurring Bills</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Header;
