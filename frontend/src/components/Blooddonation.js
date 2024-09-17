import React, { useState } from 'react';
import { Droplet, Clock, Heart, Activity } from 'lucide-react';
import './BloodDonation.css';

const BloodDonation = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showDonateForm, setShowDonateForm] = useState(false);

  const toggleRequestForm = () => {
    setShowRequestForm(!showRequestForm);
    setShowDonateForm(false);
  };

  const toggleDonateForm = () => {
    setShowDonateForm(!showDonateForm);
    setShowRequestForm(false);
  };

  return (
    <div className="blooddonation-container">
      <h1 className="blooddonation-header">Blood Donation Portal</h1>
      <div className="blooddonation-content">
        <p>
          Empower lives through the gift of blood. Your donation can be the lifeline someone desperately needs. Every two seconds, someone in the U.S. requires
          a blood transfusion, and a single donation can save up to three lives. Blood is essential for surgeries, cancer treatments, chronic illnesses, and
          traumatic injuries.
        </p>
      </div>

      <div className="blooddonation-info">
        <h2>Why Donate Blood?</h2>
        <div className="blooddonation-benefits">
          <div className="benefit-item">
            <Droplet size={24} />
            <h3>Save Lives</h3>
            <p>One donation can save up to three lives</p>
          </div>
          <div className="benefit-item">
            <Clock size={24} />
            <h3>Quick Process</h3>
            <p>It takes only about 10-15 minutes to donate</p>
          </div>
          <div className="benefit-item">
            <Heart size={24} />
            <h3>Fast Recovery</h3>
            <p>Your body replenishes the donated blood within 24 hours</p>
          </div>
          <div className="benefit-item">
            <Activity size={24} />
            <h3>Maintain Supply</h3>
            <p>Regular donation helps maintain a healthy blood supply</p>
          </div>
        </div>
      </div>

      <div className="blooddonation-actions">
        <button className="blooddonation-action-button" onClick={toggleRequestForm}>Request Blood</button>
        <button className="blooddonation-action-button" onClick={toggleDonateForm}>Donate Blood</button>
      </div>

      {showRequestForm && (
        <div className="blooddonation-form-container">
          <h2>Request Blood</h2>
          <form className="blooddonation-form">
            <input type="text" placeholder="Name of Requestor" required />
            <select required>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <input type="text" placeholder="Hospital Name" required />
            <input type="tel" placeholder="Contact Number" required />
            <button type="submit" className="blooddonation-submit-button">Submit Request</button>
          </form>
        </div>
      )}

      {showDonateForm && (
        <div className="blooddonation-form-container">
          <h2>Donate Blood</h2>
          <form className="blooddonation-form">
            <input type="text" placeholder="Full Name" required />
            <input type="number" placeholder="Age" min="18" max="65" required />
            <select required>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <input type="tel" placeholder="Contact Number" required />
            <input type="text" placeholder="Last Donation Date (if any)" />
            <button type="submit" className="blooddonation-submit-button">Register to Donate</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BloodDonation;