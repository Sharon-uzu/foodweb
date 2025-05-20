// src/components/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
