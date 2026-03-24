import { Button, Spinner } from "components/Elements";
import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { useAddToWishlist } from "../api/addWishlist";
import { useWishlist } from "../api/getWishlist";
import { BsHeartFill } from "react-icons/bs";

export const AddToWishlist = ({ product_id }) => {
  const addToWishlistMutation = useAddToWishlist();
  const wishlist = useWishlist();

  var item = wishlist?.data?.wishlistItems?.filter((item) => {
    return item.product_id === product_id;
  });

  return (
    <div>
      {item === undefined || item.length < 1 ? (
        <Button
          startIcon={<MdFavoriteBorder size={20} />}
          onClick={async () => {
            await addToWishlistMutation.mutateAsync({
              data: {
                product_id: product_id,
              },
            });
          }}
          variant="outline"
          isLoading={addToWishlistMutation.isLoading}
        >
          <div className="w-32">Add to wishlist</div>
        </Button>
      ) : (
        <p className="flex flex-row items-center space-x-2">
         <BsHeartFill className="inline-block mr-1 text-red-500" size={16} /> <span className="text-xs">Product in saved items.</span>
        </p>
      )}
    </div>
  );
};
