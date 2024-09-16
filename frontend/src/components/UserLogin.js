import React, { useState } from 'react';
import { UserCircle, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './UserLogin.css';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email address');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('role', data.role);
        window.dispatchEvent(new Event('storage'));

        // Redirect based on user role
        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-content">
        <UserCircle size={64} color="#4a90e2" />
        <h2>Patient / General User Login</h2>
        {error && <p className="error-message">{error}</p>}
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
              minLength="8"
            />
          </div>
          <button type="submit" className="login-button-a">Login</button>
        </form>
        <div className="login-footer">
          <p>Forgot your password? <Link to="/reset-password">Reset it here</Link></p>
          <p>Don't have an account? <Link to="/user-signup">Sign up</Link></p>
          <Link to="/" className="back-link">Back to main login</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;