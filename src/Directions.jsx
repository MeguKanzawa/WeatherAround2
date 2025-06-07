import React, { useState } from 'react';
import './Directions.css';
import pin from './assets/pin.svg';

function Directions() {
    return (
        <div className = "directions">
            <img src={pin} alt="Pin" className="pinImg" />
            <div className="addPinText">
                Add a  <span className = "pinText">&nbsp;pin&nbsp;</span> to a location
            </div>
        </div>
    );
}

export default Directions;

          
          