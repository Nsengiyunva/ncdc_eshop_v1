import { axios } from "lib/axios";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const generateGTPayURL = (data) => {
  console.log(data);
  return axios.post("payments/gt/generate-payment-url", data);
};

export const useGenerateGTPayURL = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();

  return useMutation({
    onMutate: async () => {},
    onError: (_, __, context) => {},
    onSuccess: (data) => {
      return data;
    },
    ...config,
    mutationFn: generateGTPayURL,
  });
};
