import { axios } from "lib/axios";
import { queryClient } from "lib/react-query";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

export const downloadPurchase = ({ data }) => {
  return axios.post(`/product-attachments/user/my-purchased-attachments`, data);
};

export const useDownloadPurchase = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newPurchase) => {
      await queryClient.cancelQueries("mypurchases");

      const previousPurchase = queryClient.getQueryData("mypurchases");

      queryClient.setQueryData("mypurchases", [
        ...(previousPurchase || []),
        newPurchase.data,
      ]);

      return { previousPurchase };
    },
    onError: (_, __, context) => {
      if (context?.previousPurchase) {
        queryClient.setQueryData("mypurchases", context.previousPurchase);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("purchases");
    },
    ...config,
    mutationFn: downloadPurchase,
  });
};
