import { instanceAxios } from "./InstanceAxios";

export const getTickets = async (market_id) =>
  await instanceAxios
    .get(`/reports/${market_id}/tickets`)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });

export const getSalesByProducts = async (market_id) =>
  await instanceAxios
    .get(`/reports/${market_id}/products`)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });
