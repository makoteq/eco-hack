import { useEffect, useState } from "react";
import { LOGIN_MANAGER } from "../constants";

export const useLoginState = (callback) => {
    if (callback && typeof callback !== "function") throw new TypeError("Invalid callback");
    const [componentState, updateComponentState] = useState(LOGIN_MANAGER.state);
    useEffect(() => {
        LOGIN_MANAGER.on("STATE_CHANGE", (state) => {
            callback && callback(state);
            updateComponentState(state);
        });
    }, []);
    return componentState;
};
