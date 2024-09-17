import React, { useState } from 'react';
import { Heart, Clock, UserPlus, Activity } from 'lucide-react';
import './OrganDonation.css';

const OrganDonation = () => {
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
    <div className="organ-donation-container">
      <h1 className="organ-donation-header">Organ Donation Portal</h1>
      <div className="organ-donation-content">
        <p>
          Empower lives through the gift of organ donation. Your decision to become an organ donor can be the lifeline someone desperately needs. Every day, lives are saved and improved by organ and tissue donors. One organ donor can save up to eight lives and improve the lives of up to 75 people through tissue donation.
        </p>
      </div>

      <div className="organ-donation-info">
        <h2>Why Donate Organs?</h2>
        <div className="organ-donation-benefits">
          <div className="organ-benefit-item">
            <Heart size={24} />
            <h3>Save Lives</h3>
            <p>One donor can save up to eight lives</p>
          </div>
          <div className="organ-benefit-item">
            <Clock size={24} />
            <h3>Quick Process</h3>
            <p>Registering as a donor takes only minutes</p>
          </div>
          <div className="organ-benefit-item">
            <UserPlus size={24} />
            <h3>Help Many</h3>
            <p>Improve the lives of up to 75 people</p>
          </div>
          <div className="organ-benefit-item">
            <Activity size={24} />
            <h3>Lasting Impact</h3>
            <p>Your gift can have a lifelong effect</p>
          </div>
        </div>
      </div>

      <div className="organ-donation-actions">
        <button className="organ-donation-action-button" onClick={toggleRequestForm}>Request Organ</button>
        <button className="organ-donation-action-button" onClick={toggleDonateForm}>Become a Donor</button>
      </div>

      {showRequestForm && (
        <div className="organ-donation-form-container">
          <h2>Request Organ</h2>
          <form className="organ-donation-form">
            <input type="text" placeholder="Full Name" required />
            <input type="number" placeholder="Age" min="0" required />
            <select required>
              <option value="">Select Organ Needed</option>
              <option value="kidney">Kidney</option>
              <option value="liver">Liver</option>
              <option value="heart">Heart</option>
              <option value="lungs">Lungs</option>
              <option value="pancreas">Pancreas</option>
            </select>
            <input type="text" placeholder="Hospital Name" required />
            <input type="tel" placeholder="Contact Number" required />
            <button type="submit" className="organ-donation-submit-button">Submit Request</button>
          </form>
        </div>
      )}

      {showDonateForm && (
        <div className="organ-donation-form-container">
          <h2>Become an Organ Donor</h2>
          <form className="organ-donation-form">
            <input type="text" placeholder="Full Name" required />
            <input type="number" placeholder="Age" min="18" required />
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Contact Number" required />
            <select required>
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <button type="submit" className="organ-donation-submit-button">Register as Donor</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrganDonation;