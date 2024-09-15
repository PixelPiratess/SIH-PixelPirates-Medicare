import React from 'react';
import { UserCircle, Hospital } from 'lucide-react';
import './Login.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-section hospital-section">
        <div className="login-content">
          <Hospital size={48} color="#4a90e2" />
          <h2>For Healthcare Providers</h2>
          <p>Access our comprehensive platform to manage patient care, appointments, and telemedicine services efficiently.</p>
          <button className="login-button-n" onClick={() => window.location.href = '/hospital-login'}>Hospital Login</button>
          <div className="signup-text">
            <p>Don't have an account?</p>
            <div className="hospital-signup">
              <a href="mailto:support@example.com">Contact Support</a>
              <span className="divider">|</span>
              <a href="/hospital-signup">Request Access</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="login-section patient-section">
        <div className="login-content">
          <UserCircle size={48} color="#4a90e2" />
          <h2>For Patients/General User</h2>
          <p>Access your personal health dashboard, book appointments, and connect with healthcare professionals.</p>
          <button className="login-button-n patient" onClick={() => window.location.href = '/user-login'}>Patient Login</button>
          <div className="signup-text">
            <p>Don't have an account?</p>
            <div className="signup-links">
              <a href="/user-signup">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;