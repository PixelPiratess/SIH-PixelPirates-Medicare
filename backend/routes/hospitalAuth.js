// routes/hospitalAuth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Hospital = require("../models/Hospital");
const auth = require("../middleware/auth");
const hospitalController = require('../controllers/hospitalController');

const router = express.Router();

// Hospital Signup
router.post("/signup", async (req, res) => {
  try {
    const { hospitalName, email, password, phone, state, city, adminName } = req.body;

    // Check if hospital already exists
    let hospital = await Hospital.findOne({ email });
    if (hospital) {
      return res.status(400).json({ message: "Hospital already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new hospital
    hospital = new Hospital({
      hospitalName,
      email,
      password: hashedPassword,
      phone,
      state,
      city,
      adminName,
      accepted: false,
    });

    await hospital.save();

    // Create and send JWT token
    const payload = {
      hospital: {
        id: hospital.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Hospital Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if hospital exists
    let hospital = await Hospital.findOne({ email });
    if (!hospital) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and send JWT token
    const payload = {
      hospital: {
        id: hospital.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token, 
          hospitalName: hospital.hospitalName 
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Hospital Dashboard
router.get("/dashboard", auth, async (req, res) => {
  try {
    if (!req.hospital || !req.hospital.id) {
      return res.status(401).json({ message: "Not authorized as a hospital" });
    }
    const hospital = await Hospital.findById(req.hospital.id).select("-password");
    if (!hospital) {
      return res.status(404).json({ msg: "Hospital not found" });
    }
    res.json(hospital);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Hospital Stats
router.put('/update-stats', auth, async (req, res) => {
  try {
    const { totalPatients, appointmentsToday, availableBeds, doctorsOnDuty } = req.body;

    const hospital = await Hospital.findById(req.hospital.id);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    if (totalPatients !== undefined) hospital.totalPatients = totalPatients;
    if (appointmentsToday !== undefined) hospital.appointmentsToday = appointmentsToday;
    if (availableBeds !== undefined) hospital.availableBeds = availableBeds;
    if (doctorsOnDuty !== undefined) hospital.doctorsOnDuty = doctorsOnDuty;

    await hospital.save();

    res.json(hospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a doctor
router.post('/add-doctor', auth, async (req, res) => {
  try {
    const { name, specialization } = req.body;
    
    if (!name || !specialization) {
      return res.status(400).json({ message: 'Please provide both name and specialization' });
    }

    const hospital = await Hospital.findById(req.hospital.id);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    hospital.doctors.push({ name, specialization });
    await hospital.save();

    res.json(hospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove a doctor
router.delete('/remove-doctor/:id', auth, async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.hospital.id);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    const doctorIndex = hospital.doctors.findIndex(doctor => doctor._id.toString() === req.params.id);

    if (doctorIndex === -1) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    hospital.doctors.splice(doctorIndex, 1);
    await hospital.save();

    res.json(hospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Book an appointment
router.post('/book-appointment/:hospitalId', async (req, res) => {
  console.log('Received appointment data:', req.body);
  console.log('Hospital ID:', req.params.hospitalId);
  try {
    const { hospitalId } = req.params;
    const appointmentData = req.body;

    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    hospital.appointments.push(appointmentData);
    await hospital.save();

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/states', hospitalController.getStates);
router.get('/cities/:state', hospitalController.getCities);
router.get('/hospitals/:city', hospitalController.getHospitals);
router.get('/specializations/:hospitalId', hospitalController.getSpecializations);
router.get('/doctors/:hospitalId', hospitalController.getDoctors);

module.exports = router;