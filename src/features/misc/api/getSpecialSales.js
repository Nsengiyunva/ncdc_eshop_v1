import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getSpecialSales = () => {
  return axios.get("/special-sales");
};

export const useSpecialSales = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["specialSales"],
    queryFn: () => getSpecialSales(),
  });
};
