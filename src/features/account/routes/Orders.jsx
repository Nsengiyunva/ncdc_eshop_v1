import { MainLayout } from "components/Layout";
import React, { useState } from "react";
import { useOrders } from "../api/getOrders";
import { useNavigate } from "react-router-dom";
import { Button, DottedLine, Pagination } from "components/Elements";
import { formatDate } from "utils/format";
import Breadcrumbs from "components/Layout/Breadcrumbs";

export const Orders = () => {
  const ordersQuery = useOrders();

  const navigate = useNavigate();

  const sortedOrders = ordersQuery?.data?.sort((a, b) => {
    return b?.id - a?.id;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(4);

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const currentOrders = sortedOrders?.slice(
    indexOfFirstOrder,
    indexOfLastOrder
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

  const getTypeOfServiceText = (typeOfService) => {
    switch (typeOfService) {
      case "BOOKS":
        return "Book Purchase";
      case "BID_DOCUMENTS":
        return "Bids Service";
      case "BOOK_EVALUATION":
        return "Evaluations Service";
      default:
        return typeOfService;
    }
  };

  const routes = [
    {
      path: "/orders",
      name: "Orders",
    },
  ];

  return (
    <MainLayout>
      <Breadcrumbs routes={routes} />
      <div className="flex flex-col justify-between md:mt-3">
        <div>
          <div
            className="px-8 py-4 shadow-md rounded-2xl bg-white flex justify-between
					 items-center"
          >
            <div className="font-bold text-md md:text-lg">My Orders</div>
            <Button size="sm" onClick={() => navigate("/check-prn")}>
              <span className="text-xs md:text-md">Check Payment Status</span>
            </Button>
          </div>

          {sortedOrders?.length < 1 ? (
            <div className="bg-white rounded-2xl shadow-md p-6 mt-4">
              <div className="text-center font-bold">
                You've made no orders yet.
              </div>
              <div className="text-center mb-3 text-gray-700">
                Check out our products to get the best deals
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  size="sm"
                >
                  Go Shopping
                </Button>
              </div>
            </div>
          ) : (
            currentOrders?.length > 0 && (
              <>
                {currentOrders?.map((order, index) => (
                  <div
                    className="bg-white my-4 px-3 md:px-8 py-3 rounded-lg md:rounded-2xl hover:shadow-lg hover:cursor-pointer"
                    onClick={() => navigate(`/order-summary/${order?.id}`)}
                    key={index}
                  >
                    {/* Order summary  */}
                    <div className="space-y-2">
                      <div className="text-xs flex flex-row items-center justify-between">
                        <div>
                          <span className="text-gray-400">Order no</span> #{" "}
                          {order?.id}
                        </div>
                        <div>
                          <span className="text-xs">Order date</span>
                          <br />
                          <span>{formatDate(order?.created_at)}</span>
                        </div>
                      </div>
                      <DottedLine />
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center space-x-2">
                          <div className="">Total Amount:</div>
                          <div className="font-bold">
                            {order?.amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "UGX",
                            })}
                          </div>
                        </div>
                        <div className="p-2 rounded-md text-xs flex items-center space-x-1">
                          <div className="text-green-500">
                            {getTypeOfServiceText(order?.type_of_service)}
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex flex-row justify-between items-center">
                      <div>
                        <Link to={`/order-summary/${order?.id}`}>
                          <button
                            className="my-2 text-center w-full border border-green-600 
                            text-green-600 p-2 font-bold text-sm md:text-base"
                          >
                            See details
                          </button>
                        </Link>
                      </div>
                    </div> */}
                      <div className="flex flex-row items-center justify-end">
                        <div
                          className={`${
                            (order?.payment?.status) ===
                            "PENDING"
                              ? "text-orange-500 bg-orange-100"
                              : (order?.payment?.status) ===
                                "AVAILABLE"
                              ? "text-blue-500 bg-blue-100"
                              : "text-green-500 bg-green-100"
                          } rounded-full p-1 text-xs px-2`}
                        >
                          {order?.payment?.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )
          )}

          {/* Skeleton */}
          {ordersQuery.isLoading && (
            <div>
              <div className="shadow-lg rounded-md my-4 w-full bg-white my-4 px-8 py-4">
                <p className="text-lg font-semibold text-gray-600">Order: </p>
                <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p>Payment Method</p>
                    <div className="skeleton h-8 my-2"></div>
                  </div>
                  <div>
                    <p>Total Amount</p>
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
            postsPerPage={ordersPerPage}
            totalPosts={sortedOrders?.length}
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
