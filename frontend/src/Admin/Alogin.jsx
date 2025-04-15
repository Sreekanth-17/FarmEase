import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Components/Nav';
import ReCAPTCHA from "react-google-recaptcha";

const Alogin = () => {
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
      .post("http://localhost:7000/alogin", payload)
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          alert("Login successful");
          navigate('/ahome');
        } else {
          alert("Wrong credentials");
        }
      })
      .catch((err) => console.log(err));
  };

  const formHandle1 = (e) => {
    e.preventDefault();
    navigate("/asignup");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Nav />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">

          {/* Image Section */}
          <div className="hidden md:block md:w-1/2 bg-green-100 dark:bg-gray-800">
            <img
              src="https://images-platform.99static.com//9nS4QCN-bkQuNUJiVvIz-8zPqrc=/1378x0:5315x3937/fit-in/500x500/projects-files/126/12694/1269426/8a544f8e-b4f3-4b6a-82e5-5fade6c20f77.png"
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-extrabold text-green-600 dark:text-green-400 mb-6 text-center">
              Login to Admin account
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Password"
                />
              </div>

              {/* CAPTCHA */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey="6Le6cRkrAAAAAMMeeI5y6qnmq2pkiggv-YeRt1x7"
                  onChange={handleCaptchaChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition duration-300"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
              Don&apos;t have an account?{' '}
              <button
                onClick={formHandle1}
                className="text-green-600 hover:underline focus:outline-none"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alogin;
