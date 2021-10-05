import axios from "axios";
import { EventEmitter } from "events";

export class APIClient extends EventEmitter {
    #dbUrl = "";
    #events = [];

    constructor(dbUrl) {
        super();
        if (typeof dbUrl !== "string") throw new Error("Database URL is not a string");
        this.#dbUrl = dbUrl;
    }

    get events() {
        return this.#events;
    }

    async fetchEvents() {
        const rq = await axios.get(`${this.#dbUrl}/api/getEvents`);
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        this.#events = rq.data;
        this.emit("EVENT_RELOAD", this.#events, rq.data);
        return rq.data;
    }

    async getEvent(id) {
        if (typeof id !== "string") throw new TypeError("Invalid ID type");
        return this.#events.find((e) => e.id === id) ?? null;
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
        this.#events.push(rq.data);
        this.emit("EVENT_CREATE", this.#events, rq.data);
        return rq.data;
    }

    async loginUser(data) {
        if (!data) throw new Error("Missing required parameter");
        if (typeof data.email !== "string") throw new TypeError("name param is a required string");
        if (typeof data.password !== "string") throw new TypeError("name param is a required string");

        const rq = await axios.post(`${this.#dbUrl}/api/auth/register_login`, data);
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        return rq;
    }
}
