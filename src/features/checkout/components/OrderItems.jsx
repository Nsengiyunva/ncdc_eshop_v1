import { useAuth } from "lib/auth";
import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { Link } from "react-router-dom";
import { useAddOrder } from "../api/addOrder";
import { Spinner } from "components/Elements";
import { useEmailVerify } from "features/account/api/emailVerify";

export const OrderItems = ({ cartItems, cartId }) => {
  const verifyEmailMutation = useEmailVerify();
  const { user } = useAuth();
  const addOrderMutation = useAddOrder();

  const [showNote, setShowNote] = useState(true);

  const handleNoteClose = () => {
    setShowNote(false);
  };

  const handleOrder = async () => {
    localStorage.setItem("totalCost", totalNetCost);
    await addOrderMutation.mutateAsync({
      data: {
        cart_id: cartId,
        paymentMethod: "mtn",
      },
    });
  };

  const handleEmailVerify = async () => {
    await verifyEmailMutation.mutateAsync({
      email: user.email,
    });
  };

  const totalNetCost = cartItems.reduce(
    (total, product) => total + product.amount * product.quantity,
    0
  );

  return (
    <div className="bg-white p-4">
      <div className="mb-5">
       
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-4 font-bold text-gray-700">Item</th>
              <th className="text-left p-4 font-bold text-gray-700">Quantity</th>
              <th className="text-left p-4 font-bold text-gray-700">Cost</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 text-gray-700">
                  {item.product.name.length > 25
                    ? `${item.product.name.slice(0, 22)}...`
                    : item.product.name}
                </td>
                <td className="p-4 text-gray-700">{item.quantity}</td>
                <td className="p-4 font-bold text-gray-900">
                  UGX {(item.amount * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
            <tr>
              <td className="p-4 font-bold text-gray-900" colSpan="2">
                Total
              </td>
              <td className="p-4 font-bold text-gray-900">
                UGX {totalNetCost.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        <Link to="/cart" className="text-green-600 hover:underline flex items-center">
          <BsArrowLeftShort className="inline-block text-2xl mr-1" /> Back to cart
        </Link>

        {user.email_verified_at === null ? (
          <button
            className="bg-green-500 text-white px-5 py-2 rounded-md shadow hover:bg-green-600 transition duration-150"
            onClick={handleEmailVerify}
          >
            {verifyEmailMutation.isLoading ? (
              <Spinner size="sm" />
            ) : (
              "Verify Account"
            )}
          </button>
        ) : (
          <div className="flex flex-col items-end space-y-1">
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600 transition duration-150 uppercase"
              onClick={handleOrder}
            >
              {addOrderMutation.isLoading ? (
                <Spinner size="sm" />
              ) : (
                "Place Order"
              )}
            </button>
            <div className="text-xs text-gray-500">
              (This action will create your order.)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
