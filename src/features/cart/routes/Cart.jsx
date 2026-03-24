import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ImPriceTag } from "react-icons/im";

import { MainLayout } from "components/Layout";
import Breadcrumbs from "components/Layout/Breadcrumbs";
import { CartItems } from "../components/CartItems";
import { CartSummary } from "../components/CartSummary";
import { useCartItems } from "../api/getCartItems";
import { useProducts } from "features/products/api/getProducts";
import { ProductFilter } from "utils/productFilter";
import { ProductItem } from "components/ProductItem/ProductItem";

export const Cart = () => {
  const { t } = useTranslation();
  const cartQuery = useCartItems();
  const productsQuery = useProducts();

  const productList = ProductFilter(productsQuery.data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const routes = [
    {
      path: "/cart",
      name: t("cart"),
    },
  ];

  const hasCartItems =
    cartQuery?.data?.cartItems?.length > 0 &&
    cartQuery?.data?.message !== "No cart found";

  return (
    <MainLayout page="cart">
      <Breadcrumbs routes={routes} />
      <div className="mb-4">
        {!hasCartItems ? (
          <div className="flex flex-col items-center justify-center text-center my-16 px-6">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              {t("cartEmptyTitle", "Your Cart is empty")}
            </p>
            <p className="text-gray-600 mb-4">
              {t("cartEmptyMessage", "Browse products to get the best deals.")}
            </p>
            <Link to="/" className="inline-block">
              <button className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition">
                {t("goToProducts", "Go to Products")}
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white px-5 py-2 shadow-md rounded-md mb-6">
              <h2 className="text-lg font-extrabold text-gray-800">
                {t("cartTitle", "Cart")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CartItems />
              <CartSummary />
            </div>
          </>
        )}
      </div>

      {hasCartItems && (
        <>
          <div className="mt-6 bg-green-700 text-white px-5 py-4 rounded-t-md flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2 text-sm md:text-base font-bold uppercase">
              <ImPriceTag />
              {t("suggestedProducts", "You might be interested in")}
            </div>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-white p-4 rounded-b-md shadow-md">
            {productList?.slice(0, 4).map((product, index) => (
              <ProductItem product={product} key={index} />
            ))}
          </div>
        </>
      )}
    </MainLayout>
  );
};
