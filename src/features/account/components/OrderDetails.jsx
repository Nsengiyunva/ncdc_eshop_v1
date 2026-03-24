import React from "react";

export const OrderDetails = ({ data }) => {
  var totalAmount = 0;

  return (
    <div className="h-full">
      {/* For Evaluation Service */}
      {data?.type_of_service === "BOOK_EVALUATION" && (
        <div className="h-full flex flex-col justify-between">
          <div>
            <p>Book Evaluation</p>
          </div>
          <div className="my-4 flex space-x-4">
            <p>Total amount:</p>
            <p>UGX {data?.amount?.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* For Bidding Service */}
      {data?.type_of_service === "BID_DOCUMENTS" && (
        <div>
          <div>
            <p>Bid Order</p>
          </div>
          <div className="my-4 overflow-auto">
            <p>Total Amount: {data?.amount}</p>
            <p className="text-gray-500">
              {new Date(data?.created_at)?.toDateString()}
            </p>
            {/* <table className="table-auto overflow-scroll w-full text-left border-collapse">
              <thead>
                <tr>
                  <th>Procurement Reference Number</th>
                  <th>Subject matter of Procurement</th>
                </tr>
              </thead>
              <tbody className="text-left ">
                <tr>
                  <td>SDFG22342342</td>
                  <td>Buying things</td>
                </tr>
              </tbody>
            </table> */}
          </div>
        </div>
      )}

      {/* For product orders */}
      {data?.type_of_service === "BOOKS" &&
        data?.orderItems?.map((product, index) => {
          totalAmount = totalAmount + product?.amount;
          return (
            <div className="grid grid-cols-6 gap-4 my-4" key={index}>
              <div className="col-span-4 md:col-span-4 flex flex-col space-y-2">
                <p>{product?.name}</p>
              </div>
              <div className="col-span-2 md:col-span-2 flex flex-row justify-between md:flex-col space-y-2 items-end">
                <p>UGX {product?.amount}</p>
                <p className="text-gray-500 text-sm">
                  Qty: {product?.quantity}
                </p>
              </div>
            </div>
          );
        }) && (
          <div>
            <p>Total Amount: {totalAmount}</p>
          </div>
        )}
    </div>
  );
};
