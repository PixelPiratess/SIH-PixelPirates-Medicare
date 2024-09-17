import React from 'react';
import { Heart, Droplet, IndianRupee } from 'lucide-react';
import './DonationDashboard.css';

const DonationDashboard = () => {
  return (
    <div className="donation-dashboard">
      <div className="content-wrapper">
        <div className="icon-wrapper">
          <Heart size={48} color="#3b82f6" />
        </div>
        <h1>Make a Donation</h1>
        <p>Choose how you'd like to contribute and make a difference today.</p>

        <div className="donation-types">
          <a href="/blood-donation" className="donation-type">
            <Droplet size={24} />
            <span>Blood Donation</span>
          </a>
          <a href="/organ-donation" className="donation-type">
            <Heart size={24} />
            <span>Organ Donation</span>
          </a>
          <a href="/financial-aid" className="donation-type">
            <IndianRupee size={24} />
            <span>Financial Aid</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DonationDashboard;