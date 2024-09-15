import React, { useState } from 'react';
import { Hospital, Mail, Phone, Building, User } from 'lucide-react';
import './HospitalSignup.css';

const HospitalSignup = () => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    email: '',
    phone: '',
    address: '',
    adminName: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form or redirect user as needed
  };

  return (
    <div className="hospital-signup-container">
      <div className="hospital-signup-content">
        <Hospital size={48} color="#4a90e2" />
        <h2>Hospital Signup</h2>
        <p>Register your healthcare facility to access our comprehensive platform.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Building size={20} />
            <input
              type="text"
              name="hospitalName"
              placeholder="Hospital Name"
              value={formData.hospitalName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <Mail size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <Phone size={20} />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <Building size={20} />
            <input
              type="text"
              name="address"
              placeholder="Hospital Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <User size={20} />
            <input
              type="text"
              name="adminName"
              placeholder="Admin Name"
              value={formData.adminName}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">Request Access</button>
        </form>
        <div className="login-link">
          <p>Already have an account? <a href="/hospital-login">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default HospitalSignup;