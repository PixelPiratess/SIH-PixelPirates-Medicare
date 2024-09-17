import React, { useState, useEffect } from "react";
import "./Diagnosis.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Diagnosis = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    symptoms: "",
    durationStart: "",
    durationEnd: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const API_KEY = "AIzaSyCz3v3B_gJ21FIJm9xbwS1yfA0eZMPmwao"; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setFormData((prevState) => ({ ...prevState, name: userName }));
    }
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      setFormData((prevState) => ({ ...prevState, age: age.toString() }));
    }
  }, [formData.dateOfBirth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const diagnosis = await getDiagnosis();
        setDiagnosis(diagnosis);
      } catch (error) {
        console.error("Error getting diagnosis:", error);
        setErrorMessage("Failed to get diagnosis. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  const getDiagnosis = async () => {
    const prompt = `Based on the following patient information, provide a possible diagnosis and recommendations:
    Age: ${formData.age}
    Gender: ${formData.gender}
    Symptoms: ${formData.symptoms}
    Duration: From ${formData.durationStart} to ${formData.durationEnd}
    Medical History: ${formData.medicalHistory}
    Current Medications: ${formData.currentMedications}
    Allergies: ${formData.allergies}

    Please provide a detailed diagnosis and recommendations.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
        isValid = false;
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of Birth is required";
        isValid = false;
      }
      if (!formData.gender) {
        newErrors.gender = "Gender is required";
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.symptoms.trim()) {
        newErrors.symptoms = "Symptoms are required";
        isValid = false;
      }
      if (!formData.durationStart) {
        newErrors.durationStart = "Start date is required";
        isValid = false;
      }
      if (!formData.durationEnd) {
        newErrors.durationEnd = "End date is required";
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (!formData.medicalHistory.trim()) {
        newErrors.medicalHistory = "Medical history is required";
        isValid = false;
      }
      if (!formData.currentMedications.trim()) {
        newErrors.currentMedications = "Current medications are required";
        isValid = false;
      }
      if (!formData.allergies.trim()) {
        newErrors.allergies = "Allergies information is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
      setErrorMessage("");
    } else {
      setErrorMessage("Please complete all required fields before proceeding.");
    }
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.name && formData.dateOfBirth && formData.gender;
    } else if (currentStep === 2) {
      return (
        formData.symptoms && formData.durationStart && formData.durationEnd
      );
    }
    return true;
  };

  const Progress = ({ step }) => {
    return (
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
    );
  };

  return (
    <div className="diagnosis-container">
      <h1 className="diagnosis-title">AI Diagnosis Form</h1>
      <Progress step={currentStep} />
      <form className="diagnosis-form" onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">Name</label>
              <input
                className="diagnosis-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">Date of Birth</label>
              <input
                className="diagnosis-input"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">Gender</label>
              <select
                className="diagnosis-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-section">
            <h3>Symptoms</h3>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">Symptoms</label>
              <textarea
                className="diagnosis-textarea"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Describe your symptoms"
              />
              {errors.symptoms && <span className="error-message">{errors.symptoms}</span>}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">Start Date</label>
              <input
                className="diagnosis-input"
                type="date"
                name="durationStart"
                value={formData.durationStart}
                onChange={handleChange}
              />
              {errors.durationStart && <span className="error-message">{errors.durationStart}</span>}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">End Date</label>
              <input
                className="diagnosis-input"
                type="date"
                name="durationEnd"
                value={formData.durationEnd}
                onChange={handleChange}
              />
              {errors.durationEnd && <span className="error-message">{errors.durationEnd}</span>}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-section">
            <h3>Medical History</h3>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">Medical History</label>
              <textarea
                className="diagnosis-textarea"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                placeholder="Medical history"
              />
              {errors.medicalHistory && <span className="error-message">{errors.medicalHistory}</span>}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">Current Medications</label>
              <textarea
                className="diagnosis-textarea"
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleChange}
                placeholder="Current medications"
              />
              {errors.currentMedications && <span className="error-message">{errors.currentMedications}</span>}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">Allergies</label>
              <textarea
                className="diagnosis-textarea"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="Allergies"
              />
              {errors.allergies && <span className="error-message">{errors.allergies}</span>}
            </div>
          </div>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="button-group">
          {currentStep > 1 && (
            <button className="prev-button" type="button" onClick={prevStep}>
              Previous
            </button>
          )}
          {currentStep < 3 && (
            <button
              className="next-button"
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
            >
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button
              className="diagnosis-submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Get Diagnosis"}
            </button>
          )}
        </div>
      </form>

      {diagnosis && (
        <div className="diagnosis-result">
          <h2>AI Diagnosis</h2>
          <p>{diagnosis}</p>
        </div>
      )}
    </div>
  );
};

export default Diagnosis;