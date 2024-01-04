import axios from "axios"

export const getProfile = async (user_id) => 
    await axios.get(`http://localhost:4000/api/profile/${user_id}`)