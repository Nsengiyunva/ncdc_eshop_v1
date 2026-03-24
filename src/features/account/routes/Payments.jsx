import { MainLayout } from "components/Layout";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "components/Elements";
import { usePayments } from "../api/getPayments";

export const Payments = () => {
  const paymentsQuery = usePayments();

  const sortedPayments = paymentsQuery?.data?.sort((a, b) => {
    return b?.id - a?.id;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(8);

  // Get current payments
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;

  const currentPayments = sortedPayments?.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const pageNumberLimit = 5;
  const [maxPageNumber, setMaxPageNumber] = useState(5);
  const [minPageNumber, setMinPageNumber] = useState(1);

  const paginateFront = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumber) {
      setMaxPageNumber(maxPageNumber + pageNumberLimit);
      setMinPageNumber(minPageNumber + pageNumberLimit);
    }
  };
  const paginateBack = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumber(maxPageNumber - pageNumberLimit);
      setMinPageNumber(minPageNumber - pageNumberLimit);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MainLayout>
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="px-8 py-4 shadow-lg rounded-md bg-white">
            <p className="font-bold text-lg">Payments List</p>
          </div>

          {sortedPayments?.length < 1 ? (
            <div className="mx-auto flex flex-col justify-center text-center my-12 font-bold h-48 space-y-6">
              <p className="text-2xl">Your Payments list is empty</p>
              <p>Check out our products to get the best deals</p>
              <Link to="/">
                <button className="py-2 px-4 bg-green-500 text-white rounded">
                  Go to products
                </button>
              </Link>
            </div>
          ) : (
            currentPayments?.map((payment, index) => (
              <div
                className="my-6 px-8 py-4 bg-white rounded-md shadow-lg"
                key={index}
              >
                <div className="flex justify-between my-8">
                  <div>
                    <p className="text-lg font-semibold text-gray-600">
                      Payment: {payment?.id}
                    </p>
                    <p className="font-semibold text-gray-600">
                      Date: {new Date(payment?.created_at)?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 my-2">
                  <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0">
                    <p className="text-lg my-2">PRN</p>
                    <p className="text-lg my-2 text-gray-500 font-semibold">
                      {payment?.prn}
                    </p>
                  </div>
                  <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0">
                    <p className="text-lg my-2">Amount</p>
                    <p className="text-lg my-2 text-gray-500 font-semibold">
                      sh. {payment?.amount?.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0">
                    <p className="text-lg my-2">Status</p>
                    <p className="text-lg my-2 text-red-500 font-semibold">
                      {payment?.status}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 my-2">
                  <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0">
                    <p className="text-lg my-2">PRN expiry</p>
                    <p className="text-lg my-2 text-gray-500 font-semibold">
                      {payment?.prn_expiry_date}
                    </p>
                  </div>
                  <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0">
                    <p className="text-lg my-2">Phone number: </p>
                    <p className="text-lg my-2 text-gray-500 font-semibold">
                      {payment?.phone_number}
                    </p>
                  </div>
                  <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0">
                    <p className="text-lg my-2">PRN Status</p>
                    <p className="text-lg my-2 text-red-500 font-semibold">
                      {payment?.prn_status}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Skeleton */}
          {paymentsQuery.isLoading && (
            <div>
              <div className="shadow-lg rounded-md my-4 w-full bg-white my-4 px-8 py-4">
                <p className="text-lg font-semibold text-gray-600">Payment: </p>
                <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p>PRN</p>
                    <div className="skeleton h-8 my-2"></div>
                  </div>
                  <div>
                    <p>Amount</p>
                    <div className="skeleton h-8 my-2"></div>
                  </div>
                  <div>
                    <p>Status</p>
                    <div className="skeleton h-8 my-2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Pagination */}
        <div className="my-8">
          <Pagination
            postsPerPage={paymentsPerPage}
            totalPosts={sortedPayments?.length}
            paginate={paginate}
            currentPage={currentPage}
            paginateFront={paginateFront}
            paginateBack={paginateBack}
            maxPageNumber={maxPageNumber}
            minPageNumber={minPageNumber}
          />
        </div>
      </div>
    </MainLayout>
  );
};
