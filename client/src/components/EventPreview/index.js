import { Link } from "react-router-dom";
import { BIcon } from "../BIcon";
import styles from "./index.module.scss";
import React, { useState, useEffect } from "react";
export const EventPreview = (props) => {
    const [label, setLabel] = useState("");
    const [color, setColor] = useState("white");
    useEffect(() => {
        switch (props.data.type) {
            case 1:
                setColor("#53d188");
                setLabel("sadzenie drzew");
                break;
            case 2:
                setColor("#FBBEBE");
                setLabel("zbieranie śmieci");
                break;
            case 3:
                setColor("#FFFF99");
                setLabel("happening/meeting");
                break;
            case 4:
                setColor("#C0C0C0");
                setLabel("inne");
                break;
            default:
                break;
        }
    }, [label, color, props.data.type, props.data.time]);
    const getDate = (time) => {
        let date = new Date(time);
        return date.toLocaleDateString(navigator.language);
    };
    const getTime = (time) => {
        let date = new Date(time);
        return date.toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    return (
        <Link to={`/event/${props.data.id}`} className={styles.link}>
            <div className={styles.item}>
                <span className={styles.name}>{props.data.name ?? "Event name"}</span> <br></br>
                <div className="d-flex justify-content-between align-items-center ">
                    <span className={styles.time}>
                        <BIcon icon="calendar" /> {`${getDate(props.data.time)} ${getTime(props.data.time)}` ?? ""}
                    </span>
                    <span className={styles.location}>
                        <BIcon icon="geo-alt-fill" /> {props.data.address?.split(", ").splice(0, 2).join(", ")}
                    </span>
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                    <div style={{ background: color }} className={styles.block}>
                        {label}
                    </div>
                    <span className={styles.createdSpan}>
                        utworzone {getDate(props.data.createdTime)} o godzinie {getTime(props.data.createdTime)}
                    </span>
                </div>
            </div>
        </Link>
    );
};
