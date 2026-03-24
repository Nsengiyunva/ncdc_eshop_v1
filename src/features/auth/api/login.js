import { axios } from "lib/axios";

export const loginWithEmailAndPassword = (data) => {
  const user = axios.post("/login", data);
  return user;
};
