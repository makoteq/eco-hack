import { useEffect } from "react";
import { APP_NAME } from "../constants";

export const useTitle = (title) => {
    useEffect(() => {
        document.title = title ? `${title} | ${APP_NAME}` : `${APP_NAME}`;
    }, [title]);
};
