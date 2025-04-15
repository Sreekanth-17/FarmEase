import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherWidget = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;

    axios.get(`http://localhost:7000/api/weather/${city}`)
      .then((res) => setWeather(res.data))
      .catch((err) => console.error('Weather fetch error:', err));
  }, [city]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full max-w-md text-center">
      {weather ? (
        <>
          <h3 className="text-xl font-semibold">{weather.name}</h3>
          <p className="text-lg">{weather.weather[0].main}</p>
          <p className="text-2xl font-bold">{weather.main.temp}°C</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Humidity: {weather.main.humidity}%</p>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
