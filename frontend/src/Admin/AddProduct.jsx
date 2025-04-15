import React, { useState } from 'react';
import axios from 'axios';
import Anavbar from './Anavbar';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ fetchProducts }) => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    imgUrl: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { name, category, price, description, imgUrl } = productData;
    if (!name || !category || !price || !description || !imgUrl) {
      setError('All fields are required!');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:7000/products', productData);
      alert('Product added successfully');
      navigate('/getproducts');
      fetchProducts();
      setProductData({
        name: '',
        category: '',
        price: '',
        description: '',
        imgUrl: ''
      });
    } catch (error) {
      setError('There was an error adding the product!');
      console.error('Error in adding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <Anavbar />
      <div className="flex justify-center items-center py-12 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-xl rounded-2xl px-8 pt-6 pb-8 w-full max-w-xl"
        >
          <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-300 mb-8">
            Add New Product
          </h2>

          {['name', 'category', 'price', 'description', 'imgUrl'].map((field) => (
            <div className="mb-5" key={field}>
              <label
                htmlFor={field}
                className="block text-gray-800 dark:text-gray-200 font-semibold mb-2 capitalize"
              >
                {field === 'imgUrl' ? 'Image URL' : field}
              </label>
              <input
                type={field === 'price' ? 'number' : 'text'}
                name={field}
                id={field}
                value={productData[field]}
                onChange={handleChange}
                required
                placeholder={`Enter ${field === 'imgUrl' ? 'image URL' : field}`}
                className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              {isLoading ? 'Adding...' : 'Add Product'}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
