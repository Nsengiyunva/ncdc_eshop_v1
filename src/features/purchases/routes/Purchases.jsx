import React, { useEffect } from "react";
import { MainLayout } from "components/Layout";
import Breadcrumbs from "components/Layout/Breadcrumbs";
import { useMyPurchases } from "../api/getMyPurchases";
import { CoolSpinner } from "components/Elements";
import { useAuth } from "lib/auth";
import { DocumentDownloadIcon } from "@heroicons/react/outline";

export const Purchases = () => {
  const purchaseQuery = useMyPurchases();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const routes = [{ path: "/purchases", name: "Purchases" }];

  if (purchaseQuery.isLoading) {
    return (
      <div className="fixed w-full h-full bg-white flex justify-center items-center">
        <CoolSpinner />
      </div>
    );
  }

  const hasPurchases = purchaseQuery?.data?.length > 0;

  return (
    <MainLayout page="Purchases">
      <Breadcrumbs routes={routes} />

      <div className="mt-3 px-6 md:px-10 py-4 shadow-md rounded-2xl bg-white flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-bold text-gray-800">
          My Purchases
        </h1>
      </div>

      <div className="mt-4">
        {!hasPurchases ? (
          <div className="bg-white shadow-md rounded-xl p-6 text-start text-gray-600">
           
            <h2 className="text-lg font-semibold text-gray-700">
              You haven’t made any purchases yet.
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Once you purchase a digital product, it will appear here with a
              secure download link. Start exploring our library to find
              resources that suit your needs.
            </p>
            <div className="mt-4">
              <a
                href="/"
                className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-md transition"
              >
                Browse Products
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md divide-y">
            {purchaseQuery.data.map((purchase) => (
              <div
                key={purchase.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <DocumentDownloadIcon className="h-6 w-6 text-green-700" />
                  <p className="font-medium text-gray-800 text-sm md:text-base">
                    {purchase.name || "Untitled Document"}
                  </p>
                </div>
                <a
                  href={`https://shopapi.ncdc.go.ug/api/product-attachments/download/product-attachment/${purchase.id}/${user.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-green-600 font-semibold hover:underline"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};
