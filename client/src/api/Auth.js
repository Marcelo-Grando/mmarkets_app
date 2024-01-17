import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

axios.defaults.withCredentials = true;

export const login = async (user) => 
    await axios.post(`${API_URL}/auth`, user)