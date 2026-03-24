import { Button } from "components/Elements";
import React, { useState } from "react";
import { useGenerateGTPayURL } from "../api/generateGTPayURL";

export const Visa = ({ tracking_id }) => {
  const generateGTPayURLMutation = useGenerateGTPayURL();

  const [payNowClicked, setPayNowClicked] = useState();

  return (
    <>
      <div className="">
        <div className="">
          For online payments, please note that all bank transactions are
          securely processed through{" "}
          <a
            href="https://www.gtbank.co.ug/"
            target="_blank"
            rel="noreferrer"
            className="text-red-500"
          >
            {" "}
            Guaranty Trust Bank (Uganda) LTD{" "}
          </a>
          , ensuring a reliable and protected payment experience. Once you click
          "Proceed to make Payment," you have confirmed your intent to finalize
          the transaction securely and efficiently.
        </div>
        {generateGTPayURLMutation.isSuccess ? (
          <div className="mt-4">
            <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl">
              GTBank securely handles both VISA and Mobile Money payments. If you have any questions or concerns,
                            please don't hesitate to contact our customer support team.
            </div>
            <Button
              onClick={() => {
                window.location.href =
                  generateGTPayURLMutation.data?.payment_url;
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
              onClick={async () =>
                await generateGTPayURLMutation.mutateAsync({
                  tracking_id: tracking_id,
                })
              }
              isLoading={generateGTPayURLMutation.isLoading}
              className="my-3 text-sm"
            >
              Proceed To Make Payment
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
