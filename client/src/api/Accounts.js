import axios from "axios";

export const createMainAccount = async (accountData) => 
    await axios.post(`http://localhost:4000/api/accounts`, accountData)

export const getUserId = async () => 
    await axios.get(`http://localhost:4000/api/accounts/userId`)