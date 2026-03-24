import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getPayments = () => {
  return axios.get(`/payments/mine`);
};

export const usePayments = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["payments"],
    queryFn: () => getPayments(),
  });
};
