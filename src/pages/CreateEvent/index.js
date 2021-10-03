import { useFormik } from "formik";
import { useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import { Map } from "../../components/Map";
import { searchLocation } from "../../utils/map/searchLocation";
import { fromLonLat, toLonLat } from "ol/proj";
import { useHistory } from "react-router";
import { API_CLIENT } from "../../constants";
import styles from "./index.module.scss";

export const CreateEvent = () => {
    const mapSearchBox = useRef(null);
    const mapSearchBtn = useRef(null);
    let [center, setCenter] = useState(fromLonLat([18.667, 54.35]));
    const [zoom, setZoom] = useState(15);
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            name: "",
            type: 0,
            time: "0",
            date: "0",
            description: "",
        },
        onSubmit: (data) => {
            const cords = toLonLat([center[0], center[1]]);
            const rqObj = {
                name: data.name,
                type: parseInt(data.type),
                description: data.description,
                lon: cords[0],
                lat: cords[1],
                time: new Date(`${data.date} ${data.time}`).getTime(),
            };
            API_CLIENT.createEvent(rqObj);
            history.push("/");
        },
    });

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
                    <Stack gap={2}>
                        <Stack direction="horizontal" gap={2}>
                            <input
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        mapSearchBtn.current.click();
                                    }
                                }}
                                placeholder="Wyszukaj adres..."
                                style={{ width: "95%" }}
                                type="text"
                                ref={mapSearchBox}
                            />
                            <button
                                ref={mapSearchBtn}
                                type="button"
                                onClick={async () => {
                                    const value = mapSearchBox.current.value;
                                    const results = await searchLocation(value);
                                    if (results[0]) {
                                        setCenter(fromLonLat([results[0].lon, results[0].lat]));
                                        setZoom(18);
                                    }
                                }}
                            >
                                Szukaj
                            </button>
                        </Stack>
                        <Map
                            onCenterChange={(c) => {
                                center = c;
                            }}
                            showMarker={true}
                            width="100%"
                            height="500px"
                            center={center}
                            zoom={zoom}
                        ></Map>
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
