import React, { useState } from 'react';
import { Video, Calendar, MessageCircle, FileText, Users } from 'lucide-react';
import './TeleMedicine.css';

const TeleMedicine = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { id: 1, title: 'Video Consultation', icon: <Video />, description: 'Connect with a doctor face-to-face through secure video calls.' },
    { id: 2, title: 'Appointment Booking', icon: <Calendar />, description: 'Schedule appointments with healthcare professionals at your convenience.' },
    { id: 3, title: 'Chat with Doctor', icon: <MessageCircle />, description: 'Get quick medical advice through our secure messaging platform.' },
    { id: 4, title: 'E-Prescriptions', icon: <FileText />, description: 'Receive and manage your prescriptions electronically.' },
    { id: 5, title: 'Group Therapy', icon: <Users />, description: 'Join virtual group therapy sessions led by experienced therapists.' },
  ];

  return (
    <div className="telemedicine-container">
        <div className="background-elements">
        <svg className="background-left" width="100%" height="100%" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="400" r="200" stroke="var(--primary-color)" strokeOpacity="0.4" strokeWidth="8" fill="none" />
          <circle cx="200" cy="650" r="150" stroke="var(--primary-color)" strokeOpacity="0.45" strokeWidth="6" fill="none" />
          <circle cx="250" cy="150" r="100" stroke="var(--primary-color)" strokeOpacity="0.5" strokeWidth="4" fill="none" />
        </svg>
        <svg className="background-right" width="100%" height="100%" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="400" r="200" stroke="var(--primary-color)" strokeOpacity="0.4" strokeWidth="8" fill="none" />
          <circle cx="250" cy="150" r="150" stroke="var(--primary-color)" strokeOpacity="0.45" strokeWidth="6" fill="none" />
          <circle cx="300" cy="650" r="100" stroke="var(--primary-color)" strokeOpacity="0.5" strokeWidth="4" fill="none" />
        </svg>
      </div>
      <header className="telemedicine-header">
        <h1>Telemedicine Services</h1>
        <p>Access quality healthcare from the comfort of your home</p>
      </header>

      <section className="telemedicine-services">
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-item ${selectedService === service.id ? 'selected' : ''}`}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Choose a Service</h3>
            <p>Select the telemedicine service that best fits your needs.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Book an Appointment</h3>
            <p>Schedule a convenient time for your virtual consultation.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Consult with a Doctor</h3>
            <p>Connect with a healthcare professional through video or chat.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Receive Care</h3>
            <p>Get diagnosis, treatment plans, and prescriptions as needed.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Experience the convenience of telemedicine today.</p>
        <button className="cta-button">Book an Appointment</button>
      </section>
    </div>
  );
};

export default TeleMedicine;