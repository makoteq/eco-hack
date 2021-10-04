import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Stack } from "react-bootstrap";
import { BIcon } from "../../components/BIcon";
import { useHistory } from "react-router";
import { API_CLIENT, EVENT_CONTEXT } from "../../constants";
import styles from "./index.module.scss";
import { spawnPopup } from "../../utils/popups/spawnPopup";
import { spawnError } from "../../utils/popups/spawnError";
import { getPlace } from "../../utils/map/getPlace";
import { MapPopup } from "./MapPopup";

export const CreateEvent = () => {
    const context = useContext(EVENT_CONTEXT);
    const history = useHistory();
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
            if (data.type === 0) {
                await spawnError("Nie podano typu wydarzenia");
                return;
            }
            const rqObj = {
                name: data.name,
                type: parseInt(data.type),
                description: data.description,
                lon: mapPos?.[0] ?? null,
                lat: mapPos?.[1] ?? null,
                address: locationText,
                time: new Date(`${data.date} ${data.time}`).getTime(),
            };
            API_CLIENT.createEvent(rqObj)
                .then(() => {
                    API_CLIENT.getEvents().then((r) => {
                        context.updateEvents(r);
                        history.push("/");
                    });
                })
                .catch(async (e) => {
                    await spawnError(e.toString());
                });
        },
    });
    const [mapPos, setMapPos] = useState(null);

    return (
        <div className={styles.formContainer}>
            <form onSubmit={formik.handleSubmit}>
                <Stack gap={2}>
                    <h1 className={styles.title}>Tworzenie nowego wydarzenia</h1>
                    <select onChange={formik.handleChange} defaultValue={0} id="type">
                        <option hidden disabled value={0}>
                            Wybierz typ wydarzenia
                        </option>
                        <option value={1}>Sprzątanie świata</option>
                        <option value={2}>Sadzenie drzew</option>
                        <option value={3}>Happening/meeting</option>
                        <option value={4}>Inne</option>
                    </select>
                    <input onChange={formik.handleChange} type="text" id="name" placeholder="Nazwa wydarzenia" />
                    <textarea onChange={formik.handleChange} type="textarea" id="description" placeholder="Opis wydarzenia" />
                    <Stack gap={2} direction="horizontal">
                        <p style={{ width: "70%", margin: 0 }}>{locationText}</p>
                        <button
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
                                                        const data = [r.road, r.house_number, r.city, r.country, r.postcode].filter((r) => r !== undefined);
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
                                    { width: "70vw", backgroundColor: "#DDDDDD" }
                                );
                            }}
                        >
                            Wybierz lokalizację
                        </button>
                        {locationText !== "Brak lokalizacji" && (
                            <button
                                type="button"
                                onClick={() => {
                                    setMapPos(null);
                                    setLocationText("Brak lokalizacji");
                                }}
                            >
                                <BIcon icon="x" />
                            </button>
                        )}
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <input onChange={formik.handleChange} type="date" id="date" style={{ width: "50%" }} />
                        <input onChange={formik.handleChange} type="time" id="time" style={{ width: "50%" }} />
                    </Stack>
                    <button type="submit">Utwórz wydarzenie</button>
                </Stack>
            </form>
        </div>
    );
};
