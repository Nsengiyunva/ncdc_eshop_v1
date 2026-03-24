import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getBanners = () => {
  return axios.get("/banners");
};

export const useBanners = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["banners"],
    queryFn: () => getBanners(),
  });
};
