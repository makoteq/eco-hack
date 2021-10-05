import "./index.scss";
import Team from "./Animation/index.js";

import React from "react";

export const Credits = () => {
  return (
    //Icons
    <div className="credits">
      <div className="credits__icon">
        <h2>ICONS</h2>
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          Pixel perfect
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
        <br />
        <br />
        <br />
        <h2>THE ECO-MEET TEAM</h2>
        <Team />
      </div>
    </div>
  );
};
