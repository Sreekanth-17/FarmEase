import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';
import { DarkModeContext } from '../DarkModeContext';
import { saveAs } from 'file-saver';

function Ahome() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [farms, setFarms] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [systemHealth, setSystemHealth] = useState('Healthy');
  const { darkMode } = useContext(DarkModeContext);

  // Fetch data (Real-time updates every 5 seconds)
  const fetchData = async () => {
    try {
      const [userRes, productRes, farmRes] = await Promise.all([
        axios.get('http://localhost:7000/users'),
        axios.get('http://localhost:7000/products'),
        axios.get('http://localhost:7000/farms'),
      ]);

      setUsers(userRes.data);
      setProducts(productRes.data);
      setFarms(farmRes.data);

      // Fake recent activity feed
      setRecentActivity([
        { id: 1, text: 'New user registered', timestamp: new Date().toLocaleTimeString() },
        { id: 2, text: 'Farm added to listing', timestamp: new Date().toLocaleTimeString() },
        { id: 3, text: 'Product updated', timestamp: new Date().toLocaleTimeString() }
      ]);

      // Dummy user growth data
      setUserGrowth([
        { month: 'Jan', users: 30 },
        { month: 'Feb', users: 50 },
        { month: 'Mar', users: 80 },
        { month: 'Apr', users: userRes.data.length } // Real-time current user count
      ]);

      setSystemHealth('Healthy'); // Simulate health status

    } catch (error) {
      console.error('Error fetching data:', error);
      setSystemHealth('Issue Detected');
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Real-time update every 5s
    return () => clearInterval(interval);
  }, []);

  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalFarms = farms.length;

  const chartData = [
    { name: 'Users', value: totalUsers },
    { name: 'Farms', value: totalFarms },
    { name: 'Products', value: totalProducts },
  ];

  const colors = ['#8e44ad', '#e74c3c', '#16a085'];

  const exportData = () => {
    const csv = `Type,Count\nUsers,${totalUsers}\nFarms,${totalFarms}\nProducts,${totalProducts}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'dashboard_data.csv');
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all`}>
      <Anavbar />

      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-300">Admin Dashboard</h1>
        <p className="text-md text-gray-600 dark:text-gray-400 mt-1">Real-time overview of FarmEase activity</p>
      </div>

      <div className="w-11/12 mx-auto mt-10 p-6 rounded-lg shadow-lg bg-green-100 dark:bg-gray-800">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/users">
            <div className="bg-purple-600 text-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-center">Users</h2>
              <p className="text-3xl text-center mt-4">{totalUsers}</p>
            </div>
          </Link>

          <Link to="/users">
            <div className="bg-red-500 text-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-center">Farms</h2>
              <p className="text-3xl text-center mt-4">{totalFarms}</p>
            </div>
          </Link>

          <Link to="/getproducts">
            <div className="bg-teal-600 text-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-center">Products</h2>
              <p className="text-3xl text-center mt-4">{totalProducts}</p>
            </div>
          </Link>
        </div>

        {/* Summary Bar Chart */}
        <div className="mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg overflow-x-auto">
          <h3 className="text-xl font-bold text-center mb-4 text-gray-700 dark:text-white">Summary Chart</h3>
          <div className="flex justify-center">
            <BarChart width={500} height={300} data={chartData}>
              <XAxis dataKey="name" stroke={darkMode ? '#ccc' : '#333'} />
              <YAxis stroke={darkMode ? '#ccc' : '#333'} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" barSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>

        {/* User Growth Line Chart */}
        <div className="mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-center text-gray-700 dark:text-white">User Growth</h3>
          <LineChart width={600} height={300} data={userGrowth}>
            <XAxis dataKey="month" stroke={darkMode ? '#ccc' : '#333'} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#4CAF50" />
          </LineChart>
        </div>

        {/* Recent Activity Feed */}
        <div className="mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-center text-gray-700 dark:text-white">Recent Activity</h3>
          <ul className="space-y-2">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="border-b py-2 text-center">
                {activity.text} <span className="text-sm text-gray-500">({activity.timestamp})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* System Health + Export */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
          <div className="text-center sm:text-left text-green-700 dark:text-green-400">
            <strong>System Health:</strong> <span>{systemHealth}</span>
          </div>
          <button
            onClick={exportData}
            className="mt-4 sm:mt-0 bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded shadow"
          >
            Export Data as CSV
          </button>
        </div>
      </div>

      <footer className="bg-green-600 text-white py-4 mt-10 text-center">
        <p>&copy; 2024 FarmEase Admin. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Ahome;
