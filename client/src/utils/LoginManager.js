import axios from "axios";

export class LoginManager {
    #dbUrl = "";

    constructor(dbUrl) {
        if (typeof dbUrl !== "string") throw new TypeError("dbUrl must be a string");
        this.#dbUrl = dbUrl;
    }

    async login(data) {
        if (!data) throw new Error("Missing required parameter");
        if (typeof data.email !== "string") throw new TypeError("name param is a required string");
        if (typeof data.password !== "string") throw new TypeError("name param is a required string");

        const rq = await axios.post(`${this.#dbUrl}/api/auth/register_login`, data);
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        return rq.data ?? null;
    }

    async logout() {
        const rq = await axios.get(`${this.#dbUrl}/api/logout`);
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        return null;
    }

    async fetchSession() {
        const rq = await axios.get(`${this.#dbUrl}/api/isLogged`);
        if (rq.status !== 200) throw new Error(`Request failed with status code ${rq.status}: ${rq.statusText}`);
        if (rq.data !== "not logged") {
            return rq.data ?? null;
        } else {
            return null;
        }
    }
}
