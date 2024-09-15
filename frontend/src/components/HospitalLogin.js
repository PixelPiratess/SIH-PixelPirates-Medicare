import React, { useState } from 'react';
import { Hospital, Mail, Lock } from 'lucide-react';
import './HospitalLogin.css';

const HospitalLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the login data to your backend
    console.log('Login submitted:', formData);
    // Handle login logic or redirect user as needed
  };

  return (
    <div className="hospital-login-container">
      <div className="hospital-login-content">
        <Hospital size={48} color="#4a90e2" />
        <h2>Hospital Login</h2>
        <p>Access your healthcare provider dashboard</p>
        <form onSubmit={handleSubmit}>
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
            <Lock size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button-a">Login</button>
        </form>
        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <div className="signup-link">
          <p>Don't have an account? <a href="/hospital-signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;