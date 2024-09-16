import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, Activity, Pill, Book, BriefcaseMedical, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleTheme, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token') || localStorage.getItem('hospitalToken');
      const storedUserName = localStorage.getItem('userName');
      if (token && storedUserName) {
        setIsLoggedIn(true);
        setUserName(storedUserName);
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('hospitalToken');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo">
          <img src="/Medicare_Logo.svg" alt="Medicare Logo"/>
        </div>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          {isMenuOpen && (
            <button className="close-menu" onClick={closeMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          )}
          <ul>
            <li><Link to="/" onClick={closeMenu}><Activity size={18} /> Home</Link></li>
            <li><Link to="/diagnosis" onClick={closeMenu}><Pill size={18} /> AI Diagnosis</Link></li>
            <li><Link to="/appointments" onClick={closeMenu}><Book size={18} /> Appointments</Link></li>
            <li><Link to="/telemedicine" onClick={closeMenu}><BriefcaseMedical size={18} /> Telemedicine</Link></li>
            <li><Link to="/about" onClick={closeMenu}><Activity size={18} /> About</Link></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
          {isLoggedIn ? (
            <div className="user-info">
              <span className="user-name">{userName}</span>
              <button className="logout-button" onClick={handleLogout}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button className="login-button" onClick={handleLoginClick}>Login</button>
          )}
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;