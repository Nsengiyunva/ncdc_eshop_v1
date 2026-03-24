import { MainLayout } from "components/Layout";
import React, { useState } from "react";
import { Button, Spinner } from "components/Elements";
import { FiCopy } from "react-icons/fi";
import { PaymentOptions } from "../components/PaymentOptions";
import { useGeneratePRN } from "../api/generateEvaluationPRN";
import { ChevronRight } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { useEvaluation } from "../api/getBookEvaluation";
import { InformationCircleIcon } from "@heroicons/react/outline";
import Breadcrumbs from "components/Layout/Breadcrumbs";
import { PaymentSlip } from "features/checkout/components/PaymentSlip";

export const EvaluationPayment = () => {
  const [copy, setCopy] = useState(false);
  const generatePRNMutation = useGeneratePRN();

  const { slug } = useParams();

  const evaluationQuery = useEvaluation({ slug });

  if (evaluationQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!evaluationQuery.data) return null;

  const generateResult =
    generatePRNMutation?.data?.response?.GetPRNResponse?.GetPRNResult
      ?.ErrorCode;
  const generatedPRN =
    generatePRNMutation?.data?.response?.GetPRNResponse?.GetPRNResult?.PRN;

    const orderId = generatePRNMutation?.data?.order?.order?.id;

  const routes = [
    {
      path: "/services/book-evaluation",
      name: "Book Evaluation",
    },
    {
      path: `/services/book-evaluation/make-payment`,
      name: "Make Payment",
    },
  ];

  return (
    <MainLayout>
      <Breadcrumbs routes={routes} />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl mt-3 shadow-md">
        <div className="mb-3">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Payment</h1>
          <p className="text-gray-700">
            To make a payment, you're required to first generate a Payment
            Reference Number (PRN) below.
          </p>
        </div>
        <div className="">
          <div className="bg-green-100 p-3 rounded-lg border border-green-800 text-green-800 mb-4">
            A PRN is is a unique auto-generated number used in processing Uganda
            Revenue Authority (URA) payments.
          </div>
          {generateResult === undefined && (
            <button
              className="hover:bg-green-600 bg-green-800 text-white text-lg 
                rounded-md px-4 py-2 text-center"
              onClick={async () =>
                await generatePRNMutation.mutateAsync({
                  data: {
                    evaluation_id: localStorage.getItem("evaluation_id"),
                  },
                })
              }
            >
              {generatePRNMutation?.isLoading ? (
                <Spinner />
              ) : (
                <span>Generate PRN</span>
              )}
            </button>
          )}
          <div className="w-screen md:w-full">
            {generateResult === "E000" && (
              <div className="">
                <div className="">
                  <div className="mb-4 font-semibold text-gray-800">
                    Your PRN has been generated successfully.
                  </div>
                  <div className="flex flex-row justify-between items-center space-x-1">
                    <div className="bg-green-100 p-3 text-green-800 hover:bg-green-200 rounded-lg font-black text-lg">
                      {generatedPRN}
                    </div>
                    <PaymentSlip
                      order={generatePRNMutation?.data?.order?.order}
                      payment={generatePRNMutation?.data?.order?.payment}
                    />
                  </div>
                </div>
              </div>
            )}
            {generateResult === "E000" && (
              <div className="">
                <div className="flex-auto ">
                  <div className="">
                    <div className="my-4 font-black">
                      Please select a payment method below.
                    </div>
                    <PaymentOptions orderId={orderId} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
