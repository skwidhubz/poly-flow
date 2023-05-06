import React from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import '../styles/nav.css';
import logo_image from '../images/logo.png';

const Nav = () => {

  return (
    <nav className="nav">

      <ul id="nav-list">
        <CustomLink to="/"><img src={logo_image} width='20%' alt='logo with shapes text reading poly flow'/></CustomLink>
        <CustomLink to="/create">Create Poly</CustomLink>
        <CustomLink to="/library">Library</CustomLink>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/signup">Sign Up</CustomLink>
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
