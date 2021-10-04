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
                    style={{ width: "92%" }}
                    type="text"
                    ref={mapSearchBox}
                />
                <button
                    ref={mapSearchBtn}
                    type="button"
                    style={{ width: "8%" }}
                    onClick={async () => {
                        const value = mapSearchBox.current.value;
                        const results = await searchLocation(value);
                        if (results[0]) {
                            setCenter(fromLonLat([results[0].lon, results[0].lat]));
                            setZoom(18);
                        }
                    }}
                >
                    <BIcon icon="search" /> Szukaj
                </button>
            </Stack>
            <Map
                onCenterChange={(c) => {
                    centerLive = c;
                }}
                showMarker={true}
                width="100%"
                height="60vh"
                center={center}
                zoom={zoom}
            ></Map>
            <Stack gap={2} direction="horizontal">
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
        </Stack>
    );
};
