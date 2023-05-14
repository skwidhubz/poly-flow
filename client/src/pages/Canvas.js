import React, { useState, useEffect, useRef } from "react";
import '../styles/canvas.css';
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_DATA, UPDATE_DATA } from "../utils/mutations";
import { useParams } from 'react-router-dom'
import { LOAD_DATA } from "../utils/queries";
import { ReactSVG } from "react-svg";
import Auth from '../utils/auth';

// react app component
const Canvas = () => {

const [hueValue, setHueValue] = useState(); // current hue value
const [hueValuesArray, setHueValuesArray] = useState([]); // empty array state for HUE values 

const [saveData] = useMutation(SAVE_DATA);
const [updateData] = useMutation(UPDATE_DATA);

// useState varibales to fill with loaded LOAD_DATA
const [loadedCircles, setLoadedCircles] = useState(0);
const [loadedHue, setLoadedHue] = useState();

// oscillator func useState
const [isPlaying, setIsPlaying] = useState(false);

// TODO: The bug of circlesArray 'undefined' occurs from here onward.
//CIRCLES ARRAY
const [circlesArray, setCircles] = useState([]); // this should not throw undefined? 🐛
// console.log("circles array", circlesArray); // circlesArray is already undefined here 🐛


// useEffect(() => {
//     console.log("Circles inside UE", circlesArray);
// }, [circlesArray]);


const { id } = useParams();
const { data } = useQuery(LOAD_DATA);
console.log('raw data useQuery', data);

// load dataSet from USER ID:
const loadedData = data?.params.find(element => id === element._id);
const loadedID = loadedData?._id;
const paramsObject = JSON.parse(loadedData?.params || '{}'); // parse the loaded data to access the SVG parameters
console.log('loaded data', loadedData)

useEffect(()=>{
    console.log("UE-setCircles");
    setCircles(paramsObject?.circles || [] )
},[paramsObject.length]);


// Function to ADD-CIRCLE onClick
const addCircleHandler = () => {
// console.log('add circle');
oscillatorEventADD();
setHueValuesArray(
     [...hueValuesArray, hueValue]
);
let newCircle =  <circle cx={200} cy={200} r={15} fill={`hsl(${hueValue}, 100%, 80%)`}/>;
setCircles([...circlesArray, newCircle]) 
};

// Function to REMOVE-CIRCLE onClick
const removeCircleHandler = () => {
// console.log('remove circle');
setCircles(circlesArray?.slice(0,-1)) 
oscillatorEventREMOVE();
};

const hueChangeHandler = (event) => {
setHueValue(event.target.value);
// add the current created hue to the hue array

};

// save state of canvas function
const saveDataFunction = () => {
    console.log('saveData exe preOBJ', circlesArray);
    let dataObj = {
        params: circlesArray
    };
    console.log('saveData exe postOBJ', circlesArray);
    localStorage.setItem('params', JSON.stringify(dataObj));
    console.log(dataObj);
    saveData({ 
        variables: { Params: JSON.stringify(dataObj) } 
    })
};

// update state of canvas function
const updateDataFunction = () => {
    console.log('updateData exe');
    let dataObj = {
        params: circlesArray
    };
    console.log(dataObj);
    localStorage.setItem('params', JSON.stringify(dataObj));
    updateData({ 
        variables: { Params: JSON.stringify(dataObj) } 
    })
};

// 💾 END DATABASE FUNCTIONS 💾

// 🎮🎮🎮 BEGIN SVG GAME FUNCTIONS 🎮🎮🎮 

    // // 🧰 DOCUMENT VARIABLES 🧰
    //     const svg = document.getElementById("svg-main"); // REACTIFY
    //     const svgW = svg.getAttribute('width');
    //     const svgH = svg.getAttribute('height');

    // // 🧰 PHYSICS VARIABLES 🧰
    //     let cx;// = circleEl1.getAttribute('cx');
    //     let cy; //= circleEl1.getAttribute('cy');

    // // ⚠️ Set circle position function
    //     const setCirclePos = (circle) => {
    //     // console.log(_cx, _cy);
    //     let circleEl = circle.circleElement; // REACTIFY
    //     circleEl.setAttribute('cx', circle.pX); // REACTIFY
    //     circleEl.setAttribute('cy', circle.pY); // REACTIFY
    //     };

    //     function updatePhysics(circle){
    //     //if set velocity from slider, etc, dont have these two
    //     // vX += aX;
    //     // vY += aY;
    //     circle.pX += circle.vX;
    //     circle.pY += circle.vY;
    //     };

    // Add action for when passes boundry of SVG
        // function physicsConditions(circle){

        //     // if circle is past rhs of screen
        //     if (circle.pX >= svgW - 40) {
        //         // cx = svgW - 40;
        //         circle.vX = -Math.abs(circle.vX);
        //         //if circle is past lhs of screen
        //         } else if (circle.pX <= 40) {
        //         // cx = 40;
        //         //make sure circle isnt moving left
        //         circle.vX = Math.abs(circle.vX);
        //         };

        //     if (circle.pY >= svgH - 40) {
        //         // cy = svgH - 40;
        //         circle.vY = -Math.abs(circle.vY);
        //         } else if (circle.pY <= 40) {
        //         // cy = 40;
        //         circle.vY = Math.abs(circle.vY);
        //         };
        //         // return vY, vX;
        //     };


    // // MAIN GAME LOOP 🎮 
    //     const mainGameLoop = () => {
            
            
    //     }

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
    oscillator.frequency.value = 40; // pitch value (hertz)

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

// check if user is logged in to display page 🛡️
const authCheck = () => {
const token = localStorage.getItem('id_token'); // get token from LS
const isTokenValid = !(Auth.isTokenExpired(token)); // check if token is still valid
const isLoggedIn = token!==null && isTokenValid; // if token exists AND is valid then logged in is true
// EARLY RETURN IF STATEMENT FUCTION TO DISABLE PAGE FUNCTION IF !LOGGED-IN
if (!isLoggedIn) {
    return <p className='login-warning'>Please signup and/or login to view this page 🙏</p>
}};

authCheck();

// return HTML page
return (
<>
    <div className="main-app-container">
        <div>
            ID from server load: {loadedID} 
        </div>
        <div>
            placeholder for SVG title
        </div>
        <div className="canvas-svg-div">
            <svg className="canvas-svg" style={{backgroundColor: "white"}} width="300" height="300">
                {circlesArray}
            </svg>
        </div>
        <div>
        <button id="add-circle" onClick={addCircleHandler}>+ circle</button>
        <button id="remove-circle" onClick={removeCircleHandler}>- circle</button>
        <h2 id="circle-count">Circles: {circlesArray?.length}</h2>
        </div>
        <div className="slidecontainer">
            Circle color:
            <input type="range" min="1" max="359" value={hueValue} className="slider" id="hue-range-slider" onChange={hueChangeHandler}/>
            <h2 id="hue-output">Color: {hueValue}</h2>
        </div>
        <button id="save-data-button" onClick={saveDataFunction}>save data</button>
        <button id="update-data-button" onClick={updateDataFunction}>update data</button>
    </div>
</>
)
};

export default Canvas;
