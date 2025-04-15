import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Components/Nav';
import ReCAPTCHA from "react-google-recaptcha";

const Ulogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert("Please verify that you're not a robot.");
      return;
    }

    const payload = { email, password };
    axios
      .post("http://localhost:7000/ulogin", payload)
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          navigate('/uhome');
          alert("Login successful");
        } else {
          alert("Wrong credentials");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSignupRedirect = (e) => {
    e.preventDefault();
    navigate("/usignup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Nav />
      <div className="flex items-center justify-center py-10 px-4">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl transition-all duration-300">

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-300 mb-6 text-center">
              Login to Your FarmEase Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-green-400"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full mt-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-green-400"
                  placeholder="Enter your password"
                />
              </div>

              {/* Captcha */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey="6Le6cRkrAAAAAMMeeI5y6qnmq2pkiggv-YeRt1x7"
                  onChange={handleCaptchaChange}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Log in
                </button>
              </div>
            </form>

            {/* Signup Link */}
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 text-center">
              Don't have an account?
              <button
                onClick={handleSignupRedirect}
                className="ml-1 text-green-600 dark:text-green-400 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Image Section */}
          <div className="hidden md:block md:w-1/2 bg-green-100 dark:bg-gray-800">
            <img
              src="https://images-platform.99static.com//9nS4QCN-bkQuNUJiVvIz-8zPqrc=/1378x0:5315x3937/fit-in/500x500/projects-files/126/12694/1269426/8a544f8e-b4f3-4b6a-82e5-5fade6c20f77.png"
              alt="Farming scene"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ulogin;
