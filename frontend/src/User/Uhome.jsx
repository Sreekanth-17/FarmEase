import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import WeatherWidget from '../Components/WeatherWidget';
import { DarkModeContext } from '../DarkModeContext';

const Uhome = () => {
  // State Variables
  const [crops, setCrops] = useState([]);
  const [featuredCrop, setFeaturedCrop] = useState(null);
  const [city, setCity] = useState('Hyderabad');
  const [userName, setUserName] = useState('User');
  const { darkMode } = useContext(DarkModeContext);
  const [selectedSeason, setSelectedSeason] = useState('All');

  // Fetching crops data and setting user name
  useEffect(() => {
    axios.get('http://localhost:7000/cropsdata')
      .then(res => {
        setCrops(res.data);
        setFeaturedCrop(res.data[Math.floor(Math.random() * res.data.length)]);
      })
      .catch(err => console.error(err));

    // Optional: simulate user name retrieval from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) setUserName(user.name);
  }, []);

  // Filter crops based on selected season
  const seasonalCrops = selectedSeason === 'All'
    ? crops
    : crops.filter(crop => crop.season?.toLowerCase().includes(selectedSeason.toLowerCase()));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      {/* Navbar Section */}
      <Navbar />

      {/* Greeting Section */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-6 text-center">
        <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-lg mt-2">Here's the latest info tailored for you.</p>
      </div>

      {/* Weather Widget Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-100 dark:from-gray-800 dark:to-gray-700 py-10 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Weather Forecast</h2>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800"
          >
            <option>Hyderabad</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Chennai</option>
          </select>
          <WeatherWidget city={city} />
        </div>
      </div>

      {/* Featured Crop Section */}
      {featuredCrop && (
        <div className="bg-gradient-to-r from-yellow-50 to-green-100 dark:from-gray-800 dark:to-gray-700 py-10 px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-800 dark:text-yellow-300">🌾 Featured Crop of the Day</h2>
          <Link to={`/crop/${featuredCrop.name}`} className="inline-block hover:scale-105 transform transition">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden">
              <img src={featuredCrop.imgUrl} alt={featuredCrop.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{featuredCrop.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Tap to explore details about this crop.</p>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Filter by Season Section */}
      <div className="text-center mt-8">
        <label className="font-semibold mr-2">🌤 Filter by Season:</label>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="px-4 py-2 rounded border dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none"
        >
          <option value="Kharif">Kharif</option>
          <option value="Rabi">Rabi</option>
          <option value="Winter">Winter</option>
          <option value="Summer">Summer</option>
          <option value="Tropical">Tropical</option>
        </select>
      </div>

      {/* Seasonal Suggestions Section */}
      <div className="container mx-auto p-4 bg-blue-50 dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">🌱 Best Crops to Grow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonalCrops.map(crop => (
            <Link to={`/crop/${crop.name}`} key={crop._id}>
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 hover:shadow-xl">
                <img src={crop.imgUrl} alt={crop.name} className="w-full h-40 object-cover rounded-md" />
                <h3 className="mt-2 text-center text-lg font-semibold">{crop.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Crop Info Grid Section */}
      <div className="container mx-auto p-4 bg-green-200 dark:bg-green-900">
        <h2 className="text-2xl font-bold mb-6 text-center">🌾 All Crops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map(crop => (
            <Link to={`/crop/${crop.name}`} key={crop._id}>
              <div className="bg-green-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl">
                <img src={crop.imgUrl} alt={crop.name} className="w-full h-60 object-cover rounded-t-lg" />
                <div className="mt-2">
                  <h2 className="text-2xl font-semibold text-center">{crop.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-green-600 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 FarmEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Uhome;
