import React, { useState, useEffect, useRef } from "react";
import '../styles/canvas.css';
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_DATA, UPDATE_DATA } from "../utils/mutations";
import { useParams } from 'react-router-dom'
import { LOAD_DATA } from "../utils/queries";
import Auth from '../utils/auth';
// import * as d3 from "d3";


// react app component
const Canvas = () => {

const [hueValue, setHueValue] = useState(); // current hue value
const [hueValuesArray, setHueValuesArray] = useState([]); // empty array state for HUE values 

const [saveData] = useMutation(SAVE_DATA);
const [updateData] = useMutation(UPDATE_DATA);

// oscillator func useState
const [isPlaying, setIsPlaying] = useState(false);

//CIRCLES ARRAY
const [circlesArray, setCircles] = useState([]); 
const [circlesKeyProp, setCirclesKeyProp] = useState(1);
const [cX, setCx] = useState(10);
const [cY, setCy] = useState(20);

const { id } = useParams();
const { data } = useQuery(LOAD_DATA);

// load dataSet from USER ID:
const loadedData = data?.params.find(element => id === element._id);
const loadedID = loadedData?._id;
const paramsObject = JSON.parse(loadedData?.params || '{}'); // parse the loaded data to access the SVG parameters
// console.log('loaded data', loadedData)

useEffect(()=>{
    // console.log("UE-setCircles");
    setCircles(paramsObject?.circles || [] )
},[]); // on mount, load circles from library or set circles array as empty array

function randomValueBetween(min,max, rounded = false){
    const dif = max-min;
    let value = min + dif * Math.random();
    if(rounded){
        value = Math.round(value);
    }
    return value;
    };

// Function to ADD-CIRCLE onClick. Assigns random cX & pX to new circle element.
const addCircleHandler = (circle) => {
oscillatorEventADD();
setCirclesKeyProp(
    circlesKeyProp+1)
setHueValuesArray(
     [...hueValuesArray, hueValue]
);
console.log("cX", cX, "cY", cY);
setCx(randomValueBetween(20, 280));
setCy(randomValueBetween(20, 280));
console.log("cX", cX, "cY", cY);
let newCircle =  <circle key={circlesKeyProp} cx={cX} cy={cY} r={20} fill={`hsl(${hueValue}, 100%, 80%)`}/>;
setCircles([...circlesArray, newCircle]);
};


// Function to REMOVE-CIRCLE onClick
const removeCircleHandler = () => {
setCircles(circlesArray?.slice(0,-1)) 
oscillatorEventREMOVE();
};

const hueChangeHandler = (event) => {
setHueValue(event.target.value);
};

// save state of canvas function
const saveDataFunction = () => {
    let dataObj = {
        params: circlesArray
    };
    saveData({ 
        variables: { Params: JSON.stringify(dataObj) } 
    })
};

// update state of canvas function
const updateDataFunction = () => {
    let dataObj = {
        _id: loadedID,
        params: circlesArray
    };
    updateData({ 
        variables: { Params: JSON.stringify(dataObj) } 
        // add variable as ID
    })
};

// 💾 END DATABASE FUNCTIONS 💾

// 🎮🎮🎮 BEGIN SVG GAME FUNCTIONS 🎮🎮🎮 

    // 🧰 DOCUMENT VARIABLES 🧰
        // const svgW = 300; // SVG Width
        // const svgH = 300; // SVG Height

    // 🧰 PHYSICS VARIABLES 🧰
        // const [pX, setPx] = useState(Math.random()* 150)
        // const [pY, setPy] = useState(Math.random()* 200)
        // const [vX, setVx] = useState(1);
        // const [vY, setVy] = useState(2);

        // function updatePhysics(){ //legacy physics function

        // setPx(pX + 1);
        // setPy(pY + 1.5);
        // };

    // Add action for when passes boundry of SVG
        // function physicsConditions(){

        //     if (pX >= svgW - 40) {
        //         setVx( -Math.abs(vX));
        //         } else if (pX <= 40) {
        //         setVx( Math.abs(vX));
        //         };

        //     if (pY >= svgH - 40) {
        //         setVy( -Math.abs(vY));
        //         } else if (pY <= 40) {
        //         setVy( Math.abs(vY));
        //         };
        //     };

// const [time, setTime] = useState();
// const [spanTestText, setSpanTestText] = useState(0);

// useEffect(() => {
//     setSpanTestText(spanTestText + 1)
// },[time]);


// const timerFunction = () => {
//     console.log("starting timer")
//     setInterval(() => {
//         setTime(time + 1);
//         console.log('interval 500ms');
//     }, 1000);
// };
// timerFunction();

// start game loop timer on mount
    // useEffect(() => {
    //     const t = d3.timer()
    //     console.log('use effect main');
    //     setPx(pX + 1);
    //     setPy(pY + 1.5);
    //     if (pX >= svgW - 40) {
    //         setVx( -Math.abs(vX));
    //         } else if (pX <= 40) {
    //         setVx( Math.abs(vX));
    //         };

    //     if (pY >= svgH - 40) {
    //         setVy( -Math.abs(vY));
    //         } else if (pY <= 40) {
    //         setVy( Math.abs(vY));
    //         };
        
    //     return () => t.stop()
    // },[time])

    // setTimeout(time, 60);

  
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
    oscillator.type = 'triangle';
    oscillator.frequency.value = 220; // pitch value (hertz)

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
           {/* <p className="canvas-loaded-id">💾 loadedDataID : {loadedID} </p>  */}
        </div>
        <div>
            {/* <span className="span-tester">UEtest inc. : N/a</span> */}
        </div>
        <div className="canvas-svg-div">
            <svg className="canvas-svg" id="svg-main" style={{backgroundColor: "white"}} width="350" height="350">
                {circlesArray}
            </svg>
        </div>
        <div>
        <button id="add-circle" onClick={addCircleHandler}>➕</button>
        <button id="remove-circle" onClick={removeCircleHandler}>➖</button>
        {/* <h2 id="circle-count">Circles: {circlesArray?.length}</h2> */}
        </div>
        <div className="slidecontainer">
            {/* Circle color: */}
            <input type="range" min="1" max="359" value={hueValue} className="slider" id="hue-range-slider" onChange={hueChangeHandler}/>
            <div className="canvas-hue-display" style={{backgroundColor: `hsl(${hueValue}, 100%, 80%)`, padding: "20px"}}></div>
            {/* <h2 id="hue-output">Color: {hueValue}</h2> */}
        </div>
        <button id="save-data-button" onClick={saveDataFunction}>save data</button>
        <button id="update-data-button" onClick={updateDataFunction}>update data</button>
    </div>
</>
)
};

export default Canvas;
