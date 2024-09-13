import React, { useState } from 'react';
import { UserCircle, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './UserLogin.css';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', { email, password });
  };

  return (
    <div className="user-login-container">
      <div className="user-login-content">
        <UserCircle size={64} color="#4a90e2" />
        <h2>Patient / General User Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button-a">Login</button>
        </form>
        <div className="login-footer">
          <p>Forgot your password? <a href="/reset-password">Reset it here</a></p>
          <p>Don't have an account? <a href="/user-signup">Sign up</a></p>
          <Link to="/" className="back-link">Back to main login</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;