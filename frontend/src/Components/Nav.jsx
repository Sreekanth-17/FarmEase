import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="shadow-lg bg-gradient-to-r from-green-500 to-blue-500 text-white dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-wide">
          <Link to="/" className="text-white dark:text-white">FarmEase</Link>
        </h1>

        {/* Links */}
        <div className="hidden md:flex gap-6 items-center text-lg font-medium">
          <Link to="/" className="hover:underline text-white dark:text-white dark:hover:text-gray-400">
            Home
          </Link>
          <Link to="/ulogin" className="hover:underline text-white dark:text-white dark:hover:text-gray-400">
            User Login
          </Link>
          <Link to="/alogin" className="hover:underline text-white dark:text-white dark:hover:text-gray-400">
            Admin Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
