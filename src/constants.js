import { createContext } from "react";
import { APIClient } from "./utils/APIClient";

export const BACKEND_URL = "http://localhost:3000";
export const EVENT_CONTEXT = createContext([]);
export const API_CLIENT = new APIClient(BACKEND_URL);
