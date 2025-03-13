// src/components/ResultDisplay.jsx
import React from 'react';

export const ResultDisplay = ({ recommendation }) => {

  console.log("Recommendation received in ResultDisplay 1111111 :", recommendation);

  // If no recommendation is received, display a friendly message
  if (!recommendation || Object.keys(recommendation).length === 0) {

    console.log("Recommendation received in ResultDisplay 2222 :", recommendation);

    return (
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-500">No recommendation available.</h2>
        <p className="text-gray-400">Please enter your details and submit again.</p>
      </div>
    );
  }
  console.log("Recommendation received in ResultDisplay 333 :", recommendation);
  return (
    <div className="bg-white shadow-lg rounded-xl border border-blue-100 p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Your Recommended Gear</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(recommendation).map(([key, value]) => (
          <div key={key} className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700 capitalize">
              {formatKey(key)}
            </h3>
            <p className="text-gray-700">{value ? value.toString() : 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to format recommendation keys into readable labels
const formatKey = (key) => {
  return key
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};


