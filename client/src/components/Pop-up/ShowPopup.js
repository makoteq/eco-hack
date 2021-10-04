import Popup from "./Popup.js";
import { useState, useEffect } from "react";

function ShowPopup() {
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
      setTimedPopup(true);
  }, []);

  return (
    <div className="App">
      <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Popup>
    </div>
  );
}

export default ShowPopup;
