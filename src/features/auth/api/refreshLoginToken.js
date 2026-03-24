import { axios } from "lib/axios";

export const refreshLoginToken = () => {
  return axios.post("/refresh");
};
