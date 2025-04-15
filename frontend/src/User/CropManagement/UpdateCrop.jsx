import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import { DarkModeContext } from '../../DarkModeContext';

const UpdateCrop = ({ fetchCrops }) => {
  const [cropData, setCropData] = useState({
    name: '',
    variety: '',
    quantity: '',
    plantedDate: '',
    estimatedHarvestDate: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/getcrop/${id}`);
        const crop = response.data;
        crop.plantedDate = crop.plantedDate.split('T')[0];
        crop.estimatedHarvestDate = crop.estimatedHarvestDate.split('T')[0];
        setCropData(crop);
      } catch (error) {
        setError('Error fetching crop data');
      }
    };
    fetchCrop();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropData({ ...cropData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:7000/editcrop/${id}`, cropData);
      alert('Crop updated successfully');
      fetchCrops?.();
      navigate('/getcrops');
    } catch (error) {
      setError('There was an error updating the crop!');
      console.error('Error in updating:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      <Navbar />
      <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 py-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Crop</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-xl mx-auto space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Crop Name</label>
            <input
              type="text"
              name="name"
              value={cropData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Variety</label>
            <input
              type="text"
              name="variety"
              value={cropData.variety}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={cropData.quantity}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Planted Date</label>
            <input
              type="date"
              name="plantedDate"
              value={cropData.plantedDate}
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
              value={cropData.estimatedHarvestDate}
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
            {isLoading ? 'Updating...' : 'Update Crop'}
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

export default UpdateCrop;
