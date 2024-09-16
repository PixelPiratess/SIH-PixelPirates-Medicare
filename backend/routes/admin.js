const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');
const roleCheck = require('../middleware/roleCheck');

// Get all hospitals
router.get('/hospitals', roleCheck('admin'), async (req, res) => {
  try {
    const hospitals = await Hospital.find().select('-password');
    res.json(hospitals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update hospital status
router.put('/hospitals/:id', roleCheck('admin'), async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      { accepted: req.body.accepted },
      { new: true }
    );
    if (!hospital) {
      return res.status(404).json({ msg: 'Hospital not found' });
    }
    res.json(hospital);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;