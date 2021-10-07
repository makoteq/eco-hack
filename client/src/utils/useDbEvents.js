import { useEffect } from "react";
import { API_CLIENT } from "../constants";

export const useDbEvents = (callback) => {
    if (typeof callback !== "function") throw new TypeError("Invalid callback");
    const [componentState, updateComponentState] = useState(API_CLIENT.events);
    useEffect(() => {
        API_CLIENT.on("EVENT_RELOAD", (events, data) => {
            callback(events, data);
            updateComponentState(events);
        });
        API_CLIENT.on("EVENT_RELOAD", (events, data) => {
            callback(events, data);
            updateComponentState(events);
        });
    }, []);
    return componentState;
};
