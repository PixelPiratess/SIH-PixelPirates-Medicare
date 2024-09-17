import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import HospitalLogin from "./components/HospitalLogin";
import HospitalSignup from "./components/HospitalSignup";
import HospitalDashboard from "./components/HospitalDashboard";
import AdminDashboard from './components/AdminDashboard';
import UnderConstruction from './components/UnderConstruction';
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AuthProvider>
      <Router>
        <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
          <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/user-signup" element={<UserSignup />} />
              <Route path="/hospital-login" element={<HospitalLogin />} />
              <Route path="/hospital-signup" element={<HospitalSignup />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route 
                path="/hospital-dashboard" 
                element={<HospitalDashboard />} 
              />
              <Route path="/under-construction" element={<UnderConstruction/>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;