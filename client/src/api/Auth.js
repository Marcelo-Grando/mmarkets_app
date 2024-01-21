import axios from "axios";
import { instanceAxios } from "./axios";

const API_URL = import.meta.env.VITE_API_URL

axios.defaults.withCredentials = true;

export const login = async (user) => 
    await axios.post(`${API_URL}/auth`, user)

export const logout = async () => 
    await axios.delete(`${API_URL}/auth`)

export const test = async () => 
    await instanceAxios.get("/auth/test")