import { Spinner } from "components/Elements";
import React from "react";
import { useReduceCartQuantity } from "../api/reduceCartQuantity";

export const ReduceCartQuantity = ({ item }) => {
  const reduceCartQuantityMutation = useReduceCartQuantity();
  return (
    <button
      onClick={async () =>
        await reduceCartQuantityMutation.mutateAsync({
          cartItemId: item.id,
          data: {
            quantity: item.quantity - 1,
          },
        })
      }
      className={
        item.quantity === 1
          ? "bg-green-300 px-2 rounded-md text-xl text-white pointer-events-none"
          : "bg-green-500 px-2 text-xl rounded-md text-white"
      }
    >
      {reduceCartQuantityMutation.isLoading ? <Spinner /> : <span>-</span>}
    </button>
  );
};
