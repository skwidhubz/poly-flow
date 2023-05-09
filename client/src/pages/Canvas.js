import React, { useState, useEffect } from "react";
import '../styles/canvas.css';
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_DATA } from "../utils/mutations";
import { useParams } from 'react-router-dom'
import { LOAD_DATA } from "../utils/queries";
// react app component
const Canvas = () => {

const { id } = useParams();
const { data } = useQuery(LOAD_DATA);
const loadedData = data?.params.find(element => element.id === data.id);
console.log(loadedData);
const loadedID = loadedData?._id;
console.log(loadedID);
// const [testVar, setTestVar] = useState("");

//useEffect to grab incoming data and populate the params with it.
useEffect(()=> {

}, []);

const [circleCount, setCircleCount] = useState(1); 
// pull data from ID with ROUTE parameter... 
//  use ID in query to find certain data and populate. 
const [hueValue, setHueValue] = useState();
const [saveData] = useMutation(SAVE_DATA);

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

        // update function(?) to clear or update the cache. 
    });
    // MAKE PAGE REFRESH ON SAVE
    document.location.reload();
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
        <button id="add-circle" onClick={addCircleHandler}>+ circle</button>
        <button id="remove-circle" onClick={removeCircleHandler}>- circle</button>
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
