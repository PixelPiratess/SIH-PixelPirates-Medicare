import React, { useState, useEffect } from "react";
import "./Diagnosis.css";

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

  useEffect(() => {
    // Fetch user name from localStorage
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setFormData({
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
      setCurrentStep(1);
    }
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

  return (
    <div className="diagnosis-container">
      <h2 className="diagnosis-title">AI Diagnosis Form</h2>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        ></div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="diagnosis-form" onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label" htmlFor="name">
                Full Name:
              </label>
              <input
                className="diagnosis-input"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                readOnly
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label" htmlFor="dateOfBirth">
                Date of Birth:
              </label>
              <input
                className="diagnosis-input"
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
              {errors.dateOfBirth && (
                <span className="error-message">{errors.dateOfBirth}</span>
              )}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label" htmlFor="age">
                Age:
              </label>
              <input
                className="diagnosis-input"
                type="number"
                id="age"
                name="age"
                value={formData.age}
                readOnly
                required
              />
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label" htmlFor="gender">
                Gender:
              </label>
              <select
                className="diagnosis-select"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
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
            <button
              type="button"
              onClick={nextStep}
              className="next-button"
              disabled={!isStepValid()}
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-section">
            <h3>Symptoms</h3>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label" htmlFor="symptoms">
                Symptoms:
              </label>
              <textarea
                className="diagnosis-textarea"
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                required
              ></textarea>
              {errors.symptoms && (
                <span className="error-message">{errors.symptoms}</span>
              )}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label" htmlFor="durationStart">
                Symptoms Start Date:
              </label>
              <input
                className="diagnosis-input"
                type="date"
                id="durationStart"
                name="durationStart"
                value={formData.durationStart}
                onChange={handleChange}
                required
              />
              {errors.durationStart && (
                <span className="error-message">{errors.durationStart}</span>
              )}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label" htmlFor="durationEnd">
                Symptoms End Date:
              </label>
              <input
                className="diagnosis-input"
                type="date"
                id="durationEnd"
                name="durationEnd"
                value={formData.durationEnd}
                onChange={handleChange}
                required
              />
              {errors.durationEnd && (
                <span className="error-message">{errors.durationEnd}</span>
              )}
            </div>
            <div className="button-group">
              <button type="button" onClick={prevStep} className="prev-button">
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="next-button"
                disabled={!isStepValid()}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-section">
            <h3>Medical History</h3>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label" htmlFor="medicalHistory">
                Medical History:
              </label>
              <textarea
                className="diagnosis-textarea"
                id="medicalHistory"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                required
              ></textarea>
              {errors.medicalHistory && (
                <span className="error-message">{errors.medicalHistory}</span>
              )}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label" htmlFor="currentMedications">
                Current Medications:
              </label>
              <textarea
                className="diagnosis-textarea"
                id="currentMedications"
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleChange}
                required
              ></textarea>
              {errors.currentMedications && (
                <span className="error-message">
                  {errors.currentMedications}
                </span>
              )}
            </div>
            <div className="diagnosis-form-group">
              <label className="diagnosis-label" htmlFor="allergies">
                Allergies:
              </label>
              <textarea
                className="diagnosis-textarea"
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                required
              ></textarea>
              {errors.allergies && (
                <span className="error-message">{errors.allergies}</span>
              )}
            </div>
            <div className="button-group">
              <button type="button" onClick={prevStep} className="prev-button">
                Previous
              </button>
              <button
                className="diagnosis-submit-button"
                type="submit"
                disabled={isSubmitting || !isStepValid()}
              >
                {isSubmitting ? "Submitting..." : "Submit for Diagnosis"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Diagnosis;
