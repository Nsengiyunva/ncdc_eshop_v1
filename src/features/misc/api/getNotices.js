import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getNotices = () => {
  return axios.get("/notices/1");
};

export const useNotices = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["notices"],
    queryFn: () => getNotices(),
  });
};
