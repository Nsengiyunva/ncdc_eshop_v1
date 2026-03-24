import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-feather";
import { useProducts } from "../api/getProducts";
import { ProductItem } from "components/ProductItem/ProductItem";
import { findWhere } from "underscore";
import { useTranslation } from "react-i18next";

export const Books = () => {
  const { t } = useTranslation();
  const productsQuery = useProducts();

  const levels = [];

  productsQuery?.data?.forEach((product) => {
    if (product.level !== null && findWhere(levels, product.level) == null) {
      levels.push(product.level);
    }
  });

  if (productsQuery.isLoading) {
    return (
      <div className="w-full space-y-6">
        <div className="w-full h-10 skeleton rounded-md my-2"></div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="skeleton h-48 w-full rounded-md"></div>
            <div className="w-full space-y-2 p-2">
              <div className="skeleton h-5 w-3/4 rounded"></div>
              <div className="skeleton h-5 w-1/2 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="">
      {levels.map((level, index) => {
        if (level.name === "STEPD") return null;

        const levelProducts = productsQuery?.data?.filter(
          (product) =>
            product?.level?.name === level?.name && product.active === 1
        );

        return (
          <div key={index} className="mb-4 ">
            <div className=" px-4 pb-2 text-gray-900 flex justify-between items-center">
              <p className="text-md font-bold">{level.name}</p>
              <Link
                to={`/products/levels/${level.slug}`}
                className="flex items-center gap-1 text-sm hover:text-green-600"
              >
                <span>{t("viewMore")}</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="bg-white shadow-lg rounded-md p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {levelProducts?.length > 0 ? (
                levelProducts
                  .slice(0, 4)
                  .map((product, idx) => (
                    <ProductItem key={idx} product={product} />
                  ))
              ) : (
                <div className="col-span-full text-center text-gray-500 font-semibold py-4">
                  {t("noProductsAvailable")}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
