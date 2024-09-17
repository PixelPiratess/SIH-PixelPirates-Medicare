
import React, { useState } from 'react';
// import { Calendar, Clock } from 'lucide-react';
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
    <div className="appointment-form-container">
      <h1 className="form-title1">Book an appointment</h1>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-grid">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full name"
            className="form-input1"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="form-input1"
            required
          />
        </div>
        <div className="form-grid">
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className="form-input1"
            required
          />
          <div className="input-with-icon">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input1"
              required
            />
          </div>
        </div>
        <div className="form-grid">
          <div className="input-with-icon">
            <input
              type="time"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="form-input1"
              required
            />
          </div>
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="form-select1"
            required
          >
            <option value="">Select specialization</option>
            <option value="cardiology">Cardiology</option>
            <option value="dermatology">Dermatology</option>
            <option value="neurology">Neurology</option>
          </select>
        </div>
        <div className="form-grid">
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="form-select1"
            required
          >
            <option value="">Select Doctor</option>
            <option value="dr-smith">Dr. Smith</option>
            <option value="dr-johnson">Dr. Johnson</option>
            <option value="dr-williams">Dr. Williams</option>
          </select>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="form-select1"
            required
          >
            <option value="">Select State</option>
            <option value="california">California</option>
            <option value="new-york">New York</option>
            <option value="texas">Texas</option>
          </select>
        </div>
        <div className="form-grid">
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-select1"
            required
          >
            <option value="">Select City</option>
            <option value="los-angeles">Los Angeles</option>
            <option value="new-york-city">New York City</option>
            <option value="houston">Houston</option>
          </select>
          <select
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            className="form-select1"
            required
          >
            <option value="">Select Hospital</option>
            <option value="central-hospital">Central Hospital</option>
            <option value="city-medical-center">City Medical Center</option>
            <option value="community-health">Community Health</option>
          </select>
        </div>
        <textarea
          name="additionalMessage"
          value={formData.additionalMessage}
          onChange={handleChange}
          placeholder="Additional Message"
          className="form-textarea1"
        ></textarea>
        <button type="submit" className="submit-button">
          BOOK NOW
        </button>
      </form>
    </div>
  );
};

export default AppointmentBookingForm;