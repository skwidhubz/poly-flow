import React, { useState } from 'react';
import '../styles/create.css';


const Create = () => {

  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    // Create a new AudioContext
    const audioContext = new AudioContext();

    // Create an OscillatorNode (a source of audio)
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 440; // set frequency to 440Hz (A4)

    // Connect the oscillator to the audioContext's destination
    oscillator.connect(audioContext.destination);

    // Start the oscillator
    oscillator.start();

    // Stop the oscillator after 1 second
    setTimeout(() => {
      oscillator.stop();
      setIsPlaying(false);
    }, 1000);

    setIsPlaying(true);
  }

  return (
    <div>
      <button onClick={handleClick}>{isPlaying ? 'Playing...' : 'Play Sine Wave'}</button>
    </div>
  );
};

export default Create;



