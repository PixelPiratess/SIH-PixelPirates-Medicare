  // FinancialAid.js

  import React, { useState } from 'react';
  import { DollarSign, Clock, Heart, Activity } from 'lucide-react';
  import './FinancialAid.css';

  const FinancialAid = () => {
    const [showDonateForm, setShowDonateForm] = useState(false);

    const toggleDonateForm = () => {
      setShowDonateForm(!showDonateForm);
    };

    return (
      <div className="financialaid-container">
        <h1 className="financialaid-header">Financial Aid Portal</h1>
        <div className="financialaid-content">
          <p>
            Empower lives through the gift of financial support. Your donation can be the lifeline someone desperately needs. Every day, countless individuals struggle with financial hardships. Your contribution can make a significant difference in their lives, supporting education, healthcare, and basic necessities.
          </p>
        </div>

        <div className="financialaid-info">
          <h2>Why Donate?</h2>
          <div className="financialaid-benefits">
            <div className="benefit-item">
              <DollarSign size={24} />
              <h3>Change Lives</h3>
              <p>One donation can transform multiple lives</p>
            </div>
            <div className="benefit-item">
              <Clock size={24} />
              <h3>Quick Process</h3>
              <p>It takes only a few minutes to donate</p>
            </div>
            <div className="benefit-item">
              <Heart size={24} />
              <h3>Immediate Impact</h3>
              <p>Your donation provides instant relief</p>
            </div>
            <div className="benefit-item">
              <Activity size={24} />
              <h3>Sustainable Help</h3>
              <p>Regular donations create lasting change</p>
            </div>
          </div>
        </div>

        <div className="financialaid-actions">
          <button className="financialaid-action-button" onClick={toggleDonateForm}>Donate Now</button>
        </div>

        {showDonateForm && (
          <div className="financialaid-form-container">
            <h2>Make a Donation</h2>
            <form className="financialaid-form">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <select required>
                <option value="">Select Donation Amount</option>
                <option value="10">₹500</option>
                <option value="25">₹1000</option>
                <option value="50">₹2500</option>
                <option value="100">₹5000</option>
                <option value="other">Other</option>
              </select>
              <input type="text" placeholder="Custom Amount (if Other)" />
              <select required>
                <option value="">Select Payment Method</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
              <textarea placeholder="Leave a message (optional)"></textarea>
              <button type="submit" className="financialaid-submit-button">Complete Donation</button>
            </form>
          </div>
        )}
      </div>
    );
  };

  export default FinancialAid;