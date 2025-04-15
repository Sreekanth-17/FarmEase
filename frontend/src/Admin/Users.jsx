import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [crops, setCrops] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  useEffect(() => {
    axios.get('http://localhost:7000/users')
      .then((res) => setUsers(res.data))
      .catch(() => console.log('Failed to fetch users.'));
  }, []);

  const deleteData = (userId) => {
    axios.delete(`http://localhost:7000/userdelete/${userId}`)
      .then(() => {
        alert('User deleted successfully.');
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(() => {
        alert('Failed to delete user.');
      });
  };

  const fetchUserDetails = (userId) => {
    axios.get(`http://localhost:7000/getfarms/${userId}`)
      .then((res) => {
        setItems(res.data);
        setShowDetails(true);
      })
      .catch(() => console.log('Error fetching farms data'));

    axios.get(`http://localhost:7000/getcrops/${userId}`)
      .then((res) => {
        setCrops(res.data);
        setShowDetails(true);
      })
      .catch(() => console.log('Error fetching crops data'));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Anavbar />
      <div className="container mx-auto p-5 bg-white shadow-xl rounded-lg max-w-5xl mt-20">
        <h1 className="text-center text-3xl font-bold text-gray-700 mb-6">Users</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Sl/No</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">UserId</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">User Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user._id}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 space-x-2 flex items-center">
                  <Link to={`/useredit/${user._id}`} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </Link>
                  <button onClick={() => deleteData(user._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                  <button onClick={() => fetchUserDetails(user._id)} className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleDetails}></div>
          <div className="bg-white p-6 rounded-lg z-10 max-h-[85vh] overflow-y-auto w-11/12 md:w-3/4">
            <h1 className="text-center text-3xl font-bold text-blue-700 mb-6">User Info</h1>

            <div className="space-y-8">
              {/* Farms Section */}
              <section>
                <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Farms</h2>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <div key={item._id} className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
                      <p><strong>{index + 1}) Area Size:</strong> {item.areaSize} acres</p>
                      <p><strong>Crop Type:</strong> {item.cropType}</p>
                      <p><strong>Location:</strong> {item.location}</p>
                      <p><strong>User Name:</strong> {item.userName}</p>
                      <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-lg font-medium text-red-600">No Farms Data Found</p>
                )}
              </section>

              {/* Crops Section */}
              <section>
                <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Crops</h2>
                {crops.length > 0 ? (
                  crops.map((crop, index) => (
                    <div key={crop._id} className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
                      <p><strong>{index + 1}) Name:</strong> {crop.name}</p>
                      <p><strong>Variety:</strong> {crop.variety}</p>
                      <p><strong>Planted Date:</strong> {new Date(crop.plantedDate).toLocaleDateString()}</p>
                      <p><strong>Harvest Date:</strong> {new Date(crop.estimatedHarvestDate).toLocaleDateString()}</p>
                      <p><strong>Quantity:</strong> {crop.quantity} quintal</p>
                      <p><strong>User Name:</strong> {crop.userName}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-lg font-medium text-red-600">No Crops Data Found</p>
                )}
              </section>
            </div>

            <div className="text-center mt-6">
              <button onClick={toggleDetails} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
