import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className={`font-sans transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-b from-blue-50 to-green-50 text-gray-900"}`}>
      {/* Header */}
      <header className={`p-4 shadow-lg ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-green-500 to-blue-500 text-white"}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">FarmEase</h1>
          <nav className="flex gap-4 items-center">
            <a href="#features-services" className="hover:underline">Features</a>
            <a href="#testimonials" className="hover:underline">Testimonials</a>
            <Link to="/about" className="hover:underline">About Us</Link>
            <a href="#contact" className="hover:underline">Contact</a>
            <Link to="/ulogin" className="hover:underline">Login</Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`py-24 text-center ${darkMode ? "bg-gray-900" : "bg-gradient-to-r from-green-200 to-blue-200 text-green-900"}`}>
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-4">Your Digital Partner in Smart Farming</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore innovative tools and expert services that transform the way you manage and grow your farm.
          </p>
          <button
            onClick={() => navigate("/ulogin")}
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-500 transition duration-300 text-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features & Services */}
      <section id="features-services" className={`py-24 ${darkMode ? "bg-gray-800 text-white" : "bg-blue-200"}`}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Features */}
            <div className="bg-white/90 dark:bg-gray-700/90 border border-gray-200 dark:border-gray-600 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
              <ul className="space-y-6">
                <li>
                  <h3 className="text-xl font-semibold">Crop Health Monitoring</h3>
                  <p className="text-sm">
                    Get instant insights on crop health with real-time sensors and satellite data. Early detection of pests, diseases, and stress factors helps you take corrective action before yield is affected.
                  </p>
                </li>
                <li>
                  <h3 className="text-xl font-semibold">All-in-One Management</h3>
                  <p className="text-sm">
                    Manage your entire farm operation in one dashboard—track resources, assign tasks, monitor expenses, and generate reports to boost productivity and stay organized.
                  </p>
                </li>
                <li>
                  <h3 className="text-xl font-semibold">Smart Irrigation</h3>
                  <p className="text-sm">
                    Optimize water usage with intelligent, AI-driven irrigation systems that adjust to soil moisture and weather conditions. Save water while keeping crops perfectly hydrated.
                  </p>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="bg-white/90 dark:bg-gray-700/90 border border-gray-200 dark:border-gray-600 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
              <ul className="space-y-6">
                <li>
                  <h3 className="text-xl font-semibold mb-1">Agri Consultancy</h3>
                  <p className="text-sm">
                    Benefit from personalized advice on crop planning, modern farming techniques, and sustainable practices tailored to your farm's specific needs.
                  </p>
                </li>
                <li>
                  <h3 className="text-xl font-semibold mb-1">Soil & Nutrient Testing</h3>
                  <p className="text-sm">
                    Receive detailed soil health reports and nutrient profiles, enabling informed fertilization strategies and improved crop performance.
                  </p>
                </li>
                <li>
                  <h3 className="text-xl font-semibold mb-1">Market Connect</h3>
                  <p className="text-sm">
                    Expand your reach with our network of verified buyers. List your produce, negotiate fair prices, and streamline sales without intermediaries.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className={`py-24 ${darkMode ? "bg-gray-900 text-white" : "bg-blue-100"}`}>
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">What Farmers Say</h2>
          <div className="max-w-3xl mx-auto">
            <Slider {...settings}>
              {["John Doe", "Jane Smith", "Alice Johnson", "Robert Brown"].map((name, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md mx-4"
                >
                  <p className="italic mb-4">
                    "{
                      index === 0
                        ? "FarmEase's solutions have transformed our farming operations. we're seeing higher yields and better efficiency."
                        : index === 1
                        ? "The precision farming tools provided by FarmEase are top-notch. We can now manage our fields more effectively."
                        : index === 2
                        ? "Smart irrigation has saved us a lot of water while ensuring our crops get the necessary hydration."
                        : "The market access services helped us find buyers quickly and get better prices for our produce."
                    }"
                  </p>
                  <h4 className="text-xl font-semibold">- {name}</h4>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className={`py-24 ${darkMode ? "bg-gray-800 text-white" : "bg-green-100"}`}>
        <div className="container mx-auto max-w-xl">
          <h2 className="text-4xl font-bold mb-8 text-center">Contact Us</h2>
          <form
            action="http://localhost:7000/api/contact"
            method="POST"
            className="bg-white/90 dark:bg-gray-700/90 border border-gray-200 dark:border-gray-600 p-8 rounded-xl shadow-2xl backdrop-blur-sm space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 border rounded dark:bg-gray-800"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 border rounded dark:bg-gray-800"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="w-full p-3 border rounded dark:bg-gray-800"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-green-500 to-blue-500 text-white"}`}>
        <div className="container mx-auto text-center">
          <p>&copy; 2024 FarmEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
