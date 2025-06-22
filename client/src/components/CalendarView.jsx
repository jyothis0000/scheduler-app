import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarView({ selectedDate, onChange }) {
  return (
    <div className="w-full max-w-5xl bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center">
      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">Calendar View</h2>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-2xl">
          <Calendar
            onChange={onChange}
            value={selectedDate}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
} 