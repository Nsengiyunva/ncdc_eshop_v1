import { Button } from "components/Elements";
import React from "react";
import { ShoppingCart } from "react-feather";
import { useAddToCart } from "../api/addToCart";

export const AddToCart = ({ product_id }) => {
  const addToCartMutation = useAddToCart();

  return (
    <div>
      <button
        type="submit"
        onClick={async () =>
          await addToCartMutation.mutateAsync({
            data: {
              product_id: product_id,
              quantity: 1,
            },
          })
        }
      >
        <ShoppingCart size={20} />
      </button>
    </div>
  );
};
