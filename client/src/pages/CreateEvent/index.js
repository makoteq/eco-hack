import { useTitle } from "../../utils/useTitle";
import { useFormik } from "formik";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import { BIcon } from "../../components/BIcon";
import { useHistory } from "react-router";
import { API_CLIENT, LOGIN_MANAGER } from "../../constants";
import { container } from "../../global.module.scss";
import styles from "./index.module.scss";
import { spawnPopup } from "../../utils/popups/spawnPopup";
import { spawnError } from "../../utils/popups/spawnError";
import { getPlace } from "../../utils/map/getPlace";
import { MapPopup } from "./MapPopup";
import { addEvent } from "../../context/Events";

export const CreateEvent = () => {
    const history = useHistory();
    if (LOGIN_MANAGER.state === null) {
        history.push("/");
    }
    useTitle("Tworzenie wydarzenia");
    const [locationText, setLocationText] = useState("Brak lokalizacji");
    const formik = useFormik({
        initialValues: {
            name: "",
            type: 0,
            time: "0",
            date: "0",
            description: "",
        },
        onSubmit: async (data) => {
            const date = new Date(`${data.date} ${data.time}`);
            const currentDate = new Date();

            // Validate data
            if (data.type === 0) {
                await spawnError("Nie podano typu wydarzenia");
                return;
            }
            if (!data.name) {
                await spawnError("Wprowadź nazwę wydarzenia");
                return;
            }
            if (date.getTime() < Date.now() || data.date === "0" || data.time === "0" || date.getFullYear() > currentDate.getFullYear() + 1) {
                await spawnError("Podana data jest nieprawidłowa");
                return;
            }

            const rqObj = {
                name: data.name,
                type: parseInt(data.type),
                description: data.description ?? null,
                lon: mapPos?.[0] ?? null,
                lat: mapPos?.[1] ?? null,
                address: locationText,
                time: date.getTime(),
                user: LOGIN_MANAGER.state.email,
            };
            API_CLIENT.createEvent(rqObj)
                .then((res) => {
                    addEvent(res);
                    history.push("/");
                })
                .catch(async (e) => {
                    await spawnError(e.toString());
                });
        },
    });
    const [mapPos, setMapPos] = useState(null);

    return (
        <div className={container}>
            <form onSubmit={formik.handleSubmit}>
                <Stack gap={2}>
                    <p className={styles.title}>Tworzenie nowego wydarzenia</p>
                    <select onChange={formik.handleChange} defaultValue={0} id="type">
                        <option hidden disabled value={0}>
                            Wybierz typ wydarzenia
                        </option>
                        <option value={1}>Sprzątanie świata</option>
                        <option value={2}>Sadzenie drzew</option>
                        <option value={3}>Happening/meeting</option>
                        <option value={4}>Inne</option>
                    </select>
                    <input onChange={formik.handleChange} maxLength="40" type="text" id="name" placeholder=" Nazwa wydarzenia" />
                    <textarea onChange={formik.handleChange} maxLength="1000" type="textarea" id="description" placeholder=" Opis wydarzenia" />
                    <Stack gap={2} direction="horizontal">
                        <p style={{ width: "70%", margin: 0 }}>{locationText}</p>
                        {locationText !== "Brak lokalizacji" && (
                            <button
                                aria-label="Usuń lokalizację"
                                className={styles.redButton}
                                type="button"
                                onClick={() => {
                                    setMapPos(null);
                                    setLocationText("Brak lokalizacji");
                                }}
                            >
                                <BIcon icon="x" />
                            </button>
                        )}
                        <button
                            aria-label="Wybierz lokalizację"
                            type="button"
                            style={{ width: "30%" }}
                            onClick={() => {
                                spawnPopup(
                                    (close) => {
                                        return (
                                            <MapPopup
                                                startingPos={mapPos === null ? [18.667, 54.35] : mapPos}
                                                onSubmit={(pos) => {
                                                    getPlace(pos).then((r) => {
                                                        const data = r
                                                            ? [r.road, r.house_number, r.county, r.neighbourhood, r.country, r.postcode].filter((r) => r !== undefined)
                                                            : ["Nieznana lokalizacja"];
                                                        setLocationText(data.join(", "));
                                                    });
                                                    setMapPos(pos);
                                                    close();
                                                }}
                                                onCancel={() => {
                                                    close();
                                                }}
                                            />
                                        );
                                    },
                                    { width: "95vw", backgroundColor: "#CCCCCC" }
                                );
                            }}
                        >
                            Wybierz lokalizację
                        </button>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <input onChange={formik.handleChange} type="date" id="date" style={{ width: "50%" }} />
                        <input onChange={formik.handleChange} type="time" id="time" style={{ width: "50%" }} />
                    </Stack>
                    <button aria-label="Utwórz wydarzenie" type="submit" className={"greenButton"}>
                        Utwórz wydarzenie
                    </button>
                </Stack>
            </form>
        </div>
    );
};
