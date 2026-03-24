import { axios } from "lib/axios";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

export const generatePRN = ({ data }) => {
  return axios.post("evaluation/generate-prn", data);
};

export const useGeneratePRN = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: (data) => {
      localStorage.removeItem("totalCost");
      localStorage.removeItem("evaluation_id");
      addNotification({
        type: "success",
        title: "PRN has been generated",
      });
      return data;
    },
    ...config,
    mutationFn: generatePRN,
  });
};
