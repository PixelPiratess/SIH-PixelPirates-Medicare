import React, { useState } from 'react';
import './AppointmentBookingForm.css';

const AppointmentBookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    date: '',
    time: '',
    specialization: '',
    doctor: '',
    state: '',
    city: '',
    hospital: '',
    additionalMessage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="appointment-container">
      <h1 className="appointment-title">Book an Appointment</h1>
      <div className="progress-bar">
        <div className="progress" style={{width: '100%'}}></div>
      </div>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-section">
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="appointment-input"
              required
            />
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="appointment-input"
              required
            />
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="appointment-input"
              required
            />
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="date">Appointment Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="appointment-input"
              required
            />
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="time">Appointment Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="appointment-input"
              required
            />
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="specialization">Specialization:</label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="appointment-select"
              required
            >
              <option value="">Select specialization</option>
              <option value="cardiology">Cardiology</option>
              <option value="dermatology">Dermatology</option>
              <option value="neurology">Neurology</option>
            </select>
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="doctor">Doctor:</label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="appointment-select"
              required
            >
              <option value="">Select Doctor</option>
              <option value="dr-smith">Dr. Smith</option>
              <option value="dr-johnson">Dr. Johnson</option>
              <option value="dr-williams">Dr. Williams</option>
            </select>
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="state">State:</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="appointment-select"
              required
            >
              <option value="">Select State</option>
              <option value="california">California</option>
              <option value="new-york">New York</option>
              <option value="texas">Texas</option>
            </select>
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="city">City:</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="appointment-select"
              required
            >
              <option value="">Select City</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="new-york-city">New York City</option>
              <option value="houston">Houston</option>
            </select>
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="hospital">Hospital:</label>
            <select
              id="hospital"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="appointment-select"
              required
            >
              <option value="">Select Hospital</option>
              <option value="central-hospital">Central Hospital</option>
              <option value="city-medical-center">City Medical Center</option>
              <option value="community-health">Community Health</option>
            </select>
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="additionalMessage">Additional Message:</label>
            <textarea
              id="additionalMessage"
              name="additionalMessage"
              value={formData.additionalMessage}
              onChange={handleChange}
              className="appointment-textarea"
            ></textarea>
          </div>
        </div>
        <button type="submit" className="appointment-submit-button">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentBookingForm;