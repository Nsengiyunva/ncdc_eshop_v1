import { axios } from "lib/axios";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

export const emailVerify = (data) => {
  return axios.post(`/email/verify`, data);
};

export const useEmailVerify = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: (data) => {
      addNotification({
        type: "success",
        title: data.message,
      });
    },
    ...config,
    mutationFn: emailVerify,
  });
};
