// src/components/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Welcome to FarmEase
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
            FarmEase is dedicated to revolutionizing the agricultural industry through innovative technology solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Our Mission',
              description:
                'Our mission is to enhance productivity and sustainability in agriculture through cutting-edge technology and data-driven solutions.',
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              title: 'Our Vision',
              description:
                'Our vision is to be a global leader in providing innovative agricultural technologies that empower farmers and agribusinesses to thrive.',
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5V4H2v16h5m10 0h-6m2 0v-6m-2 0h6" />
                </svg>
              ),
            },
            {
              title: 'Our Values',
              description:
                'We value innovation, sustainability, and collaboration. We are committed to creating solutions that benefit farmers, consumers, and the environment.',
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h6l-1.5-1.5L12 4l1.5 1.5L16 10h6M6 20h6m6-12h2v6h-2zM4 14h2v6H4v-6z" />
                </svg>
              ),
            },
            {
              title: 'Our Impact',
              description:
                'Our solutions have improved crop yields, reduced resource usage, and enhanced the livelihoods of countless farmers worldwide.',
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7 20h10M9 4h6m-6 4h6" />
                </svg>
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-green-100 dark:border-gray-700 p-6 transition hover:shadow-xl"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 text-white absolute -top-6 left-6">
                {item.icon}
              </div>
              <div className="ml-16 mt-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
