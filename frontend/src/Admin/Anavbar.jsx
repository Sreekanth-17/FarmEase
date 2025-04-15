import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { DarkModeContext } from '../DarkModeContext';

const Anavbar = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <header className={`transition-all duration-300 ${darkMode ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white' : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'} shadow-lg`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide text-white dark:text-white">FarmEase Admin</h1>
        <nav className="flex items-center gap-6 text-lg font-medium">
          <Link to="/ahome" className="hover:text-gray-300 dark:hover:text-gray-400 transition-colors">Dashboard</Link>
          <Link to="/users" className="hover:text-gray-300 dark:hover:text-gray-400 transition-colors">Users</Link>
          <Link to="/getproducts" className="hover:text-gray-300 dark:hover:text-gray-400 transition-colors">Products</Link>
          <Link to="/addproduct" className="hover:text-gray-300 dark:hover:text-gray-400 transition-colors">Add Product</Link>
          <Link to="/ulogin" className="hover:text-red-300 dark:hover:text-red-400 transition-colors">Logout</Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Anavbar;
