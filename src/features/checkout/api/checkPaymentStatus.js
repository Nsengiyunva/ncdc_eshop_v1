import { axios } from "lib/axios";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const checkPaymentStatus = (data) => {
  return axios.post("payments/ughub/gtbanktransfer/mobilemoney/checkstatus", data);
};

export const useCheckPaymentStatus = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();

  return useMutation({
    onMutate: async () => {},
    onError: (_, __, context) => {},
    onSuccess: (data) => {
      console.log(data)
      return data;
    },
    ...config,
    mutationFn: checkPaymentStatus,
  });
};
