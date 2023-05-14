import React from 'react';
import '../styles/footer.css';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { DELETE_USER_MUTATION } from '../utils/mutations';

const Footer = () => {

    const [deleteUser] = useQuery(DELETE_USER_MUTATION);
    
    const deleteUserHandler = () => {
        deleteUser();
        alert("Your user profile was deleted.");
    };
    

    const logoutHandler = () => {
        Auth.logout();
    };

    const usernameDisp = Auth.loggedIn() ? Auth.getProfile().data.username : null

    return (
        <>
            <div className='footer-container'>
                <div className="footer-group">
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