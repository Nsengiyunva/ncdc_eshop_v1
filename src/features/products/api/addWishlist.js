import { axios } from "lib/axios";
import { queryClient } from "lib/react-query";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

//send data to the api route
export const addToWishlist = ({ data }) => {
  return axios.post("/wishlist", data);
};

export const useAddToWishlist = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (product) => {
      await queryClient.cancelQueries("wishlist");

      const previousWishlist = queryClient.getQueryData("wishlist");

      queryClient.setQueryData("wishlist", [
        ...(previousWishlist.wishlistItems || []),
        product.productId,
      ]);

      return { previousWishlist };
    },
    onError: (_, __, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData("wishlist", context.previousWishlist);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("wishlist");
      addNotification({
        type: "success",
        title: data.message,
      });
    },
    ...config,
    mutationFn: addToWishlist,
  });
};
