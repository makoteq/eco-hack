import axios from "axios";
import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { EventPreview } from "../../components/EventPreview";
import styles from "./index.module.scss";
import { BACKEND_URL } from "../../constants";

export const Home = () => {
    const [events, updateEvents] = useState([]);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/getEvents`)
            .then((res) => {
                if (res.status !== 200) throw new Error(`Request failed with code ${res.status}: ${res.statusText}`);
                updateEvents(res.data);
            })
            .catch((e) => {
                console.error(`Failed to fetch events. ${e}`);
            });
    }, []);

    return (
        <div className={styles.con}>
            <Stack gap={1}>
                {events.map((e, i) => {
                    return <EventPreview name={e.name} date={e.date} key={i} />;
                })}
                <p className={styles.more}>więcej</p>
            </Stack>
        </div>
    );
};
