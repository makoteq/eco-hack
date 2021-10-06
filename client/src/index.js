import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_CLIENT, LOGIN_MANAGER } from "./constants";

(async () => {
    await API_CLIENT.fetchEvents();
    await LOGIN_MANAGER.fetchSession();

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById("root")
    );
})();
