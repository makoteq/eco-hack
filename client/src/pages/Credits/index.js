import React from "react";

import { ReactComponent as Person } from "../../assets/person.svg";
import { ReactComponent as Person1 } from "../../assets/person1.svg";
import { ReactComponent as Person2 } from "../../assets/person2.svg";
import "./index.scss";

export const Credits = () => {
  return (
    //Icons
    <div className="credits">
      <div className="credits__team">
        <h6>THE ECO-MEET TEAM</h6>
        <br />
        <Person />{" "}
        <a href="https://github.com/GRZ4NA" title="GRZ4NA">
          GRZ4NA
        </a>
        <br />
        <br />
        <Person1 />{" "}
        <a href="https://github.com/makoteq" title="makoteq">
          makoteq
        </a>
        <br />
        <br />
        <Person2 />{" "}
        <a href="https://github.com/drgoodcat" title="drgoodcat">
          drgoodcat
        </a>
      </div>

      <div className="credits__icon">
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
      </div>
    </div>
  );
};
