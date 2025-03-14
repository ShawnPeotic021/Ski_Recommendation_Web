// src/components/ResultDisplay.jsx
import React from "react";

export const ResultDisplay = ({ recommendation, setRecommendation, selectedSport }) => {

  if (!recommendation) return null; // Prevent rendering if there's no recommendation

    const capitalizeFirstLetter = (str) => {
      return typeof str === "string" && str.length > 0
        ? str.charAt(0).toUpperCase() + str.slice(1)
        : "N/A";
    };

    return (
      <div className="recommendation-container">
        <h2 className="recommendation-title">Your Recommended Gear</h2>

        {selectedSport === "ski" ? (
          <>
            <div className="recommendation-item">
              <strong>Din Code</strong>
              <p>{capitalizeFirstLetter(recommendation.din_code)}</p>
            </div>
            <div className="recommendation-item">
              <strong>Din Setting</strong>
              <p>{recommendation.din_setting || "N/A" }</p>
            </div>
            <div className="recommendation-item">
              <strong>Recommended Ski Length (cm)</strong>
              <p>{recommendation.recommended_ski_length_cm || "N/A"}</p>
            </div>
          </>
        ) : (
          <>
            <div className="recommendation-item">
              <strong>Binding Stiffness</strong>
              <p>{capitalizeFirstLetter(recommendation.binding_stiffness)}</p>
            </div>
            <div className="recommendation-item">
              <strong>Recommended Snowboard Length (cm)</strong>
              <p>{recommendation.recommended_snowboard_length_cm || "N/A"}</p>
            </div>
          </>
        )}

        <div className="recommendation-item">
          <strong>User Preferred Type</strong>
          <p>{capitalizeFirstLetter(recommendation.user_preferred_type)}</p>
        </div>

        <button className="back-button-result" onClick={() => setRecommendation(null)}>
          Back to Form
        </button>
      </div>
    )

}
