import React from 'react';
import '../styles/footer.css';
import Auth from '../utils/auth';

const Footer = () => {

    const logoutHandler = () => {
        Auth.logout();
    }

    const usernameDisp = Auth.loggedIn() ? Auth.getProfile().data.username : null

    return (
        <>
            <div className='footer-container'>
                <div className='footer-divs'>logged in as: </div>
                <div className='footer-divs'>{usernameDisp}</div>
                <br/>
                <div className='logout-div'><button onClick={logoutHandler}>logout</button></div>
            </div>
        </>
    )
}

export default Footer;