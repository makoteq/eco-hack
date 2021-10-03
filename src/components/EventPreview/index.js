import { Link } from "react-router-dom";
import { BIcon } from "../BIcon";
import styles from "./index.module.scss";
import React, { useState, useEffect } from "react";
import {orangeColor} from "../../index.scss";
export const EventPreview = (props) => {
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("white");
  useEffect(() => {
    console.log(orangeColor) //nie działa :((
    switch (props.type) {
      case 1:
        setColor("green");
        break;
      case 2:
        setColor("red");
        break;
      default:
    }
}, [label,color,props.type]);
  return (
    <Link to={`/event/${props.id}`} className={styles.link}>
      <div className={styles.item}>
        <span className={styles.location}>{props.name ?? "Event name"}</span>{" "}
        <br></br>
        <span className={styles.time}>
          <BIcon icon="calendar" /> {props.date ?? ""}
        </span>{" "}
        <br></br>
        <div style={{ background: color }} className={styles.block}>
          {label}
        </div>
      </div>
    </Link>
  );
};
