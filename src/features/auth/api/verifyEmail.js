import { axios } from "lib/axios";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

//send data to the api route
export const verifyEmail = ({ data }) => {
  return axios.post(`/email/verify/${data.username}/${data.code}`);
};

export const useVerifyEmail = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: (data) => {
      addNotification({
        type: "success",
        title: data.message,
      });
    },
    ...config,
    mutationFn: verifyEmail,
  });
};
