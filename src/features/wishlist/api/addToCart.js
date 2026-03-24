import { axios } from "lib/axios";
import { queryClient } from "lib/react-query";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

//send data to the api route
export const addToCart = ({ data }) => {
  return axios.post("/carts", data);
};

export const useAddToCart = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (product) => {
      await queryClient.cancelQueries("carts");

      const previousCartItems = queryClient.getQueryData("carts");

      queryClient.setQueryData("carts", [
        ...(previousCartItems || []),
        product.productId,
      ]);

      return { previousCartItems };
    },
    onError: (_, __, context) => {
      if (context?.previousCartItems) {
        queryClient.setQueryData("carts", context.previousCartItems);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("carts");
      addNotification({
        type: "success",
        title: data.message,
      });
    },
    ...config,
    mutationFn: addToCart,
  });
};
