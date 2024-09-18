import React, { useState, useEffect, useCallback } from 'react';
import { User, Clipboard, Headphones, Microscope, Clock, Zap, Users, Star } from 'lucide-react';
import './Premium.css';

const PremiumFeatures = () => {
  const features = [
    { icon: <User size={32} />, title: 'Personal Health Coach', description: 'Work with a personal health coach to achieve your wellness goals.' },
    { icon: <Clipboard size={32} />, title: 'Exclusive Health Plans', description: 'Access exclusive, tailored health plans designed for optimal care.' },
    { icon: <Headphones size={32} />, title: 'Priority Support', description: 'Enjoy expedited support with dedicated priority service.' },
    { icon: <Microscope size={32} />, title: 'Advanced Diagnostics', description: 'Get detailed health diagnostics with our premium AI technology.' }
  ];

  const reasons = [
    { icon: <Star size={24} />, title: 'Personalized Care', description: 'Receive tailored health solutions that fit your unique needs.' },
    { icon: <Clock size={24} />, title: 'Time-Saving', description: 'Skip the queue with our priority support and quick response times.' },
    { icon: <Zap size={24} />, title: 'Cutting-Edge Technology', description: 'Access the latest in health tech for better insights and care.' },
    { icon: <Users size={24} />, title: 'Exclusive Community', description: 'Join a network of like-minded individuals focused on optimal health.' }
  ];

  const testimonials = [
    { quote: "The personal health coach has been a game-changer for me. I've never felt better!", author: "Sarah J." },
    { quote: "The advanced diagnostics caught an issue early. I'm grateful for this premium service.", author: "Michael R." },
    { quote: "Priority support means I always get quick answers. It's worth every penny.", author: "Emma L." }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const rotateTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(rotateTestimonial, 5000);
    return () => clearInterval(interval);
  }, [rotateTestimonial]);

  const handleUpgradeClick = (event) => {
    event.preventDefault();
    // Add your upgrade logic here
    console.log('Upgrade button clicked');
  };

  return (
    <div className="Premium-page">
      <div className="background-elements">
        <div className="background-left">
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#4a90e2" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="#4a90e2" strokeWidth="0.5"/>
          </svg>
        </div>
        <div className="background-right">
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#4a90e2" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="#4a90e2" strokeWidth="0.5"/>
          </svg>
        </div>
      </div>
      <main>
        <section id="Premium-hero">
          <h1>Elevate Your Experience</h1>
          <p>Unlock a world of exclusive benefits with our Premium Features</p>
          <button onClick={handleUpgradeClick} className="Premium-cta-button">Upgrade Now</button>
        </section>

        <section id="Premium-features">
          <h2>Premium Features</h2>
          <div className="Premium-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="Premium-feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="Premium-why-premium">
          <h2>Why Choose Premium?</h2>
          <div className="Premium-reasons-grid">
            {reasons.map((reason, index) => (
              <div key={index} className="Premium-reason">
                <div className="reason-icon">{reason.icon}</div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="Premium-testimonials">
          <h2>What Our Members Say</h2>
          <div className="Premium-testimonial-carousel">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`Premium-testimonial ${index === currentTestimonial ? 'active' : ''}`}
              >
                <p>"{testimonial.quote}"</p>
                <span className="testimonial-author">- {testimonial.author}</span>
              </div>
            ))}
          </div>
          <div className="Premium-testimonial-dots">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              ></span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PremiumFeatures;