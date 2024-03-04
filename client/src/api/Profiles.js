import { instanceAxios } from "./InstanceAxios";

export const getProfile = async (user_id) =>
  await instanceAxios
    .get(`/profile/${user_id}`)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });

export const getUserQueryData = async () =>
  await instanceAxios
    .get(`/profile/data`)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });
