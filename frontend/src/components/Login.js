import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-sidebar">
          <h1>{isLogin ? 'Login' : 'Signup'}</h1>
          <p>{isLogin ? 'Access your account' : 'Create a new account'}</p>
          <button className="toggle-button" onClick={handleToggle}>
            {isLogin ? 'Switch to Signup' : 'Switch to Login'}
          </button>
        </div>
        <div className="login-form">
          <form>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            {!isLogin && (
              <div className="input-group">
                <input type="text" id="name" required />
                <label htmlFor="name">Name</label>
              </div>
            )}
            <div className="input-group">
              <input type="email" id="email" required />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-group">
              <input type="password" id="password" required />
              <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className="submit-button">
              {isLogin ? 'Login' : 'Signup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;