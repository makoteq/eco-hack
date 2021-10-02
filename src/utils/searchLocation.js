import axios from "axios";

export const searchLocation = async (query) => {
    if (typeof query !== "string") throw new TypeError("Query must be a string");
    const param = encodeURIComponent(query);
    const rq = await axios.get(`https://nominatim.openstreetmap.org/search?q=${param}&format=json&polygon_geojson=1&addressdetails=1`);
    if (rq.status !== 200) throw new Error(`Server responded with status code ${rq.status}: ${rq.statusText}`);
    try {
        return rq.data
            .map((result) => {
                if (!result.lat || !result.lon) return null;
                return {
                    name: result.display_name ?? "Search result",
                    street: `${result.address?.road + ", " ?? ""}${result.address?.city ?? ""}`,
                    lat: result.lat,
                    lon: result.lon,
                };
            })
            .filter((result) => result !== null);
    } catch (e) {
        console.error(e);
        return [];
    }
};
