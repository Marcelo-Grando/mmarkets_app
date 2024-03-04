import { instanceAxios } from "./InstanceAxios";

export const getUserRoles = async () =>
  await instanceAxios
    .get("/users/roles")
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });
