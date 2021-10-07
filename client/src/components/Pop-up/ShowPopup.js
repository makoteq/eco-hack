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
          Ta platforma powstała na rzecz ochrony i ratowania środowiska naszej
          planety oraz pokazanie, że akcje ekologiczne mogą być ciekawe i pewnym
          sposobem rozrywki. Życzymy ci ciekawie spędzonego czasu na naszej
          platformie i miłych wrażeń.
        </p>
      </Popup>
    </div>
  );
}

export default ShowPopup;
