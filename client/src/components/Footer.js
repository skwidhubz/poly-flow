import React from 'react';
import '../styles/footer.css';
import Auth from '../utils/auth';

const Footer = () => {

    
    const deleteUserHandler = () => {
        // insert delete mutation
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