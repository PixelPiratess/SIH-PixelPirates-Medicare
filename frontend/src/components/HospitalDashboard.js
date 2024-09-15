import React, { useState, useEffect } from 'react';
import { Hospital, Mail, Phone, MapPin, User, AlertCircle, Activity } from 'lucide-react';
import './HospitalDashboard.css';

const HospitalDashboard = () => {
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const token = localStorage.getItem('hospitalToken');
        const response = await fetch('http://localhost:5000/api/auth/hospital/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch hospital data');
        }
        const data = await response.json();
        setHospitalData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, []);

  if (loading) {
    return <div className="hospital-dashboard loading">Loading...</div>;
  }

  if (error) {
    return <div className="hospital-dashboard error">{error}</div>;
  }

  if (!hospitalData.accepted) {
    return (
      <div className="hospital-dashboard pending">
        <AlertCircle size={64} color="#4a90e2" />
        <h2>Application Pending</h2>
        <p>Our team will contact you shortly. We are eager to have you Onboard!</p>
      </div>
    );
  }

  return (
    <div className="hospital-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {hospitalData.hospitalName}</h1>
        <Activity size={32} color="#4a90e2" />
      </div>
      <div className="dashboard-content">
        <div className="hospital-info">
          <h2>Hospital Information</h2>
          <div className="info-item">
            <Hospital size={20} />
            <span>{hospitalData.hospitalName}</span>
          </div>
          <div className="info-item">
            <Mail size={20} />
            <span>{hospitalData.email}</span>
          </div>
          <div className="info-item">
            <Phone size={20} />
            <span>{hospitalData.phone}</span>
          </div>
          <div className="info-item">
            <MapPin size={20} />
            <span>{hospitalData.address}</span>
          </div>
          <div className="info-item">
            <User size={20} />
            <span>{hospitalData.adminName}</span>
          </div>
        </div>
        {/* Add more dashboard sections here */}
      </div>
    </div>
  );
};

export default HospitalDashboard;