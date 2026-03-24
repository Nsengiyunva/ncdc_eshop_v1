import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getDailyDeals = () => {
  return axios.get("/daily-deals");
};

export const useDailyDeals = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["dailyDeals"],
    queryFn: () => getDailyDeals(),
  });
};
