import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getWishlist = () => {
  return axios.get(`/wishlist/mine`);
};

export const useWishlist = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(),
  });
};
