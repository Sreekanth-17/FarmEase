import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=e14698ee9b847e6944a2b35504c54cb2&units=metric`
          );
          setUserLocation(response.data.name);
          setLocation(`${response.data.name}`);
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      });
    }
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e14698ee9b847e6944a2b35504c54cb2&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="font-sans transition-all duration-500 dark:bg-gray-900 dark:text-white bg-gradient-to-b from-blue-50 to-green-50 min-h-screen">
      <Navbar />
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-4">Weather Forecast</h2>
          <p className="text-lg text-center mb-8">
            {userLocation ? `Current Location: ${userLocation}` : "Detecting location..."}
          </p>

          <div className="flex justify-center gap-2 mb-8">
            <input
              type="text"
              value={location}
              onChange={handleInputChange}
              placeholder="Enter location"
              className="w-full max-w-xs p-3 rounded-l-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 text-black dark:text-white"
            />
            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-r-lg transition"
            >
              Search
            </button>
          </div>

          {weatherData && (
            <div className="bg-white dark:bg-gray-700/90 border border-gray-200 dark:border-gray-600 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Weather for {weatherData.name}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center text-lg">
                <div>
                  <p className="font-semibold">Temperature</p>
                  <p>{weatherData.main.temp}°C</p>
                </div>
                <div>
                  <p className="font-semibold">Humidity</p>
                  <p>{weatherData.main.humidity}%</p>
                </div>
                <div>
                  <p className="font-semibold">Wind Speed</p>
                  <p>{weatherData.wind.speed} m/s</p>
                </div>
                <div>
                  <p className="font-semibold">Pressure</p>
                  <p>{weatherData.main.pressure} hPa</p>
                </div>
                <div>
                  <p className="font-semibold">Visibility</p>
                  <p>{weatherData.visibility / 1000} km</p>
                </div>
                <div>
                  <p className="font-semibold">Description</p>
                  <p className="capitalize">{weatherData.weather[0].description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Weather;
