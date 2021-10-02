import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { EventPreview } from "../../components/EventPreview";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { getEvents } from "../../utils/api/getEvents";

export const Home = () => {
    const [events, updateEvents] = useState([]);

    useEffect(() => {
        getEvents().then((e) => updateEvents(e));
    }, []);

    return (
        <div className={styles.con}>
            <Stack gap={1}>
                {events.map((e, i) => {
                    return <EventPreview name={e.name} date={e.date} key={i} />;
                })}
                <Link to="/create" className={styles.more}>
                    utwórz wydarzenie
                </Link>
            </Stack>
        </div>
    );
};
