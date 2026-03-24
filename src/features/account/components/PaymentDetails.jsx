import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { Heading } from "./Heading";
import { Content } from "./Content";

export const PaymentDetails = ({ data }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="grid grid-rows-2 gap-4 px-4 py-2 relative">
        <div className="space-y-2">
          <Heading>Payment Reference Number(PRN)</Heading>
          <Content>{data?.prn}</Content>
        </div>
        <div className="space-y-2">
          <Heading>PRN Expiry Data</Heading>
          <Content>{data?.prn_expiry_date}</Content>
        </div>
        <div className="space-y-2">
          <Heading>PRN Search Code</Heading>
          <Content>{data?.prn_search_code}</Content>
        </div>
        <div className="space-y-2">
          <div className="flex space-x-2">
            <p className="font-light text-gray-900">PRN Status</p>
            <button onClick={() => setShow(!show)}>
              <FiInfo />
            </button>
          </div>
          {show && (
            <div className="absolute md:bottom-24 lg:bottom-16 left-0 border border-green-600 rounded">
              <div
                className="bg-white text-green-800 px-4 py-3 rounded"
                role="alert"
              >
                <span className="block sm:inline text-sm my-8">
                  {data?.prn_status_desc}
                </span>
              </div>
            </div>
          )}
          <p
            className={`font-extrabold text-lg ${
              true ? "text-red-800" : "text-green-600"
            }`}
          >
            {data?.prn_status}
          </p>
        </div>
      </div>
    </div>
  );
};
