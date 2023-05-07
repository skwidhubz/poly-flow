import React from "react";
import '../styles/canvas.css';

// poly script
// ⚠️= critical program infrastructure.
        // 🧪 = testing/experimental components.
        // 🧰 = global variables/constants
        // 🐛 = bug/notes.

        console.log('script executed');        


        // 🧰 DOCUMENT VARIABLES 🧰
        // const circleEl1 = document.getElementById("circle1");
        const velInc = document.getElementById("vUp");
        const velDec = document.getElementById("vDown");
        const svg = document.getElementById("svg-main");
        const svgW = svg.getAttribute('width');
        const svgH = svg.getAttribute('height');
        let screenLog = document.getElementById("logger");
        let velLog = document.getElementById("velLog");
        const addCircleButton = document.getElementById("add-circle");
        const removeCircleButton = document.getElementById("remove-circle");
        // SLIDER DOM VARS AND GLOBAL VARS
        let hueSlider = document.getElementById("hue-range");
        let outputHue = document.getElementById("hue-output");
        let hueRange;


        // 🧰 PHYSICS VARIABLES 🧰
        let cx;// = circleEl1.getAttribute('cx');
        let cy; //= circleEl1.getAttribute('cy');
        var t = 0;
        let mouseX;
        let mouseY;
        // let circle; // make extra param to treat all cirlces as one to engage FOR 

        // Display the default color slider values
        outputHue.innerHTML = hueSlider.value;

        // Colour sliders event handler & functions

        // HUE SLIDER
        hueSlider.oninput = function() {
        outputHue.innerHTML = this.value;
        hueRange = this.value;
        console.log(this.value);
        };

        // ⚠️ Set circle position function
        const setCirclePos = (circle) => {
            // console.log(_cx, _cy);
            let circleEl = circle.circleElement;
            circleEl.setAttribute('cx', circle.pX);
            circleEl.setAttribute('cy', circle.pY);
        };

        // ⚠️ PHYSICS PARAMETERS AND PROPERTYS ⚠️
        //position
        // const circleParams = {
        //     pX: 250,
        //     pY: 250,
        //     vX: 1, 
        //     vY: 2,
            // aX: ,
            // aY // (keep as zero for now)
        // }

        // let pX = 250, pY = 250;
        // //velocity
        // let vX = 1, vY = 2;
        // //acceleration
        // let aX, aY; // (keep as zero for now)

        // display default velocity values
        // velLog.innerHTML = `
        //         velocityX: ${circle.vX}
        //         velocityY: ${circle.vY}`;

        // updates velocity/position thru main time loop. 
        function updatePhysics(circle){
            //if set velocity from slider, etc, dont have these two
            // vX += aX;
            // vY += aY;
            circle.pX += circle.vX;
            circle.pY += circle.vY;
        };

        const velocityIncrease = (circle) => {
            circle.vY*=1.5;
            circle.vX*=1.5;
            console.log(circle.vX, circle.vY);
            velLog.innerHTML = `
                velocityX: ${circle.vX}
                velocityY: ${circle.vY}`;

        };
        const velocityDecrease = (circle) => {
            circle.vX/=1.5;
            circle.vY/=1.5;
            console.log(circle.vX, circle.vY);
            velLog.innerHTML = `
                velocityX: ${circle.vX}
                velocityY: ${circle.vY}`;
        }

        // event handlers for velocity increase & decrease
        velInc.addEventListener("click", velocityIncrease)
        velDec.addEventListener("click", velocityDecrease)

        // Add action for when passes boundry of SVG
        function physicsConditions(circle){

            // if circle is past rhs of screen
            if (circle.pX >= svgW - 40) {
                // cx = svgW - 40;
                circle.vX = -Math.abs(circle.vX);
                //if circle is past lhs of screen
                } else if (circle.pX <= 40) {
                // cx = 40;
                //make sure circle isnt moving left
                circle.vX = Math.abs(circle.vX);
                };

            if (circle.pY >= svgH - 40) {
                // cy = svgH - 40;
                circle.vY = -Math.abs(circle.vY);
                } else if (circle.pY <= 40) {
                // cy = 40;
                circle.vY = Math.abs(circle.vY);
                };
            // return vY, vX;
        };


        // 🧪 !!EXPERIEMENT!! 🧪
        // circleManager

        // array for amount of circles 
        circlesArray = [];
        

        const circleManager = (circle) => {
        
        // event handlers to add / remove circles
        addCircleButton.addEventListener("click", addCircle);
        removeCircleButton.addEventListener("click", removeCircle);


        // TODO: add FOR loop: dynamic change of velocity and class/color change.
        function addCircle () {

            let circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");

            const circleObject = {
            circleElement: circleEl,
            pX: Math.random()* 200, // default 250
            pY: Math.random()* 200, // default 250
            vX: 1, 
            vY: 2,
            };

            circlesArray.push(circleObject);

            circleEl.setAttribute("cx", circleObject.pX);
            circleEl.setAttribute("cy", circleObject.pY);
            circleEl.setAttribute("r", 40);
            circleEl.setAttribute("id", "circle-1");
            // this IF chain is not working atm 
            // if (redRange === 50 !== greenRange == 50 !== blueRange === 50){
            //     circleEl.setAttribute("style", "fill: rgba(0, 255, 39, 0.2);")
            // } else if (greenRange == 50 !== blueRange === 50) {
            // circleEl.setAttribute("style", "fill:rgba(" + redRange + ",255, 39, 0.2);");
            // } else if (redRange == 50 !== blueRange === 50) {
            // circleEl.setAttribute("style", "fill: rgba(0, " + greenRange + ", 39, 0.2);")
            // } else if (redRange == 50 !== greenRange === 50) {
            // circleEl.setAttribute("style", "fill: rgba(0, 255, " + blueRange +", 0.2);")
            // } else {          
            // circleEl.setAttribute("style", "fill:rgba(" + redRange + "," + greenRange + "," + blueRange + "," + "0.2);");
            // };
            circleEl.setAttribute("style", "fill:hsl(" + hueRange +", 100%, 80%);");
            console.log(circleEl);

            svg.appendChild(circleEl);
        };
    
        function removeCircle () {
            let circleEl = document.getElementById("circle-element");
            svg.removeChild(circleEl);
            // circlesArray.pop();
            // if (svg.hasChildNodes == true){
            //     let circleEl = document.getElementById("circle-element");
            //     svg.removeChild(circleEl);
            // } else {
            //     console.error("no child nodes");
            // }
            
        };
        }; // end circleDOM function

        circleManager();
        
        // ⚠️ MAIN TIME LOOP TO RUN SVG APPLICATION ⚠️
        const mainLoop = () => {
            // t++;
            // cx = mouseX;
            // cy = mouseY;

            for (let i = 0; i < circlesArray.length; i++) {
                const element = circlesArray[i];
                let circle = circlesArray[i];   
                physicsConditions(circle);
                updatePhysics(circle);
                setCirclePos(circle);
            };
            
            requestAnimationFrame(mainLoop);
        };


        function logKey(e) {
            screenLog.innerText = `
                Screen X/Y: ${e.screenX}, ${e.screenY}
                Client X/Y: ${e.clientX}, ${e.clientY}`;
                // mouseX = e.clientX;
                // mouseY = e.clientY;
            };

        document.addEventListener("mousemove", logKey);

        requestAnimationFrame(mainLoop);

// react app component
const Canvas = () => {
return (
<>
<div id="svg-container">
        <svg id="svg-main" width="500" height="500">
            {/* <!-- <circle id="circle1" cx="50" cy="250" r="40"/> --> */}
        </svg>
    </div>
    <br/>
    <div>
        <button id="add-circle">+ circle</button>
        <button id="remove-circle">- circle</button>
    </div><br/>
        <div class="slidecontainer">
            Circle color:
            <input type="range" min="1" max="359" value="100" class="slider" id="hue-range"/>
            <h4 id="hue-output"></h4>
        </div>
    <div>
        <button id="vUp">velocity increase</button>
        <button id="vDown">velocity decrease</button>
    </div>
    <div>
        <h4 id="logger"></h4>
        <h4 id="velLog"></h4>
    </div>
</>
)
};

export default Canvas;
