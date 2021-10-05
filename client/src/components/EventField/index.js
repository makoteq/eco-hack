import styles from "./index.module.scss";
import { BIcon } from "../BIcon";

export const EventField = (props) => {
    return (
        <span className={styles.container}>
            <BIcon size={"20px"} icon={props.icon} /> <p className={styles.content}>{props.content}</p>
        </span>
    );
};
