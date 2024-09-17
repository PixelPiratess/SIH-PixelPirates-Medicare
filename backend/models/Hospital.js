const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  specialization: {
    type: String,
    required: true,
    trim: true,
  }
});

const appointmentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  date: Date,
  time: String,
  doctor: String,
  additionalMessage: String
}, { timestamps: true });

const hospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  adminName: {
    type: String,
    required: true,
    trim: true,
  },
  accepted: {
    type: Boolean,
    default: false
  },
  totalPatients: {
    type: Number,
    default: 0
  },
  appointmentsToday: {
    type: Number,
    default: 0
  },
  availableBeds: {
    type: Number,
    default: 0
  },
  doctorsOnDuty: {
    type: Number,
    default: 0
  },
  doctors: [doctorSchema]
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);