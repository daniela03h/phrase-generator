'use client';

import { useState } from 'react';

// Main component for the home page
export default function Home() {
  // State to hold the user's input number
  const [number, setNumber] = useState('');
  
  // State to hold the result returned from the backend
  const [result, setResult] = useState<null | { square: number; cube: number; isEven: boolean }>(null);
  
  // State to handle any error messages
  const [error, setError] = useState<string | null>(null);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form behavior (page reload)

    try {
      // Send a POST request to the backend API
      const response = await fetch('/api/calculate', {
        method: 'POST', // HTTP method
        headers: { 'Content-Type': 'application/json' }, // Specify JSON content
        body: JSON.stringify({ number }), // Send the number as JSON
      });

      // Check if the response status is not OK (e.g., 400 or 500)
      if (!response.ok) {
        // Extract the error message from the response
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong'); // Set the error message
        setResult(null); // Clear the result state
      } else {
        // Parse the JSON response and set the result state
        const data = await response.json();
        setResult(data); // Store the result in the state
        setError(null); // Clear any previous error
      }
    } catch (error) {
      // Handle any network or unexpected errors
      setError('Failed to connect to the server');
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 text-white px-6">
      {/* Title Section */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        ✨ Number Calculator ✨
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 text-gray-800 max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Enter a number</h2>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Your number here"
          className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:border-blue-500 transition"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-3 transition"
        >
          Calculate
        </button>
      </form>

      {/* Error Section */}
      {error && (
        <p className="bg-red-500 text-white font-semibold rounded-lg py-2 px-4 mt-4 max-w-md w-full text-center">
          {error}
        </p>
      )}

      {/* Result Section */}
      {result && (
        <div className="bg-white rounded-lg shadow-lg p-8 mt-6 text-gray-800 max-w-md w-full">
          <h3 className="text-2xl font-semibold mb-4 text-center">Results</h3>
          <p className="text-lg">
            <span className="font-bold">Square:</span> {result.square}
          </p>
          <p className="text-lg">
            <span className="font-bold">Cube:</span> {result.cube}
          </p>
          <p className="text-lg">
            <span className="font-bold">Even:</span>{' '}
            {result.isEven ? 'Yes' : 'No'}
          </p>
        </div>
      )}
    </div>
  );
}
