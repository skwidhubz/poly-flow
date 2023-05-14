import React from 'react';
import '../styles/footer.css';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_USER_MUTATION } from '../utils/mutations';

const Footer = () => {

    const [deleteUser] = useMutation(DELETE_USER_MUTATION);
    
    const deleteUserHandler = () => {
        deleteUser(); // mutation to delete from DB
        alert("Your user profile was deleted."); 
        Auth.logout(); // delete JWT token and redirect to root path
    };
    
    const logoutHandler = () => {
        Auth.logout(); // logout delete token
    };

    // check if user is logged in to display page 🛡️  
    const authCheck = () => {
    const token = localStorage.getItem('id_token'); // get token from LS
    const isTokenValid = !(Auth.isTokenExpired(token)); // check if token is still valid
    const isLoggedIn = token!==null && isTokenValid; // if token exists AND is valid then logged in is true
    // EARLY RETURN IF STATEMENT FUCTION TO DISABLE PAGE FUNCTION IF !LOGGED-IN
    if (!isLoggedIn) {
        return <p className='login-warning'>Please signup and/or login to view this page 🙏</p>
    }};
    
    authCheck();

    const usernameDisp = Auth.loggedIn() ? Auth.getProfile().data.username : null
    const token = localStorage.getItem('id_token'); // get token from LS
    const isTokenValid = !(Auth.isTokenExpired(token)); // check if token is still valid
    const isLoggedIn = token!==null && isTokenValid; // if token exists AND is valid then logged in is true
    const isLoggedOut = token===null; // if token is deleted then logged out is true

    return (
        <>
            <div className='footer-container'>
                <div className={`footer-item ${!isLoggedIn ? 'disable-link' : ''}`}>
                <div className='footer-divs'>logged in as: </div>
                <div className='footer-divs'>{usernameDisp}</div>
                <div className='logout-div'><button onClick={logoutHandler}>logout</button></div>
                <div className='delete-user-div'><button onClick={deleteUserHandler}>delete account</button></div>
                </div>
                <br/>

            </div>
        </>
    )
}

export default Footer;