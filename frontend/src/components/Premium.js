import React, { useState, useEffect } from 'react';
import './Premium.css';

const PremiumFeatures = () => {
  const features = [
    { icon: 'fas fa-user-md', title: 'Personal Health Coach', description: 'Work with a personal health coach to achieve your wellness goals.' },
    { icon: 'fas fa-clipboard-list', title: 'Exclusive Health Plans', description: 'Access exclusive, tailored health plans designed for optimal care.' },
    { icon: 'fas fa-headset', title: 'Priority Support', description: 'Enjoy expedited support with dedicated priority service.' },
    { icon: 'fas fa-microscope', title: 'Advanced Diagnostics', description: 'Get detailed health diagnostics with our premium AI technology.' }
  ];

  const reasons = [
    { title: 'Personalized Care', description: 'Receive tailored health solutions that fit your unique needs.' },
    { title: 'Time-Saving', description: 'Skip the queue with our priority support and quick response times.' },
    { title: 'Cutting-Edge Technology', description: 'Access the latest in health tech for better insights and care.' },
    { title: 'Exclusive Community', description: 'Join a network of like-minded individuals focused on optimal health.' }
  ];

  const testimonials = [
    { quote: "The personal health coach has been a game-changer for me. I've never felt better!", author: "Sarah J." },
    { quote: "The advanced diagnostics caught an issue early. I'm grateful for this premium service.", author: "Michael R." },
    { quote: "Priority support means I always get quick answers. It's worth every penny.", author: "Emma L." }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Premium-page">
      <main>
        <section id="Premium-hero">
          <h1>Elevate Your Experience</h1>
          <p>Unlock a world of exclusive benefits with our Premium Features</p>
          <a href="#" className="Premium-cta-button">Upgrade Now</a>
        </section>

        <section id="Premium-features">
          <h2>Premium Features</h2>
          <div className="Premium-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="Premium-feature-card">
                <i className={feature.icon}></i>
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
                <cite>- {testimonial.author}</cite>
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