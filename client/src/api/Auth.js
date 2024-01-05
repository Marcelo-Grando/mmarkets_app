import axios from "axios";

axios.defaults.withCredentials = true;

export const login = async (user) => 
    await axios.post("http://localhost:4000/api/auth", user)