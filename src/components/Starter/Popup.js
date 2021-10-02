import React from "react";
import "./Popup.css";
import Hand from "./AnimatedHand/Hand";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-text">
          {props.children}
          <br />
          <br />
          <br />
          <br />
          <br />
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            Zaczynamy!
          </button>
          <br />
          <br />
        </div>
        <div className="Animation">
          <Hand></Hand>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
