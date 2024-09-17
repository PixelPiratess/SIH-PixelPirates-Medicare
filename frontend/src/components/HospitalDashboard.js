import React, { useState, useEffect } from 'react';
import { Hospital, Mail, Phone, MapPin, User, AlertCircle, Activity, Users, Calendar, Bed, Stethoscope, UserPlus, X } from 'lucide-react';
import './HospitalDashboard.css';

const specializations = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Oncology",
  "Pediatrics",
  "Psychiatry",
  "Orthopedics",
  "Urology",
  "Other"
];

const HospitalDashboard = () => {
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedStats, setEditedStats] = useState({});
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '' });

  useEffect(() => {
    fetchHospitalData();
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

  const handleAddDoctor = async (e) => {
    e.preventDefault();
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
      const updatedData = await response.json();
      setHospitalData(updatedData);
      setNewDoctor({ name: '', specialization: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveDoctor = async (doctorId) => {
    try {
      const token = localStorage.getItem('hospitalToken');
      const response = await fetch(`http://localhost:5000/api/auth/hospital/remove-doctor/${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to remove doctor');
      }
      const updatedData = await response.json();
      setHospitalData(updatedData);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="hospital-dashboard loading">Loading...</div>;
  }

  if (error) {
    return <div className="hospital-dashboard error">{error}</div>;
  }

  if (!hospitalData || !hospitalData.accepted) {
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
        {/* Hospital Info and Quick Stats sections remain unchanged */}
        <div className="hospital-info card">
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
        
        <div className="quick-stats card">
          <h2>Quick Stats</h2>
          <button className='stat-button' onClick={handleEditToggle}>{editMode ? 'Cancel' : 'Edit Stats'}</button>
          {editMode && <button onClick={handleSaveStats}>Save Stats</button>}
          <div className="stat-grid">
            {['totalPatients', 'appointmentsToday', 'availableBeds', 'doctorsOnDuty'].map(stat => (
              <div key={stat} className="stat-item">
                {stat === 'totalPatients' && <Users size={24} color="#4a90e2" />}
                {stat === 'appointmentsToday' && <Calendar size={24} color="#4a90e2" />}
                {stat === 'availableBeds' && <Bed size={24} color="#4a90e2" />}
                {stat === 'doctorsOnDuty' && <Stethoscope size={24} color="#4a90e2" />}
                <h3>{stat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                {editMode ? (
                  <input
                    type="number"
                    value={editedStats[stat]}
                    onChange={(e) => handleStatChange(stat, e.target.value)}
                  />
                ) : (
                  <p>{hospitalData[stat]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="doctors-list card">
          <h2>Doctors</h2>
          <form onSubmit={handleAddDoctor} className="add-doctor-form">
            <input
              type="text"
              placeholder="Doctor's Name"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              required
            />
            <select
              value={newDoctor.specialization}
              onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
              required
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
            <button type="submit">Add Doctor</button>
          </form>
          {hospitalData.doctors && hospitalData.doctors.length > 0 ? (
            <ul>
              {hospitalData.doctors.map((doctor) => (
                <li key={doctor._id} className="doctor-item">
                  <UserPlus size={20} />
                  <span>{doctor.name} - {doctor.specialization}</span>
                  <button onClick={() => handleRemoveDoctor(doctor._id)} className="remove-doctor">
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No doctors added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
      

export default HospitalDashboard;