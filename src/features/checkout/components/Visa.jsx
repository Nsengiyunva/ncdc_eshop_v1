import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, CoolSpinner } from "components/Elements";
import { useGenerateGTPayURL } from "../api/generateGTPayURL";
import { useOrder } from "../api/getOrder";

export const Visa = ({ orderId }) => {
  const { t } = useTranslation();
  const generateGTPayURLMutation = useGenerateGTPayURL();
  const orderQuery = useOrder({ orderId });

  const [payNowClicked, setPayNowClicked] = useState(false);
  const [payNowUrl, setPayNowUrl] = useState(orderQuery.data?.gt_payment_url);

  if (orderQuery.isLoading) {
    return (
      <div className="fixed w-full h-full bg-white flex justify-center items-center">
        <CoolSpinner />
      </div>
    );
  }

  if (!orderQuery.data) return null;

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="text-gray-700 text-sm leading-relaxed">
        {t("visa.intro")}{" "}
        <a
          href="https://www.gtbank.co.ug/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline font-medium"
        >
          Guaranty Trust Bank (Uganda) Ltd
        </a>
        . {t("visa.securityNote")}
      </div>

      {orderQuery.data?.gt_payment_url ? (
        <div className="mt-4 space-y-4">
          <div className="bg-blue-50 text-blue-800 p-4 rounded-md border border-blue-200 text-sm">
            {t("visa.confirmationNote")}
          </div>
          <Button
            onClick={() => {
              window.location.href = payNowUrl;
              setPayNowClicked(true);
            }}
            className="w-full md:w-auto"
          >
            {payNowClicked ? t("visa.waiting") : t("visa.payNow")}
          </Button>
        </div>
      ) : (
        <>
          {generateGTPayURLMutation.isSuccess ? (
            <div className="space-y-4 mt-4">
              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md border border-yellow-200 text-sm">
                {t("visa.preparationNote")}
              </div>
              <Button
                onClick={() => {
                  window.location.href = payNowUrl;
                  setPayNowClicked(true);
                }}
                className="w-full md:w-auto"
              >
                {payNowClicked ? t("visa.waiting") : t("visa.payNow")}
              </Button>
            </div>
          ) : (
            <div className="mt-4">
              <Button
                onClick={async () => {
                  const result = await generateGTPayURLMutation.mutateAsync({
                    tracking_id: orderQuery.data?.tracking_id,
                  });
                  if (result) setPayNowUrl(result.payment_url);
                }}
                isLoading={generateGTPayURLMutation.isLoading}
                className="w-full md:w-auto"
              >
                {t("visa.generateLink")}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
