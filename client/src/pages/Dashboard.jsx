import React, { useEffect, useState } from 'react';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../api/appointments';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentCard from '../components/AppointmentCard';
import CalendarView from '../components/CalendarView';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dateTime: '',
    duration: '',
    location: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAll, setShowAll] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const fetchAppointments = async () => {
    const res = await getAppointments(token);
    setAppointments(Array.isArray(res) ? res : []);
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAppointment(editingId, form, token);
        setEditingId(null);
        toast.success('Appointment updated successfully!');
      } else {
        await createAppointment(form, token);
        toast.success('Appointment created successfully!');
      }
      setForm({ title: '', description: '', dateTime: '', duration: '', location: '' });
      fetchAppointments();
      setError('');
    } catch (err) {
      if (err.status === 409) {
        setError('This slot is already booked!');
        toast.error('This slot is already booked!');
      } else {
        setError('An error occurred. Please try again.');
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  const handleEdit = (appt) => {
    setEditingId(appt._id);
    setForm({
      title: appt.title,
      description: appt.description || '',
      dateTime: appt.dateTime ? appt.dateTime.slice(0, 16) : '',
      duration: appt.duration,
      location: appt.location || '',
    });
    toast.info('Editing appointment.');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ title: '', description: '', dateTime: '', duration: '', location: '' });
    toast.info('Edit cancelled.');
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id, token);
      fetchAppointments();
      toast.success('Appointment deleted successfully!');
    } catch {
      toast.error('Failed to delete appointment.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out successfully.');
    navigate('/login');
  };

  // Filter appointments for the selected date
  const filteredAppointments = appointments.filter(appt => {
    const apptDate = new Date(appt.dateTime);
    return (
      apptDate.getFullYear() === selectedDate.getFullYear() &&
      apptDate.getMonth() === selectedDate.getMonth() &&
      apptDate.getDate() === selectedDate.getDate()
    );
  });
  const appointmentsToShow = showAll ? appointments : filteredAppointments;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 flex flex-col items-center py-8 px-2">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <div className="w-full max-w-[90rem] bg-white/95 rounded-2xl shadow-2xl p-8 relative flex flex-col gap-8 md:gap-12">
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition font-semibold text-sm md:text-base"
        >
          Logout
        </button>
        {/* Calendar View */}
        <div className="w-full flex flex-col items-center mb-8">
          <CalendarView selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Form Section */}
          <div className="flex-1 bg-gray-50 rounded-xl shadow p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-800 tracking-tight">{editingId ? 'Edit Appointment' : 'Create Appointment'}</h2>
              <p className="text-gray-500 mb-4 text-sm md:text-base">Fill in the details below to {editingId ? 'update' : 'add a new'} appointment.</p>
              <AppointmentForm
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
                editingId={editingId}
                onCancel={handleCancelEdit}
                error={error}
              />
            </div>
          </div>
          {/* Appointments Section */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
                {showAll ? 'All Appointments' : `Appointments on ${selectedDate.toLocaleDateString()}`}
              </h2>
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition text-sm font-semibold"
              >
                {showAll ? "View Today's" : 'View All'}
              </button>
            </div>
            <p className="text-gray-500 mb-4 text-sm md:text-base">
              {showAll
                ? 'View, edit, or delete any of your scheduled appointments below.'
                : 'View, edit, or delete your scheduled appointments for the selected day below.'}
            </p>
            <ul className="space-y-4 overflow-y-auto max-h-[420px] pr-2">
              {appointmentsToShow.length === 0 && (
                <li className="text-gray-500">No appointments found{showAll ? '.' : ' for this day.'}</li>
              )}
              {appointmentsToShow.map((appt) => (
                <AppointmentCard
                  key={appt._id}
                  appt={appt}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 