import { Button } from "components/Elements";
import React from "react";
import { PayNow } from "./PayNow";

export const MobileMoney = () => {
  return (
    <div className="">
      <div className="mb-3">
        For Mobile Money payments, please note that all transactions are
        securely processed through{" "}
        <span className="text-red-500">Guaranty Trust Bank (Uganda) LTD</span> ,
        ensuring a reliable and protected payment experience. Once you click
        "Pay Now," you have confirmed your intent to finalize
        the transaction.
      </div>
      <div className="flex flex-row items-center space-x-2">
        <PayNow />
      </div>
    </div>
  );
};
