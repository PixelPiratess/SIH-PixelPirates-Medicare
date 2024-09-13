import React, { useState } from 'react';
import { UserCircle, Mail, Lock, User, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './UserSignup.css';

const UserSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup submitted', { name, email, password, confirmPassword, phone });
  };

  return (
    <div className="user-signup-container">
      <div className="user-signup-content">
        <UserCircle size={64} color="#4a90e2" />
        <h2>Patient / General User Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User size={20} color="#4a90e2" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Mail size={20} color="#4a90e2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock size={20} color="#4a90e2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock size={20} color="#4a90e2" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Phone size={20} color="#4a90e2" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? <Link to="/user-login">Log in</Link></p>
          <Link to="/" className="back-link">Back to main login</Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;