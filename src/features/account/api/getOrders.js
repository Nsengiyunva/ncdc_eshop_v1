import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getOrders = () => {
  return axios.get(`/orders/mine`);
};

export const useOrders = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });
};
