import { instanceAxios } from "./axios"

export const createMainAccount = async (accountData) => 
    await instanceAxios.post(`/accounts`, accountData)

export const getUserId = async () => 
    await instanceAxios.get(`/accounts/userId`)