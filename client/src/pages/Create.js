import React, { useState } from 'react';
import '../styles/create.css';


const Create = () => {

  const [isPlaying, setIsPlaying] = useState(false);

  const oscillatorEvent = () => {
  // instance of A.C (vanilla)
  const audioContext = new AudioContext();

  // create gain node with ADSR envelope
  const gainNode = audioContext.createGain();
  const attackTime = 0.1; // in seconds
  const decayTime = 0.2; // in seconds
  const sustainLevel = 0.01; // between 0 and 1
  const releaseTime = 0.1; // in seconds

  const now = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
  gainNode.gain.exponentialRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
  gainNode.gain.setValueAtTime(sustainLevel, now + attackTime + decayTime + releaseTime);
  gainNode.gain.linearRampToValueAtTime(0, now + attackTime + decayTime + releaseTime + 0.1);

  // oscillator node
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = 200; // pitch value (hertz)

  // connect the oscillator to the gain node with the ADSR envelope
  oscillator.connect(gainNode);

  // connect the gain node to the audio context destination
  gainNode.connect(audioContext.destination);

  // start osc
  oscillator.start();

  // stop osc after ADSR envelope duration
  setTimeout(() => {
    oscillator.stop();
    setIsPlaying(false);
  }, (attackTime + decayTime + releaseTime + 0.1) * 1000);

  setIsPlaying(true);
  }; // end of AC func

  return (
    <div className='create-audio-container'>
      <button className='create-button' onClick={oscillatorEvent}>{isPlaying ? 'Playing...' : 'Play Sine Wave'}</button>
    </div>
  );
};

export default Create;



