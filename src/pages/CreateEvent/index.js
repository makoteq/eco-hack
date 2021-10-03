import { Field, Form, Formik } from "formik";
import { useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import { Map } from "../../components/Map";
import { searchLocation } from "../../utils/map/searchLocation";
import { fromLonLat, toLonLat } from "ol/proj";
import { useHistory } from "react-router";
import styles from "./index.module.scss";

export const CreateEvent = () => {
    const mapSearchBox = useRef(null);
    let [center, setCenter] = useState(fromLonLat([18.667, 54.35]));
    const [zoom, setZoom] = useState(15);
    const history = useHistory();

    return (
        <div className={styles.formContainer}>
            <Formik
                initialValues={{
                    type: 0,
                    name: "",
                    description: "",
                    phoneNumber: "",
                }}
                onSubmit={(data) => {
                    const cords = toLonLat([center[0], center[1]]);
                    console.log({ ...data, lon: cords[0], lat: cords[1] });
                    history.push("/");
                }}
            >
                <Form>
                    <Stack gap={2}>
                        <h1 className={styles.title}>Tworzenie nowego wydarzenia</h1>
                        <Field as="select" name="type">
                            <option hidden disabled value={0}>
                                Wybierz typ wydarzenia
                            </option>
                            <option value={1}>Sprzątanie świata</option>
                            <option value={2}>Sadzenie drzew</option>
                            <option value={3}>Happening/meeting</option>
                            <option value={4}>Inne</option>
                        </Field>
                        <Field type="text" name="name" placeholder="Nazwa wydarzenia" />
                        <Field type="text" name="description" placeholder="Opis wydarzenia" />
                        <Field type="tel" name="phoneNumber" placeholder="Numer telefonu" />
                        <Stack gap={2}>
                            <Stack direction="horizontal" gap={2}>
                                <input placeholder="Wyszukaj adres..." style={{ width: "95%" }} type="text" ref={mapSearchBox} />
                                <button
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
                            <input type="date" style={{ width: "50%" }} />
                            <input type="time" style={{ width: "50%" }} />
                        </Stack>
                        <button type="submit">Utwórz wydarzenie</button>
                    </Stack>
                </Form>
            </Formik>
        </div>
    );
};
