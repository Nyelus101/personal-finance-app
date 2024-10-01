import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PiHouseFill, PiArrowsDownUpFill, PiChartDonutFill, PiTipJarLight, PiReceiptLight, PiArrowFatLinesLeftFill, PiArrowFatLinesRightFill  } from "react-icons/pi";

// Define the routes for the navigation
const routes = [
  { path: '/', name: 'Overview', icon: <PiHouseFill /> },
  { path: '/transactions', name: 'Transactions', icon: <PiArrowsDownUpFill /> },
  { path: '/budgets', name: 'Budgets', icon: <PiChartDonutFill /> },
  { path: '/pots', name: 'Pots', icon: <PiTipJarLight /> },
  { path: '/recurring-bills', name: 'Recurring Bills', icon: <PiReceiptLight /> },
];

const Header = () => {
  const location = useLocation(); // Get the current location

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="hidden lg:block w-64 h-full bg-gray-800 text-white fixed rounded-r-2xl pt-10">
        <span className="font-extrabold text-2xl p-4">finance</span>
        <nav className="mt-10 mb-[80%] ">
          <ul>
            {routes.map((route) => (
              <li
                key={route.path}
                className={`mb-2 pl-4 flex items-center space-x-4 ${isActive(route.path) ? 'bg-white text-gray-800 rounded-r-xl border-l-4 border-green-500 w-[90%] ' : ''}`}
              >
                {/* Icon and Text Link */}
                <span className="text-xl">
                  {route.icon}
                </span>
                <Link to={route.path} className="block p-2">
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='flex flex-row justify-start items-center pl-4 space-x-7'>
            <PiArrowFatLinesLeftFill />
            <span>Minimize menu</span>
        </div>
        {/* <PiArrowFatLinesRightFill /> */}
      </div>

      {/* Footer for medium and smaller screens */}
      <footer className="lg:hidden fixed bottom-0 w-full bg-gray-800 text-white rounded-t-lg">
        <nav className="p-4 pb-0 flex justify-around">
            <ul className="flex w-full justify-around">
            {routes.map((route) => (
                <li
                key={route.path}
                className={`p-2 w-32 flex flex-col justify-center items-center ${isActive(route.path) ? 'bg-white text-gray-800 rounded-t-xl border-b-4 border-green-500' : ''}`}
                >
                {/* Icon and Text Link (Vertically Aligned) */}
                <Link to={route.path} className="flex flex-col items-center justify-around">
                    <span className="text-xl mb-1">
                        {route.icon}
                    </span>
                    <div className="text-sm hidden md:flex">
                        {route.name}
                    </div>
                </Link>
                </li>
            ))}
            </ul>
        </nav>
        </footer>

    </>
  );
};

export default Header;






// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   return (
//     <aside className="w-64 h-full bg-gray-800 text-white fixed rounded-r-2xl">
//       <nav className="p-4">
//         <ul>
//           <li className="mb-4"><Link to="/">Overview</Link></li>
//           <li className="mb-4"><Link to="/transactions">Transactions</Link></li>
//           <li className="mb-4"><Link to="/budgets">Budgets</Link></li>
//           <li className="mb-4"><Link to="/pots">Pots</Link></li>
//           <li className="mb-4"><Link to="/recurring-bills">Recurring Bills</Link></li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Header;
