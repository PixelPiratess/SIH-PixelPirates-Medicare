// routes/hospitalAuth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Hospital = require("../models/Hospital");
const Appointment = require('../models/Appointment');
const auth = require("../middleware/auth");

const router = express.Router();

// Hospital Signup
router.post("/signup", async (req, res) => {
  try {
    const { hospitalName, email, password, phone, address, state, city, adminName } =
      req.body;

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
      address,
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
          // Include hospitalName in the response
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
    const hospital = await Hospital.findById(req.hospital.id).select(
      "-password"
    );
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
router.put("/update-stats", auth, async (req, res) => {
  try {
    const { totalPatients, appointmentsToday, availableBeds, doctorsOnDuty } =
      req.body;

    const hospital = await Hospital.findById(req.hospital.id);
    if (!hospital) {
      return res.status(404).json({ msg: "Hospital not found" });
    }

    hospital.totalPatients = totalPatients;
    hospital.appointmentsToday = appointmentsToday;
    hospital.availableBeds = availableBeds;
    hospital.doctorsOnDuty = doctorsOnDuty;

    await hospital.save();

    res.json(hospital);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add Doctor
router.post("/add-doctor", auth, async (req, res) => {
  try {
    const { name, specialization } = req.body;

    if (!name || !specialization) {
      return res.status(400).json({ message: "Name and specialization are required" });
    }

    const hospital = await Hospital.findById(req.hospital.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const newDoctor = {
      name,
      specialization
    };

    hospital.doctors.push(newDoctor);
    await hospital.save();

    res.status(201).json(hospital);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get hospitals by city
router.get("/hospitals/:city", async (req, res) => {
  try {
    const hospitals = await Hospital.find({ city: req.params.city, accepted: true })
      .select('hospitalName');
    res.json(hospitals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get doctors by hospital
router.get("/doctors/:hospitalId", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId);
    if (!hospital) {
      return res.status(404).json({ msg: "Hospital not found" });
    }
    // Assuming doctors are stored in the hospital document
    res.json(hospital.doctors || []);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Book appointment
router.post("/book-appointment/:hospitalId", auth, async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Create and save the appointment
    const appointment = new Appointment({
      ...req.body,
      hospital: hospital._id
    });
    await appointment.save();

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Get appointments for a hospital
router.get("/appointments", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ hospital: req.hospital.id })
      .sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update appointment status (accept/deny)
router.put("/appointments/:id/:action", auth, async (req, res) => {
  try {
    const { id, action } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    if (appointment.hospital.toString() !== req.hospital.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    if (action === 'accept') {
      appointment.status = 'Accepted';
    } else if (action === 'deny') {
      appointment.status = 'Denied';
    } else {
      return res.status(400).json({ msg: "Invalid action" });
    }

    await appointment.save();

    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
