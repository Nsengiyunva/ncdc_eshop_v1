import { axios } from "lib/axios";
import { queryClient } from "lib/react-query";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

export const deleteCartItem = ({ cartItemId }) => {
  return axios.post(`/cart-items/${cartItemId}?_method=DELETE`);
};

export const useDeleteCartItem = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deleteCartItem) => {
      await queryClient.cancelQueries("cartItem");

      const previousCartItem = queryClient.getQueryData("cartItem");

      queryClient.setQueryData(
        "cartItem",
        previousCartItem?.filter(
          (cartItem) => cartItem.id !== deleteCartItem.cartItemId
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
        title: "Item removed from cart",
      });
    },
    ...config,
    mutationFn: deleteCartItem,
  });
};
