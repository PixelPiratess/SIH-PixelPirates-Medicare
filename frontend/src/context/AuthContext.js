// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'user' or 'hospital'
  const [name, setName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    const storedName = localStorage.getItem('name');
    if (token && storedUserType && storedName) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
      setName(storedName);
    }
  }, []);

  const login = (token, type, name) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userType', type);
    localStorage.setItem('name', name);
    setIsLoggedIn(true);
    setUserType(type);
    setName(name);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    setUserType(null);
    setName('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);