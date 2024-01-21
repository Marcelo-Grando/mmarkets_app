import { instanceAxios } from "./axios";

export const getPagesInfo = async (roles) => await instanceAxios.get(`/pages/${roles}`);
