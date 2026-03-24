import { MainLayout } from "components/Layout";
import React, { useEffect } from "react";
import { useOrders } from "../api/getOrders";
import NCDClogo from "assets/logo.png";
import { useAuth } from "lib/auth";
import { PrintReceipt } from "../components/PrintReceipt";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "react-feather";


export const Receipt = () => {
  const order = useOrders();
  const { user } = useAuth();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const latestOrder = order?.data?.sort((a, b) => {
    return b?.id - a?.id;
  });

  return (
    <MainLayout>
      <div
        className="md:mt-8 px-8 mb-8 py-4 shadow-md rounded-2xl bg-white flex justify-start space-x-2
					 items-center uppercase text-sm font-bold text-gray-800"
      >
        <Link to="/profile/orders" className="">
          Orders
        </Link>
        <ChevronRight size={14} />
        <Link to={`/order-summary/${orderId}`} className="">
          # {orderId}
        </Link>
        <ChevronRight size={14} />
        <div className=" text-gray-400">Invoice</div>
      </div>

      <div>
        {latestOrder?.slice(0, 1)?.map((order, index) => (
          <div
            className="rounded shadow-lg px-8 py-6 bg-white rounded-2xl"
            key={index}
          >
            <div id="receipt" className="px-12 py-8">
              <div className="flex justify-between items-center">
                <img src={NCDClogo} className="w-36" alt="logo" />
                <p className="font-bold text-2xl">Order Invoice</p>
              </div>
              <div className="grid grid-cols-2 gap-8 my-8">
                <div>
                  <p className="font-bold my-4">
                    National Curriculum Development Center
                  </p>
                  <div className="text-gray-600">
                    <p>Plot M838, Kyambogo.</p>
                    <p>P.O.Box 7002 Kampala, Uganda</p>
                    <p>+256-393-112-088</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-bold my-4">Bill To:</p>
                  <p>{user?.name}</p>
                  <p>{user?.phone_number}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-bold my-4">Payment</p>
                  <p className="my-2 text-gray-600">Tin number: {user?.tin}</p>
                  <p className="my-2 text-gray-600">
                    Prn number: {order?.payment?.prn}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-end space-y-2">
                  <p className="font-bold my-4">Product</p>
                  <p>Product: {order?.type_of_service}</p>
                  <p>Total amount: Ugx {order?.amount}</p>
                  <p>Paid: Ugx {order?.amount}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end px-8">
              <PrintReceipt rootId="receipt" />
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};
