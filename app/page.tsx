'use client';

import { useState } from 'react';

export default function Home() {
  const [phrase, setPhrase] = useState('');

  const generatePhrase = async () => {
    const response = await fetch('/api/generatePhrase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      console.error('Error al generar la frase:', response.statusText);
      return;
    }

    const data = await response.json();
    setPhrase(data.phrase);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-10  shadow-xl rounded-xl max-w-lg">
        <h1 className="text-4xl font-bold mb-6">Random Phrase Generator</h1>
        <p className="text-xl mb-6">{phrase || 'Click the button to generate a phrase.'}</p>
        <button
          onClick={generatePhrase}
          className="px-8 py-4 bg-black rounded-full text-white"
        >
          Generate Phrase
        </button>
      </div>
    </div>
  );
}