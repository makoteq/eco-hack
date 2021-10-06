import { useTitle } from "../../utils/useTitle";
import { useState, useRef, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { EventPreview } from "../../components/EventPreview";
import { container } from "../../global.module.scss";
import styles from "./index.module.scss";
import { BIcon } from "../../components/BIcon";
// import HoldingPlant from "../../components/Pop-up/AnimatedHand";
import { API_CLIENT } from "../../constants";
import { calculateDistance } from "../../utils/map/calculateDistance";
import { useHistory } from "react-router";
import { spawnPopup } from "../../utils/popups/spawnPopup";
import { spawnError } from "../../utils/popups/spawnError";
import { getUserPos } from "../../utils/getUserPos";

export const Home = () => {
    useTitle();
    const [list, updateList] = useState(
        API_CLIENT.events.map((e, i) => {
            return (
                <EventPreview data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created?.time, time: e.time, id: e._id, address: e.address }} key={i} />
            );
        })
    );
    const sortDropdown = useRef(null);
    const history = useHistory();
    const sortingFn = async (e) => {
        const [type, direction] = e.target.value.split(":");
        let userPos;
        if (type === "distance") {
            const permissions = await window.navigator.permissions.query({ name: "geolocation" });
            if (permissions.state === "granted") {
                userPos = await getUserPos().catch(async () => {
                    await spawnError("Wystąpił nieoczekiwany błąd podczas próby dostępu do usługi geolokalizacji");
                    return null;
                });
            } else if (permissions.state === "prompt") {
                let closeFn;
                spawnPopup((c) => {
                    closeFn = c;
                    return <h1>Oczekiwanie na przyznanie uprawnień</h1>;
                });
                userPos = await getUserPos().catch(async () => {
                    await spawnError("Nie udało się uzyskać lokalizacji urządzenia lub nastąpiła odmowa dostępu");
                    return null;
                });
                closeFn();
            } else if (permissions.state === "denied") {
                await spawnError("Odmówiono aplikacji dostępu do lokalizacji urządzenia");
            }
            if (!userPos) {
                sortDropdown.current.value = "event-date:ascending";
                window.localStorage.setItem("sorting", "event-date:ascending");
                return;
            }
        }
        const newOrder = API_CLIENT.events.sort((a, b) => {
            switch (type) {
                case "event-date":
                    return direction === "ascending" ? a.time - b.time : b.time - a.time;
                case "creation-date":
                    return direction === "ascending" ? b.created.time - a.created.time : a.created.time - b.created.time;
                case "alphabetic":
                    return direction === "ascending" ? (a.name > b.name ? -1 : 1) : a.name > b.name ? 1 : -1;
                case "distance":
                    if (userPos !== [null, null]) {
                        const aDistance = a.lon && a.lat ? calculateDistance(userPos, [a.lon, a.lat]) : -1;
                        const bDistance = b.lon && b.lat ? calculateDistance(userPos, [b.lon, b.lat]) : -1;
                        return direction === "ascending" ? aDistance - bDistance : bDistance - aDistance;
                    } else return 0;
                default:
                    return 0;
            }
        });
        updateList(
            newOrder.map((e, i) => {
                return (
                    <EventPreview
                        data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created?.time, time: e.time, id: e._id, address: e.address }}
                        key={i}
                    />
                );
            })
        );
        window.localStorage.setItem("sorting", `${type}:${direction}`);
    };

    useEffect(() => {
        const apiClientCallback = (list) => {
            updateList(
                list.map((e, i) => {
                    return (
                        <EventPreview
                            data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created?.time, time: e.time, id: e._id, address: e.address }}
                            key={i}
                        />
                    );
                })
            );
        };
        API_CLIENT.on("EVENT_RELOAD", apiClientCallback);
        API_CLIENT.on("EVENT_CREATE", apiClientCallback);

        sortDropdown.current.addEventListener("input", sortingFn);
        const cachedValue = window.localStorage.getItem("sorting");
        sortingFn(cachedValue ? { target: { value: cachedValue } } : { target: sortDropdown.current });
        if (cachedValue) sortDropdown.current.value = cachedValue;
    }, []);

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
                        <option value="distance:ascending">Odległość: najbliżej</option>
                        <option value="distance:descending">Odległość: najdalej</option>
                    </select>
                    <button
                        onClick={() => {
                            history.push("/create");
                        }}
                        className={styles.create}
                    >
                        <BIcon icon="plus" />
                        Utwórz wydarzenie
                    </button>
                </Stack>
                {list}
            </Stack>
        </div>
    );
};
