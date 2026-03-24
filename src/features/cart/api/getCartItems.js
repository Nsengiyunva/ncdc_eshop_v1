import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getCartItems = () => {
  return axios.get(`/carts/mine`);
};

export const useCartItems = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["cart"],
    queryFn: () => getCartItems(),
  });
};
