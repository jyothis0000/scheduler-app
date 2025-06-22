const Appointment = require('../models/Appointment');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.userId }).sort({ dateTime: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { title, description, dateTime, duration, location } = req.body;
    const userId = req.userId;
    const start = new Date(dateTime);
    const end = new Date(start.getTime() + duration * 60000);

    // Find all appointments for this user that could overlap
    const possibleConflicts = await Appointment.find({
      user: userId,
      dateTime: { $lt: end }
    });

    // Debug logging
    console.log('Attempting to create appointment:', { start, end });
    possibleConflicts.forEach(appt => {
      const apptStart = new Date(appt.dateTime);
      const apptEnd = new Date(apptStart.getTime() + appt.duration * 60000);
      console.log('Checking against existing:', { apptStart, apptEnd });
    });

    // Check for overlap in JS
    const conflict = possibleConflicts.find(appt => {
      const apptStart = new Date(appt.dateTime);
      const apptEnd = new Date(apptStart.getTime() + appt.duration * 60000);
      const isConflict = apptStart < end && apptEnd > start;
      if (isConflict) {
        console.log('Conflict found with:', { apptStart, apptEnd });
      }
      return isConflict;
    });

    if (conflict) {
      return res.status(409).json({ message: 'This slot is already booked!' });
    }

    const appointment = await Appointment.create({
      user: userId,
      title,
      description,
      dateTime,
      duration,
      location,
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOneAndDelete({ _id: id, user: req.userId });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 