import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getOrder = ({ id }) => {
  return axios.get(`/orders/${id}`);
};

export const useOrder = ({ id, config }) => {
  return useQuery({
    ...config,
    queryKey: ["order", id],
    queryFn: () => getOrder({ id }),
  });
};
