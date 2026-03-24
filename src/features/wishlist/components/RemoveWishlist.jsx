import { Spinner } from "components/Elements";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteWishlistItem } from "../api/deleteWishlist";

export const RemoveWishlist = ({ wishlistItemId }) => {
  const deleteWishlistMutation = useDeleteWishlistItem();
  return (
    <button
      onClick={async () =>
        await deleteWishlistMutation.mutateAsync({
          wishlistItemId,
        })
      }
      className=""
    >
      {deleteWishlistMutation.isLoading ? (
        <Spinner />
      ) : (
        <div className="flex text-green-500 rounded-lg shadow-sm border border-green-500 font-extrabold px-5 py-1.5">
          <MdDeleteOutline className="text-xl " />
          <span>Remove</span>
        </div>
      )}
    </button>
  );
};
