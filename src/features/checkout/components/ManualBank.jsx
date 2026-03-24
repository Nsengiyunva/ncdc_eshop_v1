import React from "react";
import { PaymentSlip } from "./PaymentSlip";

export const ManualBank = ({ order, payment }) => {
  return (
    <div>
      <div className="">
        <div className="mb-3">
          For Manual Bank payments, please download the payment slip which you
          will use to make your payment directly to the bank.
        </div>
        <PaymentSlip order={order} />
      </div>
    </div>
  );
};
