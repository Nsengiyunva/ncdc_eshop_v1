import { axios } from "lib/axios";
import { queryClient } from "lib/react-query";
import { useNotificationStore } from "stores/notifications";
import { useMutation } from "react-query";

export const deleteWishlistItem = ({ wishlistItemId }) => {
  return axios.post(`/wishlist-items/${wishlistItemId}?_method=DELETE`);
};

export const useDeleteWishlistItem = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deleteWishlistItem) => {
      await queryClient.cancelQueries("wishlistItem");

      const previousWishlistItem = queryClient.getQueryData("wishlistItem");

      queryClient.setQueryData(
        "wishlistItem",
        previousWishlistItem?.filter(
          (wishlistItem) =>
            wishlistItem.id !== deleteWishlistItem.wishlistItemId
        )
      );

      return { previousWishlistItem };
    },
    onError: (_, __, context) => {
      if (context?.previousWishlistItem) {
        queryClient.setQueryData("wishlistItem", context.previousWishlistItem);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("wishlistItem");
      queryClient.invalidateQueries("wishlist");
      addNotification({
        type: "success",
        title: "Item removed from wishlist",
      });
    },
    ...config,
    mutationFn: deleteWishlistItem,
  });
};
