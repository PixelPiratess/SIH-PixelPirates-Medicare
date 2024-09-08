import React, { useState, useEffect } from 'react';
import { Activity, Users, Clock, Hospital } from 'lucide-react';
import './Home.css';

const services = [
  { id: 1, title: 'General Health', icon: <Activity />, details: ['Service A', 'Service B', 'Service C'] },
  { id: 2, title: 'Specialized Care', icon: <Users />, details: ['Service D', 'Service E', 'Service F'] },
  { id: 3, title: 'Emergency Services', icon: <Clock />, details: ['Service G', 'Service H', 'Service I'] },
  { id: 4, title: 'Surgical Procedures', icon: <Hospital />, details: ['Service J', 'Service K', 'Service L'] },
  { id: 5, title: 'Diagnostic Tests', icon: <Activity />, details: ['Service M', 'Service N', 'Service O'] },
  { id: 6, title: 'Pediatric Care', icon: <Users />, details: ['Service P', 'Service Q', 'Service R'] },
  { id: 7, title: 'Geriatric Care', icon: <Clock />, details: ['Service S', 'Service T', 'Service U'] },
  { id: 8, title: 'Orthopedic Services', icon: <Hospital />, details: ['Service V', 'Service W', 'Service X'] },
  { id: 9, title: 'Cardiology', icon: <Activity />, details: ['Service Y', 'Service Z', 'Service AA'] },
  { id: 10, title: 'Neurology', icon: <Users />, details: ['Service BB', 'Service CC', 'Service DD'] },
  { id: 11, title: 'Oncology', icon: <Clock />, details: ['Service EE', 'Service FF', 'Service GG'] },
  { id: 12, title: 'Dermatology', icon: <Hospital />, details: ['Service HH', 'Service II', 'Service JJ'] },
];

const Home = () => {
  const [selectedService, setSelectedService] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, []);

  return (
    <div className={`home ${darkMode ? 'dark-mode' : ''}`}>
      <div className="content-wrapper">
        <section className="hero">
          <div className="hero-content">
            <h1>Your One Stop Health Solution</h1>
            <p>Securely share your comprehensive medical history with doctors and loved ones, for better communication and care.</p>
            <button className="cta-button">Appointment Now</button>
          </div>
          <div className="hero-image">
            <img src={require('../assets/HeroImg.png')} alt="Hero" />
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <h3>AI Health Diagnosis</h3>
            <p>Cutting-edge AI technology for accurate health diagnostics.</p>
          </div>
          <div className="feature">
            <h3>Appointment Booking</h3>
            <p>Easy and efficient appointment booking system.</p>
          </div>
          <div className="feature">
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support for all your queries.</p>
          </div>
          <div className="feature">
            <h3>Personalized Health Plans</h3>
            <p>Customized health plans tailored to individual needs.</p>
          </div>
        </section>

        <section className="services">
          <h2>Services</h2>
          <div className="services-container">
            <div className="services-grid">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className={`service-item ${selectedService === service.id ? 'selected' : ''}`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="service-header">
                    {service.icon}
                    <h3>{service.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="service-details">
              <h3>{services.find(service => service.id === selectedService)?.title}</h3>
              {services.find(service => service.id === selectedService)?.details.map((detail, index) => (
                <p key={index}>{detail}</p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;