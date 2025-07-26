import React, { useState } from "react";
import { pushApplicationData } from "./firebase"; // Import pushApplicationData function
import "./App.css";  // Make sure to include the appropriate CSS

function App() {
  // Define state variables
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("Bharat Award");
  const [incidentDetails, setIncidentDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [eligibilityText, setEligibilityText] = useState("");
  const [showEligibility, setShowEligibility] = useState(false);

  // Define eligibility criteria for each award
  const eligibilityCriteria = {
    "Bharat Award": {
      ageLimit: 16,
      criteria: [
        "Must be under the age of 16.",
        "Must have shown exceptional bravery in saving lives or rescuing others.",
      ],
    },
    "Geeta Chopra Award": {
      ageLimit: 18,
      criteria: [
        "Applicants should be between 12-18 years old.",
        "Must have demonstrated bravery in the face of severe personal risk.",
      ],
    },
    "National Bravery Award": {
      ageLimit: 18,
      criteria: [
        "Open to applicants under the age of 18.",
        "Demonstrated courage in an act of bravery that saved or helped others.",
      ],
    },
    "Sanjay Chopra Award": {
      ageLimit: 17,
      criteria: [
        "Applicants should be between 13-17 years old.",
        "Should have exhibited extraordinary bravery, possibly at the cost of personal safety.",
      ],
    },
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the age meets eligibility criteria
    const selectedCategory = eligibilityCriteria[category];
    if (parseInt(age) > selectedCategory.ageLimit) {
      setErrorMessage(`Sorry, you are not eligible for the ${category}.`);
      return;
    }

    // Validate the form fields
    if (!name || !age || !incidentDetails) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Clear error message
    setErrorMessage("");

    // Create data object to send to Firebase
    const applicationData = {
      name,
      age,
      category,
      incidentDetails,
      status: "Pending",
    };

    // Push data to Firebase
    pushApplicationData(applicationData);

    // Success message
    alert(`Application for ${category} submitted successfully!`);
    resetForm();
  };

  // Reset the form after submission
  const resetForm = () => {
    setName("");
    setAge("");
    setCategory("Bharat Award");
    setIncidentDetails("");
    setShowEligibility(false);  // Hide eligibility after submission
  };

  // Handle category change and update eligibility
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setEligibilityText(eligibilityCriteria[selectedCategory].criteria.join(" "));
    setShowEligibility(true);  // Show eligibility criteria section
  };

  return (
    <div className="App">
      <div className="container">
        <h1>National and Civilian Bravery Awards Application</h1>

        <p className="description">
          The National and Civilian Bravery Awards recognize the extraordinary
          courage and determination shown by individuals in India. These awards
          honor acts of bravery, often at great personal risk, in saving lives or
          helping others during emergencies.
        </p>

        {/* Eligibility Criteria Section */}
        {showEligibility && (
          <div className="eligibility">
            <h3>Eligibility Criteria:</h3>
            <p>{eligibilityText}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Age input */}
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          {/* Category selection */}
          <div className="form-group">
            <label htmlFor="category">Award Category:</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="Bharat Award">Bharat Award</option>
              <option value="Geeta Chopra Award">Geeta Chopra Award</option>
              <option value="National Bravery Award">National Bravery Award</option>
              <option value="Sanjay Chopra Award">Sanjay Chopra Award</option>
            </select>
          </div>

          {/* Incident details input */}
          <div className="form-group">
            <label htmlFor="incidentDetails">Incident Details:</label>
            <textarea
              id="incidentDetails"
              value={incidentDetails}
              onChange={(e) => setIncidentDetails(e.target.value)}
              required
            />
          </div>

          {/* Error message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Submit button */}
          <button type="submit" className="submit-button">
            Submit Application
          </button>
        </form>
        <div class="footer-space"></div>

      </div>
    </div>
  );
}

export default App;
