import styles from "./map.module.scss";
import { useState, useRef } from "react";
import { BIcon } from "../../components/BIcon";
import { Map } from "../../components/Map";
import { searchLocation } from "../../utils/map/searchLocation";
import { fromLonLat, toLonLat } from "ol/proj";
import { Stack } from "react-bootstrap";

export const MapPopup = (props) => {
    const [center, setCenter] = useState(fromLonLat(props.startingPos));
    const [zoom, setZoom] = useState(15);
    const mapSearchBox = useRef(null);
    const mapSearchBtn = useRef(null);
    let centerLive = center;

    return (
        <div className={styles.container}>
            <Stack style={{ flex: 1 }} className={styles.addressBar} direction="horizontal" gap={2}>
                <input
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            mapSearchBtn.current.click();
                        }
                    }}
                    placeholder="Wyszukaj adres..."
                    autoComplete={"street-address"}
                    style={{ flex: 9.5 }}
                    type="text"
                    ref={mapSearchBox}
                />
                <button
                    ref={mapSearchBtn}
                    type="button"
                    style={{ flex: 0.5 }}
                    onClick={async () => {
                        const value = mapSearchBox.current.value;
                        const results = await searchLocation(value);
                        if (results[0]) {
                            setCenter(fromLonLat([results[0].lon, results[0].lat]));
                            setZoom(18);
                        }
                    }}
                >
                    <BIcon icon="search" />
                </button>
            </Stack>
            <Map
                onCenterChange={(c) => {
                    centerLive = c;
                }}
                showMarker={true}
                width="100%"
                height="75vh"
                center={center}
                zoom={zoom}
            ></Map>
            <Stack style={{ flex: 1 }} gap={2} direction="horizontal">
                <button
                    onClick={() => {
                        setCenter(centerLive);
                        props.onSubmit(toLonLat(centerLive));
                    }}
                    style={{ width: "30%", marginLeft: "auto" }}
                    className={"greenButton"}
                >
                    Wybierz lokalizację
                </button>
                <button onClick={() => props.onCancel()} style={{ width: "30%", marginRight: "auto" }}>
                    Anuluj
                </button>
            </Stack>
        </div>
    );
};
