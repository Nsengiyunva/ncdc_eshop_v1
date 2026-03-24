import { axios } from "lib/axios";
import { useQuery } from "react-query";

export const getEvaluation = () => {
  return axios.get("/evaluation");
};

export const useEvaluation = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ["evaluation"],
    queryFn: () => getEvaluation(),
  });
};
