import { instanceAxios } from "./InstanceAxios";

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

export const createProduct = async (market_id, product) =>
  await instanceAxios
    .post(`/products/${market_id}`, product)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });
