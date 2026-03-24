import { Spinner } from "components/Elements";
import { useDeleteOrder } from "../api/deleteOrder";
import { FiTrash2 } from "react-icons/fi";

export const RemoveOrder = ({ orderId }) => {
  const deleteOrderMutation = useDeleteOrder();

  return (
    <button
      onClick={async () =>
        await deleteOrderMutation.mutateAsync({
          orderId,
        })
      }
    >
      {deleteOrderMutation.isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-center text-green-500 cursor-pointer">
          <FiTrash2 className="h-6 w-auto text-red-600 hover:text-red-800" />
        </div>
      )}
    </button>
  );
};
