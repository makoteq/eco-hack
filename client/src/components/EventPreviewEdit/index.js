import { Link } from "react-router-dom";
import { BIcon } from "../BIcon";
import styles from "./index.module.scss";
import { EventType } from "../EventType";
export const EventPreviewEdit = (props) => {
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
                    <EventType type={props.data.type} />
                    <span className={styles.createdSpan}>
                        utworzone {getDate(props.data.createdTime)} o godzinie {getTime(props.data.createdTime)}
                    </span>
                </div>
            </div>
        </Link>
    );
};
