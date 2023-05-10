import React, { useState } from 'react';
import '../styles/create.css';


const Create = () => {

  const [isPlaying, setIsPlaying] = useState(false);

  const oscillatorEvent = () => {
    // instance of A.C (vanilla)
    const audioContext = new AudioContext();

    // oscillator node
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 250; // pitch value (hertz)

    // Connect the oscillator to the audioContext
    oscillator.connect(audioContext.destination);

    // start osc
    oscillator.start();

    // stop osc after 50ms
    setTimeout(() => {
      oscillator.stop();
      setIsPlaying(false);
    }, 50);

    setIsPlaying(true);
  }; // end of AC func

  return (
    <div className='create-audio-container'>
      <button className='create-button' onClick={oscillatorEvent}>{isPlaying ? 'Playing...' : 'Play Sine Wave'}</button>
    </div>
  );
};

export default Create;



