import axios from "axios";

export class APIClient {
    #dbUrl = "";

    constructor(dbUrl) {
        if (typeof dbUrl !== "string") throw new Error("Database URL is not a string");
        this.#dbUrl = dbUrl;
    }
    async getEvents() {
        const rq = await axios.get(`${this.#dbUrl}/api/getEvents`);
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        return rq.data;
    }
    async getEvent(id) {
        if (typeof id !== "string") throw new TypeError("Invalid ID type");
        const events = await this.getEvents();
        return events.find((e) => e.id === id) ?? null;
    }
    async createEvent(data) {
        //Check types
        if (typeof data !== "object") throw new TypeError("Data object is required");
        if (typeof data.name !== "string") throw new TypeError("Name property must be a string");
        if (typeof data.time !== "number") throw new TypeError("Invalid date format");
        if (typeof data.created !== "object") throw new TypeError("created property must be present");
        if (typeof data.created.time !== "number") throw new TypeError("Invalid created date format");
        if (typeof data.lat !== "number") throw new TypeError("Invalid lattitude");
        if (typeof data.lon !== "number") throw new TypeError("Invalid longtitude");

        //Make POST request
        const rq = await axios.post(`${this.#dbUrl}/api/createEvent`, data);
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        return rq;
    }
}
