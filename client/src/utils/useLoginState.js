import { useEffect, useState } from "react";
import { LOGIN_MANAGER } from "../constants";

export const useLoginState = (callback) => {
    if (callback && typeof callback !== "function") throw new TypeError("Invalid callback");
    const [componentState, updateComponentState] = useState(LOGIN_MANAGER.state);
    useEffect(() => {
        const listenerFn = (state) => {
            callback && callback(state);
            updateComponentState(state);
        };
        LOGIN_MANAGER.on("STATE_CHANGE", listenerFn);
        return () => {
            LOGIN_MANAGER.removeListener("STATE_CHANGE", listenerFn);
        };
    }, [callback]);
    return componentState;
};
