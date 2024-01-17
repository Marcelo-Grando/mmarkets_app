import { instanceAxios } from "./axios"

export const getProfile = async (user_id) => 
    await instanceAxios.get(`/api/profile/${user_id}`)