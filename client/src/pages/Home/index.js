import { useTitle } from "../../utils/useTitle";
import { useState, useRef, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { EventPreview } from "../../components/EventPreview";
import { container } from "../../global.module.scss";
import styles from "./index.module.scss";
import { BIcon } from "../../components/BIcon";
import { calculateDistance } from "../../utils/map/calculateDistance";
import { useHistory } from "react-router";
import { spawnPopup } from "../../utils/popups/spawnPopup";
import { spawnError } from "../../utils/popups/spawnError";
import { getUserPos } from "../../utils/getUserPos";
import { useLoginState } from "../../utils/useLoginState";
import { useDbEvents } from "../../utils/useDbEvents";

export const Home = () => {
    const sortingFn = (userPos, customMode) => {
        return (a, b) => {
            const [type, direction] = customMode ? customMode.split(":") : list.sortingMode.split(":");
            switch (type) {
                case "event-date":
                    return direction === "ascending" ? a.time - b.time : b.time - a.time;
                case "creation-date":
                    return direction === "ascending" ? b.created.time - a.created.time : a.created.time - b.created.time;
                case "distance":
                    if (userPos) {
                        const aDistance = a.lon && a.lat ? calculateDistance(userPos, [a.lon, a.lat]) : -1;
                        const bDistance = b.lon && b.lat ? calculateDistance(userPos, [b.lon, b.lat]) : -1;
                        return direction === "ascending" ? aDistance - bDistance : bDistance - aDistance;
                    } else return 0;
                default:
                    return 0;
            }
        };
    };
    const getPos = async () => {
        let userPos;
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
                return (
                    <div className={styles.popupContainer}>
                        <BIcon color="rgb(0,0,100)" icon="info-circle-fill" size={"120px"} />
                        <h3 style={{ textAlign: "center" }}>Oczekiwanie na przyznanie uprawnień przez użytkownika</h3>
                    </div>
                );
            });
            userPos = await getUserPos().catch(async () => {
                await spawnError("Nie udało się uzyskać lokalizacji urządzenia lub nastąpiła odmowa dostępu");
                return null;
            });
            closeFn();
        } else if (permissions.state === "denied") {
            await spawnError("Odmówiono aplikacji dostępu do lokalizacji urządzenia");
        }
        return userPos ?? null;
    };

    const events = useDbEvents(async (list) => {
        updateList({
            sortingMode: list.sortingMode,
            elements: list.sort(sortingFn(list.sortingMode.split(":")[0] === "distance" ? await getPos() : null)).map((e, i) => {
                return (
                    <EventPreview
                        data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created?.time, time: e.time, id: e._id, address: e.address }}
                        key={i}
                    />
                );
            }),
        });
    });
    const [list, updateList] = useState({
        sortingMode: window.localStorage.getItem("sorting") ?? "event-date:ascending",
        elements: [],
    });
    const history = useHistory();
    const sortDropdown = useRef(null);
    const createEventButton = useRef(null);

    useTitle();
    useLoginState((state) => {
        if (createEventButton.current) createEventButton.current.disabled = state === null;
    });
    useEffect(() => {
        window.localStorage.setItem("sorting", list.sortingMode);
    }, [list.sortingMode]);
    useEffect(() => {
        sortDropdown.current.addEventListener("input", async (e) => {
            const [type] = e.target.value.split(":");
            const pos = type === "distance" ? await getPos() : null;
            if (type === "distance" && !pos) {
                sortDropdown.current.value = list.sortingMode;
                updateList({
                    sortingMode: list.sortingMode,
                    elements: events.sort(sortingFn(pos)).map((e, i) => {
                        return (
                            <EventPreview
                                data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created?.time, time: e.time, id: e._id, address: e.address }}
                                key={i}
                            />
                        );
                    }),
                });
                return;
            }
            updateList({
                sortingMode: e.target.value,
                elements: events.sort(sortingFn(pos, e.target.value)).map((e, i) => {
                    return (
                        <EventPreview
                            data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created?.time, time: e.time, id: e._id, address: e.address }}
                            key={i}
                        />
                    );
                }),
            });
        });
        sortDropdown.current.value = list.sortingMode;
        list.sortingMode.split(":")[0] === "distance"
            ? getPos().then((pos) => {
                  updateList({
                      sortingMode: list.sortingMode,
                      elements: events.sort(sortingFn(pos)).map((e, i) => {
                          return (
                              <EventPreview
                                  data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created?.time, time: e.time, id: e._id, address: e.address }}
                                  key={i}
                              />
                          );
                      }),
                  });
              })
            : updateList({
                  sortingMode: list.sortingMode,
                  elements: events.sort(sortingFn(null)).map((e, i) => {
                      return (
                          <EventPreview
                              data={{ name: e.name, type: e.type, lon: e.lon, lat: e.lat, createdTime: e.created?.time, time: e.time, id: e._id, address: e.address }}
                              key={i}
                          />
                      );
                  }),
              });
        // eslint-disable-next-line
    }, []);

    return (
        <div className={container}>
            <Stack gap={1}>
                <Stack gap={2} direction={"horizontal"} className={styles.sortDropdown}>
                    <p className={styles.label}>
                        <BIcon icon="sort-down-alt" /> Sortuj
                    </p>
                    <select ref={sortDropdown} className={styles.sortDropdownMenu}>
                        <option value="event-date:ascending">Najnowsze</option>
                        <option value="event-date:descending">Najstarsze</option>
                        <option value="creation-date:ascending">Ostatnio utworzone</option>
                        <option value="creation-date:descending">Najdłużej istniejące</option>
                        <option value="distance:ascending">Najbliżej</option>
                        <option value="distance:descending">Najdalej</option>
                    </select>
                    <button
                        ref={createEventButton}
                        onClick={() => {
                            history.push("/create");
                        }}
                        className={styles.create}
                    >
                        <BIcon icon="plus" />
                        Utwórz
                    </button>
                </Stack>
                {list.elements}
            </Stack>
        </div>
    );
};
