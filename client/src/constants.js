import { APIClient } from "./utils/APIClient";
import { LoginManager } from "./utils/LoginManager";
require("dotenv").config();

export const APP_NAME = "eco-meet";
export const BACKEND_URL = "http://localhost:5000";
export const API_CLIENT = new APIClient(process.env.DEPLOY ? "" : BACKEND_URL);
export const LOGIN_MANAGER = new LoginManager(process.env.DEPLOY ? "" : BACKEND_URL);
export const EVENT_TYPES = {
    colors: {
        1: "#53d188",
        2: "#FBBEBE",
        3: "#FFFF99",
        4: "#C0C0C0",
    },
    labels: {
        1: "Sadzenie drzew",
        2: "Zbieranie śmieci",
        3: "Happening/Meeting",
        4: "Inne",
    },
};
//jak robisz deploy to daj na true, a potem git push heroku main
