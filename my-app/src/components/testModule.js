import React, { useState, useEffect } from 'react';

export default function TestModule() {
  const [numCircles, setNumCircles] = useState(Math.floor(Math.random() * 10));
  const [timeOffset, setTimeOffset] = useState(Math.random());

  const [time, setTime] = useState(0);

  useEffect(() => {
    const update = (t) => {
      setTime(t / 1000);
      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [])

  let circles = []
  for (let i = 0; i < numCircles; i++) {
    circles.push(<circle cx={100 + (i * 10)} cy={250} r={Math.sin(time + (i * timeOffset)) * 40 + 40} stroke="white" />)
  }

  return <div>
    <svg width="500" height="500" style={{backgroundColor: '#211'}}>
      {circles}
    </svg>

    Number of circles: <input type="number" value={numCircles} onChange={(e) => setNumCircles(e.target.value)} />
    Time offset: <input type="number" value={timeOffset} onChange={(e) => setTimeOffset(e.target.value)} />

  </div>;
}
