import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
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
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
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
    const prompt = `You are an expert doctor with extensive medical knowledge and experience across all specialties. Based on the following patient information, provide a detailed analysis:

Patient Information:
Age: ${formData.age}
Gender: ${formData.gender}
Symptoms: ${formData.symptoms}
Duration: Since ${formData.durationStart}
Medical History: ${formData.medicalHistory}
Current Medications: ${formData.currentMedications}
Allergies: ${formData.allergies}

Please provide your analysis in the following format:

## Patient Analysis:

**1. Summary of Symptoms:**
[Provide a concise summary of the patient's symptoms and their duration]

**2. Possible Diagnosis:**
[List and briefly explain the most likely diagnoses based on the symptoms and patient information]

**3. Recommendations:**
[Provide detailed recommendations for further tests, treatments, or lifestyle changes]

**4. Additional Information:**
[Include any additional information or considerations for the patient]

## Caution:
This analysis is for informational purposes only and should not be considered a substitute for professional medical advice. It's crucial to consult a doctor for proper diagnosis and treatment.

Ensure your response is comprehensive, professional, and tailored to the patient's specific situation. Use markdown formatting for better readability.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Check if the response is related to medical diagnosis
    if (
      !response.toLowerCase().includes("diagnosis") ||
      !response.toLowerCase().includes("symptoms")
    ) {
      return "I apologize, but I can only provide information related to medical diagnoses. If you have a medical concern, please provide relevant symptoms and patient information for a proper analysis.";
    }

    return response;
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
      return formData.symptoms && formData.durationStart;
    }
    return true;
  };

  const Progress = ({ step }) => {
    return (
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
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
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
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
              {errors.dateOfBirth && (
                <span className="error-message">{errors.dateOfBirth}</span>
              )}
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
              {errors.gender && (
                <span className="error-message">{errors.gender}</span>
              )}
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
              {errors.symptoms && (
                <span className="error-message">{errors.symptoms}</span>
              )}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">
                When did the symptoms start?
              </label>
              <input
                className="diagnosis-input"
                type="date"
                name="durationStart"
                value={formData.durationStart}
                onChange={handleChange}
              />
              {errors.durationStart && (
                <span className="error-message">{errors.durationStart}</span>
              )}
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
                placeholder="Any previous medical conditions or surgeries"
              />
              {errors.medicalHistory && (
                <span className="error-message">{errors.medicalHistory}</span>
              )}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">Current Medications</label>
              <textarea
                className="diagnosis-textarea"
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleChange}
                placeholder="List any medications you're currently taking"
              />
              {errors.currentMedications && (
                <span className="error-message">
                  {errors.currentMedications}
                </span>
              )}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label">Allergies</label>
              <textarea
                className="diagnosis-textarea"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="List any known allergies"
              />
              {errors.allergies && (
                <span className="error-message">{errors.allergies}</span>
              )}
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
              {isSubmitting ? "Analyzing..." : "Get Diagnosis"}
            </button>
          )}
        </div>
      </form>

      {diagnosis && (
        <div className="diagnosis-result">
          <h2>AI Diagnosis</h2>
          <ReactMarkdown>{diagnosis}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Diagnosis;
