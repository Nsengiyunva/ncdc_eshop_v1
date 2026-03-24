import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getLevels = () => {
  return axios.get("/levels");
};

export const useLevels = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["levels"],
    queryFn: () => getLevels(),
  });
};
