import React, { useEffect, useRef } from "react";
import OSM from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import styles from "./index.module.scss";
import marker from "../../assets/location_marker.svg";
import "./MapControls.scss";

/**
 *
 * @param {*} props
 * @param props.center - initial position
 * @param props.zoom - initial zoom
 * @param props.onCenterChange - function called on each map move
 * @param props.width - map width
 * @param props.height - map height
 * @param props.blockInteraction - whether interacting with this map should be possible
 */
export const Map = (props) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const view = new View({
            center: props.center ?? [0, 0],
            zoom: props.zoom ?? 3,
        });
        const layer = new TileLayer({
            source: new XYZ({
                url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            }),
        });
        const el = mapRef.current;
        new OSM({
            target: el,
            view: view,
            layers: [layer],
        });
        view.on("change:center", () => {
            if (typeof props.onCenterChange === "function") props.onCenterChange(view.getCenter());
        });
        return () => {
            el.innerHTML = "";
        };
    }, [props]);

    return (
        <div style={{ width: props.width, height: props.height }} className={styles.container}>
            {props.showMarker && <img alt="" src={marker} className={styles.marker}></img>}
            <div ref={mapRef} className={`${styles.map} ${props.blockInteraction ? styles.block : ""}`}></div>
        </div>
    );
};
