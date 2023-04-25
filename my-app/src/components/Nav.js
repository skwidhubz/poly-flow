import React from 'react';
import '../styles/nav.css';
import logo_image from '../images/logo.png';

const Nav = ({ activeSection, setActiveSection }) => {
  const navigateTo = (section) => {
    setActiveSection(section);
  };

  return (
    <nav className="nav">
        
      <ul id="nav-list">
      <li className={activeSection === 'home' ? 'home' : ''} onClick={() => navigateTo('home')}><img src={logo_image} width='20%' alt='logo with shapes text reading poly flow'/></li>
        <li className={activeSection === 'create' ? 'active' : ''} onClick={() => navigateTo('create')}>Create</li>
        <li className={activeSection === 'test-modules' ? 'test-modules' : ''} onClick={() => navigateTo('test-modules')}>TestModules</li>
        <li className={activeSection === 'save' ? 'active' : ''} onClick={() => navigateTo('save')}>Save</li>
        <li className={activeSection === 'library' ? 'active' : ''} onClick={() => navigateTo('library')}>Library</li>
        <li className={activeSection === 'login' ? 'active' : ''} onClick={() => navigateTo('login')}>Login/Signup</li>
        <li className={activeSection === 'why' ? 'why' : ''} onClick={() => navigateTo('why')}>Why</li>
      </ul>
    </nav>
  );
};

export default Nav;
