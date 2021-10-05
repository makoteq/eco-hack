import { useTitle } from "../../utils/useTitle";
import { useState, useRef, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { EventPreview } from "../../components/EventPreview";
import { container } from "../../global.module.scss";
import styles from "./index.module.scss";
import { BIcon } from "../../components/BIcon";
// import HoldingPlant from "../../components/Pop-up/AnimatedHand";
import { API_CLIENT } from "../../constants";
// import { calculateDistance } from "../../utils/map/calculateDistance";
import { useHistory } from "react-router";
import Button from "@restart/ui/esm/Button";

export const Home = () => {
    useTitle();
    const [list, updateList] = useState(
        API_CLIENT.events.map((e, i) => {
            return <EventPreview data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created.time, time: e.time, id: e._id, address: e.address }} key={i} />;
        })
    );
    const sortDropdown = useRef(null);

    useEffect(() => {
        API_CLIENT.on("EVENT_RELOAD", (list) => {
            updateList(
                list.map((e, i) => {
                    return (
                        <EventPreview
                            data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created.time, time: e.time, id: e._id, address: e.address }}
                            key={i}
                        />
                    );
                })
            );
        });
        API_CLIENT.on("EVENT_CREATE", (list) => {
            updateList(
                list.map((e, i) => {
                    return (
                        <EventPreview
                            data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created.time, time: e.time, id: e._id, address: e.address }}
                            key={i}
                        />
                    );
                })
            );
        });

        sortDropdown.current.addEventListener("input", (e) => {
            const value = e.target.value;
            const type = value.split(":")[0];
            const direction = value.split(":")[1];
            const newOrder = API_CLIENT.events.sort((a, b) => {
                switch (type) {
                    case "event-date":
                        return direction === "ascending" ? a.time - b.time : b.time - a.time;
                    case "creation-date":
                        return direction === "ascending" ? b.created.time - a.created.time : a.created.time - b.created.time;
                    case "alphabetic":
                        return direction === "ascending" ? (a.name > b.name ? -1 : 1) : a.name > b.name ? 1 : -1;
                    case "distance":
                        return 0;
                    default:
                        return 0;
                }
            });
            updateList(
                newOrder.map((e, i) => {
                    return (
                        <EventPreview
                            data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created.time, time: e.time, id: e._id, address: e.address }}
                            key={i}
                        />
                    );
                })
            );
        });
    }, []);

    const history = useHistory();

    return (
        <div className={container}>
            {/* <div className={styles.hand}>
                <HoldingPlant />
            </div> */}
            <Stack gap={1}>
                <Stack gap={2} direction={"horizontal"} className={styles.sortDropdown}>
                    <p className={styles.label}>
                        <BIcon icon="sort-down-alt" /> Sortuj według
                    </p>
                    <select ref={sortDropdown} className={styles.sortDropdownMenu}>
                        <option value="event-date:ascending">Data wydarzenia: od najwcześniejszych</option>
                        <option value="event-date:descending">Data wydarzenia: od najpóźniejszych</option>
                        <option value="creation-date:ascending">Data utworzenia: od najnowszych</option>
                        <option value="creation-date:descending">Data utworzenia: od najstarszych</option>
                        <option value="alphabetic:ascending">Alfabetycznie: A-Z</option>
                        <option value="alphabetic:descending">Alfabetycznie: Z-A</option>
                        <option value="distance:ascending">Odległość: najbliżej [NIE DZIAŁA]</option>
                        <option value="distance:descending">Odległość: najdalej [NIE DZIAŁA]</option>
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
                {list}
            </Stack>
        </div>
    );
};
