import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const instanceAxios = axios.create({
    baseURL: API_URL
})

export const getProfile = async (user_id) => 
    await instanceAxios.get(`/api/profile/${user_id}`)