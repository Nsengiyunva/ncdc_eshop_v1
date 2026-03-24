import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getBids = () => {
  return axios.get("/bids");
};

export const useBids = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["bids"],
    queryFn: () => getBids(),
  });
};
