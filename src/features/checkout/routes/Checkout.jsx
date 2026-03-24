import React from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "components/Layout";
import Breadcrumbs from "components/Layout/Breadcrumbs";
import { useCartItems } from "../api/getCartItems";
import { OrderItems } from "../components/OrderItems";
import { useAuth } from "lib/auth";

export const Checkout = () => {
  const { t } = useTranslation();
  const cartQuery = useCartItems();
  const { user } = useAuth();

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const routes = [
    { path: "/cart", name: t("cart") },
    { path: "/order", name: t("checkout") },
  ];

  return (
    <MainLayout>
      <Breadcrumbs routes={routes} />

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-sm">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t("checkoutTitle", "Checkout")}
          </h1>
          <p className="text-gray-600 mt-1">
            {t(
              "checkoutInstructions",
              "Please confirm your order and contact details before continuing."
            )}
          </p>
        </div>

        {/* User Info Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {t("yourDetails", "Your Contact Details")}
          </h2>
          <div className="bg-gray-100 p-4 rounded-md shadow-inner text-sm sm:text-base">
            <div className="space-y-2">
              <p>
                <span className="font-bold">{t("name", "Name")}: </span>{" "}
                {user?.name}
              </p>
              <p>
                <span className="font-bold">
                  {t("phone", "Phone Number")}:{" "}
                </span>{" "}
                {user?.phone_number}
              </p>
              <p>
                <span className="font-bold">{t("date", "Date")}: </span> {date}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              {t(
                "dataNotice",
                "Ensure your contact information is accurate. This will be used to confirm your purchase."
              )}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {t("orderSummary", "Order Summary")}
          </h2>
          <OrderItems
            cartItems={cartQuery?.data?.cartItems}
            cartId={cartQuery?.data?.id}
          />
        </div>

        {/* Legal & Compliance Notice */}
        <div className="mt-6 text-xs text-gray-600 bg-gray-50 p-4 rounded-md border border-gray-200">
          <p className="mb-1">
            {t(
              "legalDisclaimer",
              "By proceeding, you agree that all information provided is correct and verifiable. Misuse of this platform may lead to disqualification or legal action under applicable Ugandan laws."
            )}
          </p>
          <p>
            {t(
              "govNotice",
              "This platform is maintained by the National Curriculum Development Centre (NCDC), and adheres to national e-commerce and data protection standards."
            )}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};
