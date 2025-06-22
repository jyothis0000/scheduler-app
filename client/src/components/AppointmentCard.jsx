import React from 'react';

export default function AppointmentCard({ appt, onEdit, onDelete }) {
  return (
    <li
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-xl transition"
    >
      <div className="flex-1">
        <div className="font-bold text-lg text-gray-800 mb-1">{appt.title}</div>
        <div className="text-gray-600 text-sm mb-1">
          <span className="inline-block mr-2">📅</span>{new Date(appt.dateTime).toLocaleString()}
        </div>
        {appt.description && <div className="text-gray-700 mb-1">{appt.description}</div>}
        <div className="text-gray-500 text-sm mb-1"><span className="inline-block mr-2">⏱️</span>Duration: {appt.duration} min</div>
        {appt.location && <div className="text-gray-500 text-sm"><span className="inline-block mr-2">📍</span>{appt.location}</div>}
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button
          onClick={() => onEdit(appt)}
          className="px-4 py-1 bg-yellow-400 text-white rounded-lg font-semibold shadow hover:bg-yellow-500 transition text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(appt._id)}
          className="px-4 py-1 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition text-sm"
        >
          Delete
        </button>
      </div>
    </li>
  );
} 