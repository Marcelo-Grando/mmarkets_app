import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const instanceAxios = axios.create({
    baseURL: API_URL
})

export const makeSale = async (market_id, employee_id, saleCard) => 
    await instanceAxios.post(`/sales/${market_id}/${employee_id}`, saleCard)