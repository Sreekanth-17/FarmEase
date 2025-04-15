import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { DarkModeContext } from '../DarkModeContext';

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [farmDropdownOpen, setFarmDropdownOpen] = useState(false);
  const [cropDropdownOpen, setCropDropdownOpen] = useState(false);
  const farmDropdownRef = useRef(null);
  const cropDropdownRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleFarmDropdown = () => {
    setFarmDropdownOpen(!farmDropdownOpen);
    setCropDropdownOpen(false); // Close crop dropdown if open
  };

  const handleCropDropdown = () => {
    setCropDropdownOpen(!cropDropdownOpen);
    setFarmDropdownOpen(false); // Close farm dropdown if open
  };

  const handleClickOutside = (event) => {
    if (farmDropdownRef.current && !farmDropdownRef.current.contains(event.target)) {
      setFarmDropdownOpen(false);
    }
    if (cropDropdownRef.current && !cropDropdownRef.current.contains(event.target)) {
      setCropDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`bg-gradient-to-r ${darkMode ? 'from-gray-900 to-gray-700' : 'from-green-500 to-blue-500'} text-white dark:text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold tracking-wide text-white dark:text-white">
                FarmEase
              </Link>
            </div>
          </div>
          <div className="hidden md:flex ml-auto space-x-4">
            <Link to="/uproducts" className="text-white px-3 py-2 rounded-md text-lg font-medium hover:text-gray-300 dark:hover:text-gray-400">
              Products
            </Link>
            <div className="relative group" ref={farmDropdownRef}>
              <button
                onClick={handleFarmDropdown}
                className="text-white px-3 py-2 rounded-md text-lg font-medium hover:text-gray-300 dark:hover:text-gray-400"
              >
                Farms
              </button>
              {farmDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 dark:bg-gray-800 dark:text-white">
                  <Link
                    to="/getfarms"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setFarmDropdownOpen(false)}
                  >
                    Get Farms
                  </Link>
                  <Link
                    to="/addfarm"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setFarmDropdownOpen(false)}
                  >
                    Add Farm
                  </Link>
                </div>
              )}
            </div>
            <div className="relative group" ref={cropDropdownRef}>
              <button
                onClick={handleCropDropdown}
                className="text-white px-3 py-2 rounded-md text-lg font-medium hover:text-gray-300 dark:hover:text-gray-400"
              >
                Crops
              </button>
              {cropDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 dark:bg-gray-800 dark:text-white">
                  <Link
                    to="/getcrops"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setCropDropdownOpen(false)}
                  >
                    Get Crops
                  </Link>
                  <Link
                    to="/addcrop"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setCropDropdownOpen(false)}
                  >
                    Add Crop
                  </Link>
                </div>
              )}
            </div>
            <Link to="/mybookings" className="text-white px-3 py-2 rounded-md text-lg font-medium hover:text-gray-300 dark:hover:text-gray-400">
              MyBookings
            </Link>
            <Link to="/" className="text-white px-3 py-2 rounded-md text-lg font-medium hover:text-gray-300 dark:hover:text-gray-400">
              Logout
            </Link>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="bg-green-700 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/uhome"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 dark:hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/uproducts"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 dark:hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <div className="relative group" ref={farmDropdownRef}>
              <button
                onClick={handleFarmDropdown}
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 dark:hover:text-gray-400"
              >
                Farms
              </button>
              {farmDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 dark:bg-gray-800 dark:text-white">
                  <Link
                    to="/getfarms"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setFarmDropdownOpen(false)}
                  >
                    Get Farms
                  </Link>
                  <Link
                    to="/addfarm"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setFarmDropdownOpen(false)}
                  >
                    Add Farm
                  </Link>
                </div>
              )}
            </div>
            <div className="relative group" ref={cropDropdownRef}>
              <button
                onClick={handleCropDropdown}
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 dark:hover:text-gray-400"
              >
                Crops
              </button>
              {cropDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 dark:bg-gray-800 dark:text-white">
                  <Link
                    to="/getcrops"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setCropDropdownOpen(false)}
                  >
                    Get Crops
                  </Link>
                  <Link
                    to="/addcrop"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setCropDropdownOpen(false)}
                  >
                    Add Crop
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/mybookings"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 dark:hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              MyBookings
            </Link>
            <Link
              to="/"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300 dark:hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
