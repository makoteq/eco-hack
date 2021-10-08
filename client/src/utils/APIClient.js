import axios from "axios";
import { EventEmitter } from "events";

export class APIClient extends EventEmitter {
    #dbUrl = "";

    constructor(dbUrl) {
        super();
        if (typeof dbUrl !== "string") throw new Error("Database URL is not a string");
        this.#dbUrl = dbUrl;
    }

    async fetchEvents() {
        const rq = await axios.get(`${this.#dbUrl}/api/getEvents`);
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        return rq.data;
    }

    async deleteEvent(item) {
        const rq = await axios.post(`${this.#dbUrl}/api/deleteEvent`, item);
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        await this.fetchEvents();
        return item.id;
    }

    async getUserEvents(data) {
        const rq = await axios.post(`${this.#dbUrl}/api/getUserEvents`, { email: data });
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        console.log(rq.data);
        return rq.data;
    }

    async isLogged() {
        const rq = await axios.get(`${this.#dbUrl}/api/isLogged`);
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        return rq.data;
    }

    async createEvent(data) {
        //Check types
        if (typeof data !== "object") throw new TypeError("Data object is required");
        if (typeof data.name !== "string") throw new TypeError("Name property must be a string");
        if (typeof data.type !== "number" || data.type === 0) throw new TypeError("Invalid event type");
        if (typeof data.time !== "number") throw new TypeError("Invalid date format");

        //Make POST request
        const rq = await axios.post(`${this.#dbUrl}/api/createEvent`, data);
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        return rq.data;
    }
}
