// src/components/InputForm.jsx
import React, { useState } from 'react';

export const InputForm = ({ sport, setRecommendation }) => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    shoe_size: '',
    skill_level: 'Beginner',
    terrain: sport === 'ski' ? 'All Mountain' : '',
    style: sport === 'ski' ? 'Average' : '',
    age: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecommendation = async () => {
    // Basic validation: Check if required fields are filled
    const requiredFields = ['height', 'weight', 'shoe_size', 'skill_level'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setError(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }
    try {
      const response = await fetch(`https://ski-recommendation-api.onrender.com/${sport}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
     //console.log("Response received:", data); // Debugging output

      if (data.recommendation) {
        console.log("Data Recommendation:", data.recommendation); // Debugging output
        setRecommendation(data.recommendation);

        console.log("error:", error); // Debugging output
        setError(null);
      } else {
        setError(data.error || "Invalid response from server.");
      }
    } catch (error) {
      console.log("error:", error); // Debugging output
      setError('Failed to connect to the server. Try again!!!');
    }
  };


/* 
Render Below:
where the program starts
*/
  return (
    <div className="form-container">
      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Form Fields Grid */}
      <div className="form-grid">
        {[
          { name: 'height', label: 'Height (cm)', type: 'number' },
          { name: 'weight', label: 'Weight (kg)', type: 'number' },
          { name: 'shoe_size', label: 'Shoe Size', type: 'number' },
          { name: 'age', label: 'Age', type: 'number' },
          { 
            name: 'skill_level', 
            label: 'Skill Level', 
            type: 'select', 
            options: ['Beginner', 'Intermediate', 'Advanced'] 
          },
          ...(sport === 'ski' ? [
            { name: 'terrain', label: 'Terrain', type: 'select', options: ['All Mountain', 'Powder', 'Park'] },
            { name: 'style', label: 'Style', type: 'select', options: ['Average', 'Aggressive', 'Relaxed'] },
          ] : [])
        ].map((field) => (
          <div key={field.name} className="form-field">
            <label className="form-label">{field.label}</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="form-input"
              />
            )}
          </div>
        ))}        
    </div>

  {/* Submit Button */}
  <button onClick={handleRecommendation} className="form-button">
    Get {sport.charAt(0).toUpperCase() + sport.slice(1)} Recommendation
  </button>
</div>

  );
};
