import { axios } from "lib/axios";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const updatePaymentStatus = (data) => {
  return axios.post("payments/gt/update-payment-status", data);
};

export const useUpdatePaymentStatus = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();

  return useMutation({
    onMutate: async () => {},
    onError: (_, __, context) => {},
    onSuccess: (data) => {
      return data;
    },
    ...config,
    mutationFn: updatePaymentStatus,
  });
};
