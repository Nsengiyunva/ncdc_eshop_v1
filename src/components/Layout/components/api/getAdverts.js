import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getAdverts = () => {
  return axios.get("/adverts");
};

export const useAdverts = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["adverts"],
    queryFn: () => getAdverts(),
  });
};
