import React from 'react';

export default function AppointmentForm({ form, onChange, onSubmit, editingId, onCancel, error }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Title<span className="text-red-500">*</span></label>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={onChange}
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Description</label>
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={onChange}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">Date & Time<span className="text-red-500">*</span></label>
          <input
            name="dateTime"
            type="datetime-local"
            value={form.dateTime}
            onChange={onChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">Duration (min)<span className="text-red-500">*</span></label>
          <input
            name="duration"
            type="number"
            placeholder="Duration (min)"
            value={form.duration}
            onChange={onChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Location/Link</label>
        <input
          name="location"
          placeholder="Location or Online Link"
          value={form.location}
          onChange={onChange}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>
      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 bg-gray-400 text-white rounded-lg font-semibold shadow hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
} 