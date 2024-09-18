import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, Hospital, User } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const userEmail = localStorage.getItem('userEmail');
      
      if (!token || !userEmail) {
        throw new Error('User not authenticated');
      }

      const response = await axios.get('http://localhost:5000/api/auth/my-appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userAppointments = response.data.filter(appointment => appointment.email === userEmail);
      setAppointments(userAppointments);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to fetch appointments');
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-container">
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
      <h1 className="dashboard-title">My Dashboard</h1>
      <section className="my-appointments">
        <h2>My Appointments</h2>
        {appointments.length === 0 ? (
          <p className="no-appointments">You have no appointments scheduled.</p>
        ) : (
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="appointment-item">
                <div className="appointment-header">
                  <Hospital size={24} />
                  <h3>{appointment.hospital.hospitalName}</h3>
                </div>
                <div className="appointment-details">
                  <p><User size={18} /> <strong>Doctor:</strong> {appointment.doctor.name}</p>
                  <p><Calendar size={18} /> <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                  <p><Clock size={18} /> <strong>Time:</strong> {appointment.time}</p>
                  <p className={`appointment-status ${appointment.status.toLowerCase()}`}>
                    <strong>Status:</strong> {appointment.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;