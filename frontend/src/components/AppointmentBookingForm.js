import React, { useState, useEffect } from 'react';
import './AppointmentBookingForm.css';
import axios from 'axios';
import { State, City } from 'country-state-city';

const API_BASE_URL = 'http://localhost:5000/api/auth/hospital';

const AppointmentBookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    date: '',
    time: '',
    state: '',
    city: '',
    hospital: '',
    doctor: '',
    doctorName: '',
    additionalMessage: ''
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const indianStates = State.getStatesOfCountry('IN');
    setStates(indianStates);
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    switch (name) {
      case 'state':
        const stateCities = City.getCitiesOfState('IN', value);
        setCities(stateCities);
        setFormData(prevState => ({
          ...prevState,
          city: '',
          hospital: '',
          doctor: ''
        }));
        break;
      case 'city':
        setFormData(prevState => ({
          ...prevState,
          hospital: '',
          doctor: ''
        }));
        if (value) {
          fetchHospitals(value);
        } else {
          setHospitals([]);
        }
        break;
      case 'hospital':
        setFormData(prevState => ({
          ...prevState,
          doctor: ''
        }));
        fetchDoctors(value);
        break;
      case 'doctor':
        const selectedDoctor = doctors.find(doc => doc._id === value);
        setFormData(prevState => ({
          ...prevState,
          doctor: value,
          doctorName: selectedDoctor ? selectedDoctor.name : ''
        }));
        break;
      default:
        break;
    }
  };

  const fetchHospitals = async (city) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hospitals/${city}`);
      setHospitals(response.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error.response?.data || error.message);
      setHospitals([]);
    }
  };

  const fetchDoctors = async (hospitalId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/doctors/${hospitalId}`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).every(value => value !== '')) {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        const appointmentData = {
          ...formData,
          doctor: {
            id: formData.doctor,
            name: doctors.find(d => d._id === formData.doctor)?.name || ''
          }
        };
        const response = await axios.post(
          `${API_BASE_URL}/book-appointment/${formData.hospital}`,
          appointmentData,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        console.log('Appointment booked:', response.data);
        alert('Appointment booked successfully!');
        // Reset form or redirect user
      } catch (error) {
        console.error('Error booking appointment:', error.response?.data || error.message);
        alert('Failed to book appointment. Please try again.');
      }
    } else {
      alert('Please fill in all fields before submitting.');
    }
  };

  return (
    <div className="appointment-container">
      <h1 className="appointment-title">Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-section">
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="appointment-input"
              required
            />
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="appointment-input"
              required
            />
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="appointment-input"
              required
            />
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="date">Appointment Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="appointment-input"
              required
            />
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="time">Appointment Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="appointment-input"
              required
            />
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="state">State:</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="appointment-select"
              required
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="city">City:</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="appointment-select"
              required
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="hospital">Hospital:</label>
            <select
              id="hospital"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="appointment-select"
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map(hospital => (
                <option key={hospital._id} value={hospital._id}>{hospital.hospitalName}</option>
              ))}
            </select>
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="doctor">Doctor:</label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="appointment-select"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
              ))}
            </select>
          </div>
          <div className="appointment-form-group">
            <label className="appointment-label" htmlFor="additionalMessage">Additional Message:</label>
            <textarea
              id="additionalMessage"
              name="additionalMessage"
              value={formData.additionalMessage}
              onChange={handleChange}
              className="appointment-textarea"
            ></textarea>
          </div>
        </div>
        <button type="submit" className="appointment-submit-button">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentBookingForm;