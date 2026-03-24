import React, { useEffect } from "react";
import { MainLayout } from "components/Layout";
import { useUpdatePaymentStatus } from "../api/updatePaymentStatus";
import { Link, useParams } from "react-router-dom";

export const Success = () => {
  const updatePaymentStatusMutation = useUpdatePaymentStatus();

  const { orderId } = useParams();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      await updatePaymentStatusMutation.mutateAsync({
        order_id: orderId,
      });
    };

    updatePaymentStatus();
  }, [orderId]);

  const handleTrackOrder = () => {};

  const handleGoToPurchases = () => {};

  return (
    <MainLayout>
      <div className="flex items-center justify-center md:mt-8">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full flex flex-col justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-green-600 mb-4">
              Order Complete!
            </h2>
            <p className="text-gray-700 mb-8">
              Your order has been successfully processed. Please check your
              email address for the receipt.
            </p>
            <div className="mb-4">
              For physical products, you're required to pick up your order at our
              offices.
            </div>
            <div className="mb-4">
              For soft copy products, please go to <Link to='/purchases' className="text-green-500">My Purchases</Link> to download your order.
            </div>
            <div className="text-gray-700">
              <p>
                If you have any questions or need further assistance, please
                contact us:
              </p>
              <p className="mt-4">
                <strong>Phone:</strong> <a href="tel:+256393112088" className="text-blue-500">+256-393-112-088 </a>
              </p>
              <p className="mt-2">
                <strong>Email:</strong> <a href="mailto:marketing@ncdc.go.ug" className="text-blue-500">marketing@ncdc.go.ug</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
