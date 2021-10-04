import { createContext } from "react";
import { APIClient } from "./utils/APIClient";
require('dotenv').config();
export const BACKEND_URL = "http://localhost:5000";
export const EVENT_CONTEXT = createContext();
//export const API_CLIENT = new APIClient(process.env.DEPLOY ? "/" : BACKEND_URL);
export const API_CLIENT = new APIClient("");
