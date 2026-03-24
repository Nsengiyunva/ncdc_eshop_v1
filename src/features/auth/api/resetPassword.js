import { axios } from "lib/axios";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

export const resetPassword = ({ data }) => {
  return axios.post(`/reset-password`, data);
};


export const useResetPassword = ({ config } = {}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { addNotification } = useNotificationStore();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation({
    onSuccess: () => {
      addNotification({
        type: "success",
        title:
          "You have successfully reset your password.",
      });
    },
    ...config,
    mutationFn: resetPassword,
  });
};
