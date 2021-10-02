import axios from "axios";
import { BACKEND_URL } from "../../constants";

export const getEvents = async () => {
    const rq = await axios.get(`${BACKEND_URL}/api/getEvents`);
    if (rq.status !== 200) throw new Error(`Request failed with code ${rq.status}: ${rq.statusText}`);
    return rq.data;
};
