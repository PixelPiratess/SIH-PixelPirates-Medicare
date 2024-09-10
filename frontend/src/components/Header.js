import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, Heart, Activity, Pill, Book, BriefcaseMedical, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleTheme, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const handleLoginClick = () => {
    navigate('/login');
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
            <li><a href="/" onClick={closeMenu}><Activity size={18} /> Home</a></li>
            <li><a href="/diagnosis" onClick={closeMenu}><Pill size={18} /> AI Diagnosis</a></li>
            <li><a href="/appointments" onClick={closeMenu}><Book size={18} /> Appointments</a></li>
            <li><a href="/telemedicine" onClick={closeMenu}><BriefcaseMedical size={18} /> Telemedicine</a></li>
            <li><a href="/about" onClick={closeMenu}><Activity size={18} /> About</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
          <button className="login-button" onClick={handleLoginClick}>Login</button>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
