import { useEffect, useState } from "react";
import { API_CLIENT } from "../constants";

export const useDbEvents = (callback) => {
    if (typeof callback !== "function") throw new TypeError("Invalid callback");
    const [componentState, updateComponentState] = useState(API_CLIENT.events);
    useEffect(() => {
        const listenerFn = (events, data) => {
            callback(events, data);
            updateComponentState(events);
        };
        API_CLIENT.on("EVENT_RELOAD", listenerFn);
        API_CLIENT.on("EVENT_CREATE", listenerFn);
        return () => {
            API_CLIENT.removeListener("EVENT_RELOAD", listenerFn);
            API_CLIENT.removeListener("EVENT_CREATE", listenerFn);
        };
        // eslint-disable-next-line
    }, []);
    return componentState;
};
