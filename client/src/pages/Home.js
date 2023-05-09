import React from 'react';
import '../styles/home.css';
import logo from '../images/shapeshifter.gif';
// import { useQuery } from '@apollo/client';

const Home = () => {
    console.log('homepage rendering');


    // ?data = do nothing
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} style={{width: "10%", height: "10%", pading: "30px", margin: "100px"}} className="App-logo" alt="logo" />
          <p>
            {/* test query = {data?.message} <br/> */}
            <span className='welcome-text'>Welcome to polyFlow</span>
          </p>
          <a
            className="App-link"
            href="https://www.arnotts.com/brands/shapes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More .. 
          </a>
        </header>
      </div>
    );
  }

export default Home;

