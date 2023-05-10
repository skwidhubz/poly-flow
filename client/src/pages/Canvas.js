import React, { useState, useEffect } from "react";
import '../styles/canvas.css';
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_DATA } from "../utils/mutations";
import { useParams } from 'react-router-dom'
import { LOAD_DATA } from "../utils/queries";
// react app component
const Canvas = () => {

const [circleCount, setCircleCount] = useState(1); 
const [hueValue, setHueValue] = useState();
const [saveData] = useMutation(SAVE_DATA);
// useState varibales to fill with loaded LOAD_DATA
const [loadedCircles, setLoadedCircles] = useState(0);
const [loadedHue, setLoadedHue] = useState();
// oscillator func useState
const [isPlaying, setIsPlaying] = useState(false);

const { id } = useParams();
const { data } = useQuery(LOAD_DATA);


// load dataSet from USER ID:
const loadedData = data?.params.find(element => element.id === data.id);
// console.log(loadedData);
const loadedID = loadedData?._id;
// console.log(loadedID); // loaded data per userID from the library LOAD
const paramsObject = JSON.parse(loadedData.params); // parse the loaded data to access the SVG parameters
// console.log(paramsObject); // object holding the parameters loaded from the user ID
// console.log(paramsObject.circles); // circles = paramsObject.circles
// console.log(paramsObject.hue); // hue = paramsObject.hue
const circlesDB = paramsObject.circles;
const hueDB = paramsObject.hue;

//useEffect to grab incoming data and populate the params with it.
// first arg is cb func.. when internal vrs change, cb is called. 
useEffect(()=> {
    setLoadedCircles(circlesDB);
    setLoadedHue(hueDB);
}, []); // empty array exe on mount state once.


// const [saveData] = useMutation(SAVE_DATA,
//     {
//         update(cache, { data: { saveData }}) {
//           console.log(saveData);
//           cache.writeQuery({
//             query: SAVE_DATA,
//             data: { params: saveData.savedData },
//           });
//         }
//       }); 
// // save instead of delete on data object

const addCircleHandler = () => {
console.log('add circle');
setCircleCount(loadedCircles + 1);
};

const removeCircleHandler = () => {
console.log('remove circle');
setCircleCount(loadedCircles - 1);
};

const hueChangeHandler = (event) => {
console.log(event.target.value);
setHueValue(event.target.value);
};

const saveDataFunction = () => {
    let dataObj = {
        circles: circleCount, 
        hue: hueValue
    };
    localStorage.setItem('params', JSON.stringify(dataObj));
    
    saveData({ 
        variables: { Params: JSON.stringify(dataObj) } 

        // update function(?) to clear or update the cache. 
    });
    // MAKE PAGE REFRESH ON SAVE
    document.location.reload();
};

// 💾 END DATABASE FUNCTIONS 💾

// 🎮🎮🎮 BEGIN SVG GAME FUNCTIONS 🎮🎮🎮 

// OSC funcs for add or remove circle
const oscillatorEventADD = () => {
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
  }; // end of AC-add func

  const oscillatorEventREMOVE = () => {
    // instance of A.C (vanilla)
  const audioContext = new AudioContext();

  // create gain node with ADSR envelope
  const gainNode = audioContext.createGain();
  const attackTime = 0.1; // in seconds
  const decayTime = 0.1; // in seconds
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
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 50; // pitch value (hertz)

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
  }; // end of AC-remove func



// EARLY RETURN IF STATEMENT FUCTION TO DISABLE PAGE FUNCTION IF !LOGGED-IN
// console.log(data);
if (!data?.params) {
    return <p className='login-warning'>Please signup and/or login to view this page 🙏</p>
};

// return HTML page
return (
<>
    <div className="main-app-container">

    
        <div>
            {loadedID} 
        </div>
        <div>
            <svg className="canvas-svg" width="300" height="300"></svg>
        </div>
        <div>
        <button id="add-circle" onClick={addCircleHandler && oscillatorEventADD}>+ circle</button>
        <button id="remove-circle" onClick={removeCircleHandler && oscillatorEventREMOVE}>- circle</button>
        <h2 id="circle-count">Circles: {circleCount}</h2>
        </div>
        <div className="slidecontainer">
            Circle color:
            <input type="range" min="1" max="359" value={hueValue} className="slider" id="hue-range" onChange={hueChangeHandler}/>
            <h2 id="hue-output">Color: {hueValue}</h2>
        </div>
        <button id="save-data" onClick={saveDataFunction}>save data</button>

    </div>
</>
)
};

export default Canvas;
