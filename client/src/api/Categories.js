import { instanceAxios } from "./axios";

export const getCategories = async (market_id) =>
  await instanceAxios
    .get(`/categories/${market_id}`)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });

export const createCategory = async (market_id, name) =>
  await instanceAxios
    .post(`/categories/${market_id}`, {name: name})
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });
