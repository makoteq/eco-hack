import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_CLIENT, LOGIN_MANAGER } from "./constants";
import { Events } from "./context/Events";
import { Login } from "./context/Login";

(async () => {
    const events = await API_CLIENT.fetchEvents();
    const loginState = await LOGIN_MANAGER.fetchSession();

    ReactDOM.render(
        <React.StrictMode>
            <Login initial={loginState ?? null}>
                <Events initial={events}>
                    <App />
                </Events>
            </Login>
        </React.StrictMode>,
        document.getElementById("root")
    );
})();
