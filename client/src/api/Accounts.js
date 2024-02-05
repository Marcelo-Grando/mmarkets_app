import { instanceAxios } from "./axios"

export const createMainAccount = async (accountData) => 
    await instanceAxios.post(`/accounts`, accountData)

export const createEmployeeAccount = async (market_id, accountData) => 
    await instanceAxios.post(`/accounts/${market_id}`, accountData)

export const getEmplooyeesAccounts = async (market_id) => 
    await instanceAxios.get(`/accounts/${market_id}`)

export const getUserId = async () => 
    await instanceAxios.get(`/accounts/userId`)