// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';  // Import axios for API calls
import { InputForm } from './components/InputForm';
import { ResultDisplay } from './components/ResultDisplay';
import { AlertMessage } from './components/AlertMessage';
import './index.css';
import './inputForm.css';
import './resultDisplay.css';
import './alertDisplay.css';

function App() {
  const [selectedSport, setSelectedSport] = useState(null);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    shoe_size: '',
    skill_level: 'Beginner',
    terrain: 'All Mountain',
    style: 'Average',
    age: ''
  });
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? (value ? parseInt(value, 10) : "") : value
    }));
  };

  const handleRecommendation = async () => {
    // Basic validation
    const requiredFields = ['height', 'weight', 'shoe_size','age'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setError(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      // Send data to Flask backend
      const response = await axios.post('http://127.0.0.1:5000/' + selectedSport, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        setRecommendation(response.data.recommendation);
        setError(null);
      } else {
        setError(response.data.error || 'Something went wrong.');
      }
    } catch (error) {
      setError('Failed to connect to the server. Please try again later.');
    }
  };


/* 
Render Below:
where the program starts
*/

  return (
    <div className="app-container">

      {/* Logo Section */}
        <div className={`logo-section ${selectedSport ? "hidden" : ""}`} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="logo"
            viewBox="6 3 13 13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 10l3 3 3-3 3 3 3-3" />
          </svg>
        </div>

      {/* Title Section */}
      <h1 className={`app-title ${selectedSport ? "hidden" : ""}`}>
        Snow Sport Gear Finder
      </h1>

      {/* Sport Selection Section */}
      {!selectedSport ? (
        <div className="button-container">
          <button
            onClick={() => setSelectedSport("ski")}
            className="sport-button"
          >
            Ski
          </button>
  
          <button
            onClick={() => setSelectedSport("snowboard")}
            className="sport-button"
          >
            Snowboard
          </button>
        </div>
      ) : (
        <>
          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedSport(null);
              setRecommendation(null);
              setError(null);
            }}
            className="back-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="back-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to Sport Selection
          </button>
  
          {/* Input Form */}
          <div className={`form-container-outer ${recommendation ? "hidden" : ""}`}>
            {error && <AlertMessage message={error} />}
            <InputForm
              sport={selectedSport}
              formData={formData}
              handleInputChange={handleInputChange}
              handleRecommendation={handleRecommendation}
              setRecommendation={setRecommendation}
              setFormData={setFormData}
            />
          </div>
        </>
      )}
  
      {/* Recommendation Display */}
      {recommendation && (
        <div className="recommendation-container">
        <h2 className="recommendation-title">Your Recommended Gear</h2>
          {selectedSport === "ski" ? (
            <>
              <div className="recommendation-item">
                <strong>Din Code</strong>
                <p>{recommendation.din_code}</p>
              </div>
              <div className="recommendation-item">
                <strong>Din Setting</strong>
                <p>{recommendation.din_setting}</p>
              </div>
              <div className="recommendation-item">
                <strong>Recommended Ski Length (cm)</strong>
                <p>{recommendation.recommended_ski_length_cm}</p>
              </div>
            </>
          ) : (
            <>
              <div className="recommendation-item">
                <strong>Binding Stiffness</strong>
                <p>{recommendation.binding_stiffness}</p>
              </div>
              <div className="recommendation-item">
                <strong>Recommended Snowboard Length (cm)</strong>
                <p>{recommendation.recommended_snowboard_length_cm}</p>
              </div>
            </>
          )}

          <div className="recommendation-item">
            <strong>User Preferred Type</strong>
            <p>{recommendation.user_preferred_type}</p>
          </div>

          <button className="back-button-result" onClick={() => setRecommendation(null)}>
            Back to Form
          </button>

        </div>
      )}
    </div>
  );
}

export default App;





