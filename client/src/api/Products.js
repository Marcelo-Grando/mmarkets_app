import { instanceAxios } from "./axios";

export const getProducts = async (market_id) =>
  await instanceAxios
    .get(`/products/${market_id}`)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });