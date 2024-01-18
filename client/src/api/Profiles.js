import { instanceAxios } from "./axios";

export const getProfile = async (user_id) =>
  await instanceAxios.get(`/profile/${user_id}`);

export const getUserQueryData = async () =>
  await instanceAxios.get(`/profile/data`);
