import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getCategories = () => {
  return axios.get("/categories");
};

export const useCategories = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};
