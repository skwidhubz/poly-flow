import React, { useState } from "react";
import '../styles/canvas.css';
import { useMutation } from "@apollo/client";
import { SAVE_DATA } from "../utils/mutations";

// react app component
const Canvas = () => {

const [circleCount, setCircleCount] = useState(1);
const [hueValue, setHueValue] = useState();
const [saveData] = useMutation(SAVE_DATA); 

const addCircleHandler = () => {
console.log('add circle');
setCircleCount(circleCount + 1);
};

const removeCircleHandler = () => {
console.log('remove circle');
setCircleCount(circleCount - 1);
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
    });
    // MAKE PAGE REFRESH ON SAVE
    document.location.reload();;
};


// return HTML page
return (
<>
    <div className="main-app-container">
        <div>
        <button id="add-circle" onClick={addCircleHandler}>+ circle</button>
        <button id="remove-circle" onClick={removeCircleHandler}>- circle</button>
        <h2 id="circle-count">{circleCount}</h2>
        </div>
        <div className="slidecontainer">
            Circle color:
            <input type="range" min="1" max="359" value={hueValue} className="slider" id="hue-range" onChange={hueChangeHandler}/>
            <h2 id="hue-output">{hueValue}</h2>
        </div>
        <button onClick={saveDataFunction}>save data</button>
    </div>
</>
)
};

export default Canvas;
