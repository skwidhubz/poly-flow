import React from 'react';
import '../styles/why.css'

const Why = () => {

    const [numCircles, setNumCircles] = React.useState(Math.floor(Math.random() * 10));
    const [timeOffset, setTimeOffset] = React.useState(Math.random());
    const [colorChoice, setColorChoice] = React.useState('red');
    // const [circleRadius, setCircleRadius] = React.useState(Math.floor(Math.random() * 5))
    // const bgcolor = [ // background colour array for svg canvas
    //     "green",
    //     "blue",
    //     "yellow",
    //     "red",
    //     "purple"
    // ];
    

    const [time, setTime] = React.useState(0);

    React.useEffect(() => {
      const update = (t) => {
        setTime(t / 1000);
        requestAnimationFrame(update);
      }
  
      requestAnimationFrame(update);
    }, []);

    let circles = []
    for (let i = 0; i < numCircles; i++) {
      circles.push(<circle cx={100 + (i * 10)} cy={250} r={Math.sin(time + (i * timeOffset)) * 40 + 40} stroke="white" />)
    };

    const chooseColor = (e) => {
        var setColorChoice = e.target.value
        return colorChoice;
    }


    return (
        <div id='main-container'>
            hello..
            <h1>My first SVG</h1>
                <div id='svg-container'>
                <svg width="500" height="500" onChange={chooseColor()} style={{backgroundColor: {setColorChoice}}} >
                {circles}
                </svg>

                    {/* <svg  width="500" height="500">
                    <circle cx="50" cy="50" r={setCircleRadius(circleRadius * (time / 100))} stroke="green" strokeWidth="4" fill="yellow" />
                    <rect x="100" y="200" width="150" height="150" stroke='blue' strokeWidth="3" fill="green" />
                    </svg> */}
                </div>
                <div>
                    <label for="colors">Choose a color:</label>
                        <select id="colors" name="colors">
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="orange">Orange</option>
                        </select>
                </div>

        
        </div>
    )
}

export default Why;

