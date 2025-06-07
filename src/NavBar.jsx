import React, { useState } from 'react';
import './NavBar.css';
import logo from './assets/logo.svg';
import contact from './assets/contact.svg';
import help from './assets/help.svg';

function NavBar() {
    return (
        <div className="logoBar">
            <div className="logoArea">
                <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="weatherAround">Weather Around You</div>
            <div className="contactHelpArea">
                <div className="contact">
                    <img src={contact} alt="Contact" className="contactLogo" />
                    <div className="contactMe">Contact Me</div>
                </div>
            </div>
            <div className="help">
                <img src={help} alt="Help" className="helpLogo" />
                <div className="helpText">Help</div>
            </div>
        </div>
    );
}

export default NavBar;

          
          
