import { axios } from "lib/axios";
import { useMutation } from "react-query";
import { useNotificationStore } from "stores/notifications";

export const getPRN = ({ prn }) => {
  return axios.get(`/payments/ura/status/${prn}`);
};

export const useGetPRN = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: (data) => {
      addNotification({
        type: "success",
        title: "PRN status has been loaded",
      });
      return data;
    },
    ...config,
    mutationFn: getPRN,
  });
};
