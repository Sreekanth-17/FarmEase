import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const ViewCropData = () => {
  const { name } = useParams();
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:7000/cropsdata/${name}`)
      .then(res => setCrop(res.data))
      .catch(err => console.error(err));
  }, [name]);

  if (!crop) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
      <p className="text-lg">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden p-6 md:p-10 max-w-5xl mx-auto">
          
          {/* Crop Image */}
          <div className="flex justify-center mb-6">
            <img
              src={crop.imgUrl}
              alt={crop.name}
              className="h-64 w-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Crop Title */}
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-300 text-center mb-6">
            {crop.name}
          </h1>

          {/* Crop Info Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <tbody>
                <InfoRow label="Crop Name" value={crop.name} />
                <InfoRow label="Scientific Name" value={crop.scientificName} />
                <InfoRow label="Season" value={crop.season} />
                <InfoRow label="Temperature Range" value={crop.temperatureRange} />
                <InfoRow label="Rainfall Range" value={crop.rainfallRange} />
                <InfoRow label="Soil Type" value={crop.soilType} />
                <InfoRow label="Sowing Time" value={crop.sowingTime} />
                <InfoRow label="Harvest Time" value={crop.harvestTime} />
                <InfoRow label="Duration" value={crop.duration} />
                <InfoRow label="Pesticides" value={crop.pesticides?.join(', ')} />
                <InfoRow label="Fertilizers" value={crop.fertilizers?.join(', ')} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <tr className="border-b border-gray-300 dark:border-gray-700">
    <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-300">{label}:</td>
    <td className="px-4 py-3">{value}</td>
  </tr>
);

export default ViewCropData;
