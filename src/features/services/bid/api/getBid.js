import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getBid = ({ slug }) => {
  return axios.get(`/bids/slug/${slug}`);
};

export const useBid = ({ slug, config }) => {
  return useQuery({
    ...config,
    queryKey: ["bid", slug],
    queryFn: () => getBid({ slug }),
  });
};
