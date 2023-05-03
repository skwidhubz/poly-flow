import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
// import Header from './components/Header';
import TestModules from './components/TestModules';
import Nav from './components/Nav';
import Why from './components/Why';
// import each component
// import each components css file


// dynamic rendering of pages:
const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="App">
      {/* <Header  /> */}
      <Nav activeSection={activeSection} setActiveSection={setActiveSection} />
      {activeSection === 'home' && <Home />}
      {activeSection === 'test-module' && <TestModules />}
      {activeSection === 'why' && <Why />}
      {/*activeSection === 'resume' && <Resume />} */}
      {/* <Footer /> */}
    </div>
  );
};



export default App;
