import { Button, Spinner } from "components/Elements";
import React from "react";
import { useAddToCart } from "../api/addToCart";
import { useNavigate } from "react-router-dom";
import { useCartItems } from "features/cart";
import { ShoppingCart } from "react-feather";

export const AddToCart = ({ product_id }) => {
  const addToCartMutation = useAddToCart();
  const cartQuery = useCartItems();

  const navigate = useNavigate();

  if (cartQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!cartQuery.data) return null;

  return (
    <div>
      {cartQuery?.data?.cartItems &&
      cartQuery?.data?.cartItems?.some(
        (item) => item.product_id === product_id
      ) ? (
        <Button  startIcon={<ShoppingCart size={20} />} onClick={() => navigate("/cart")}>
         <div className="w-32">Open Cart</div>
        </Button>
      ) : (
        <Button
        startIcon={<ShoppingCart size={20} />}
          type="submit"
          onClick={async () =>
            await addToCartMutation.mutateAsync({
              data: {
                product_id: product_id,
                quantity: 1,
              },
            })
          }
          isLoading={addToCartMutation.isLoading}
        >
          <div className="w-32">Add to Cart</div>
        </Button>
      )}
    </div>
  );
};
