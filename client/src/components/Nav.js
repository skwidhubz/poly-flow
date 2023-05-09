import React, { useState } from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import '../styles/nav.css';
import logo_image from '../images/logo.png';
import Auth from '../utils/auth';


const Nav = () => {

  // const [usernameNav, setUsernameNav] = useState();
  // setUsernameNav({
  //   Auth.loggedIn({`${Auth.getProfile().data.username}`}
  //   )});

  return (
    <nav className="nav">

      <ul id="nav-list">
        <CustomLink to="/"><img src={logo_image} id="home-image" width='20%' alt='logo with shapes text reading poly flow'/></CustomLink>
        <CustomLink to="/canvas">Canvas</CustomLink>
        {/* <CustomLink to="/create">Create Poly</CustomLink> */}
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
