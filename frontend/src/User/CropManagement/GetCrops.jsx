import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { DarkModeContext } from '../../DarkModeContext';

const GetCrops = () => {
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      axios.get(`http://localhost:7000/getcrops/${user.id}`)
        .then((response) => {
          setCrops(response.data);
        })
        .catch((error) => {
          console.error('Error fetching crops: ', error);
          setError('There was an error fetching the crops data!');
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleAddCrop = () => navigate('/addcrop');
  const handleEditCrop = (id) => navigate(`/updatecrop/${id}`);
  const handleDeleteCrop = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/deletecrop/${id}`);
      setCrops(crops.filter(c => c._id !== id));
      alert('Crop deleted successfully');
    } catch (error) {
      console.error('Error deleting crop: ', error);
      setError('There was an error deleting the crop!');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-600 dark:text-green-300">My Crops</h2>
          <button
            onClick={handleAddCrop}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow-md transition"
          >
            Add Crop
          </button>
        </div>

        {isLoading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : crops.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl font-bold">No Crops Added Yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Start by adding your first crop today.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Variety</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Planted Date</th>
                  <th className="px-4 py-3">Harvest Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-200">
                {crops.map((crop, index) => (
                  <tr key={crop._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{crop.name}</td>
                    <td className="px-4 py-3">{crop.variety}</td>
                    <td className="px-4 py-3">{crop.quantity}</td>
                    <td className="px-4 py-3">{new Date(crop.plantedDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{new Date(crop.estimatedHarvestDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => handleEditCrop(crop._id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-1 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCrop(crop._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="bg-green-600 text-white py-4 text-center mt-8">
        <p>&copy; 2024 FarmEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GetCrops;
