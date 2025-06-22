const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dateTime: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  location: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema); 