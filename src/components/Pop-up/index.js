import React from "react";
import "./index.scss";
import Hand from "./AnimatedHand/Hand";

export default  function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-text">
          {props.children}
          <br />
          <br />
          <br />
          <br />
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            Zaczynamy!
          </button>
          <br />
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
