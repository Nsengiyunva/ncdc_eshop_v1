import { axios } from "lib/axios";
import { queryClient } from "lib/react-query";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

export const reduceCartQuantity = ({ cartItemId, data }) => {
  return axios.post(`/cart-items/${cartItemId}?_method=PUT`, data);
};

export const useReduceCartQuantity = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (reduceCartQuantityItem) => {
      await queryClient.cancelQueries("cartItem");

      const previousCartItem = queryClient.getQueryData("cartItem");

      queryClient.setQueryData(
        "cartItem",
        previousCartItem?.filter(
          (cartItem) => cartItem.id !== reduceCartQuantityItem.cartItemId
        )
      );

      return { previousCartItem };
    },
    onError: (_, __, context) => {
      if (context?.previousCartItem) {
        queryClient.setQueryData("cartItem", context.previousCartItem);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("cartItem");
      queryClient.invalidateQueries("cart");
      addNotification({
        type: "success",
        title: "Quantity has been added",
      });
    },
    ...config,
    mutationFn: reduceCartQuantity,
  });
};
