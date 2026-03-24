import { Spinner } from "components/Elements";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteCartItem } from "../api/deleteCartItem";

export const RemoveCartItem = ({ cartItemId }) => {
  const deleteCartItemMutation = useDeleteCartItem();
  return (
    <button
      onClick={async () =>
        await deleteCartItemMutation.mutateAsync({
          cartItemId,
        })
      }
    >
      {deleteCartItemMutation.isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-center text-green-500 cursor-pointer">
          <MdDeleteOutline className="text-2xl " />
          <span>Remove</span>
        </div>
      )}
    </button>
  );
};
