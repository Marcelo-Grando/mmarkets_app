import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const instanceAxios = axios.create({
    baseURL: API_URL
})

axios.defaults.withCredentials = true;

export const login = async (user) => 
    await instanceAxios.post("auth", user)