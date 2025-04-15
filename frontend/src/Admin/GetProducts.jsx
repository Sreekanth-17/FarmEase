import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

const GetProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:7000/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/deleteproduct/${id}`);
      alert('Deleted Successfully');
      setProducts(products.filter(product => product._id !== id)); // Update UI without reload
    } catch (error) {
      console.error('Error in deleting:', error);
      alert('Error deleting product');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <Anavbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-green-800 dark:text-green-300 mb-8">
          Products List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 relative"
            >
              <div className="absolute top-3 right-3 flex space-x-3 text-lg">
                <Link to={`/editproduct/${product._id}`} className="text-blue-500 hover:text-blue-700 transition">
                  <FaEdit />
                </Link>
                <button onClick={() => deleteProduct(product._id)} className="text-red-500 hover:text-red-700 transition">
                  <FaTrash />
                </button>
              </div>

              <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700 mb-4">
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  className="object-contain max-h-full w-full"
                />
              </div>

              <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
                {product.name}
              </h2>

              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <p>
                  <span className="font-semibold">Category:</span> {product.category}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ₹{product.price}
                </p>
                <p>
                  <span className="font-semibold">Description:</span> {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetProducts;
