import axios from "axios";
import { instanceAxios } from "./InstanceAxios";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

export const login = async (user) =>
  await axios
    .post(`${API_URL}/auth/login`, user)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });

export const logout = async () =>
  await axios
    .delete(`${API_URL}/auth/logout`)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });

export const test = async () =>
  await instanceAxios
    .get("/auth/test")
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });
