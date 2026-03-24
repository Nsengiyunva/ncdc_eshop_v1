import { axios } from "lib/axios";
import { queryClient } from "lib/react-query";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const addOrder = ({ data }) => {
  return axios.post("orders", data);
};

export const useAddOrder = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();

  return useMutation({
    onMutate: async (addOrderItem) => {
      await queryClient.cancelQueries("order");

      const previousCartItem = queryClient.getQueryData("order");

      queryClient.setQueryData(
        "order",
        previousCartItem?.filter((order) => order.id !== addOrderItem.orderId)
      );

      return { previousCartItem };
    },
    onError: (_, __, context) => {
      if (context?.previousCartItem) {
        queryClient.setQueryData("order", context.previousCartItem);
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("orderId", data?.order?.id);
      queryClient.invalidateQueries("order");
      addNotification({
        type: "success",
        title: "Order has been added",
      });
      navigate("/payment");
    },
    ...config,
    mutationFn: addOrder,
  });
};
