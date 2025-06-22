import React from 'react';

export default function AuthForm({
  title,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  error,
  submitLabel,
  alternateText,
  alternateLink,
  alternateHref,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 px-2">
      <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">{title}</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            {submitLabel}
          </button>
        </form>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <p className="text-center text-gray-600 text-sm">
          {alternateText}{' '}
          <a href={alternateHref} className="text-blue-600 hover:underline font-semibold">{alternateLink}</a>
        </p>
      </div>
    </div>
  );
} 