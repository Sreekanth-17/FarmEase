import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

function BuyProduct() {
  const [item, setItem] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phno: '',
  });
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:7000/products/${id}`)
      .then((resp) => setItem(resp.data))
      .catch((error) => console.log("Failed to fetch item data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, description, price, imgUrl, category } = item;
      const totalAmount = parseInt(price * quantity, 10) + 45;

      const user = JSON.parse(localStorage.getItem('user'));

      const updatedFormData = {
        ...formData,
        quantity,
        totalamount: totalAmount,
        description,
        imgUrl,
        productName: name,
        category,
        userId: user.id,
        userName: user.name,
      };

      await axios.post('http://localhost:7000/orderproduct', updatedFormData);
      alert('Ordered successfully');
      navigate('/mybookings');
    } catch (error) {
      console.error('Error booking:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      <Navbar />

      <div className="max-w-2xl mx-auto mt-12 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-300 mb-6">
          📦 Complete Your Order
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Info */}
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring focus:ring-green-400"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                type="tel"
                name="phno"
                value={formData.phno}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>
          </div>

          {/* Quantity Controls */}
          {item && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="font-semibold text-xl">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>₹ {quantity * item.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Convenience Fee</span>
                  <span>₹ 45</span>
                </div>
                <div className="flex justify-between font-bold text-green-600 dark:text-green-400">
                  <span>Total Amount</span>
                  <span>₹ {quantity * item.price + 45}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-md transition-all"
          >
            Confirm Order
          </button>
        </form>
      </div>

      <footer className="bg-green-600 text-white text-center py-4 mt-10">
        <p>&copy; 2024 FarmEase. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default BuyProduct;
