import { Link } from "react-router-dom";
import { BIcon } from "../BIcon";
import styles from "./index.module.scss";

export const EventPreview = (props) => {
    return (
        <Link to="/" className={styles.link}>
            <div className={styles.item}>
                <span className={styles.location}>{props.name ?? "Event name"}</span> <br></br>
                <span>
                    <BIcon icon="calendar" /> {props.date ?? ""}
                </span>
            </div>
        </Link>
    );
};
