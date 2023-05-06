import React from 'react';
import '../styles/home.css'
import logo from '../images/shapeshifter.gif';
import { TEST_QUERY, TEXT_QUERY } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Home = () => {
    console.log('homepage rendering');

    const { data } = useQuery(TEST_QUERY);

    // ?data = do nothing
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} style={{width: "20%", height: "20%", pading: "30px", margin: "100px"}} className="App-logo" alt="logo" />
          <p>
            test query = {data?.message} <br/>
            Welcome to polyFlow.. where the case is camel and the shapes move slow.
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

