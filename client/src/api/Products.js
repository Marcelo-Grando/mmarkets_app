import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const instanceAxios = axios.create({
    baseURL: API_URL
})

export const getProducts = async (market_id) => 
    await instanceAxios(`/products/${market_id}`)
        .then(response => response.data)
        .catch(err => err)