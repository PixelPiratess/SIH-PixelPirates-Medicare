import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Hospital, Mail, Phone, MapPin, User, AlertCircle, Activity, Users, Calendar, Bed, Stethoscope, UserPlus, X } from 'lucide-react';
import './HospitalDashboard.css';

const specializations = [
  "Cardiology", "Dermatology", "Endocrinology", "Gastroenterology", "Neurology",
  "Oncology", "Pediatrics", "Psychiatry", "Orthopedics", "Urology", "Other"
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
        headers: { 'Authorization': `Bearer ${token}` }
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
        headers: { 'Authorization': `Bearer ${token}` }
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!hospitalData) {
    return <div>No hospital data available</div>;
  }

  return (
    <div className="hospital-dashboard">
      <h1>Welcome, {hospitalData.hospitalName}</h1>
      
      <section className="hospital-info">
        <h2>Hospital Information</h2>
        <p><Hospital /> {hospitalData.hospitalName}</p>
        <p><Mail /> {hospitalData.email}</p>
        <p><Phone /> {hospitalData.phone}</p>
        <p><MapPin /> {hospitalData.city}, {hospitalData.state}</p>
        <p><User /> Admin: {hospitalData.adminName}</p>
      </section>

      <section className="hospital-stats">
        <h2>Hospital Statistics</h2>
        {editMode ? (
          <>
            <input type="number" value={editedStats.totalPatients} onChange={(e) => handleStatChange('totalPatients', e.target.value)} />
            <input type="number" value={editedStats.appointmentsToday} onChange={(e) => handleStatChange('appointmentsToday', e.target.value)} />
            <input type="number" value={editedStats.availableBeds} onChange={(e) => handleStatChange('availableBeds', e.target.value)} />
            <input type="number" value={editedStats.doctorsOnDuty} onChange={(e) => handleStatChange('doctorsOnDuty', e.target.value)} />
            <button onClick={handleSaveStats}>Save</button>
          </>
        ) : (
          <>
            <p><Activity /> Total Patients: {hospitalData.totalPatients}</p>
            <p><Calendar /> Appointments Today: {hospitalData.appointmentsToday}</p>
            <p><Bed /> Available Beds: {hospitalData.availableBeds}</p>
            <p><Stethoscope /> Doctors on Duty: {hospitalData.doctorsOnDuty}</p>
            <button onClick={handleEditToggle}>Edit</button>
          </>
        )}
      </section>

      <section className="doctors-list">
        <h2>Doctors</h2>
        {hospitalData.doctors && hospitalData.doctors.length > 0 ? (
          <ul>
            {hospitalData.doctors.map((doctor) => (
              <li key={doctor._id}>
                {doctor.name} - {doctor.specialization}
                <button onClick={() => handleRemoveDoctor(doctor._id)}><X size={16} /></button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No doctors added yet.</p>
        )}
        <form onSubmit={handleAddDoctor}>
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
            {specializations.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          <button type="submit"><UserPlus size={16} /> Add Doctor</button>
        </form>
      </section>

      <section className="appointments">
        <h2>Appointments</h2>
        {hospitalData.appointments && hospitalData.appointments.length > 0 ? (
          <ul>
            {hospitalData.appointments.map((appointment, index) => (
              <li key={index}>
                <p><strong>Patient:</strong> {appointment.fullName}</p>
                <p><strong>Date:</strong> {format(new Date(appointment.date), 'yyyy-MM-dd')}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Doctor:</strong> {appointment.doctor}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments scheduled.</p>
        )}
      </section>

      {!hospitalData.accepted && (
        <div className="pending-approval">
          <AlertCircle />
          <p>Your hospital account is pending approval. Our team will contact you shortly. We are eager to have you Onboard!</p>
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;