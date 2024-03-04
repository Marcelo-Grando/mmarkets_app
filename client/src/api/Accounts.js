import { instanceAxios } from "./InstanceAxios";

export const createMainAccount = async (accountData) =>
  await instanceAxios
    .post(`/accounts`, accountData)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });

export const createEmployeeAccount = async (market_id, accountData) =>
  await instanceAxios
    .post(`/accounts/${market_id}`, accountData)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });

export const getEmplooyeesAccounts = async (market_id) =>
  await instanceAxios
    .get(`/accounts/${market_id}`)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });

export const getUserId = async () =>
  await instanceAxios.get(`/accounts/userId`).then((response) => response.data)
  .catch((err) => {
    return {
      status: err.response.status,
      message: err.response.data.message,
    };
  });;
