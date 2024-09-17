const Hospital = require('../models/Hospital'); // Adjust the path as needed

exports.getStates = async (req, res) => {
    try {
      const states = await Hospital.distinct('state');
      res.json(states);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getCities = async (req, res) => {
    try {
      const { state } = req.params;
      const cities = await Hospital.distinct('city', { state: new RegExp(state, 'i') });
      res.json(cities);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getHospitals = async (req, res) => {
    try {
      const { city } = req.params;
      const hospitals = await Hospital.find({ city: new RegExp(city, 'i') }, 'hospitalName');
      res.json(hospitals.map(hospital => ({ _id: hospital._id, name: hospital.hospitalName })));
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.getSpecializations = async (req, res) => {
    try {
      const { hospitalId } = req.params;
      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: 'Hospital not found' });
      }
      const specializations = hospital.doctors.map(doctor => doctor.specialization);
      res.json([...new Set(specializations)]);  // Remove duplicates
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getDoctors = async (req, res) => {
    try {
      const { hospitalId } = req.params;
      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: 'Hospital not found' });
      }
      const doctors = hospital.doctors;
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };