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
      fetchHospitals(); // Refresh the list after update
    } catch (err) {
      setError('Failed to update hospital status');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Hospital Name</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Admin Name</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital._id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{hospital.hospitalName}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{hospital.email}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{hospital.phone}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{hospital.address}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{hospital.adminName}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{hospital.accepted ? 'Accepted' : 'Pending'}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button
                  onClick={() => updateHospitalStatus(hospital._id, true)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                  disabled={hospital.accepted}
                >
                  ✓
                </button>
                <button
                  onClick={() => updateHospitalStatus(hospital._id, false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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