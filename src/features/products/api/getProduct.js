import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getProduct = ({ slug }) => {
  return axios.get(`/products/slug/${slug}`);
};

export const useProduct = ({ slug, config }) => {
  return useQuery({
    ...config,
    queryKey: ["product", slug],
    queryFn: () => getProduct({ slug }),
  });
};
