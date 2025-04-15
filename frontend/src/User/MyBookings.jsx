import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Mybookings() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const pdref = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get(`http://localhost:7000/getbookings/${user.id}`)
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
    }
  }, []);

  const calculateStatus = (bookingDate) => {
    const currentDate = new Date();
    const formattedBookingDate = new Date(bookingDate);
    const diffTime = Math.abs(currentDate - formattedBookingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? 'completed' : 'upcoming';
  };

  const calculateStatus1 = (bookingDate) => {
    const currentDate = new Date();
    const formattedBookingDate = new Date(bookingDate);
    const diffTime = Math.abs(currentDate - formattedBookingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 5 ? 'on the way' : 'delivered';
  };

  const statusColor = (status) => {
    return status === 'on the way'
      ? 'bg-yellow-500 text-white'
      : 'bg-green-600 text-white';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => {
              const status = calculateStatus1(item.OrderdDate);

              return (
                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-xl"
                >
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Booking ID:</p>
                    <p className="font-semibold">{item._id.slice(0, 10)}</p>
                  </div>

                  <div className="space-y-2">
                    <p><strong>Product:</strong> {item.productName}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Price:</strong> ₹{item.totalamount}</p>
                    <p><strong>Booking Date:</strong> {item.OrderdDate}</p>
                    <p className={`inline-block px-3 py-1 mt-2 rounded-full text-sm font-medium ${statusColor(status)}`}>
                      {status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-2xl font-semibold text-gray-500 dark:text-gray-400">No bookings yet</p>
          </div>
        )}
      </div>

      <footer className="bg-green-600 text-white text-center py-4 mt-10">
        <p>&copy; 2024 FarmEase. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Mybookings;
