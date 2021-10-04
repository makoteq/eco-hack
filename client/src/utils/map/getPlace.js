import axios from "axios";

export const getPlace = async (pos) => {
    if (!Array.isArray(pos) || isNaN(pos[0]) || isNaN(pos[1])) throw new TypeError("Incorrect argument type");
    const rq = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${pos[1]}&lon=${pos[0]}&format=json&polygon_geojson=1&addressdetails=1`);
    if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
    return rq.data.address;
};
