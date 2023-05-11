import React, { useState } from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import '../styles/nav.css';
import logo_image from '../images/logo.png';
import Auth from '../utils/auth';


const Nav = () => {

  const token = localStorage.getItem('id_token'); // get token from LS
  const isTokenValid = !(Auth.isTokenExpired(token)); // check if token is still valid
  const isLoggedIn = token!==null && isTokenValid; // if token exists AND is valid then logged in is true
  const isLoggedOut = token===null; // if token is deleted then logged out is true

  return (
    <nav className="nav">
      {/* make CANVAS and LIBRARY log in dependant.  */}
      <ul id="nav-list">
        <CustomLink className="nav-item" to="/"><img src={logo_image} id="home-image" width='20%' alt='logo with shapes text reading poly flow'/></CustomLink>
        <CustomLink className={`nav-item ${isLoggedOut ? 'disable-link' : ''}`}  to="/canvas">Canvas</CustomLink> 
        <CustomLink to="/create">sndbx</CustomLink>
        <CustomLink className={`nav-item ${isLoggedOut ? 'disable-link' : ''}`} to="/library">Library</CustomLink>
        <CustomLink className={`nav-item ${isLoggedIn ? 'disable-link' : ''}`} to="/login">Login</CustomLink>
        <CustomLink className={`nav-item ${isLoggedIn ? 'disable-link' : ''}`} to="/signup">Sign Up</CustomLink>
      </ul>
    </nav>
  );
};

const CustomLink = ({to, children, ...props}) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>{children}</Link>
    </li>
)

}

export default Nav;
