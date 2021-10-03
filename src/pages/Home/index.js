import { useState, useRef, useEffect, useContext } from "react";
import { Stack } from "react-bootstrap";
import { EventPreview } from "../../components/EventPreview";
import styles from "./index.module.scss";
import { BIcon } from "../../components/BIcon";
import { EVENT_CONTEXT } from "../../constants";
import { useHistory } from "react-router";
import Button from "@restart/ui/esm/Button";

export const Home = () => {
    const events = useContext(EVENT_CONTEXT);
    const [list, updateList] = useState(events.events);
    const sortDropdown = useRef(null);

    useEffect(() => {
        sortDropdown.current.addEventListener("input", (e) => {
            const value = e.target.value;
            const type = value.split(":")[0];
            const direction = value.split(":")[1];
            const newOrder = list.sort((a, b) => {
                switch (type) {
                    case "event-date":
                        const aDate = new Date(a.date);
                        const bDate = new Date(b.date);
                        return direction === "ascending" ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
                    case "creation-date":
                        return 0;
                    case "alphabetic":
                        return direction === "ascending" ? a.name > b.name : a.name < b.name;
                    case "distance":
                        return 0;
                    default:
                        return 0;
                }
            });
            updateList(newOrder);
        });
    }, [list]);

    const history = useHistory();

    return (
        <div className={styles.con}>
            <Stack gap={1}>
                <Stack gap={2} direction={"horizontal"} className={styles.sortDropdown}>
                    <p className={styles.label}>
                        <BIcon icon="sort-down-alt" /> Sortuj według
                    </p>
                    <select ref={sortDropdown} className={styles.sortDropdownMenu}>
                        <option value="event-date:ascending">Data wydarzenia: rosnąco</option>
                        <option value="event-date:descending">Data wydarzenia: malejąco</option>
                        <option value="creation-date:ascending">Data utworzenia: rosnąco</option>
                        <option value="creation-date:descending">Data utworzenia: malejąco</option>
                        <option value="alphabetic:ascending">Alfabetycznie: rosnąco</option>
                        <option value="alphabetic:descending">Alfabetycznie: malejąco</option>
                        <option value="distance:ascending">Odległość: rosnąco</option>
                        <option value="distance:descending">Odległość: malejąco</option>
                    </select>
                    <Button
                        onClick={() => {
                            history.push("/create");
                        }}
                        className={styles.create}
                    >
                        <BIcon icon="plus" />
                        Utwórz wydarzenie
                    </Button>
                </Stack>
                {list.map((e, i) => {
                    return <EventPreview name={e.name} type={e.type} createdTime={e.created.time} date={e.date} id={e._id} key={i} />;
                })}
            </Stack>
        </div>
    );
};
