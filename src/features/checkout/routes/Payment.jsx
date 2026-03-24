import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "components/Layout";
import { PaymentMethods } from "../components/PaymentMethods";
import { useGeneratePRN } from "../api/generatePRN";
import { CoolSpinner, Spinner } from "components/Elements";
import { useOrder } from "../api/getOrder";
import { useAuth } from "lib/auth";
import Breadcrumbs from "components/Layout/Breadcrumbs";
import { showToast } from "utils/showToast";

export const Payment = () => {
  const { t } = useTranslation();
  const orderId = localStorage.getItem("orderId");
  const { user } = useAuth();
  const [prnQueued, setPrnQueued] = useState(false);
  const [prnTimeout, setPrnTimeout] = useState(null);
  const [prnCompleted, setPrnCompleted] = useState(false);

  const generatePRNMutation = useGeneratePRN();
  const orderQuery = useOrder({ orderId });

  const generateResult =
    generatePRNMutation?.data?.GetPRNResponse?.GetPRNResult?.ErrorCode;
  const generatedPRN =
    generatePRNMutation?.data?.GetPRNResponse?.GetPRNResult?.PRN;

  useEffect(() => {
    if (generateResult === "E000" && !prnCompleted) {
      showToast.success(t("payment.prnReady"));
      setPrnCompleted(true);
    }
  }, [generateResult, prnCompleted, t]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleGeneratePRN = async () => {
    const timeout = setTimeout(() => {
      setPrnQueued(true);
      showToast.info(t("payment.queued"));
    }, 60000);

    setPrnTimeout(timeout);

    try {
      await generatePRNMutation.mutateAsync({
        data: {
          Amount: localStorage.getItem("totalCost"),
          TaxPayerName: user?.name,
          order_id: orderId,
        },
      });
    } finally {
      clearTimeout(timeout);
    }
  };

  if (orderQuery.isLoading) {
    return (
      <div className="fixed w-full h-full bg-white flex justify-center items-center">
        <CoolSpinner />
      </div>
    );
  }

  const routes = [
    { path: "/cart", name: t("nav.cart") },
    { path: "/payment", name: t("payment.title") },
  ];

  const hasPRN =
    orderQuery?.data?.payment?.prn || generateResult === "E000" || generatedPRN;

  return (
    <MainLayout title={t("payment.title")}>
      <Breadcrumbs routes={routes} />

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-lg md:text-3xl font-bold text-gray-800 mb-3">
          {t("payment.title")}
        </h1>
        <p className="text-gray-700 mb-4">{t("payment.description")}</p>

        <div className="bg-green-100 p-3 rounded-lg border border-green-700 text-green-800 mb-6 text-sm">
          {t("payment.info")}
        </div>

        {!hasPRN && (
          <button
            onClick={handleGeneratePRN}
            className="bg-green-700 hover:bg-green-800 text-white text-lg px-6 py-2 rounded-md shadow-sm transition"
            disabled={generatePRNMutation.isLoading}
          >
            {generatePRNMutation.isLoading ? (
              <Spinner />
            ) : (
              t("payment.generate")
            )}
          </button>
        )}

        {hasPRN && (
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-gray-800 font-regular mb-3">
                {t("payment.prnSuccess")}
              </p>
              <div className="bg-green-100 p-3 rounded-md text-green-900 mb-3 flex flex-row items-center justify-between">
                <div className=" font-bold text-lg tracking-wide mt-1 w-full overflow-x-auto text-green-500">
                  {orderQuery?.data?.payment?.prn || generatedPRN}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-regular text-gray-700 mb-2">
                {t("payment.selectMethod")}
              </p>
              <PaymentMethods orderId={orderId} order={orderQuery.data} />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
