import { useState, useEffect, useRef } from "react";
import { Stack } from "react-bootstrap";
import { EventPreview } from "../../components/EventPreview";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { BIcon } from "../../components/BIcon";

export const Home = () => {
    const [events, updateEvents] = useState([]);
    const sortDropdown = useRef();

    return (
        <div className={styles.con}>
            <Stack gap={1}>
                <Stack gap={2} direction={"horizontal"} className={styles.sortDropdown}>
                    <p className={styles.label}>
                        <BIcon icon="sort-down-alt" /> Sortuj według
                    </p>
                    <select ref={sortDropdown}>
                        <option value="event-date:ascending">Data wydarzenia: rosnąco</option>
                        <option value="event-date:descending">Data wydarzenia: malejąco</option>
                        <option value="creation-date:ascending">Data utworzenia: rosnąco</option>
                        <option value="creation-date:descending">Data utworzenia: malejąco</option>
                        <option value="alphabetic:ascending">Alfabetycznie: rosnąco</option>
                        <option value="alphabetic:descending">Alfabetycznie: malejąco</option>
                        <option value="distance:ascending">Odległość: rosnąco</option>
                        <option value="distance:descending">Odległość: malejąco</option>
                    </select>
                </Stack>
                {/* {events.map((e, i) => {
                    return <EventPreview name={e.name} date={e.date} key={i} />;
                })} */}
                <Link to="/create" className={styles.more}>
                    utwórz wydarzenie
                </Link>
            </Stack>
        </div>
    );
};
