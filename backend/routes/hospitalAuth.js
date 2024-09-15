// routes/hospitalAuth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Hospital = require("../models/Hospital");
const auth = require("../middleware/auth");

const router = express.Router();

// Hospital Signup
router.post("/signup", async (req, res) => {
  try {
    const { hospitalName, email, password, phone, address, adminName } =
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
        res.json({ token });
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

module.exports = router;
