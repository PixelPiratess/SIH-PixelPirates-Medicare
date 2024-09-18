import React from 'react';
import { Users, Heart, Award, Zap } from 'lucide-react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="content-wrapper">
        <h1>About Us</h1>
        <p className="mission-statement">
          Empowering health and wellness through innovative digital solutions.
        </p>

        <div className="about-sections">
          <section className="our-story">
            <h2>Our Story</h2>
            <p>
              Founded in 2024, our journey began with a simple yet powerful idea: to make quality healthcare accessible to everyone, anytime, anywhere. We've grown from a small startup to a trusted healthcare partner, serving thousands of users across the globe.
            </p>
          </section>

          <section className="our-values">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <Users size={32} />
                <h3>Patient-Centric</h3>
                <p>We put our users' needs at the heart of everything we do.</p>
              </div>
              <div className="value-item">
                <Heart size={32} />
                <h3>Compassion</h3>
                <p>We approach healthcare with empathy and understanding.</p>
              </div>
              <div className="value-item">
                <Award size={32} />
                <h3>Excellence</h3>
                <p>We strive for the highest standards in digital healthcare.</p>
              </div>
              <div className="value-item">
                <Zap size={32} />
                <h3>Innovation</h3>
                <p>We continuously evolve to meet the changing needs of healthcare.</p>
              </div>
            </div>
          </section>

          <section className="our-team">
            <h2>Our Team</h2>
            <p>
              Our diverse team of Founders, technologists, and innovators work tirelessly to bring you the best in digital health solutions. Led by experienced industry veterans, we're committed to revolutionizing the way you experience healthcare.
            </p>
          </section>

          <section className="our-impact">
            <h2>Our Impact</h2>
            <div className="impact-stats">
              <div className="stat-item">
                <h3>4+</h3>
                <p>Users Served</p>
              </div>
              <div className="stat-item">
                <h3>98%</h3>
                <p>User Satisfaction</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </section>
        </div>

        <div className="cta-section">
          <h2>Join Us in Shaping the Future of Healthcare</h2>
          <p>Experience the difference with our innovative health solutions.</p>
          <button className="cta-button">Get Started Today</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;