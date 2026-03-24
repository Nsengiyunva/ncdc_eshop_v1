import { Button, Spinner } from "components/Elements";
import React, { useState } from "react";
import { useGenerateGTPayURL } from "../api/generateGTPayURL";
import { useOrder } from "../api/getOrder";

export const Visa = ({ orderId }) => {
  const generateGTPayURLMutation = useGenerateGTPayURL();

  const orderQuery = useOrder({ orderId });

  const [payNowClicked, setPayNowClicked] = useState();

  const [payNow, setPayNow] = useState(orderQuery.data?.gt_payment_url);

  if (orderQuery.isLoading) {
    return <Spinner size="lg" />;
  }

  if (!orderQuery.data) return null;

  return (
    <>
      <div className="">
        {orderQuery.isLoading && (
          <div className="space-y-2">
            <div className="h-8 skeleton w-full"></div>
            <div className="h-8 skeleton w-3/4"></div>
          </div>
        )}
        <div className="">
          For VISA payments, please note that all bank transactions are securely
          processed through{" "}
          <a
            href="https://www.gtbank.co.ug/"
            target="_blank"
            className="text-red-500"
          >
            {" "}
            Guaranty Trust Bank (Uganda) LTD{" "}
          </a>
          , ensuring a reliable and protected payment experience. Once you click
          "Proceed to make Payment," you have confirmed your intent to finalize
          the transaction.
        </div>
        {orderQuery.data?.gt_payment_url ? (
          <div className="mt-4">
            <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl">
              GTBank securely handles your VISA payments. If you have any
              questions or concerns, please don't hesitate to contact our
              customer support team.
            </div>
            <Button
              onClick={() => {
                window.location.href = payNow;
                setPayNowClicked(true);
              }}
              className="my-3 text-sm"
            >
              {payNowClicked ? "Please wait..." : "Pay Now"}
            </Button>
          </div>
        ) : (
          <>
            {generateGTPayURLMutation.isSuccess ? (
              <div className="mt-4">
                <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl">
                  Please make sure to have your Visa card details ready before
                  proceeding from this point. If you have any questions or
                  concerns, please don't hesitate to contact our customer
                  support team.
                </div>
                <Button
                  onClick={() => {
                    window.location.href = payNow;
                    setPayNowClicked(true);
                  }}
                  className="my-3 text-sm"
                >
                  {payNowClicked ? "Please wait..." : "Pay Now"}
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={async () => {
                    const result = await generateGTPayURLMutation.mutateAsync({
                      tracking_id: orderQuery.data?.tracking_id,
                    });
                    if (result) {
                      setPayNow(result.payment_url);
                    }
                  }}
                  isLoading={generateGTPayURLMutation.isLoading}
                  className="my-3 text-sm"
                >
                  Proceed To Make Payment
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
