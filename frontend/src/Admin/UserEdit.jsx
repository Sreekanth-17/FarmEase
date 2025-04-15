import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Anavbar from './Anavbar';

const UserEdit = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/useredit/${id}`, user);
      alert('User updated successfully');
      navigate('/users');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div>
      <Anavbar />
      <div className="flex justify-center items-center">
        <div className="mt-8 p-4 border rounded shadow-lg bg-gradient-to-l from-teal-600 to-green-500" style={{ width: '35%' }}>
          <h2 className="text-2xl font-semibold mb-4 text-center text-white">Update User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-center">
              <label className="block text-white">User Name</label>
              <input
                type="text"
                name="name"
                placeholder="User Name"
                value={user.name}
                onChange={handleChange}
                required
                className="border rounded py-2 px-3 w-[280px] text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4 text-center">
              <label className="block text-white">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                required
                className="border rounded py-2 px-3 w-[280px] text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4 text-center">
              <label className="block text-white">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                required
                className="border rounded py-2 px-3 w-[280px] text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
