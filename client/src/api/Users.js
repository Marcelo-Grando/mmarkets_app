import { instanceAxios } from "./axios";

export const getUserRoles = async () => 
    await instanceAxios.get("/users/roles")