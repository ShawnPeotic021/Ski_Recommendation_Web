// src/components/AlertMessage.jsx
import React, { useState } from 'react';

export const AlertMessage = ({ message, type = 'error' }) => {
  const [visible, setVisible] = useState(true);

  if (!message || !visible) return null;

  const alertStyles = {
    error: "bg-red-100 border border-red-400 text-red-700",
    success: "bg-green-100 border border-green-400 text-green-700",
    warning: "bg-yellow-100 border border-yellow-400 text-yellow-700"
  };

  return (
    <div className={"alert-container"} role="alert">
      <span className="block sm:inline">{message}</span>
      <button 
        onClick={() => setVisible(false)} 
        className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-700"
      >
        &times;
      </button>
    </div>
  );
};
