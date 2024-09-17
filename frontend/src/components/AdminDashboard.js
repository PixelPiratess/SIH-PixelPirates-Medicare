import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/hospitals', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setHospitals(response.data);
    } catch (err) {
      setError('Failed to fetch hospitals');
    }
  };

  const updateHospitalStatus = async (id, accepted) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/hospitals/${id}`, { accepted }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchHospitals();
    } catch (err) {
      setError('Failed to update hospital status');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard__title">Admin Dashboard</h1>
      {error && <div className="admin-dashboard__error" role="alert">{error}</div>}
      <table className="admin-dashboard__table">
        <thead>
          <tr>
            <th>Hospital Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Admin Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital._id}>
              <td>{hospital.hospitalName}</td>
              <td>{hospital.email}</td>
              <td>{hospital.phone}</td>
              <td>{hospital.address}</td>
              <td>{hospital.adminName}</td>
              <td>{hospital.accepted ? 'Accepted' : 'Pending'}</td>
              <td>
                <button
                  onClick={() => updateHospitalStatus(hospital._id, true)}
                  className="admin-dashboard__button admin-dashboard__button--accept"
                  disabled={hospital.accepted}
                >
                  ✓
                </button>
                <button
                  onClick={() => updateHospitalStatus(hospital._id, false)}
                  className="admin-dashboard__button admin-dashboard__button--reject"
                  disabled={!hospital.accepted}
                >
                  ✗
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;