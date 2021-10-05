import { useTitle } from "../../utils/useTitle";
import { container } from "../../global.module.scss";
import { Stack } from "react-bootstrap";
import styles from "./index.module.scss";
import { EventField } from "../../components/EventField";
import { EventType } from "../../components/EventType";
import { Map } from "../../components/Map";
import { fromLonLat } from "ol/proj";

export const Event = (props) => {
    const { data } = props;
    useTitle(data.name);

    return (
        <div className={container}>
            <Stack gap={2} className={styles.stack}>
                <span className={styles.header}>
                    <p className={styles.title}>{data.name}</p>
                    <EventType style={{ display: "inline-block" }} type={data.type} />
                </span>
                {data.address && data.address !== "Brak lokalizacji" && <EventField icon="geo-alt-fill" content={data.address} />}
                <EventField icon="calendar3" content={new Date(data.time).toLocaleString(navigator.language, { dateStyle: "full", timeStyle: "short" })} />
                {data.lon && data.lat && <Map blockInteraction={true} width={"100%"} height={"500px"} showMarker={true} zoom={15} center={fromLonLat([data.lon, data.lat])} />}
                {data.description && <p className={styles.description}>{data.description}</p>}
            </Stack>
        </div>
    );
};
