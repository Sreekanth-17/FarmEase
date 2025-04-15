import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const GetFarms = () => {
  const [farms, setFarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      axios.get(`http://localhost:7000/getfarms/${user.id}`)
        .then((response) => {
          setFarms(response.data);
        })
        .catch((error) => {
          console.error('Error fetching farms: ', error);
          setError('There was an error fetching the farms data!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const handleAddFarm = () => navigate('/addfarm');
  const handleEditFarm = (farmId) => navigate(`/updatefarm/${farmId}`);

  const handleDeleteFarm = async (farmId) => {
    try {
      await axios.delete(`http://localhost:7000/deletefarm/${farmId}`);
      setFarms(farms.filter(farm => farm._id !== farmId));
      alert('Farm deleted successfully');
    } catch (error) {
      console.error('Error deleting farm: ', error);
      setError('There was an error deleting the farm!');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-600 dark:text-green-300">My Farms</h2>
          <button
            onClick={handleAddFarm}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow-md transition"
          >
            Add New Farm
          </button>
        </div>

        {isLoading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : farms.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl font-bold">No Farms Created Yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Start managing your farm by adding one now.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Area Size</th>
                  <th className="px-4 py-3">Crop Type</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-200">
                {farms.map((farm, index) => (
                  <tr key={farm._id} className="border-t dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{farm.name}</td>
                    <td className="px-4 py-3">{farm.location}</td>
                    <td className="px-4 py-3">{farm.areaSize} acres</td>
                    <td className="px-4 py-3">{farm.cropType}</td>
                    <td className="px-4 py-3">
                      {new Date(farm.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => handleEditFarm(farm._id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-1 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFarm(farm._id)}
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

      <footer className="bg-green-600 text-white py-4 text-center">
        <p>&copy; 2024 FarmEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GetFarms;
