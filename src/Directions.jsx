import React from 'react';
import './Directions.css';
import pin from './assets/pin.svg';

// includes components of Directions + degrees conversion function
function Directions({ isFahrenheit, toggleTempUnit }) {
  return (
    <div className="directions">
      <div className="addPinText">
        <img src={pin} alt="Pin" className="pinImg" />
        Add a <span className="pinText">&nbsp;pin&nbsp;</span> to a location
      </div>
      <button
        onClick={toggleTempUnit}
        className="temp-toggle-btn"
      >
        Switch to {isFahrenheit ? '℃' : '℉'}
      </button>
    </div>
  );
}

export default Directions;
