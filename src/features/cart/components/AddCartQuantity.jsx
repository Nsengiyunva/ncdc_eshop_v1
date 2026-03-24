import { Spinner } from "components/Elements";
import React from "react";
import { useAddCartQuantity } from "../api/addCartQuantity";
import { useProduct } from "features/products";

export const AddCartQuantity = ({ item }) => {
  const addCartQuantityMutation = useAddCartQuantity();
  console.log(item)

  const productQuery = useProduct({ slug: item.product?.slug });

  if (!productQuery.data) return null;

  return (
    <button
      disabled={productQuery.data?.downloadable}
      onClick={async () =>
        await addCartQuantityMutation.mutateAsync({
          cartItemId: item.id,
          data: {
            quantity: item.quantity + 1,
          },
        })
      }
      className="bg-green-500 px-2 text-xl rounded-md text-white"
    >
      {addCartQuantityMutation.isLoading ? <Spinner /> : <span>+</span>}
    </button>
  );
};
