import { Button, Dialog, DialogTitle, Spinner } from "components/Elements";
import { useAuth } from "lib/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePayNow } from "../api/payNow";
import { useCheckPaymentStatus } from "../api/checkPaymentStatus";
import { Form, InputField } from "components/Form";

export function PayNow() {
  const [show, setShow] = React.useState(false);

  const navigate = useNavigate();

  const { user } = useAuth();

  const orderId = localStorage.getItem("orderId");

  const [alternativeNumber, setAlternativeNumber] = useState();
  const [transactionReference, setTransactionReference] = useState();
  const [transactionResponseStatus, setTransactionResponseStatus] = useState();
  const [transactionResponseCode, setTransactionResponseCode] = useState();

  const payNowMutation = usePayNow();

  const checkStatusMutation = useCheckPaymentStatus();

  const handleClose = () => {
    setShow(false);
    setAlternativeNumber(false);
    setTransactionReference("");
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Click to Pay Now</Button>

      <Dialog isOpen={show} onClose={handleClose} initialFocus={null}>
        <div className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <DialogTitle className="text-xl text-center font-bold mb-4">
            Pay Now
          </DialogTitle>
          {payNowMutation.isSuccess ? (
            <div className="">
              <div className="font-bold text-red-600 text-lg bg-red-100 rounded-lg p-3">
                Please input your Mobile Money PIN from your mobile device to
                complete payment.
              </div>
              <div className="mb-3">
                <div className="text-gray-900 mt-3 text-sm mb-3">
                  If you did not receive a USSD input from your mobile device,
                  please follow the steps below to approval payment.
                </div>
                <div className="text-gray-600 text-md">1. Dial *165#</div>
                <div className="text-gray-600 text-md">
                  2. Input 8 (My Account)
                </div>
                <div className="text-gray-600 text-md">
                  3. Input 3 (My Approvals)
                </div>
                <div className="text-gray-600 text-md">
                  4. Input 1 (Approvals)
                </div>
              </div>
              <div className="font-semibold mb-3">
                Use the transaction reference below to check your mobile money
                payment status.
              </div>
              <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-3 flex flex-row items-center space-x-2">
                <div className="text-sm">Transaction Reference: </div>
                <div className="font-bold text-md">{transactionReference}</div>
              </div>
              <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-3 flex flex-row items-center space-x-2">
                <div className="text-sm">Transaction Response Status: </div>
                <div className="font-bold text-md capitalize">
                  {transactionResponseStatus}
                </div>
              </div>
              <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-3 flex flex-row items-center space-x-2">
                <div className="text-sm">Transaction Response Code: </div>
                <div className="font-bold text-md">
                  {transactionResponseCode}
                </div>
              </div>

              <div className="">
                <Button
                  onClick={async () => {
                    const result = await checkStatusMutation.mutateAsync({
                      order_id: orderId,
                    });
                    if (result) {
                      console.log(result);
                      navigate(`/payment/success`);
                    }
                  }}
                  isLoading={checkStatusMutation.isLoading}
                >
                  Check Payment Status
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Form
                id="pay-now"
                onSubmit={async (values) => {
                  await payNowMutation.mutateAsync({
                    data: values,
                  });
                }}
                options={{
                  defaultValues: {
                    phone_number: user.phone_number,
                  },
                }}
              >
                {({ register, formState, watch, setValue }) => (
                  <>
                    <InputField
                      label="Phone Number"
                      placeholder={user.phone_number}
                      error={formState.errors["phone_number"]}
                      registration={register("phone_number")}
                      maxLength={10}
                    />
                    <div className="flex flex-row items-center space-x-2 mt-3">
                      <Button
                        type="button"
                        onClick={handleClose}
                        variant="inverse"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={async () => {
                          const result = await payNowMutation.mutateAsync({
                            data: {
                              order_id: orderId,
                            },
                          });
                          setTransactionReference(
                            result?.MobileMoneyCollectionV2Result?.response
                              ?.TransactionReference
                          );
                          setTransactionResponseStatus(
                            result?.MobileMoneyCollectionV2Result?.response
                              ?.TransactionResult
                              ?.MobileMoneyCollectionV2Response
                              ?.MobileMoneyCollectionV2Result?.response?.status
                          );
                          setTransactionResponseCode(
                            result?.MobileMoneyCollectionV2Result?.response
                              ?.TransactionResult
                              ?.MobileMoneyCollectionV2Response
                              ?.MobileMoneyCollectionV2Result?.response?.code
                          );
                        }}
                        isLoading={payNowMutation.isLoading}
                      >
                        Proceed
                      </Button>
                    </div>
                  </>
                )}
              </Form>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
}
