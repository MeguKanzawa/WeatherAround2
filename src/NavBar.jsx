import React, { useState } from 'react';
import './NavBar.css';
import logo from './assets/logo.svg';
import contact from './assets/contact.svg';
import help from './assets/help.svg';
import tech from './assets/laptop.svg'
import linkedin from './assets/linkedin.svg'
import email from './assets/mail.svg'

function NavBar() {
    // opens a mini window for all three of the tabs on the top right
    const [showContact, setShowContact] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showTech, setShowTech] = useState(false);
    return (
        // the top left area: logo, not interactable
        <div className="logoBar">
            <div className="logoArea">
                <img src={logo} alt="logo" className="logo" />
                <div className="weatherAround">WeatherAround</div>
            </div>
            <div className="techArea">
                <div className="tech" onClick={() => setShowTech(true)}>
                    <img src={tech} alt="Technologies" className="techLogo" />
                    <div className="techText">Technologies</div>
                </div>
            </div>
            <div className="contactArea">
                <div className="contact" onClick={() => setShowContact(true)}>
                    <img src={contact} alt="Contact" className="contactLogo" />
                    <div className="contactMe">Contact</div>
                </div>
            </div>
            <div className = "helpArea">
                <div className="help" onClick = {() => setShowHelp(true)}>
                    <img src={help} alt="Help" className="helpLogo" />
                    <div className="helpText">Help</div>
                </div>
            </div>
            {/* interactable menus, opens a mini window using modalOverlay*/}
             {/* Tech Modal */}
            {showTech && (
                <div className="modalOverlay" onClick={() => setShowTech(false)}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <h2>Technologies Used</h2>
                        <li>Frameworks/Libraries: ReactJS, Vite, NodeJS</li>
                        <li>APIs: Leaflet API, OpenWeatherAPI</li>
                        <li>Graphics: <a href = "https://www.figma.com/@zvosh">Weather Icons</a></li>
                        <li>Other Graphics: Figma, LucidUI</li>
                        <li>Animation: Framer-Motion</li>
                        <li>Mobile friendly, Tooltips implemented</li>
                        <button onClick={() => setShowTech(false)}>CLOSE</button>
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {showContact && (
                <div className="modalOverlay" onClick={() => setShowContact(false)}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <h2>Contact Me</h2>
                        <div>
                            <a href = "mailto:megknzw@gmail.com?subject=subject text" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'0.5rem'}}>
                            <img src={email}></img>&nbsp;megknzw@gmail.com&nbsp;</a>
                        </div>
                        <div >
                            <a href="LinkedIn: https://www.linkedin.com/in/megu-kanz/" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'0.5rem'}}>
                            <img src={linkedin}></img>&nbsp;www.linkedin.com/in/megu-kanz/&nbsp;</a>
                        </div>
                        
                        <button onClick={() => setShowContact(false)}>CLOSE</button>
                    </div>
                </div>
            )}

            {/* Help Modal */}
            {showHelp && (
                <div className="modalOverlay" onClick={() => setShowHelp(false)}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <h2>How to Use</h2>
                        <ul>
                            <li>Click on a location to fetch weather data.</li>
                            <li>Weather tiles will appear on the top with animations.</li>
                            <li>You can FAVORITE any of the locations by clicking on the heart</li>
                            <li>All of your favorites will show up at the bottom of the page</li>
                        </ul>
                        <button onClick={() => setShowHelp(false)}>CLOSE</button>
                    </div>
                </div>
            )}
        </div>        
    );
}

export default NavBar;

          
          
