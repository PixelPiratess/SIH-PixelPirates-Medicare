import React, { useState } from 'react';
import { Video, Calendar, MessageCircle, FileText, Users } from 'lucide-react';
import './TeleMedicine.css';

const TeleMedicine = () => {
  const [selectedService, setSelectedService] = useState(null);

  const teleServices = [
    { id: 1, title: 'Video Consultation', icon: <Video />, description: 'Connect with a doctor face-to-face through secure video calls.' },
    { id: 2, title: 'Appointment Booking', icon: <Calendar />, description: 'Schedule appointments with healthcare professionals at your convenience.' },
    { id: 3, title: 'Chat with Doctor', icon: <MessageCircle />, description: 'Get quick medical advice through our secure messaging platform.' },
    { id: 4, title: 'E-Prescriptions', icon: <FileText />, description: 'Receive and manage your prescriptions electronically.' },
    { id: 5, title: 'Group Therapy', icon: <Users />, description: 'Join virtual group therapy sessions led by experienced therapists.' },
  ];

  return (
    <div className="telehealth-wrapper">
      <header className="telehealth-header">
        <h1 className="telehealth-title">Telemedicine Services</h1>
        <p className="telehealth-subtitle">Access quality healthcare from the comfort of your home</p>
      </header>

      <section className="telehealth-services">
        <div className="telehealth-service-grid">
          {teleServices.map((service) => (
            <div
              key={service.id}
              className={`telehealth-service-item ${selectedService === service.id ? 'telehealth-service-selected' : ''}`}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="telehealth-service-icon">{service.icon}</div>
              <h3 className="telehealth-service-title">{service.title}</h3>
              <p className="telehealth-service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="telehealth-process">
        <h2 className="telehealth-process-title">How It Works</h2>
        <div className="telehealth-steps">
          <div className="telehealth-step">
            <div className="telehealth-step-number">1</div>
            <h3 className="telehealth-step-title">Choose a Service</h3>
            <p className="telehealth-step-description">Select the telemedicine service that best fits your needs.</p>
          </div>
          <div className="telehealth-step">
            <div className="telehealth-step-number">2</div>
            <h3 className="telehealth-step-title">Book an Appointment</h3>
            <p className="telehealth-step-description">Schedule a convenient time for your virtual consultation.</p>
          </div>
          <div className="telehealth-step">
            <div className="telehealth-step-number">3</div>
            <h3 className="telehealth-step-title">Consult with a Doctor</h3>
            <p className="telehealth-step-description">Connect with a healthcare professional through video or chat.</p>
          </div>
          <div className="telehealth-step">
            <div className="telehealth-step-number">4</div>
            <h3 className="telehealth-step-title">Receive Care</h3>
            <p className="telehealth-step-description">Get diagnosis, treatment plans, and prescriptions as needed.</p>
          </div>
        </div>
      </section>

      <section className="telehealth-cta">
        <h2 className="telehealth-cta-title">Ready to Get Started?</h2>
        <p className="telehealth-cta-description">Experience the convenience of telemedicine today.</p>
        <button className="telehealth-cta-button">Book an Appointment</button>
      </section>
    </div>
  );
};

export default TeleMedicine;