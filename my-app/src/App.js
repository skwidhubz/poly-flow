import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import testModule from './components/testModule';
// import each component
// import each components css file


// dynamic rendering of pages:
const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="App">
      {/* <Header  /> */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      {activeSection === 'home' && <Home />}
      {activeSection === 'testModule' && <testModule />}
      { /* {activeSection === 'contact' && <Contact />}
      {activeSection === 'resume' && <Resume />} */}
      {/* <Footer /> */}
    </div>
  );
};



export default App;
