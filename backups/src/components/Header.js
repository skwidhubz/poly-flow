import React from 'react';
import Nav from './Nav';
import '../styles/header.css';


const Header = ({ activeSection, setActiveSection }) => {
  return (
        <header className="header">
            <Nav activeSection={activeSection} setActiveSection={setActiveSection} />
        </header>
  );
};

export default Header;