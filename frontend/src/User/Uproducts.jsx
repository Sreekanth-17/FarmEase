import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../User/Navbar';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../DarkModeContext';

const UProducts = () => {
  const [products, setProducts] = useState([]);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:7000/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 to-green-100 text-gray-900'}`}>
      <Navbar />

      {/* Header Section */}
      <div className="py-10 px-4 text-center bg-gradient-to-r from-green-300 to-blue-300 dark:from-gray-800 dark:to-gray-700">
        <h1 className="text-4xl font-bold mb-2">🌿 FarmEase Product Market</h1>
        <p className="text-lg">Browse and buy quality products directly from our digital store.</p>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-56 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <img src={product.imgUrl} alt={product.name} className="h-full object-cover w-full" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-center mb-2">{product.name}</h2>
                <p className="text-sm mb-1"><span className="font-medium">Category:</span> {product.category}</p>
                <p className="text-sm mb-1"><span className="font-medium">Price:</span> ₹{product.price}</p>
                <p className="text-sm text-justify mb-4"><span className="font-medium">Description:</span> {product.description}</p>

                <Link to={`/buyproduct/${product._id}`}>
                  <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 FarmEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UProducts;
