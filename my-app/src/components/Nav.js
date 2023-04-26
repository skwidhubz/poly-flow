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
        <li><img src={logo_image} width='20%' alt='logo with shapes text reading poly flow'/></li>
        <li className={activeSection === 'create' ? 'active' : ''} onClick={() => navigateTo('create')}>Create</li>
        <li className={activeSection === 'save' ? 'active' : ''} onClick={() => navigateTo('save')}>Save</li>
        <li className={activeSection === 'library' ? 'active' : ''} onClick={() => navigateTo('library')}>Library</li>
        <li className={activeSection === 'login' ? 'active' : ''} onClick={() => navigateTo('login')}>Login/Signup</li>
        <li className={activeSection === 'test-module' ? 'test-module' : ''} onClick={() => navigateTo('test-module')}>TestModule</li>
      </ul>
    </nav>
  );
};

export default Nav;
