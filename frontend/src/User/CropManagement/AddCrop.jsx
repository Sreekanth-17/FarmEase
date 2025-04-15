import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { DarkModeContext } from '../../DarkModeContext';

const AddCrop = ({ fetchCrops }) => {
  const [cropdata, setCropdata] = useState({
    name: '',
    variety: '',
    quantity: '',
    plantedDate: '',
    estimatedHarvestDate: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropdata({ ...cropdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { name, variety, quantity, plantedDate, estimatedHarvestDate } = cropdata;

    if (!name || !variety || !quantity || !plantedDate || !estimatedHarvestDate) {
      setError('All fields are required!');
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const updatedFormData = {
      ...cropdata,
      userId: user?.id,
      userName: user?.name,
    };

    try {
      await axios.post('http://localhost:7000/addcrop', updatedFormData);
      alert('Crop added successfully!');
      fetchCrops();
      navigate('/getcrops');
    } catch (err) {
      setError('There was an error adding the crop!');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      <Navbar />

      <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Add New Crop</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-xl mx-auto space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Crop Name</label>
            <input
              type="text"
              name="name"
              value={cropdata.name}
              onChange={handleChange}
              placeholder="e.g., Tomato"
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Variety</label>
            <input
              type="text"
              name="variety"
              value={cropdata.variety}
              onChange={handleChange}
              placeholder="e.g., Cherry"
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={cropdata.quantity}
              onChange={handleChange}
              placeholder="e.g., 50"
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Planted Date</label>
            <input
              type="date"
              name="plantedDate"
              value={cropdata.plantedDate}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estimated Harvest Date</label>
            <input
              type="date"
              name="estimatedHarvestDate"
              value={cropdata.estimatedHarvestDate}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
          >
            {isLoading ? 'Adding...' : 'Add Crop'}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>

      <footer className="bg-green-600 text-white py-4 text-center mt-10">
        <p>&copy; 2024 FarmEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AddCrop;
