import { axios } from "lib/axios";

export const twoFAuth = (data) => {
  const user = axios.post("/verify-2fa", data);
  return user;
};
