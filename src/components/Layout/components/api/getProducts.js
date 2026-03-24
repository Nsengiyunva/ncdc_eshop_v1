import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getProducts = () => {
  return axios.get("/products");
};

export const useProducts = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};
