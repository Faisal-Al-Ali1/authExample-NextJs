"use client";

import { useState } from 'react';
import axios from 'axios';

export default function ProtectedPage() {
  const [message, setMessage] = useState('');

  const handleFetch = async () => {
    try {
      const response = await axios.get('/api/protected');
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Protected Page</h1>
      <p className="text-gray-700">
        This page calls a protected route. If you&apos;re logged in (cookie present),
        you&apos;ll see the protected message.
      </p>
      <button
        onClick={handleFetch}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Get Protected Data
      </button>

      {message && (
        <p className="text-blue-600 font-medium">{message}</p>
      )}
    </div>
  );
}
