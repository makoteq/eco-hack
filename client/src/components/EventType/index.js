import { EVENT_TYPES } from "../../constants";
import styles from "./index.module.scss";

export const EventType = (props) => {
    const { type } = props;

    return (
        <span style={{ ...props.styles, backgroundColor: EVENT_TYPES.colors[type] ?? "#C0C0C0" }} className={styles.container}>
            {EVENT_TYPES.labels[type] ?? "Inne"}
        </span>
    );
};
