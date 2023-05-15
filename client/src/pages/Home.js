import React from 'react';
import '../styles/home.css';
import logo from '../images/shapeshifter.gif';
// import { useQuery } from '@apollo/client';

const Home = () => {
    console.log('homepage rendering');


    // ?data = do nothing
    
    return (
      <div className="App">
          <img src={logo} style={{width: "10%", height: "10%", pading: "30px", margin: "100px"}} className="App-logo" alt="logo" />
          <p>
            <span className='welcome-text'>Welcome to polyFlow!</span>
          </p>
          <div className='home-secret-text'>
          polyFlow 2023
          </div>
      </div>
    );
  }

export default Home;

