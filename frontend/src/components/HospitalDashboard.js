import React, { useState, useEffect } from 'react';
import { Hospital, Mail, Phone, MapPin, User, AlertCircle, Activity, Users, Calendar, Bed, Stethoscope, PlusCircle, Check, X } from 'lucide-react';
import './HospitalDashboard.css';

const HospitalDashboard = () => {
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedStats, setEditedStats] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '' });
  const [appointments, setAppointments] = useState([]);
  const [appointmentMessage, setAppointmentMessage] = useState('');

  useEffect(() => {
    fetchHospitalData();
    fetchAppointments();
  }, []);

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
      setEditedStats(data);
      setDoctors(data.doctors || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('hospitalToken');
      const response = await fetch('http://localhost:5000/api/auth/hospital/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleStatChange = (stat, value) => {
    setEditedStats(prev => ({ ...prev, [stat]: value }));
  };

  const handleSaveStats = async () => {
    try {
      const token = localStorage.getItem('hospitalToken');
      const response = await fetch('http://localhost:5000/api/auth/hospital/update-stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editedStats)
      });
      if (!response.ok) {
        throw new Error('Failed to update stats');
      }
      const updatedData = await response.json();
      setHospitalData(updatedData);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNewDoctorChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDoctor = async () => {
    try {
      const token = localStorage.getItem('hospitalToken');
      const response = await fetch('http://localhost:5000/api/auth/hospital/add-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newDoctor)
      });
      if (!response.ok) {
        throw new Error('Failed to add doctor');
      }
      const updatedHospital = await response.json();
      setDoctors(updatedHospital.doctors);
      setNewDoctor({ name: '', specialization: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAppointmentAction = async (appointmentId, action) => {
    try {
      const token = localStorage.getItem('hospitalToken');
      const response = await fetch(`http://localhost:5000/api/auth/hospital/appointments/${appointmentId}/${action}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to ${action} appointment`);
      }
      setAppointmentMessage(`Appointment ${action === 'accept' ? 'Accepted' : 'Denied'} by Admin`);
      setTimeout(() => setAppointmentMessage(''), 3000);
      fetchAppointments(); // Refresh appointments after action
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="hd-loading">Loading...</div>;
  }

  if (error) {
    return <div className="hd-error">{error}</div>;
  }

  if (!hospitalData || !hospitalData.accepted) {
    return (
      <div className="hd-pending">
        <AlertCircle size={64} color="#4a90e2" className="hd-alert-icon" />
        <h2 className="hd-pending-title">Application Pending</h2>
        <p className="hd-pending-message">Our team will contact you shortly. We are eager to have you Onboard!</p>
      </div>
    );
  }

  return (
    <div className="hd-container">
      <div className="hd-header">
        <h1 className="hd-title">Welcome, {hospitalData.hospitalName}</h1>
        <Activity size={32} color="#4a90e2" className="hd-activity-icon" />
      </div>
      <div className="hd-content">
        <div className="hd-info-card">
          <h2 className="hd-card-title">Hospital Information</h2>
          <div className="hd-info-item">
            <Hospital size={20} className="hd-info-icon" />
            <span className="hd-info-text">{hospitalData.hospitalName}</span>
          </div>
          <div className="hd-info-item">
            <Mail size={20} className="hd-info-icon" />
            <span className="hd-info-text">{hospitalData.email}</span>
          </div>
          <div className="hd-info-item">
            <Phone size={20} className="hd-info-icon" />
            <span className="hd-info-text">{hospitalData.phone}</span>
          </div>
          <div className="hd-info-item">
            <MapPin size={20} className="hd-info-icon" />
            <span className="hd-info-text">{hospitalData.address}</span>
          </div>
          <div className="hd-info-item">
            <User size={20} className="hd-info-icon" />
            <span className="hd-info-text">{hospitalData.adminName}</span>
          </div>
        </div>
        
        <div className="hd-stats-card">
          <h2 className="hd-card-title">Quick Stats</h2>
          <button className='hd-edit-button' onClick={handleEditToggle}>{editMode ? 'Cancel' : 'Edit Stats'}</button>
          {editMode && <button className="hd-save-button" onClick={handleSaveStats}>Save Stats</button>}
          <div className="hd-stat-grid">
            {['totalPatients', 'appointmentsToday', 'availableBeds', 'doctorsOnDuty'].map(stat => (
              <div key={stat} className="hd-stat-item">
                {stat === 'totalPatients' && <Users size={24} color="#4a90e2" className="hd-stat-icon" />}
                {stat === 'appointmentsToday' && <Calendar size={24} color="#4a90e2" className="hd-stat-icon" />}
                {stat === 'availableBeds' && <Bed size={24} color="#4a90e2" className="hd-stat-icon" />}
                {stat === 'doctorsOnDuty' && <Stethoscope size={24} color="#4a90e2" className="hd-stat-icon" />}
                <h3 className="hd-stat-title">{stat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                {editMode ? (
                  <input
                    className="hd-stat-input"
                    type="number"
                    value={editedStats[stat]}
                    onChange={(e) => handleStatChange(stat, e.target.value)}
                  />
                ) : (
                  <p className="hd-stat-value">{hospitalData[stat]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hd-doctors-card">
          <h2 className="hd-card-title">Doctors</h2>
          <div className="hd-doctors-list">
            {doctors.map((doctor, index) => (
              <div key={index} className="hd-doctor-item">
                <Stethoscope size={20} className="hd-doctor-icon" />
                <span className="hd-doctor-name">{doctor.name}</span>
                <span className="hd-doctor-specialization">{doctor.specialization}</span>
              </div>
            ))}
          </div>
          <div className="hd-add-doctor">
            <input
              type="text"
              name="name"
              value={newDoctor.name}
              onChange={handleNewDoctorChange}
              placeholder="Doctor Name"
              className="hd-doctor-input"
            />
            <input
              type="text"
              name="specialization"
              value={newDoctor.specialization}
              onChange={handleNewDoctorChange}
              placeholder="Specialization"
              className="hd-doctor-input"
            />
            <button onClick={handleAddDoctor} className="hd-add-doctor-button">
              <PlusCircle size={20} />
              Add Doctor
            </button>
          </div>
        </div>

        <div className="hd-appointments-card">
        <h2 className="hd-card-title">Appointments</h2>
        {appointmentMessage && (
          <div className="hd-appointment-message">{appointmentMessage}</div>
        )}
        <div className="hd-appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="hd-appointment-item">
              <div className="hd-appointment-info">
                <span className="hd-appointment-name">{appointment.fullName}</span>
                <span className="hd-appointment-date">{new Date(appointment.date).toLocaleDateString()} {appointment.time}</span>
                <span className="hd-appointment-doctor">{appointment.doctor.name}</span>
                <span className="hd-appointment-status">{appointment.status}</span>
              </div>
              <div className="hd-appointment-actions">
                <button 
                  className="hd-appointment-accept" 
                  onClick={() => handleAppointmentAction(appointment._id, 'accept')}
                  disabled={appointment.status !== 'Pending'}
                >
                  <Check size={20} />
                </button>
                <button 
                  className="hd-appointment-deny" 
                  onClick={() => handleAppointmentAction(appointment._id, 'deny')}
                  disabled={appointment.status !== 'Pending'}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;