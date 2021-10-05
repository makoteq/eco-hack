import { useTitle } from "../../utils/useTitle";
import { container } from "../../global.module.scss";
import { Stack } from "react-bootstrap";
import styles from "./index.module.scss";
import { EventField } from "../../components/EventField";
import { EventType } from "../../components/EventType";

export const Event = (props) => {
    const { data } = props;
    useTitle(data.name);

    return (
        <div className={container}>
            <Stack gap={2}>
                <span className={styles.header}>
                    <p className={styles.title}>{data.name}</p>
                    <EventType style={{ display: "inline-block" }} type={data.type} />
                </span>
                {data.address && data.address !== "Brak lokalizacji" && <EventField icon="geo-alt-fill" content={data.address} />}
                <EventField icon="calendar3" content={new Date(data.time).toLocaleString(navigator.language, { dateStyle: "full", timeStyle: "short" })} />
                <p className={styles.description}>{data.description}</p>
            </Stack>
        </div>
    );
};
