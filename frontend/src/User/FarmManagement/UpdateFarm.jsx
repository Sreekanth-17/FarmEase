import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Navbar from '../Navbar';
import { DarkModeContext } from '../../DarkModeContext'; // adjust path if needed

const UpdateFarm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const [farmData, setFarmData] = useState({
    name: '',
    location: '',
    areaSize: '',
    cropType: '',
    createdAt: ''
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:7000/getfarm/${id}`)
      .then((response) => {
        const formattedData = {
          ...response.data,
          createdAt: moment(response.data.createdAt).format('YYYY-MM-DD')
        };
        setFarmData(formattedData);
      })
      .catch((err) => {
        console.error('Error fetching farm:', err);
        setError('Failed to fetch farm data');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmData({ ...farmData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:7000/editfarm/${id}`, farmData);
      alert('Farm updated successfully');
      navigate('/getfarms');
    } catch (err) {
      console.error('Error updating:', err);
      setError('There was an error updating the farm!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      <Navbar />

      <div className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-gray-800 dark:to-gray-700 py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">✏️ Update Farm Details</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl px-8 pt-6 pb-8 max-w-lg mx-auto border border-gray-200 dark:border-gray-700"
        >
          {[
            { name: 'name', label: 'Farm Name', type: 'text' },
            { name: 'location', label: 'Location', type: 'text' },
            { name: 'areaSize', label: 'Area Size (in acres)', type: 'number' },
            { name: 'cropType', label: 'Crop Type', type: 'text' },
            { name: 'createdAt', label: 'Created At', type: 'date' }
          ].map(({ name, label, type }) => (
            <div className="mb-4" key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={farmData[name]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow-md transition"
            >
              {isLoading ? 'Updating...' : 'Update Farm'}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        </form>
      </div>

      <footer className="bg-green-600 text-white text-center py-4 mt-8">
        <p>&copy; 2024 FarmEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UpdateFarm;
