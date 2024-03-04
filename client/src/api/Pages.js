import { instanceAxios } from "./InstanceAxios";

export const getPagesInfo = async (roles) =>
  await instanceAxios
    .get(`/pages/${roles}`)
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });
