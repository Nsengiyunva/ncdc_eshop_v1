import { axios } from "lib/axios";
import { queryClient } from "lib/react-query";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

export const deleteOrder = ({ orderId }) => {
  return axios.post(`/orders/${orderId}?_method=DELETE`);
};

export const useDeleteOrder = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deleteOrder) => {
      await queryClient.cancelQueries("order");

      const previousOrder = queryClient.getQueryData("order");

      queryClient.setQueryData(
        "order",
        previousOrder?.filter((order) => order.id !== deleteOrder.orderId)
      );

      return { previousOrder };
    },
    onError: (_, __, context) => {
      if (context?.previousOrder) {
        queryClient.setQueryData("order", context.previousOrder);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("order");
      queryClient.invalidateQueries("order");
      addNotification({
        type: "success",
        title: "Order deleted",
      });
    },
    ...config,
    mutationFn: deleteOrder,
  });
};
