import { Spinner } from "components/Elements";
import { useAddToCart } from "../api/addToCart";

export const AddToCartBtn = ({ productId }) => {
  const addToCartMutation = useAddToCart();

  return (
    <button
      onClick={async () =>
        await addToCartMutation.mutateAsync({
          data: {
            product_id: productId,
            quantity: 1,
          },
        })
      }
      className="px-4 py-2 rounded-lg shadow-sm bg-green-500 text-white font-bold"
    >
      {addToCartMutation.isLoading ? <Spinner /> : <span>Add to Cart</span>}
    </button>
  );
};
