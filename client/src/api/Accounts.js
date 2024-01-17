import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const instanceAxios = axios.create({
    baseURL: API_URL
})

export const createMainAccount = async (accountData) => 
    await instanceAxios.post(`/accounts`, accountData)

export const getUserId = async () => 
    await instanceAxios.get(`/accounts/userId`)